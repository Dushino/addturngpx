// AddTurn GPX — automatické testy v headless Chrome.
//
// Použití:  node tests/run.mjs tests/generator.json [tests/editing.json …]
// Potřebuje Node 22+ a Google Chrome (příkaz google-chrome, případně cesta v CHROME).
//
// Runner spustí vlastní statický server nad složkou projektu, otevře aplikaci
// v headless Chrome a provede kroky scénáře. Krok = { name, eval, expect?, nav?,
// w?, h?, mobile?, wait? }: `eval` je asynchronní kód vykonaný ve stránce
// (return = výsledek), `expect` = očekávané hodnoty klíčů výsledku (porovnání
// přes JSON). Požadavky na Overpass API se ve stránce zachytí a obslouží
// z tests/fixtures — skutečný server se v testech nikdy nevolá.
// Chování mocku řídí `__overpass.mode`: "fixture" | "remark" | "empty" |
// "emptyOnce" | "http429" | "cors" | "hang"; počet volání je v `__overpass.calls`.

import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { readFileSync, mkdtempSync, existsSync, statSync, rmSync } from "node:fs";
import { join, resolve, extname, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const files = process.argv.slice(2);
if (!files.length) { console.error("Usage: node tests/run.mjs <scenario.json> [...]"); process.exit(2); }

// ---- Statický server nad složkou projektu ----
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".json": "application/json",
  ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".gpx": "application/gpx+xml", ".wav": "audio/wav" };
const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = join(ROOT, path === "/" ? "index.html" : path);
  if (!file.startsWith(ROOT) || !existsSync(file) || statSync(file).isDirectory()) { res.writeHead(404); res.end("not found"); return; }
  res.writeHead(200, { "Content-Type": TYPES[extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
  res.end(readFileSync(file));
});
await new Promise(r => server.listen(0, "127.0.0.1", r));
const BASE = `http://127.0.0.1:${server.address().port}/`;

// ---- Chrome přes DevTools protokol ----
const profile = mkdtempSync(join(tmpdir(), "addturngpx-test-"));
const port = 9400 + Math.floor(Math.random() * 500);
const chrome = spawn(process.env.CHROME || "google-chrome", ["--headless=new", `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`, "--no-first-run", "--disable-gpu", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
let wsUrl;
for (let i = 0; i < 75 && !wsUrl; i++) {
  await sleep(200);
  try { wsUrl = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find(t => t.type === "page")?.webSocketDebuggerUrl; } catch {}
}
if (!wsUrl) { console.error("Could not start Chrome (set CHROME=/path/to/chrome)."); process.exit(2); }
const ws = new WebSocket(wsUrl);
await new Promise(r => ws.addEventListener("open", r));
let id = 0; const pending = new Map(); const errors = [];
ws.addEventListener("message", (m) => {
  const msg = JSON.parse(m.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
  if (msg.method === "Runtime.exceptionThrown") errors.push(msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails.text);
});
const send = (method, params = {}) => new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send("Runtime.enable"); await send("Page.enable");

// Mock Overpass API — vloží se do každé načtené stránky dřív než aplikace
await send("Page.addScriptToEvaluateOnNewDocument", { source: `
  window.__overpass = { mode: "fixture", calls: 0, fixture: "tests/fixtures/vracov-overpass.json" };
  const realFetch = window.fetch.bind(window);
  window.fetch = (url, opts = {}) => {
    if (!String(url).includes("overpass")) return realFetch(url, opts);
    const o = window.__overpass; o.calls++;
    const json = (obj, status = 200) => Promise.resolve(new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json" } }));
    switch (o.mode) {
      case "fixture": return realFetch(o.fixture);
      case "remark":  return json({ elements: [], remark: "runtime error: Query timed out in \\"query\\" at line 1 after 90 seconds." });
      case "empty":   return json({ elements: [] });
      case "emptyOnce": o.mode = "fixture"; return json({ elements: [] });
      case "http429": return json({}, 429);
      case "cors":    return Promise.reject(new TypeError("Failed to fetch"));
      case "hang":    return new Promise((_, reject) => opts.signal?.addEventListener("abort", () => reject(new DOMException("aborted", "AbortError"))));
      default:        return Promise.reject(new TypeError("unknown mock mode"));
    }
  };` });

// ---- Scénáře ----
let pass = 0, fail = 0;
for (const f of files) {
  const steps = JSON.parse(readFileSync(f, "utf8"));
  console.log(`\n=== ${f}`);
  let view = { w: 1280, h: 800, mobile: false };
  for (const s of steps) {
    view = { w: s.w ?? view.w, h: s.h ?? view.h, mobile: s.mobile ?? view.mobile };
    await send("Emulation.setDeviceMetricsOverride", { width: view.w, height: view.h, deviceScaleFactor: 1, mobile: view.mobile });
    await send("Emulation.setTouchEmulationEnabled", { enabled: view.mobile, maxTouchPoints: view.mobile ? 5 : 1 });
    await send("Emulation.setEmulatedMedia", { features: [{ name: "pointer", value: view.mobile ? "coarse" : "fine" }] });
    if (s.nav !== undefined) { await send("Page.navigate", { url: BASE + s.nav }); await sleep(1500); }
    errors.length = 0;
    let value, evalError = null;
    if (s.eval) {
      const r = await send("Runtime.evaluate", { expression: `(async () => { ${s.eval} })()`, awaitPromise: true, returnByValue: true });
      if (r.result?.exceptionDetails) evalError = r.result.exceptionDetails.exception?.description || r.result.exceptionDetails.text;
      else value = r.result?.result?.value;
    }
    if (s.wait) await sleep(s.wait);
    const problems = [];
    if (evalError) problems.push("eval error: " + evalError.split("\n")[0]);
    for (const e of errors) problems.push("page exception: " + e.split("\n")[0]);
    for (const [k, exp] of Object.entries(s.expect || {})) {
      const got = value?.[k];
      if (JSON.stringify(got) !== JSON.stringify(exp)) problems.push(`${k}: expected ${JSON.stringify(exp)}, got ${JSON.stringify(got)}`);
    }
    if (problems.length) { fail++; console.log(`FAIL ${s.name}\n     ${problems.join("\n     ")}`); }
    else { pass++; console.log(`ok   ${s.name}`); }
    if (process.env.VERBOSE && value !== undefined) console.log("     " + JSON.stringify(value));
  }
}
console.log(`\n${pass} passed, ${fail} failed`);
ws.close(); chrome.kill(); server.close();
try { rmSync(profile, { recursive: true, force: true }); } catch {}
process.exit(fail ? 1 : 0);

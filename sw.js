// AddTurn GPX — service worker pro offline chod aplikace.
// Strategie: soubory aplikace (CORE_ASSETS) se servírují "cache-first" —
// aplikace naběhne hned i bez signálu nebo na síti, která se tváří jako
// připojená, ale neodpovídá (ve vlaku). Novou verzi přinese nový service
// worker: při každé změně se zvýší CACHE_NAME, prohlížeč při spuštění
// aplikace na pozadí zjistí změnu sw.js, nový worker stáhne čerstvé soubory
// do nové cache a převezme stránku; ta pak nabídne "New version available –
// Reload". Ostatní soubory ze stejného originu jdou "network-first" s časovým
// limitem, po kterém se použije cache (a stahování dál aktualizuje cache).
// Mapové dlaždice a GPX stahované z cizích URL jdou mimo service worker
// přímo na síť, aby cache nerostla bez omezení.

// Na originu dushino.github.io běží i další aplikace (OK Trainer) se společným
// úložištěm cache, proto se při aktivaci mažou jen cache s touto předponou.
const CACHE_PREFIX = "addturngpx-";
const CACHE_NAME = CACHE_PREFIX + "v40";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./vendor/leaflet/leaflet.js",
  "./vendor/leaflet/leaflet.css",
  "./vendor/leaflet/images/layers.png",
  "./vendor/leaflet/images/layers-2x.png",
  "./vendor/leaflet/images/marker-icon.png",
  "./vendor/leaflet/images/marker-icon-2x.png",
  "./vendor/leaflet/images/marker-shadow.png"
];
const CORE_URLS = new Set(CORE_ASSETS.map((a) => new URL(a, self.location).href));
const SHELL_URL = new URL("./index.html", self.location).href;
const NETWORK_TIMEOUT_MS = 3000;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      // cache: "reload" — nebrat soubory z HTTP cache prohlížeče (mohly by být staré)
      .then((cache) => cache.addAll(CORE_ASSETS.map((a) => new Request(a, { cache: "reload" }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k.startsWith(CACHE_PREFIX) && k !== CACHE_NAME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Network-first s časovým limitem: když síť do NETWORK_TIMEOUT_MS neodpoví
// a v cache je starší kopie, vrátí se kopie; stahování pokračuje na pozadí
// a uloží do cache novou verzi.
function networkFirst(event, cache) {
  const network = fetch(event.request).then((response) => {
    if (response.ok) return cache.put(event.request, response.clone()).then(() => response);
    return response;
  });
  event.waitUntil(network.catch(() => {}));
  return cache.match(event.request).then((cached) => {
    if (!cached) return network;
    const timeout = new Promise((resolve) => setTimeout(() => resolve(cached), NETWORK_TIMEOUT_MS));
    return Promise.race([network.catch(() => cached), timeout]);
  });
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const page = url.origin + url.pathname;
  const shell = request.mode === "navigate" && (page === SHELL_URL || page === new URL("./", self.location).href);
  const core = shell || CORE_URLS.has(page);

  event.respondWith(caches.open(CACHE_NAME).then((cache) => {
    if (core) {
      // Soubory aplikace: cache-first (index.html i s ?url=… z odkazu)
      return cache.match(shell ? SHELL_URL : page).then((cached) => cached || networkFirst(event, cache));
    }
    const response = networkFirst(event, cache);
    // Navigace bez sítě a bez kopie v cache → aspoň aplikace
    return request.mode === "navigate"
      ? response.catch(() => cache.match(SHELL_URL).then((cached) => cached || Promise.reject(new TypeError("offline"))))
      : response;
  }));
});

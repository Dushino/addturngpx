# AddTurn GPX – pokyny pro Claude

Tento soubor Claude Code načte automaticky na začátku každé konverzace. Podrobnosti
jsou v `docs/dev/`; tady je jen to, co je potřeba vědět hned.

## Pravidla spolupráce (stanovil uživatel)
- **Claude nikdy sám neprovádí git operace, které mění stav** (commit, push, add,
  branch, stash…). Commit a push dělá uživatel; Claude na konci cyklu navrhne
  commit zprávu. Čtení (`git status`, `git diff`, `git log`) jen pro orientaci.
- Práce v cyklech po featurách: vyjasnění specifikace → implementace → test →
  oprava chyb → **čekat na potvrzení uživatele**, než se jde dál.
- Při jakékoli nejasnosti se zeptat **před** dalším krokem.
- Komunikace s uživatelem **česky**; UI aplikace je **jen anglicky**.
- Claude vede poznámky v `docs/dev/` (česky):
  - `RULES.md` – pravidla, `DESIGN.md` – design a všechna zjištění o Suuntu,
  - `PROGRESS.md` – tabulka cyklů a deník, `TODO.md` – úkoly a čekající testy.
- README existuje ve dvou jazycích: `README.md` (EN) a `README-CZ.md` (CZ) – měnit oba.

## Projekt
- Webová aplikace jen v prohlížeči (bez serveru) pro přidávání/editaci/mazání
  waypointů v GPX nad mapou (Leaflet 1.9.4 ve `vendor/`, OSM / OpenTopoMap / Esri).
  Vzor: https://github.com/Dushino/OK-Trainer – jeden `index.html`, vanilla JS,
  bez build kroku, PWA (`manifest.json`, `sw.js` network-first).
- Hosting: GitHub Pages (https://github.com/Dushino/addturngpx).
- **Účel:** doplnit do tras pro hodinky Suunto waypointy s ikonami odboček, aby hodinky
  ukazovaly vzdálenost k další odbočce. Waypoint Suunto načte jen tehdy, když má
  souřadnice textově shodné s některým `rtept`/`trkpt` (nebo bod trasy sám má name/type).
- **Výstup vždy ve formátu exportu z mobilní aplikace Suunto** („test51“, creator
  „Sports Tracker“); soubory odjinud se převádějí při otevření (cyklus 17).
  Soubory už v tomto formátu se upravují textově bajt po bajtu.
- Při každé změně souborů aplikace zvýšit verzi v `CACHE_NAME` v `sw.js` (předponu `addturngpx-` neměnit – na originu běží i OK Trainer). Od cyklu 24 je to nutné: soubory aplikace jsou cache-first, bez nové verze `sw.js` se změna k uživatelům nedostane.

## Testování
- Uživatel testuje na GitHub Pages (sám pushuje) a na hodinkách **Suunto Race 2**.
- Automatické testy (headless Chrome, Overpass je mockovaný):
  `node tests/run.mjs tests/tiles.json tests/generator.json tests/editing.json tests/clicks.json tests/categories.json tests/planner.json tests/offline.json`
  – viz `tests/README.md`.
- Lokálně jen přes http server, ne `file://` (OSM dlaždice bez Refereru vrací 403).
- **Past:** server nikdy nespouštět a nehledat/zabíjet (`pkill -f`, `ps|grep`) v tomtéž
  Bash příkazu – najde to i vlastní shell a zabije ho (exit 144). Spouštět a zastavovat
  v samostatných voláních.
- Overpass blokuje User-Agent HeadlessChrome/curl.

## Reference
- Specifikace formátu tras Suunto: https://apizone.suunto.com/route-description
  (analýza v `docs/dev/DESIGN.md`).

## Aktuální stav (2026-10-30)
- Cykly 17–24 potvrzeny (u 17, 18 a 21 jsou podle uživatele možné pozdější změny). Testy 139/139.
- Cyklus 24 (start bez signálu: cache-first + lišta „New version available – Reload“, v34) potvrzen. Stejná oprava v OK Traineru (`../OK-Trainer`, v7) potvrzena a commitnuta. Start při pomalých / žádných datech uživatel ověří později (u obou aplikací).
- **Testy na hodinkách odloženy (rozhodnutí uživatele 2026-10-30):** odbočka (TbT) se do pole
  „k místu zájmu / waypointu“ dostane jen v dosahu notifikace (~20 m), POI trvale, ale bez šipky
  (fórum Suunto, DESIGN.md → „Fórum Suunto a odpověď supportu“). Chování je skryté, uživatel
  počká na nový firmware a pak vše vyzkouší znovu; do té doby pokusy jen příležitostně při běhu.
  **V AddTurn zatím nic neměnit** – formát výstupu ani postup v README. Otevřené testy (T0–T8)
  a nápady (režim „odbočky jako POI“, dvojitý bod odbočka + `Crossroads`) v `docs/dev/TODO.md`.
- **Plánovač tras (rozhodnutí uživatele 2026-10-30):** GraphHopper s vlastním API klíčem každého
  uživatele (ne BRouter/Valhalla, ne sdílený klíč), nezávisle na testech na hodinkách. Výstup dál
  formát test51. Viz `docs/dev/DESIGN.md` → „Rozhodnutí: GraphHopper s vlastním klíčem“. Cykly 25–26 potvrzeny,
  cyklus 27 (dotyk, „Back to start“, přepínač `?planner=1` odstraněn, README, v40) potvrzen uživatelem (2026-10-30; bude dál zkoušet).

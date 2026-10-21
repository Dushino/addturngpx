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
- Při každé změně souborů aplikace zvýšit `CACHE_NAME` v `sw.js`.

## Testování
- Uživatel testuje na GitHub Pages (sám pushuje) a na hodinkách **Suunto Race 2**.
- Automatické testy (headless Chrome, Overpass je mockovaný):
  `node tests/run.mjs tests/tiles.json tests/generator.json tests/editing.json tests/clicks.json tests/categories.json`
  – viz `tests/README.md`.
- Lokálně jen přes http server, ne `file://` (OSM dlaždice bez Refereru vrací 403).
- **Past:** server nikdy nespouštět a nehledat/zabíjet (`pkill -f`, `ps|grep`) v tomtéž
  Bash příkazu – najde to i vlastní shell a zabije ho (exit 144). Spouštět a zastavovat
  v samostatných voláních.
- Overpass blokuje User-Agent HeadlessChrome/curl.

## Reference
- Specifikace formátu tras Suunto: https://apizone.suunto.com/route-description
  (analýza v `docs/dev/DESIGN.md`).

## Aktuální stav (2026-10-21)
- Cykly 17 (převod do formátu test51 při otevření), 18 (editace názvu trasy) a 20 (karta
  generátoru: Turns generator / Generate turns) jsou implementované, testy 80/80;
  cyklus 19 (křižovatky z vektorových dlaždic) potvrzen. Cykly 17, 18, 20
  **čekají na potvrzení uživatele**.
- Rozhoduje se, co přesně hodinky potřebují. Funkční trasa „test51 test1“ (kopie
  v aplikaci Suunto + waypointy přidané v editoru aplikace, sdílená odkazem) je
  v `samples/_FUNKCNI/` i s fotkami. **Čekají testy T0–T5 na hodinkách** – seznam
  v `docs/dev/TODO.md` → „Testy na hodinkách“. Do jejich výsledků neměnit formát výstupu
  ani doporučený postup v README.

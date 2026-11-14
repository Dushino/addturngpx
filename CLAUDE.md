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
- **Výstup ve formátu Suunto Routeplanner** (cyklus 44, rozhodnutí uživatele 2026-11-11,
  podle vzoru – viz DESIGN.md), sestavený celý při uložení. Uvnitř aplikace se dál pracuje
  se strukturou exportu z mobilní aplikace Suunto („test51“, `creator="AddTurn gpx 1.0"`, cyklus 29). Všechny
  ostatní soubory včetně exportu ze Suunta se převádějí při otevření (cyklus 17); pracovní
  text ve formátu test51 se upravuje textově, soubor se při uložení sestaví celý znovu.
- Při každé změně souborů aplikace zvýšit verzi v `CACHE_NAME` v `sw.js` (předponu `addturngpx-` neměnit – na originu běží i OK Trainer). Od cyklu 24 je to nutné: soubory aplikace jsou cache-first, bez nové verze `sw.js` se změna k uživatelům nedostane.

## Testování
- Uživatel testuje na GitHub Pages (sám pushuje) a na hodinkách **Suunto Race 2**.
- Automatické testy (headless Chrome, Overpass je mockovaný):
  `node tests/run.mjs tests/tiles.json tests/generator.json tests/editing.json tests/clicks.json tests/categories.json tests/planner.json tests/settings.json tests/shared.json tests/routeedit.json tests/passes.json tests/snap.json tests/offline.json`
  – viz `tests/README.md`.
- Lokálně jen přes http server, ne `file://` (OSM dlaždice bez Refereru vrací 403).
- **Past:** server nikdy nespouštět a nehledat/zabíjet (`pkill -f`, `ps|grep`) v tomtéž
  Bash příkazu – najde to i vlastní shell a zabije ho (exit 144). Spouštět a zastavovat
  v samostatných voláních.
- Overpass blokuje User-Agent HeadlessChrome/curl.

## Reference
- Specifikace formátu tras Suunto: https://apizone.suunto.com/route-description
  (analýza v `docs/dev/DESIGN.md`).

## Aktuální stav (2026-10-31)
- Cykly 17–24 potvrzeny (u 17, 18 a 21 jsou podle uživatele možné pozdější změny). Testy 222/222.
- Cyklus 24 (start bez signálu: cache-first + lišta „New version available – Reload“, v34) potvrzen. Stejná oprava v OK Traineru (`../OK-Trainer`, v7) potvrzena a commitnuta. Start při pomalých / žádných datech uživatel ověří později (u obou aplikací).
- **Testy na hodinkách odloženy (rozhodnutí uživatele 2026-10-30):** odbočka (TbT) se do pole
  „k místu zájmu / waypointu“ dostane jen v dosahu notifikace (~20 m), POI trvale, ale bez šipky
  (fórum Suunto, DESIGN.md → „Fórum Suunto a odpověď supportu“). Chování je skryté, uživatel
  počká na nový firmware a pak vše vyzkouší znovu; do té doby pokusy jen příležitostně při běhu.
  Pokyn „nic neměnit“ uživatel 2026-10-31 zrušil cyklem 29 (vlastní creator a konce řádků, v42),
  import do aplikace Suunto potvrzen, výsledek na hodinkách se čeká. Otevřené testy (T0–T8) a nápady (režim „odbočky jako POI“, dvojitý bod odbočka + `Crossroads`) v `docs/dev/TODO.md`.
- Settings je hotové a potvrzené (cyklus 31, drawer zprava). Uspořádání otevření / importu souboru uživatel 2026-10-31 odložil: po úpravě lišty pro malé displeje není potřeba.
- **Cyklus 32 (2026-11-01; Android potvrzen 2026-11-03, počítač čeká na test):** otevření GPX ze systému bez nativní aplikace: Android přes *Sdílet* (`share_target`, v48), počítač přes *Otevřít v programu* (`file_handlers`). Do seznamu „Otevřít v aplikaci“ na Androidu se PWA nedostane; Android obálku (TWA) uživatel zatím nechce. Testy 180/180.
- **Cyklus 33 (2026-11-01):** „This app is already installed“ / „Could not open app“ při instalaci druhé aplikace z `dushino.github.io` chyba Chrome 154–156 sice existuje, ale **nebyla celá příčina**. Vyřešeno 2026-11-06 (commit uživatele 571932a): absolutní `start_url` a `scope` (`/addturngpx/…`) v `manifest.json`, jako má OK Trainer; pak šla instalace obou i na tabletu. Při podobných potížích nejdřív zkontrolovat manifesty (absolutní `id`, `start_url`, `scope`) a po změně manifestu zvýšit `CACHE_NAME`. Viz DESIGN.md → „Instalace vedle dalších PWA“.
- **Cyklus 34 (2026-11-05):** Turns in advance – odbočky z generátoru X m před křižovatkou na novém bodu trasy, zkrácené za předchozí křižovatku, výchozí 0 m (v50); oprava rozcestí a bariéry předstihu po testu uživatele (v51); U-turn na otočkách mimo křižovatky (v52). Čeká na test uživatele, na hodinkách T10.
- **Cyklus 35 (2026-11-05):** Edit route – posun, smazání a vložení bodů trasy mimo plánovač (v53), mezikrok k editaci s přeplánováním (cíl uživatele). Potvrzeno uživatelem.
- **Cyklus 36 (2026-11-05):** Follow roads v Edit route – úsek mezi sousedními waypointy (max. 500 m) se přeplánuje přes GraphHopper (v54). Potvrzeno uživatelem i se skutečným GraphHopperem.
- **Cyklus 37 (2026-11-05):** zjednodušení – Generate turns jedním tlačítkem (jako Replace all turns, hned zapsat), karta generátoru zrušena, atribuce v mapě, Clear road data v Settings (v55). Potvrzeno uživatelem.
- **Cyklus 38 (2026-11-05):** editor waypointu bez Position on route (Previous / Next point), Snap to nearest route point u waypointu mimo trasu zůstává (v56). Potvrzeno uživatelem.
- **Cyklus 39 (2026-11-05):** pokyny podle tvaru křižovatky (pravidla v DESIGN.md), jedna funkce pro generátor i nápovědu v editoru, Minimum angle zrušeno, Straight on generuje a nahrazuje generátor (v57). Čeká na test uživatele.
- **Cyklus 40 (2026-11-05):** volba průchodu pro waypoint na místě, kudy trasa vede víckrát (dialog, Pass v editoru, vlastní bod 1 m před místem, když pořadí nestačí), v61. Potvrzeno uživatelem.
- **Cyklus 41 (2026-11-07):** Edit route – klik bod vybere (smazání Remove / Delete), průchozí body (ručně upravené body a body z plánovače) jako kotvy přeplánování, v63. Potvrzeno uživatelem.
- **Cyklus 42 (2026-11-09):** úhel odbočky z větví křižovatky na mapě (`mapTurn`), ne z čáry trasy (v64). Implementováno na Windows PC bez Node.js; testy na Linuxu 220/220 (2026-11-10), oprava ověřena uživatelem.
- **Cyklus 43 (2026-11-10):** úzké rozcestí (track a pěšina 9° od sebe) se už neslučuje do jedné větve: větve pod 10° se sloučí jen tehdy, když čáry leží přes sebe (do 1,5 m v 5, 10, 20 a 30 m od křižovatky), v65. Potvrzeno uživatelem.
- **Cyklus 44 (2026-11-11):** výstup **ve formátu Suunto Routeplanner** podle vzoru od uživatele (hlavička Routeplanneru, skupiny wpt s komentáři, ke každé odbočce „Waypoint N“ na stejných souřadnicích, `waypointIndices`, wpt bez ele), sestavený znovu při uložení; uvnitř dál test51 (v66). Bez automatických testů (Windows PC) – testy kontrolující uložený text na Linuxu upravit; čeká na test na hodinkách.
- **Cyklus 45 (2026-11-11):** pokyn jen na křižovatce, kterou trasa projíždí (čára do 5 m, trasa po některé větvi), **přímo v ní** (průmět, případně nový bod trasy; předstih od ní); směry větví v 5/10/20 m, rozhoduje největší úhel; oprava „T“ v přesahu dlaždice (v67); šipka odbočky natočená podle příjezdu měřeného 15 m zpět (v68). Bez automatických testů (Windows PC), ověřeno v headless Chrome; čeká na test uživatele.
- **Cyklus 46 (2026-11-12):** Fork sensitivity a Bear sensitivity v Settings (Low / Normal / High = 40 / 60 / 75° pro „podobnou“ větev); ostřejší větev při ohybu řídí jen Bear, ostatní větve jen Fork, Turn a Straight on dál 60° (v69). Bez automatických testů (Windows PC), ověřeno v headless Chrome; čeká na test uživatele.
- **Cyklus 47 (2026-11-13):** větev, po které trasa přijíždí / odjíždí, se vybírá podle směru trasy v 10 a 20 m od křižovatky (`routeBranches`), ne jedním úhlem z okna 15 m – oprava Keep right → Keep left (Brno 2026-11-13), v70. Porovnáno v headless Chrome na 8 trasách; potvrzeno uživatelem (i Okruh 12 km), testy na Linuxu čekají.
- **Cyklus 48 (2026-11-13):** výstup bez doprovodných „Waypoint N“ k odbočkám (rozhodnutí uživatele: bez vlivu), *Route waypoints* jen body zájmu, v71. Čeká na potvrzení; testy kontrolující uložený text upravit na Linuxu.
- **Cyklus 49 (2026-11-13):** Settings → Saved file → *Add a Crossroads waypoint at every turn* (výchozí vypnuto): při uložení hned za každou odbočku `<wpt>` typu Crossroads se stejným názvem a polohou, při otevření se zahodí jen ze skupiny Turn guidance waypoints, uživatelova Crossroads v Route waypoints zůstává (v73). Pokus uživatele pro pole vzdálenosti k POI, čeká na test na hodinkách.
- **Cyklus 50 (2026-11-13):** Settings → Saved file → *Write waypointIndices* (výchozí vypnuto = sekce se nezapíše); zapnuto = indexy Begin, všech odboček, bodů zájmu a End (v74). Čeká na potvrzení; testy kontrolující uložený text upravit na Linuxu.
- **Cyklus 51 (2026-11-13):** klička – dva pokyny na opačné strany blíž než rozestup a trasa za nimi do 30° od původního směru: oba, dá-li se splést (cesta rovně z první křižovatky nebo rozcestí), jinak žádný (v75). Pokus; čeká na test uživatele a testy na Linuxu. Hranice `JUNCTION_LINE_M` 5 m po měření ponechána, směry 10/20/30 m nerozhodnuto.
- **Cyklus 52 (2026-11-13):** Crossroads na stejném místě (cyklus 49) bez efektu → Crossroads vytváří generátor, přesně X m po trase zpět od waypointu každé vygenerované odbočky, bez zkracování (Settings → Generate turns → *Add a Crossroads waypoint at every turn*, *Crossroads in advance*), v souboru ve skupině Turn guidance waypoints v pořadí podle trasy, v editoru vidět, Replace je nahradí (v77). Čeká na test na hodinkách.
- **Regresní testy na Linuxu (2026-11-14):** po cyklech 44–52 z Windows 190/222, žádná chyba aplikace; sady upraveny na nový formát a chování (fixtures `saved-*.gpx` v uloženém formátu, `addturn-*.gpx` = starší test51), doplněny testy exportu, waypointIndices a Crossroads z generátoru → **229/229**. Chybí vlastní testy pravidel cyklů 45, 46 a 51 (TODO).
- **Cyklus 53 (2026-11-14):** vygenerované Crossroads na mapě menší, potlačené a pod ostatními značkami, při předstihu 0 m jen odznak na ikoně odbočky, v seznamu „generated“; ruční úprava (název, typ, přesun) z ní udělá uživatelův bod (v78). Testy 232/232. Čeká na test uživatele.
- **Cyklus 54 (2026-11-14):** Crossroads je odbočce podřízená: žádná (ani uživatelova) nebrání generovaným odbočkám; vygenerovaná se nevytvoří do 20 m (`CROSS_FIELD_M`, včetně) po trase za předchozím waypointem (odbočka, bod zájmu, uživatelova Crossroads, Begin) ani před ním – hodinky na posledních 20 m ukazují vzdálenost k odbočce samy (v79). Testy 236/236. Čeká na test uživatele.
- **Cyklus 55 (2026-11-14):** seznam waypointů ukazuje u každé položky vzdálenost od startu po trase, od předchozí odbočky, od předchozího waypointu, který není odbočka (`---`, když žádný; Begin/End se nepočítají), a výšku (`wptMetrics`, v80). Testy 237/237. Čeká na test uživatele.
- **Cyklus 56 (2026-11-14):** waypointy do 20 m od čáry trasy se při každém otevření souboru (i vlastního výstupu) přesunou na nejbližší místo na čáře (bod trasy do 1 m, jinak nový bod), jeden krok Undo, Settings → *Opening a file* (0 = vypnuto); *Snap to the route* a Follow roads stejně; body mimo trasu červeně (v81). Testy 248/248. Čeká na test uživatele. **Další krok:** přichycení importované GNSS trasy (UTMB) k mapě – specifikaci vyjasnit.
- **Plánovač tras (rozhodnutí uživatele 2026-10-30):** GraphHopper s vlastním API klíčem každého
  uživatele (ne BRouter/Valhalla, ne sdílený klíč), nezávisle na testech na hodinkách. Výstup dál
  formát test51. Viz `docs/dev/DESIGN.md` → „Rozhodnutí: GraphHopper s vlastním klíčem“. Cykly 25–26 potvrzeny,
  cyklus 27 (dotyk, „Back to start“, přepínač `?planner=1` odstraněn, README, v40) potvrzen uživatelem (2026-10-30; bude dál zkoušet).

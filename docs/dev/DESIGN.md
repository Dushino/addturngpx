# addturngpx – design

## Cíl
Webová aplikace běžící čistě v prohlížeči (bez serveru), která nad mapou umožní
přidávat, upravovat a mazat **waypointy (`<wpt>`)** v souboru GPX – typicky
body s pokyny k odbočení pro navigaci. Trasa (`<trk>`/`<rte>`) se jen zobrazuje
a ukládá beze změny.

**Hlavní použití: soubory ze Suunto mobilní aplikace.** Uživatel trasu sdílí
a dostane odkaz typu
`https://api.sports-tracker.com/apiserver/v2/routes/export/<id>?brand=SUUNTOAPP&format=gpx-route`.

## Suunto GPX – zjištěná fakta
- API `api.sports-tracker.com` **povoluje CORS** (zrcadlí `Origin`, ověřeno pro github.io i localhost) → import z URL funguje přímo v prohlížeči.
- `Content-Disposition: filename="…"` posílá, ale nezpřístupní (chybí `Access-Control-Expose-Headers`) → název souboru bereme z `<metadata><name>`.
- GPX 1.1, `creator="Sports Tracker"`, `<?xml … standalone="no"?>`. Čára je **`<rte>`/`<rtept>`** (ne trk).
- Waypointy: `<ele>`, volitelně `<name>`, `<desc>`, a **`<type>`** = druh pokynu (např. `Sharp_right_turn`). `<name>` může chybět.
- Začátek/konec jsou waypointy `<type>Begin</type>` / `<type>End</type>` (desc „Auto-generated“) → zobrazit jako S/F, **needitovat**.
- Pořadí v souboru: metadata, všechny wpt, pak rte. Ukázka: `samples/example_from_suunto.gpx`.
- Pozorováno: dva waypointy (`Waypoint1` a bezejmenný) téměř na stejném místě (rozdíl ~0,5 m) — na mapě se překrývají.

Oficiální popis formátu tras: https://apizone.suunto.com/route-description — analýza viz níže („Suunto specifikace – analýza“).

### Typy navigačních pokynů (`<type>`, přesné znění podle Suunto, od uživatele)
| `<type>` | Význam |
|---|---|
| `Left_turn` | odbočit vlevo |
| `Right_turn` | odbočit vpravo |
| `Sharp_left_turn` | ostře vlevo |
| `Sharp_right_turn` | ostře vpravo |
| `Slight_left_turn` | mírně vlevo (bear left) |
| `Slight_right_turn` | mírně vpravo (bear right) |
| `Left_at_fork_turn` | na rozcestí vlevo |
| `Right_at_fork_turn` | na rozcestí vpravo |
| `Straight_turn` | rovně |
| `U_turn` | otočit se |
| `Begin` / `End` | začátek / konec trasy (automaticky, needitovat) |

### Kdy Suunto waypoint při importu načte (od uživatele, podle správce fóra)
- Waypoint vznikne **jen** ze dvou zdrojů:
  1. `<wpt>`, který má **stejné souřadnice jako některý `rtept`/`trkpt`**, nebo
  2. přímo `rtept`/`trkpt`, který obsahuje `<name>` nebo `<type>`.
- Shoda souřadnic je hlavní důvod, proč Suunto z většiny GPX waypointy nenačte.
- Chybí `name`, ale `type` je → waypoint bez názvu. Chybí `type`, ale `name` je → waypoint typu „Waypoint“.
- V `example_from_suunto.gpx` to platí: každý wpt má lat/lon textově shodné s některým `rtept` (Waypoint1 = rtept 3, bezejmenný = rtept 4, Begin = první, End = poslední).
- **Důsledek pro editor:** nový/přesunutý wpt musí dostat souřadnice přesně (textově) zkopírované z existujícího `rtept`/`trkpt` → přichytávání (snap) na body trasy. Kontrolovat a varovat u wpt, které na žádném bodu trasy neleží.
- Shoda se dá využít i pro natočení ikony: wpt = vrchol k trasy → příchozí směr = úsek (k−1 → k).

## Skutečný cíl uživatele (upřesněno 2026-10-18)
- Hodinky Suunto (ani aplikace Suunto / Suunto Routeplanner) **nesmí poznat, že waypoint je navigační instrukce** (turn-by-turn) — s instrukcemi pracují jinak. Waypoint má být „obyčejný POI“ jen se správnou ikonou odbočky, aby hodinky na displeji ukazovaly **vzdálenost k dalšímu POI**.
- Ověřeno v praxi (test51.gpx z mobilní aplikace Suunto): waypointy s typy `*_turn` se hlásí jako POI s ikonou a pole „vzdálenost k dalšímu POI“ funguje — v hodinkách vypnutá navigace po trase, zapnutá upozornění na POI.
- **Analýza waypointIndices (2026-10-18):** čisté exporty Routeplanneru (`Vracov 5km.gpx`: Begin+End; `test63.gpx`: Begin, End + 3 ručně přidané „Route waypoints“) mají v seznamu všechny své wpt; instrukce („Turn guidance waypoints“) jsou v seznamu jen v souborech, které **přepsala naše aplikace** (cyklus 9 skládá seznam ze všech wpt) → nelze rozhodnout, zda Routeplanner instrukce do seznamu dává. **Nové zjištění:** v `test63` má každý ručně přidaný waypoint **ztrojený bod trasy** (rtept 2,3,4 se stejnými souřadnicemi), instrukce „Turn left“ leží na jediném rtept. Možné rozlišovací znaky: (1) členství v waypointIndices, (2) ztrojený rtept. Potřeba: čistý export Routeplanneru (nikdy neotevřený v AddTurn) s instrukcemi i ručním waypointem.
- **Referenční funkční soubor `samples/test51.gpx`** (historie gitu): v1 (e5f8999, 16. 10. 18:13) = čistý export z mobilní aplikace Suunto přes sdílený odkaz (`creator="Sports Tracker"`, 8 rtept, bez komentářů / waypointIndices / zdvojení; wpt Begin, „Turn sharp right“ `Sharp_right_turn`, End); v2 (7f36bca, 19:05) = tentýž soubor + 1 wpt `Straight_turn` přidaný AddTurn GPX (rtept 1, ele zkopírovaná), jinak bajtově shodný → **v hodinkách funguje** (foto: ikona ostře vpravo + vzdálenost k POI). Závěr: cesta „mobilní aplikace Suunto → sdílený odkaz → AddTurn → import“ funguje; typ/název odbočky sám o sobě z bodu instrukci nedělá.
- **POTVRZENO čistým exportem Routeplanneru (2026-10-18, `tests/fixtures/routeplanner-guidance-and-waypoints.gpx`):** `waypointIndices` obsahuje Begin/End a **ručně přidané waypointy** („Route waypoints“, uživatel potvrdil, že je naklikal), **ne** automatické instrukce („Turn guidance waypoints“ – Turn right…). Ručně přidaný waypoint má **zdvojený rtept** (v test63 ztrojený) a leží hned za instrukcí na téže křižovatce; instrukce leží na jediném rtept. Zda seznam/zdvojení čte aplikace Suunto či hodinky, není známo (test uživatele běží).
- **Úprava `syncSuuntoIndices` (2026-10-18):** waypointy, které před úpravou v seznamu nebyly (instrukce Routeplanneru), se do něj nepřidávají; nové body aplikace se zapisují do seznamu (= waypoint, v souladu s cílem uživatele); přesunutý / přetypovaný bod se bere jako uživatelův (podpis = lat, lon, type). Zdvojování rtept zatím ne (rozhodnutí uživatele: počkat na test).
- Otevřená otázka: soubory ze **Suunto Routeplanner** (komentáře, `creator`, `suunto-rp:waypointIndices`, vlastní „Turn guidance waypoints“ s názvem „Turn left“) — nepřepnou hodinky/aplikaci do režimu instrukcí? Uživatel testuje „Vracov_3.6km - edit.gpx“ s odstraněnými odkazy na Routeplanner.

## Rozhodnutí
| Téma | Rozhodnutí | Důvod |
|---|---|---|
| Hosting | GitHub Pages, stejně jako OK-Trainer | zadání |
| Architektura | jeden `index.html`, vanilla JS, žádný build krok | jako OK-Trainer, jednoduchá údržba |
| Offline | PWA: `manifest.json` + `sw.js` (network-first, cache jako záloha) | jako OK-Trainer |
| Mapová knihovna | Leaflet, uložený lokálně v repu (`vendor/leaflet/`) | malá, osvědčená, funguje offline (kromě dlaždic) |
| Mapový podklad | OpenStreetMap dlaždice, bez credentials, s povinnou atribucí | zadání (OSM preferováno) |
| Editované body | jen waypointy `<wpt>` | rozhodnutí uživatele |
| Import z URL | přímý `fetch`; při selhání (CORS/síť) srozumitelná hláška + nabídka otevřít lokální soubor | rozhodnutí uživatele, žádné cizí servery |
| Jazyk UI | pouze angličtina | rozhodnutí uživatele |
| Mobil/desktop | CSS media queries (`pointer: coarse`, šířka okna), ne User-Agent | spolehlivější, reaguje i na změnu velikosti okna |
| Tmavý/světlý režim | `prefers-color-scheme`, CSS proměnné; mapa a její ovládací prvky zůstávají vždy světlé | zadání + rozhodnutí uživatele |
| Název | AddTurn GPX | rozhodnutí uživatele |
| Mobilní breakpoint | `(max-width: 760px), (pointer: coarse) and (max-height: 500px)` — stejný výraz v CSS i JS (`mobileQuery`) | tablet dostane desktop rozložení |
| Spouštění | jen přes http(s); přes `file://` OSM dlaždice blokuje (chybí Referer) → aplikace zobrazí upozornění | OSM tile usage policy |
| Service worker | cachuje jen stejný origin; dlaždice a cizí URL jdou přímo na síť | cache neroste bez omezení |
| Otevření souboru | File System Access API (`showOpenFilePicker`, drží handle pro pozdější uložení zpět), jinak `<input type=file>`; drag & drop (Chrome dá i handle) | cyklus 2 |
| Model dat | **původní text souboru** se drží beze změny (`gpx.text`), DOM (DOMParser) jen ke čtení. Při uložení se v textu nahradí jen úseky jednotlivých `<wpt>…</wpt>`, zbytek zůstane bajt po bajtu stejný. Nepoužívat XMLSerializer (mění deklaraci, prázdné elementy, formátování). Dekódování přes `TextDecoder(ignoreBOM)` — BOM se zachová. | požadavek uživatele: naprosto přesně zachovat formát |
| Editace – text | změny jen v textu souboru: `scanChildren` (tokenizer), `setAttrText`, `setChildText` (pořadí potomků dle schématu GPX 1.1, odsazení převzato od sousedů), `insertWptText`, `deleteWptText` (odsazení řádku jen když element zabírá celý řádek), `moveWptText` (přesun mezi „sloty“ — mezery mezi wpt zůstanou na místě); nový wpt ve stylu existujícího wpt (`buildWptXml`) | přesné zachování formátu |
| Editace – pravidla | wpt vždy na bod trasy (lat/lon zkopírované textově; `<ele>` se k novým wpt **nepřidává** — rozhodnutí uživatele 2026-10-18, při přesunu se aktualizuje jen existující); pořadí wpt v souboru = pořadí na trase; Begin/End a body z trasy needitovatelné; soubor, kde tokenizer nenajde stejné wpt jako DOM → editace vypnuta | Suunto import + bezpečnost |
| Vložení bodu trasy (cyklus 6) | **změna rozhodnutí uživatele (2026-10-16, potvrzen výklad A):** POI může být kdekoli, proto se na dlouhém úseku vloží nový rtept/trkpt přímo na čáru (tvar trasy beze změny). Klepnutí do 40 px od čáry: existující bod do 12 px → použít ho, jinak vložit nový. Souřadnice na čáře, desetinná místa jako sousedé (min. 6), `ele` (a u trkpt `time`) interpolované, styl zápisu od souseda, bez name/type. Smazání/přesun wpt vložený bod ponechá. ◀/▶ jen po existujících bodech. | dotaz uživatele: „můžeme přidat jakýkoliv typ POI“ |
| Návrh typu | úhel příjezd/odjezd měřený na ~15 m: ≤15° rovně, ≤45° mírně, ≤135° odbočka, ≤170° ostře, jinak U-turn | rozhodnutí uživatele |
| Undo/Redo | zásobníky textů v paměti (Ctrl+Z / Ctrl+Y / Ctrl+Shift+Z), po načtení nového souboru se mažou; „Modified“ = text ≠ text načtený ze souboru | rozhodnutí uživatele |
| Tažení značek | jen bez dotyku (`not (pointer: coarse)`), po puštění přichycení ≤60 px, jinak návrat | na dotyku by kolidovalo s posunem mapy |
| Pořadí seznamu | podle polohy podél trasy; Begin první, End poslední; bez trasy pořadí v souboru | přirozené pro jezdce (dotaz uživatele) |
| Begin/End | wpt s `<type>Begin/End</type>` = značky S/F, v seznamu „not editable“; odvozené S/F z čáry jen pokud je soubor nemá | požadavek uživatele |
| Odkaz `?url=` | otevře GPX z URL při startu, pak se parametr z adresního řádku odstraní (reload pak obnoví uloženou relaci, ne původní soubor) | rozhodnutí uživatele |
| GitHub odkazy | `github.com/…/blob/…` se automaticky převede na `raw.githubusercontent.com` | raw povoluje CORS |
| Relace | IndexedDB `addturngpx`/`session`, klíč `current`: {xml (= původní text), fileName, sourceUrl, handle, savedAt} — obnoví se po reloadu | rozhodnutí uživatele |
| Zobrazení trasy | `<trk>` plná modrá čára s bílým lemem; `<rte>` stejně, jen vedle tracku fialová přerušovaná; šipky směru (vlastní implementace, ~110 px rozestup, jen ve výřezu); značky start/cíl | rozhodnutí uživatele |
| Testovací data | `samples/` v repu | rozhodnutí uživatele |
| Ikony bodů zájmu | podmnožina Tabler Icons 3.19.0 (MIT, licence `vendor/tabler-icons/LICENSE`) vložená přímo do `POI_TYPES` v index.html; vlastní: Hill, Valley, Waterfall, Rock, Marine_mammals | jednotný styl, offline, bez závislosti |
| Git | Claude neprovádí žádné git operace | pravidlo uživatele |

## Otevřené otázky
- Které atributy waypointu editovat (name, desc, sym, type, ele…)? → cyklus editace
- Ukládání: File System Access API (Chrome/Edge desktop – lze přepsat původní soubor) vs. stažení souboru (ostatní prohlížeče, mobil). → cyklus ukládání
- Další mapové podklady (OpenTopoMap, Mapy.cz s API klíčem → správa credentials)? → pozdější cyklus


## Suunto specifikace – analýza (2026-10-16)
Zdroj: https://apizone.suunto.com/route-description (Suunto API Zone, Route API).

### Co specifikace říká
1. **Čára trasy:** `rte` i `trk`. Z `rtept`/`trkpt` se importuje lat, lon, ele, name, type. **Každý `trk`/`rte` v souboru = samostatná trasa** v Suunto.
2. **Waypointy vznikají z:** (a) `wpt` se **stejnými souřadnicemi jako některý `rtept`/`trkpt`**, (b) `rtept`/`trkpt`, který má `name` a/nebo `type`. Importuje se name, type, lat, lon, ele.
3. Chybí name, je type → waypoint bez jména. Chybí type, je name → typ `Waypoint`.
4. **Typ je case-insensitive.** Neznámý typ → `Waypoint`. Úplný seznam (78 hodnot):
   - Pokyny: `Left_turn`, `Right_turn`, `Sharp_left_turn`, `Sharp_right_turn`, `Slight_left_turn`, `Slight_right_turn`, `Left_at_fork_turn`, `Right_at_fork_turn`, `Straight_turn`, `U_turn`, **`Roundabout_exit_1_turn` … `Roundabout_exit_5_turn`, `Roundabout_exit_n_turn`**
   - Začátek/konec: `Begin`, `End`
   - Body zájmu: `Aid_station`, `Avalanche`, `Beach`, `Bedding`, `Big_fish`, `Biggame`, `Bird`, `Building`, `Cafe`, `Camp`, `Campfire`, `Camping`, `Car`, `Cave`, `Cliff`, `Coast`, `Coral_reef`, `Crossroads`, `Danger`, `Emergency`, `Fish`, `Fishing_spot`, `Food`, `Forest`, `Geocache`, `Hill`, `Home`, `Hostel`, `Hotel`, `Info`, `Kelp_forest`, `Lagoon`, `Lake`, `Lodging`, `Marine_mammals`, `Marine_reserve`, `Meadow`, `Mountain`, `Mushrooms`, `Parking`, `Peak`, `Prints`, `Restaurant`, `River`, `Road`, `Rock`, `Rub`, `Scrape`, `Shot`, `Sight`, `Smallgame`, `Stand`, `Trail`, `Trailcam`, `Valley`, `Water`, `Water_point`, `Waterfall`, `Waypoint`, `Wreck`
5. **Název trasy** (priorita): `rte/trk name` → `rte/trk desc` → `metadata/name` → `metadata/desc` → „Unnamed route“. Hodinky mohou název zkrátit a odstranit nepodporované znaky (totéž u názvů waypointů).
6. Příklady v dokumentaci: `standalone="no"`, Begin/End s `desc` „Auto-generated“, souřadnice wpt textově shodné s rtept/trkpt. (V příkladu s detailními trkpt je `<elevation>` místo standardního `<ele>` — zřejmě chyba dokumentace.)
7. Cloud API (`cloudapi.suunto.com`) vyžaduje OAuth + subscription key — **nepoužíváme**; sdílený odkaz `api.sports-tracker.com/…/export` je veřejný a povoluje CORS → **správa credentials není potřeba**.
8. Vlastnost trasy `turnWaypointsEnabled` (v Cloud API) — zřejmě přepínač pokynů k odbočení v Suunto aplikaci; v GPX se neobjevuje.

### Porovnání s implementací
| # | Bod specifikace | Stav v aplikaci |
|---|---|---|
| A | wpt musí ležet na rtept/trkpt | ✅ kontrola + varování (cyklus 3) |
| B | Typ je case-insensitive | ✅ cyklus 3b (`canonType`, `SUUNTO_TYPES`) |
| C | Neznámý typ → `Waypoint` | ✅ cyklus 3b: popisek „Waypoint“ + upozornění v seznamu |
| D | Typy kruhových objezdů (6×) | ✅ cyklus 3c: kruh s nožičkou příjezdu (natáčí se) + nenatočené číslo výjezdu |
| E | ~60 typů bodů zájmu | ✅ cyklus 3c: ikona pro každý typ (Tabler Icons MIT + 5 vlastních), barvy: odbočky oranžová, POI tyrkysová, nebezpečí červená, Waypoint fialová; nenatáčí se. Editor: výběr ze všech typů |
| F | Waypointy z `rtept`/`trkpt` s name/type | ✅ cyklus 3c: zobrazeny (za wpt v seznamu), „in route point · not editable“; Begin/End v trkpt → S/F |
| G | Více `trk`/`rte` = více samostatných tras | ✅ cyklus 3b: upozornění v info o souboru (kreslení dál jako celek) |
| H | Název trasy podle priority | ✅ cyklus 3b: „Name on watch“ (z první trasy) |
| I | ele se importuje z wpt | ℹ️ pro editaci: nový wpt → zkopírovat `ele` ze shodného rtept/trkpt |
| J | Begin/End | ✅ zobrazeny jako S/F, needitovatelné |
| K | Žádná credentials | ✅ potvrzeno |

Pozn. (dotaz uživatele, cyklus 4): specifikace nevyžaduje duplicitní body — jen shodu souřadnic wpt s rtept/trkpt. Těsné dvojice rtept (~0,5 m) v exportu ze Suunto nejspíš vznikají tím, že plánovač Suunto vkládá při přidání waypointu nový bod trasy; náš editor body trasy nepřidává (přichytí wpt k existujícímu).


## Mapové podklady (cyklus 7, 2026-10-16)
| Poskytovatel | Klíč | Podmínky / atribuce | Rozhodnutí |
|---|---|---|---|
| OSM | ne | tile usage policy (Referer), „© OpenStreetMap contributors“ | výchozí |
| OpenTopoMap | ne | CC-BY-SA, „Map data © OSM contributors, SRTM · Map style © OpenTopoMap“; dlaždice do z17 | **ano** |
| Esri World Imagery | ne (starší veřejný endpoint `server.arcgisonline.com/.../World_Imagery/MapServer/tile/{z}/{y}/{x}`) | atribuce povinná: „Source: Esri, Vantor, Earthstar Geographics, and the GIS User Community“ (copyrightText ze služby); explicitní podmínky pro použití bez klíče nejasné (oficiálně Location Platform + API klíč) | **ano** (rozhodnutí uživatele) |
| ČÚZK Ortofoto ČR | ne | zdarma bez registrace, „© ČÚZK“, jen ČR | ne (uživatel nevybral) |
| Mapy.com letecká | ano (účet Seznam) | 250k dlaždic/měsíc zdarma; zákaz kombinace s jinými mapovými podklady | ne |
Správa credentials (původní zadání) tedy není potřeba. Přepínač = `L.control.layers`, volba v localStorage `addturngpx.baseLayer`.


## Automatické odbočky (cyklus 8)
- Křižovatky z OpenStreetMap přes Overpass API (`https://overpass-api.de/api/interpreter`, CORS `*`, bez klíče, fair use). Dotaz: `way(around:30, <zjednodušená trasa>)[highway]; out geom;` — jeden dotaz na otevření generátoru, výsledek se cachuje podle tvaru trasy. Data © OpenStreetMap contributors (ODbL) — atribuce v kartě generátoru.
- Odolnost (cyklus 12): chyby Overpass (remark, prázdná odpověď, 429/5xx, odmítnutí bez CORS, timeout) = opakovatelné → až 3 pokusy (5 s, 15 s); úspěšná data se ukládají do IndexedDB (`junctions`, klíč = zjednodušená trasa, 30 dní, max. 30 tras), ne-úspěch nikdy. OSM editing API jako záloha zamítnuto (API Usage Policy: ne pro read-only).
- Křižovatka = uzel s ≥ 3 různými sousedy (větvemi) v síti cest; ignorují se highway=proposed/construction/abandoned/razed/disused/platform.
- Kandidát = nejbližší bod trasy ke křižovatce (do vzdálenosti = rozestup). Úhel trasy měřen na okno = rozestup. Odbočka při |úhel| ≥ min. úhel; rozcestí (Keep left/right at fork) když se před jezdcem cesta dělí na právě 2 větve do ±60° od směru příjezdu (i při malém úhlu). „Rovně“ se negeneruje.
- Duplicity: jeden bod na rozestup podél trasy (priorita rozcestí, pak větší úhel), ochranná zóna kolem zachovaných waypointů a konců čáry.


## Suunto Routeplanner – waypointIndices (cyklus 9)
- `<rte><extensions><suunto-rp:waypointIndices>0,36</suunto-rp:waypointIndices>` (ns `http://www.suunto.com/routeplanner/gpx/1.0`) = 0-based indexy `rtept`, na kterých leží `<wpt>`.
- Po každé úpravě se seznam přepočítá z `<wpt>` ležících na bodech daného `<rte>` (shoda souřadnic; opakovaná poloha → výskyt v pořadí trasy), vzestupně, oddělovač čárka. Mění se jen text elementu a jen při rozdílu; soubory bez rozšíření se nemění, rozšíření se nepřidává. Body z trasy (rtept s name/type) se nezapočítávají.

## Výstupní formát = export z aplikace Suunto (cyklus 17, 2026-10-18)
Rozhodnutí uživatele: AddTurn GPX vždy ukládá ve formátu `test51.gpx` (sdílený odkaz z mobilní aplikace Suunto, `creator="Sports Tracker"`). Soubory v tomto formátu se upravují textově bajt po bajtu (beze změny ostatního); všechny ostatní se **při otevření** převedou (`convertToSuuntoFormat`) a označí jako Modified. Tím přestává platit „přesné zachování“ pro soubory odjinud a oddíl o waypointIndices níže je jen historický (synchronizace odstraněna). Všechny wpt mají `<ele>`.

## Test 1 se Suunto supportem (2026-10-20, Suunto Race 2)
- Soubor `samples/_FUNKCNI/test51-test1.gpx`: test51 otevřený v aplikaci Suunto → uložen jako kopie „test51 test1“ → v editoru aplikace přidány 2 waypointy → sdílený export. Snímek aplikace: `samples/_FUNKCNI/Screenshot_20261020_194922_Suunto.jpg` („Navigace krok za krokem“ ZAPNUTO, „Použít v hodinkách“ zapnuto).
- Výsledek (uživatel): oba waypointy přidané v aplikaci (Geocache, Slight_left_turn) jsou vidět na mapě v aplikaci i v hodinkách.
- Jak je aplikace zapsala: `<wpt>` s `<ele>` (plná přesnost, např. 310.39398), `<name>Waypoint1/2</name>`, `<type>`; bez `desc`. Do `<rte>` vložila **nový rtept** se stejnými souřadnicemi (bod nezdvojuje). Wpt seřazené podle polohy na trase. Formát souboru jinak shodný s výstupem AddTurn.
- Jediný rozdíl v souboru oproti bodu z AddTurn (`Straight_turn` bez názvu): **waypointy z aplikace mají `<name>`**. Další rozdíl může být jen mimo soubor (interní stav trasy v aplikaci po importu).
- Doplnění (uživatel): v hodinkách je vidět i `Straight_turn` z AddTurn (bez názvu) → chybějící `<name>` příčinou není. Uživatel pošle fotky ciferníku (pole vzdálenosti k dalšímu waypointu).
- Fotky hodinek Race 2 (2026-10-20, `samples/_FUNKCNI/2026102*.jpg`): mapa ukazuje ikony waypointů (Geocache, odbočky, Straight_turn, Begin); spodní pole „⊕ 42 m“ = vzdálenost ke Geocache. Nastavení NOTIFICATIONS: „Turn by turn“ ZAP, „Next segment“, „Segment start“. Výběr DATA FIELD: **„Distance to waypoint“** (zvoleno), **„Distance to POI“**, **„Distance to next turn“**, „Distance remaining“.
- **Hypotéza:** hodinky rozlišují odbočky (typy `*_turn`, Turn-by-turn) od waypointů/POI. „Distance to waypoint/POI“ odbočky přeskakuje → u test51 (jen typy odboček) ukazovalo vzdálenost do cíle (podle návodu: bez waypointů = do cíle). Vzdálenost k odbočce má ukazovat pole **„Distance to next turn“** (nejspíš jen se zapnutým Turn by turn). Ověřit venku.
- **Venkovní test (2026-10-20, 20:10, trasa „test51 test1“ — vytvořená podle supportu: kopie v aplikaci + waypointy přidané v editoru aplikace, pak sdílená přes odkaz):** FUNGUJE. Pole „Distance to waypoint“ (ikona waypointu) i „Distance to next turn“ ukazují 7 m k Waypoint2 (`Slight_left_turn`, přidaný v aplikaci); notifikace „↰ 7 m“ a „⊕ 3 m“ (Geocache). Hypotéza „pole waypoint přeskakuje typy odboček“ tím **neplatí** (aspoň pro body přidané v editoru aplikace).
- Zbývá ověřit: (1) pole mimo notifikaci (větší vzdálenost, bez modrého pozadí); (2) zda pole počítá i `Straight_turn` importovaný z GPX (232 m od startu; Geocache 32 m) — tj. zda záleží na tom, že bod vznikl v editoru aplikace (support: importované body se „nemusí svázat“); (3) zda totéž funguje po čerstvém importu souboru `test51-test1.gpx` jako nové trasy (rozhodne, zda stačí formát GPX, nebo je v postupu nutný krok „uložit kopii v aplikaci“).
- Poznatek uživatele (2026-10-20): odbočka přidaná v aplikaci do trasy **už nahrané v hodinkách** se na mapě zobrazila, ale pole ji ignorovalo (ukazovalo zbývající délku trasy). Možná souvisí s radou supportu (uložit jako novou kopii). Seznam testů: TODO.md → „Testy na hodinkách“.

## Křižovatky z vektorových dlaždic – analýza a plán (2026-10-21)

### Zdroje (ověřeno 2026-10-21)
| | OpenFreeMap | OSMF vektorové dlaždice (Shortbread) |
|---|---|---|
| URL | `https://tiles.openfreemap.org/planet/<verze>/{z}/{x}/{y}.pbf` (verze z TileJSON `https://tiles.openfreemap.org/planet`) | `https://vector.openstreetmap.org/shortbread_v1/{z}/{x}/{y}.mvt` |
| Schéma / vrstva | OpenMapTiles, `transportation` (`class`: track, path, service, minor…; `brunnel`) | Shortbread 1.0, `streets` (`kind` = hodnota highway; `bridge`, `tunnel`) |
| Max. zoom | 14 | 14 |
| CORS | `access-control-allow-origin: *` | `access-control-allow-origin: *` |
| Podmínky | zdarma, „no limits on the number of map views or requests“, komerční užití OK; offline stahování max. 3 000 dlaždic / 50 MB, max. 4 souběžné požadavky; atribuce „OpenFreeMap © OpenMapTiles Data from OpenStreetMap“; v README plán přejít na Shortbread | best effort, bez SLA, může blokovat bez varování; **hromadné stahování předem zakázáno**; cache ≥ 7 dní dle hlaviček; atribuce; o jiném užití než zobrazení mapy politika nemluví |
| Aktuálnost | týdenní build (TileJSON 2026-10-18) | průběžně aktualizováno |

Zdroje: https://openfreemap.org, https://github.com/hyperknot/openfreemap, https://operations.osmfoundation.org/policies/vector/, https://shortbread-tiles.org/schema/1.0/, https://openmaptiles.org/schema/

### Prototyp na trase Vracov 5km
12 dlaždic z14 z každého zdroje (1–120 kB, celkem ~300 kB), vlastní dekodér MVT (Python, scratchpad), porovnání s `tests/fixtures/vracov-overpass.json` (křižovatky do 15 m od trasy, jak je bere `computeTurns`):
1. **Jen sdílené vrcholy** (stejně jako Overpass: uzel s ≥ 3 sousedy): 18/23 shodných (odchylka ≤ 0,22 m), 5 chybí.
2. **Příčina:** generátory dlaždic zjednodušují geometrii a z cesty, která křižovatkou prochází skoro rovně, bod křižovatky vypustí. Druhá cesta pak končí *na čáře*, ale ne v jejím vrcholu (T), případně se dvě cesty jen kříží (X). Cesty v OSM jsou v pořádku (např. way 374367490 beze změny od 2024). Oba zdroje se chovají stejně.
3. **Oprava:** (a) konec čáry do ~1 m od vnitřku jiného úseku → T-křižovatka (body ořezu na okraji dlaždice vynechat, jinak vznikají falešné křižovatky); (b) průsečík dvou úseků, z nichž žádný není most/tunel → X-křižovatka. Výsledek: **23/23 shodných (≤ 1 m), 1 navíc** – dvě souběžně zakreslené čáry (větve 34°, 34°, −146°, −147°) → odstraní se sloučením větví s rozdílem < 10°. Stejný výsledek u obou zdrojů.

### Hodnocení
- **Pro:** žádný Overpass (přetížení, „remark“, prázdné odpovědi, blokace User-Agentu), rychlé statické soubory s CDN a HTTP cache, CORS, stejný výstup `{latlng, branches}` → `computeTurns` beze změny.
- **Proti / rizika:** zjednodušení geometrie (vyřešeno opravou výše, ověřeno jen na jedné trase); falešná X-křižovatka tam, kde most/tunel není v datech označen; náměstí a plochy (`street_polygons` / plochy) se jako křižovatky nepočítají – Overpass s `way[highway]` je jako uzavřené cesty zahrnoval; změna schématu (OpenFreeMap plánuje přechod na Shortbread → dekodér má umět obě schémata); podmínky OSMF u použití mimo zobrazení mapy nejsou výslovně řešené.
- **Doporučení:** primární zdroj OpenFreeMap (výslovně bez limitů), záložní OSMF Shortbread, poslední záloha stávající Overpass.

### Implementační plán (cyklus 19)
1. **Výběr dlaždic:** zjednodušená trasa (stávající `simplifyLine`, 5 m) → koridor 30 m → množina dlaždic z14 (typicky 1–2 dlaždice na km trasy). Strop např. 300 dlaždic na jedno generování (jinak hláška / Overpass).
2. **Stahování:** OpenFreeMap: nejdřív TileJSON (aktuální verze), pak dlaždice; max. 4 souběžně; opakování jako u Overpass (`retryable`); průběh v kartě „Loading road data 7/12…“; zrušení zavřením karty. Prohlížečová HTTP cache splní požadavek OSMF na cache.
3. **Dekodér MVT** (vlastní, ~120 řádků, bez knihovny a bez build kroku): protobuf → vrstvy → prvky typu čára, klíče/hodnoty, příkazy geometrie.
4. **Síť cest:** vrstva `transportation` (OMT) nebo `streets` (Shortbread); vynechat železnici, trajekty, lanovky, `*_construction`, dráhy letišť; ponechat všechny `highway` vč. track/path/footway/steps/service. Globální celočíselné souřadnice (x·4096 + px), sjednocení úseků, označení bodů ořezu a úseků mostů/tunelů.
5. **Opravy:** T-přichycení (≤ 3 px ≈ 1,2 m), X-průsečíky (ne mosty/tunely), sloučení větví < 10°, jen uzly do 30 m od trasy.
6. **Výstup a cache:** stejný formát jako dnes (`junctions: [{latlng, branches}]`), stejný klíč `roadDataKey()` a úložiště IndexedDB (30 dní); do záznamu přidat `source` a ukázat ho v kartě („Road data: OpenFreeMap / OpenStreetMap vector tiles / Overpass“).
7. **Záložní řetězec:** OpenFreeMap → OSMF Shortbread → Overpass; každý zdroj s vlastními pokusy; chyby srozumitelně.
8. **Testy:** fixture s 12 dlaždicemi Vracov z obou zdrojů (`tests/fixtures/tiles/…`, ~600 kB, ODbL/OpenMapTiles atribuce v tests/README); mock dlaždic v `run.mjs`; testy: dekodér, 23/23 křižovatek vůči Overpass fixture, stejné návrhy generátoru jako s Overpass, T/X oprava, žádné falešné křižovatky na okrajích dlaždic, záložní řetězec (OpenFreeMap selže → Shortbread → Overpass), strop dlaždic, cache.
9. **Dokumentace:** README EN/CZ (zdroj dat, atribuce, soukromí – požadavky na dlaždice místo Overpass), DESIGN/PROGRESS, `CACHE_NAME`.
10. **Ověření v praxi:** porovnat s Overpass na dalších trasách (město, les, trasa přes most) – skript prototypu převést do `tests/tools/` (node) pro opakované porovnání.
- **Stav (2026-10-21):** implementováno v cyklu 19 podle plánu (bod 10 – nástroj na porovnání s Overpass – vypuštěn, ověření dělá uživatel ručně). Proti prototypu navíc: průsečík v existujícím bodě jedné čáry, více dělicích bodů na jednom úseku.

## Plánovač tras – analýza směrovacích služeb a plán (2026-10-21)
Požadavek uživatele: naklikat trasu od prvního po poslední bod, aplikace hledá cestu mezi body (jako Suunto Routeplanner). **Jen veřejné služby bez API klíče** (aplikaci mají zvládnout i lidé méně zdatní v IT). Implementace až po testech na hodinkách (T0–T5).

### Služby bez klíče (ověřeno 2026-10-21)
| | BRouter (brouter.de) | Valhalla FOSSGIS (valhalla1.openstreetmap.de) | OSRM FOSSGIS (routing.openstreetmap.de) | OSRM demo (router.project-osrm.org) |
|---|---|---|---|---|
| API | `GET /brouter?lonlats=lon,lat\|…&profile=…&format=geojson\|gpx` | `POST /route` (JSON), max. **10 bodů** v požadavku | `GET /routed-foot\|bike\|car/route/v1/driving/…` | jako FOSSGIS |
| CORS | `*` | `*` (i preflight pro POST) | `*` | – |
| Profily | hiking-mountain, hiking-beta, trekking, fastbike, gravel, mtb, racebike…, car-* | pedestrian, bicycle (Road/Hybrid/Cross/Mountain), auto | foot, bike, car | car, foot, bike |
| Výška | **ano, u každého bodu** (SRTM) | ano, `elevation_interval` (pole po N m) nebo `/height` | ne | ne |
| Podmínky | **žádné zveřejněné** (server financuje FOSSGIS; data denně) | politika FOSSGIS (německy; stránka blokuje automatické čtení – **neověřeno**) | atribuce + odkaz „fix the map“, platný User-Agent a Referer, **max. 1 požadavek/s**, žádné hromadné použití | jen nekomerční rozumné použití, max. 1 požadavek/s, bez záruk |
| Shoda s trasou Vracov 5km (11 průchozích bodů) | **100 % do 10 m, 5 062 m** | **100 % do 10 m, 5 061 m** (2 požadavky kvůli limitu 10 bodů) | 94 %, objížďka 116 m | – |

Placené / s klíčem (nevhodné podle požadavku): GraphHopper (free plán jen nekomerční, 500 kreditů/den, registrace), openrouteservice (klíč, registrace).
Poznámka: prohlížeč nedovolí nastavit User-Agent; Referer (origin `https://dushino.github.io`) posílá automaticky.
Zdroje: https://brouter.de/brouter-web/ , https://github.com/abrensch/brouter , https://routing.openstreetmap.de/about.html , https://github.com/Project-OSRM/osrm-backend/wiki/Demo-server , https://github.com/Project-OSRM/osrm-backend/wiki/Api-usage-policy , https://www.graphhopper.com/pricing/

### Doporučení
- **Primárně BRouter** (nejlepší profily pro turistiku/kolo, výška v téže odpovědi, GeoJSON i GPX), **záloha Valhalla FOSSGIS** (výška přes `elevation_interval`; požadavky po úsecích stejně). OSRM vynechat (bez výšky, horší volba cest pro pěší).
- **Před nasazením napsat provozovatelům** (BRouter: GitHub/Google Group; FOSSGIS: fossgis-routing-server@openstreetmap.de) – popsat aplikaci, objem (1 požadavek na kliknutí), požádat o souhlas. Do té doby jen v testovací verzi.
- Ohleduplnost: fronta požadavků max. 1/s, cache úseků, žádné přepočítávání celé trasy.

### Implementační plán (cykly P1–P4, až po testech na hodinkách a souhlasu provozovatelů)
- **P1 – směrování:** modul `router` (BRouter → Valhalla), požadavek na **úsek** mezi sousedními průchozími body, fronta 1 požadavek/s, cache úseků (klíč = body + profil), chyby a opakování jako u dlaždic, výstup `{pts:[{lat,lon,ele}], length, ascent}`. Profily v UI: Hiking, Running (hiking-beta / pedestrian), Trekking bike, MTB, Road bike → mapování na BRouter/Valhalla.
- **P2 – režim plánování:** tlačítko „New route“ → klik na mapu přidá průchozí bod (úsek se dopočítá), tažení bodu přepočítá 2 sousední úseky, klik na bod ho smaže, tažením čáry vznikne nový bod mezi; Undo/Redo; panel: profil, délka, převýšení, seznam bodů, „Finish“. Kurzor kříž. Dotyk: klepnutí přidá, dlouhý stisk smaže/posune (dořešit na tabletu).
- **P3 – výstup:** „Finish“ vytvoří soubor ve formátu test51 (jeden `<rte>`, body úseků bez zdvojených spojů, `<ele>`, Begin/End Auto-generated, název trasy z pole Route name) → dál běžná editace a Turns generator (křižovatky už umíme). Průchozí body uložit v relaci (IndexedDB), aby šlo plánování obnovit; přeplánování otevřeného cizího souboru až později.
- **P4 – testy a dokumentace:** fixture odpovědí BRouter/Valhalla pro Vracov (stažené při implementaci), mock v `run.mjs`, testy: úsek, posun bodu přepočítá jen 2 úseky, záloha Valhalla, limit 1/s, výstup = formát test51 (isSuuntoAppFormat), Undo; README EN/CZ (zdroje, atribuce „© OpenStreetMap contributors, routing BRouter / Valhalla“, soukromí: souřadnice bodů jdou na směrovací server).
- **Rizika:** podmínky BRouteru nezveřejněné (může skončit/omezit), FOSSGIS politika neověřena; ovládání na dotyku; hodinky musí přijmout soubor vytvořený jinde než v aplikaci Suunto (navazuje na T2/T3).
- **Možná záloha bez služeb (později):** hledání cesty přímo na síti z vektorových dlaždic (A*) – bez výšky a zákazů vjezdu, jen nouzově.

## Rozhovor uživatele s Gemini (2026-10-21) – porovnání s naším výstupem
Zdroj: sdílený chat „Navigace odboček Suunto“ (uživatel, 2026-10-21). Tvrzení Gemini jsou neověřená a místy si odporují (nejdřív doporučí name/type v `trkpt` jako jednodušší, pak „přesně naopak“ `wpt`; tvrdí, že pole „vzdálenost k další odbočce“ v seznamu není, ale hodinky Race 2 uživatele ho mají – „Distance to next turn“; tvrdí, že `waypointIndices` je v exportu z aplikace Suunto – není, je jen v Routeplanneru).
- **Shoda s naším formátem:** `wpt` se souřadnicemi totožnými s bodem trasy; `type` určuje ikonu; `waypointIndices` netřeba; `desc` „Auto-generated“ pro hodinky irelevantní (necháváme jen u Begin/End kvůli shodě s exportem z aplikace).
- **Rozdíly k otestování (nejsou v rozporu, ale mohou ovlivnit pole vzdálenosti):**
  1. **typ odbočky (`*_turn`) vs. typ POI (`Waypoint`, `Crossroads`)** – Gemini tvrdí, že automatické odbočky (TBT) pole „vzdálenost k waypointu“ ukazuje jen těsně před nimi a jinak cíl; souhlasí s původním pozorováním u test51. Hypotéza: importovaný bod s typem odbočky se může brát jako TBT pokyn, bod s typem POI jako waypoint.
  2. **`name` u bodu** – naše nově přidané body název nemají (jako `Straight_turn` v test51); Gemini doporučuje název.
  3. `trk` místo `rte`, name/type přímo v bodu trasy – nízká priorita.
- Neověřené tvrzení: aplikace Suunto se při importu GPX ptá „přidat pokyny k odbočení?“ (uživatel zatím nepozoroval).

## Venkovní test T2b „Vracov T2b mix“ (2026-10-22, uživatel)
Nastavení: „Navigace krok za krokem“ v aplikaci ZAP, NOTIFICATIONS → Turn by turn v hodinkách ZAP. Trasa ze souboru AddTurn (`samples/_TEST_VRACOV/Vracov T2b mix.gpx`), body 750–1300 m od sebe.

| Místo (od startu) | Bod v souboru | Notifikace | Pole vzdálenosti |
|---|---|---|---|
| 0,51 km (lehce vlevo) | žádný | ne | nic (stejně i u originální trasy z Routeplanneru) |
| 1,2 km | (a) `Fork_left` bez názvu | ano, před odbočkou | vzdálenost **jen po notifikaci** |
| 1,94 km | (b) `Left_turn` „B Turn left“ | ano | jen po notifikaci (= jako a) |
| 2,45 km (vlevo) | žádný | ne | nic |
| 3,21 km | (c) `Waypoint` „C Waypoint“ | ano, při přiblížení | vzdálenost **už před notifikací** |
| 4,11 km | (d) `Crossroads` „D Crossroads“ | ano, při přiblížení | už před notifikací (= jako c) |

Závěry:
- **Potvrzena hypotéza 1 (Gemini):** bod s typem odbočky hodinky berou jako pokyn TbT – v poli je jen v dosahu notifikace; bod s typem POI (`Waypoint`, `Crossroads`) je v poli trvale (T1 pro POI = ano).
- **Název nerozhoduje** (a bez názvu = b s názvem) → hypotéza 2 neplatí.
- Hodinky ani aplikace si samy odbočky z geometrie nedopočítají (0,51 km a 2,45 km bez bodu = nic) → odbočky musí dodat soubor.
- Body z AddTurn (import GPX) hodinky načtou a hlásí – T2 = ano.
- Upřesnit u uživatele: které pole (Distance to waypoint / POI / next turn) se pozorovalo, co ukazovalo před notifikací u odboček (cíl / prázdné), jak vypadala notifikace u c/d (ikona, název).

## Pokus „Test 042 - pridany“ – name/type přímo v `rtept` (2026-10-22, uživatel)
- Soubor `samples/Test 042 - pridany.gpx`: odbočky zapsané jen jako `<name>`/`<type>` v `rtept` (např. `<rtept …><ele>330.0</ele><name>Nalevo</name><type>Left_turn</type></rtept>`), bez odpovídajících `<wpt>`.
- Výsledek: aplikace Suunto po importu sama **vypnula „Navigace krok za krokem“**; na trase **žádné odbočky** (navigační body) a ani po ručním zapnutí volby se neobjeví.
- Závěry (uživatel): pokyny TbT musí být v GPX jako **`<wpt>`** (se souřadnicemi bodu trasy); bod 2(b) specifikace (waypoint z `rtept` s name/type) aplikace Suunto v praxi nepoužívá. Odbočky z tvaru trasy počítá jen Suunto Routeplanner (jeho „Turn guidance waypoints“); mobilní aplikace Suunto trasy jen spravuje, sama odbočky nevkládá (souhlasí s T2b – místa bez wpt nic). Varianta 3 z rozhovoru s Gemini (name/type v bodu trasy) tím padá.
- Doplnění (uživatel, 2026-10-22): body z `rtept` nebyly vidět **vůbec** – ani jako POI na mapě v aplikaci, ani v hodinkách → aplikace Suunto je zahodila úplně.
- **Volba „Navigace krok za krokem“ při importu:** nová trasa převezme stav volby od **naposledy použité trasy** (vypnuto → vypnuto, zapnuto → zapnuto). Výjimka: trasa **bez waypointů** (Test 042 měl jen `<wpt>` Begin a End – ty se nepočítají) ji má vždy vypnutou. Další doklad, že odbočky se berou jen z `<wpt>`. Pro README: po importu zkontrolovat, že je volba zapnutá.
- **Rada Suunto supportu (připomenul uživatel 2026-10-22, dosud nezapsáno):** u trasy **vypnout** „Navigace krok za krokem“. Souvisí s T2b: se zapnutou volbou se body typu odbočky berou jako pokyny TbT (v poli jen v dosahu notifikace). **Hypotéza:** s vypnutou volbou budou tytéž `<wpt>` obyčejné waypointy s ikonou odbočky → pole ukáže vzdálenost trvale (souhlasí s poznámkou u test51: „vypnutá navigace po trase, zapnutá upozornění na POI“ → pole fungovalo). Ověřit testem T5 na „Vracov T2b mix“. Bod README „po importu zkontrolovat volbu“ tedy platí v obou směrech – podle výsledku T5 doporučit stav volby.
- **Upřesnění polí (uživatel, 2026-10-22):** v datových obrazovkách sportovního režimu je jen **jedno** pole pro body – „Zbývající vzdálenost k místu zájmu / waypointu“ (POI a waypoint nemají oddělená pole) – a dále „Zbývající vzdálenost do konce trasy“. „Vzdálenost k další odbočce“ je jen volba **obrazovky mapy**. Výběr DATA FIELD na fotce `samples/_FUNKCNI/20261020_200016.jpg` (Distance to waypoint / POI / next turn / remaining) je **potvrzeno (uživatel)** spodní pole obrazovky mapy (přepíná se dotykem), s datovými obrazovkami nesouvisí. Datová obrazovka sportovního režimu (např. „Přespolní běh“, 5 polí, nastavení v aplikaci Suunto) má k dispozici „Zbývající vzdálenost do konce trasy“ a „Zbývající vzdálenost k místu zájmu / waypointu“ – **tady** uživatel potřebuje vzdálenost k další odbočce. Pozorování z T2b („pole“) = pole „k místu zájmu / waypointu“ v datové obrazovce. Cíl uživatele: vzdálenost k další odbočce **v tomto poli** (ne jen na mapě) → odbočky musí hodinky brát jako waypointy, ne jako pokyny TbT.
- **Úvaha uživatele (2026-10-22): nepředstírat Route Planner, ať Suunto bere wpt „slepě“ jako obecné waypointy.** Upřesnění: AddTurn napodobuje export z **mobilní aplikace Suunto** (creator „Sports Tracker“), ne Routeplanner (jeho značky `suunto-rp:*` se při převodu odstraňují). Původní cíl (oddíl výše: „hodinky nesmí poznat, že waypoint je navigační instrukce“) je stejný jako úvaha uživatele. T2b ukázal, že rozhoduje **hodnota `<type>`** (typ odbočky → pokyn TbT při zapnuté volbě), ne původ souboru – soubor z AddTurn nemá žádné znaky Routeplanneru. Způsob, jak typ odbočky „slepě“ zobrazit jako waypoint, zná jen aplikace Suunto: kandidát je vypnutá „Navigace krok za krokem“ (T5). Neznámý typ se mění na `Waypoint` (spec. bod 4) → ikona šipky bez TbT přes typ nejde.

## Test T6 – `<trk>` vs `<rte>` (2026-10-22, uživatel, `samples/_TEST_042/`)
- **Test 042 trk wpt** (trk + wpt typů odboček): odbočky vidět na mapě v aplikaci i v hodinkách, a to se **zapnutou i vypnutou** „Navigací krok za krokem“. Pole č. 4 „Zbývající vzdálenost k místu zájmu / waypointu“ v obou případech ukazuje **vzdálenost do konce trasy** – odbočky nezapočítá. (Před dosažením startu pole ukazuje vzdálenost ke startu – platí u každé trasy.)
- **Upřesnění (uživatel):** došel jen na start a ~30 m po trase (1. odbočka je až na 249 m). Do ~20 m od startu pole ukazovalo vzdálenost ke startu (rostla), pak přeskočilo na vzdálenost do konce trasy. **Hodnocení (po diskusi s uživatelem):** pro **TbT vypnuto je výsledek průkazný** – bod brany jako waypoint by pole ukazovalo hned po přepnutí ze startu (jako C/D v T2b na stovky metrů), místo toho ukázalo konec trasy → body typu odbočky se ani s vypnutou TbT v poli č. 4 nepočítají (u `trk`). Pro TbT zapnuto neprůkazné (do notifikace = konec trasy i u `rte`). Obrazovka mapy přitom vzdálenost k další odbočce ukazovala správně (hodinky odbočky znají, jen je nepouští do pole č. 4).
- **Test 042 rte wpt** (doma, před vycházkou): s **vypnutou** „Navigací krok za krokem“ odbočky **nejsou vidět** v aplikaci ani v hodinkách (u `trk` vidět byly). Po zapnutí volby v aplikaci: v aplikaci vidět(?), v hodinkách ne (možná ještě nesynchronizováno – upřesnit). → U `rte` volba TbT určuje, zda body typu odbočky vůbec existují; u `trk` se zobrazí vždy. Vypnutí TbT u `rte` z nich waypointy nedělá – zmizí.
- **Venkovní test rte wpt (2026-10-22):** (synchronizace vždy vynucena a dokončena) odbočky v hodinkách **nejsou ani na mapě, ani v poli** – při zapnuté i vypnuté volbě. Rozdíl proti T2b mix (rte z AddTurn, fungovalo): tam byla volba zapnutá **už při importu**; zde byla při importu vypnutá a zapnula se až potom. **Hypotéza:** při importu s vypnutou TbT aplikace body typu odbočky zahodí a pozdější zapnutí je nevrátí (jako u Test 042 s rtept). Ověřit: smazat trasu, zapnout TbT u poslední trasy, importovat znovu.
- Čeká: „trk body“.
- **KML (dotaz uživatele 2026-10-22):** specifikace Suunto (apizone, ověřeno 2026-10-22) KML vůbec nezmiňuje, popisuje jen GPX; o rozdílu odboček a POI ani o TbT nic neříká (typy odboček jen „určují ikonu“; v JSON je nevysvětlené `turnWaypointsEnabled`). KML Placemark má jen polohu, název, popis a styl/ikonu jako obrázek – pole pro typ Suunto nemá. Aplikace jej nejspíš převede do stejného vnitřního modelu (poloha, name, type) → body budou nejvýš `Waypoint` s názvem, tj. totéž co varianta „typ POI“ v GPX. Rozhodování „odbočka vs. waypoint“ je v logice aplikace/hodinek, ne ve formátu souboru.
- **KML (uživatel):** aplikace Suunto nabízí „Importovat trasu (GPX, KML)“, specifikace ji nezmiňuje. Specifikace ani nezmiňuje rozdílné zacházení s typy odboček → **dokumentace Suunto není aktuální**, zjištění stavět jen na testech.
- **T7 – nápad uživatele:** `<desc>Auto-generated</desc>` u wpt odboček (jako Begin/End, k nimž pole č. 4 spolehlivě měří). Soubor `samples/_TEST_042/Test 042 rte autogen.gpx`; pevný postup testu (smazat, TbT zapnuto při importu, synchronizace, projít za 1. odbočku) v `samples/_TEST_042/NAVOD.md`; kontrola „rte wpt“ znovu stejným postupem.

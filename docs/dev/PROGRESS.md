# Postup implementace

Každý cyklus: vyjasnění specifikace → implementace → test → oprava chyb →
potvrzení od uživatele → další cyklus.

| # | Feature | Stav |
|---|---|---|
| 0 | Vyjasnění cílů, založení poznámek | hotovo (2026-10-16) |
| 1 | Kostra aplikace: mapa OSM, responzivní layout, tmavý/světlý režim, PWA | hotovo, potvrzeno uživatelem (2026-10-16) |
| 2 | Načtení GPX (lokální soubor + URL), zobrazení trasy a waypointů | hotovo, potvrzeno uživatelem (2026-10-16) |
| 3 | Ikony typů odboček (mapa natočená podle příchozího směru + seznam), varování „mimo bod trasy“ | hotovo, potvrzeno uživatelem (2026-10-16) |
| 3b | Soulad se Suunto specifikací: typy case-insensitive, neznámý typ, více tras, název trasy na hodinkách | hotovo, potvrzeno uživatelem (2026-10-16) |
| 3c | D kruhové objezdy, E ikona pro každý bod zájmu, F waypointy z rtept/trkpt (jen zobrazení) | hotovo, potvrzeno uživatelem (2026-10-16) |
| 4 | Editace waypointů (přidat, přesunout po bodech trasy, upravit typ/název, smazat) | hotovo, potvrzeno uživatelem (2026-10-16) |
| 5 | Uložení GPX na lokální filesystém (přesné zachování formátu) | hotovo, potvrzeno uživatelem (2026-10-16) |
| 6 | Ovládání mapy: vložení bodu trasy na dlouhém úseku, jemnější zoom kolečkem, tlačítko Fit route | hotovo, potvrzeno uživatelem (2026-10-16) |
| 7 | Mapové podklady: přepínač OSM / OpenTopoMap / Esri World Imagery (satelit) | hotovo, potvrzeno uživatelem (2026-10-16); poznámka k podmínkám Esri vzata na vědomí |
| 7b | Typ nového bodu převzatý z editoru (bod zájmu) | potvrzeno „funguje dle zadání“ (2026-10-16); uživatel se k chování ještě vrátí |
| 8 | Automatické generování odboček (jen na křižovatkách z OSM, vč. rozcestí) | hotovo, potvrzeno uživatelem (2026-10-16) — ověřeno na trase Vracov |
| 9 | Udržování `suunto-rp:waypointIndices` (Suunto Routeplanner) v souladu s waypointy | hotovo (uživatel pokračuje dál, 2026-10-16) |
| 9b | Instalace PWA na Androidu (PNG ikony, manifest id) + tip ke sdílení; totéž v OK-Traineru | hotovo — obě aplikace nainstalované a funkční (2026-10-16) |
| 10 | Dotykové pero na tabletu | uzavřeno bez změn — pero funguje jako přesnější prst, což uživateli vyhovuje (2026-10-16) |
| 11 | README (EN/CZ) se snímky obrazovky | hotovo, potvrzeno uživatelem (2026-10-18) |
| 12a | Generate turns: robustnost (chyby Overpass, cache), testy v `tests/` | hotovo, potvrzeno uživatelem (2026-10-18) |
| 12b | Přidání bodu klikem na trasu (bez tlačítka Add), klik na bod = editace | hotovo, potvrzeno uživatelem (2026-10-18) |
| 12c | Generator: trvalé uložení dat o křižovatkách + automatické opakování | hotovo, první testy uživatele „výborné“ (2026-10-18); dlouhodobé ověření v běžném používání |
| 13 | Kategorie bodů zájmu (barvy) + seskupení ve výběru typu | hotovo, potvrzeno uživatelem (2026-10-18) |
| 14 | Dokončení: klikací logo (odkaz na GitHub), vzorek Praha na body trasy | hotovo, potvrzeno uživatelem (2026-10-18) |
| 15 | README: kapitola „Na hodinkách“ (foto navigace, nastavení, varování před opačným směrem) | rozpracováno — čeká na fotku nastavení |
| 16 | `<ele>` k novým wpt nepřidávat; waypointIndices bez instrukcí Routeplanneru | **nahrazeno cyklem 17** (rozhodnutí uživatele) |
| 17 | Výstup vždy ve formátu test51 (export z mobilní aplikace Suunto): převod při otevření | hotovo, potvrzeno uživatelem (2026-10-29) |
| 18 | Editace názvu trasy v panelu + návrh názvu souboru podle trasy | hotovo, potvrzeno uživatelem (2026-10-29) |
| 19 | Křižovatky z vektorových dlaždic (OpenFreeMap → OSMF Shortbread → Overpass) | hotovo, potvrzeno uživatelem („funguje výborně“, 2026-10-21) |
| 20 | Karta generátoru: „Turns generator“ jen otevře kartu, výpočet tlačítkem „Generate turns“ | hotovo, potvrzeno uživatelem (2026-10-21) |
| 21 | Kurzor myši podle toho, co udělá kliknutí | hotovo, potvrzeno uživatelem (2026-10-29) |
| 22 | Ikona: větší okraje (obsah zmenšený a vycentrovaný) | hotovo, potvrzeno uživatelem (2026-10-29) |
| 23 | Service worker maže jen vlastní cache (společný origin s OK Trainerem) | hotovo, potvrzeno uživatelem (2026-10-30) |
| 24 | Start bez signálu: soubory aplikace cache-first, nová verze přes lištu „New version available – Reload“ | hotovo, potvrzeno uživatelem (2026-10-30; lišta a aktualizace ověřeny, start bez signálu zatím nevyzkoušen) |
| 25 | Plánovač tras – jádro za `?planner=1`: klíč GraphHopper, New route, profil, přidání bodu, Undo, délka a převýšení | hotovo, potvrzeno uživatelem (2026-10-30) |
| 26 | Plánovač tras: tažení bodů a čáry, mazání bodu, Redo, „Finish“ → soubor test51, obnovení po reloadu | hotovo, potvrzeno uživatelem (2026-10-30) |
| 27 | Plánovač tras: dotyk (posun, mazání, vložení bodu), „Back to start“, lišta na 320 px, README, přepínač `?planner=1` odstraněn | hotovo, potvrzeno uživatelem (2026-10-30) |
| 28 | Odstranění tlačítka Share a kódu pro sdílení | hotovo, potvrzeno uživatelem (2026-10-31) |
| 29 | Výstup: `creator="AddTurn gpx 1.0"` a konce řádků (pokus s hodinkami) | hotovo, potvrzeno uživatelem včetně importu do aplikace Suunto (2026-10-31); chování na hodinkách zatím nenahlášeno |
| 30 | Generátor doplňuje Name; Fit route při plánování; poloha se dá skrýt | hotovo, potvrzeno uživatelem (2026-10-31) |
| 31 | Settings: drawer zprava s API klíčem a parametry generátoru | hotovo, potvrzeno uživatelem (2026-10-31) |
| 32 | Otevření GPX ze systému: Android přes Sdílet (`share_target`), počítač přes `file_handlers` | hotovo, Android (Sdílet) potvrzen uživatelem (2026-11-03), počítač čeká na test |
| 33 | „Already installed“ u dvou aplikací: chyba Chrome 154–156, oprava README; **doplněno 2026-11-06:** rozhodla až oprava manifestu (absolutní `start_url` a `scope`, commit uživatele) | vyřešeno uživatelem (2026-11-06), instalace obou ověřena i na tabletu |
| 34 | Turns in advance: odbočky z generátoru X m před křižovatkou (Settings); opravy rozcestí, bariéry předstihu, U-turn na otočkách | hotovo, potvrzeno uživatelem (2026-11-05); na hodinkách T10 |
| 35 | Edit route: posun, smazání a vložení bodů trasy mimo plánovač (mezikrok k přeplánování) | hotovo, potvrzeno uživatelem (2026-11-05) |
| 36 | Edit route: hledání cesty (Follow roads, GraphHopper) při posunu, vložení a smazání bodu | hotovo, potvrzeno uživatelem (2026-11-05) |
| 37 | Zjednodušení: Generate turns jedním tlačítkem (Replace, hned zapsat), karta generátoru zrušena | hotovo, potvrzeno uživatelem (2026-11-05) |
| 38 | Zjednodušení editoru waypointu: bez Position on route (Previous / Next point, tip o tažení) | hotovo, potvrzeno uživatelem (2026-11-05) |
| 39 | Pokyny podle tvaru křižovatky, jedna funkce pro generátor i nápovědu v editoru, Minimum angle zrušeno | hotovo, čeká na test uživatele |
| 40 | Volba průchodu pro waypoint na místě, kudy trasa vede víckrát (dialog, Pass v editoru) | hotovo, potvrzeno uživatelem (2026-11-05) |
| 41 | Edit route: klik bod vybere (Remove / Delete), průchozí body (ručně upravené a z plánovače) | hotovo, potvrzeno uživatelem (2026-11-07) |
| 42 | Úhel odbočky z větví křižovatky na mapě místo z čáry trasy | hotovo, testy 220/220 na Linuxu (2026-11-10), oprava ověřena uživatelem |
| 43 | Úzké rozcestí: větve pod 10° sloučit jen u čar ležících přes sebe (5–30 m) | hotovo, potvrzeno uživatelem (2026-11-10) |
| 45 | Pokyn přímo na křižovatce, kterou trasa projíždí; směry větví v 5/10/20 m (největší úhel); oprava „T“ na okraji dlaždice | implementováno na PC bez Node.js, ověřeno v headless Chrome; sady na Linuxu upraveny (2026-11-14, 229/229); čeká na test uživatele; vlastní testy pravidel cyklu 45 chybí (TODO) |
| 44 | Výstup ve formátu Suunto Routeplanner podle vzoru od uživatele (nahrazuje test51) | implementováno na PC bez Node.js; testy uloženého formátu na Linuxu upraveny a doplněny (2026-11-14, 229/229); čeká na test uživatele (hodinky) |
| 46 | Fork / Bear sensitivity v Settings (Low / Normal / High = 40 / 60 / 75°), každou větev řídí nejvýš jedna citlivost | implementováno na PC bez Node.js, ověřeno v headless Chrome; sady na Linuxu procházejí (2026-11-14), vlastní test citlivosti chybí; čeká na test uživatele |
| 47 | Výběr větve trasy v křižovatce podle směru trasy v 10 a 20 m (oprava Keep right → Keep left, Brno 2026-11-13) | hotovo, potvrzeno uživatelem (2026-11-13, i Okruh 12 km); sady na Linuxu procházejí (2026-11-14) |
| 48 | Výstup bez doprovodných „Waypoint N“ k odbočkám (Route waypoints jen body zájmu) | implementováno, ověřeno v headless Chrome; testy na Linuxu (2026-11-14); čeká na potvrzení uživatele |
| 49 | Volba Settings → Saved file: Crossroads hned za každou odbočkou (pokus pro pole vzdálenosti k POI) | implementováno, ověřeno v headless Chrome; čeká na test uživatele na hodinkách |
| 50 | Volba Settings → Saved file: Write waypointIndices (Begin, odbočky, body zájmu, End; vypnuto = bez sekce, výchozí) | implementováno, ověřeno v headless Chrome; test na Linuxu (2026-11-14); čeká na potvrzení uživatele |
| 51 | Klička: dvojice pokynů na opačné strany blíž než rozestup → oba (dá-li se splést), jinak žádný | implementováno, ověřeno v headless Chrome na 13 trasách; sady na Linuxu procházejí (2026-11-14), vlastní test kliček chybí; čeká na test uživatele |
| 52 | Crossroads ke každé odbočce z generátoru s vlastním předstihem od křižovatky (Settings → Generate turns), pořadí v souboru podle trasy | implementováno, ověřeno v headless Chrome; testy na Linuxu (2026-11-14); čeká na test uživatele na hodinkách |
| – | Regresní testy na Linuxu po změnách z Windows (cykly 44–52): sady upraveny a doplněny | hotovo (2026-11-14), 229/229; čeká na potvrzení uživatele |
| 53 | Odlišení vygenerovaných Crossroads na mapě (menší, potlačené, pod ostatními; odznak na odbočce při 0 m), ruční úprava = uživatelův bod | implementováno (v78), testy 232/232; čeká na test uživatele |
| 54 | Crossroads podřízená odbočce: nebrání odbočkám; vygenerovaná se nevytvoří do 20 m za předchozím waypointem ani před ním | implementováno (v79), testy 236/236; čeká na test uživatele |
| 55 | Seznam waypointů: vzdálenost od startu, od předchozí odbočky, od předchozího waypointu (ne odbočky), výška | implementováno (v80), testy 237/237; čeká na test uživatele |
| 56 | Přichycení waypointů na trasu při otevření (do 20 m od čáry, Settings → Opening a file), Snap to the route na čáru (nový bod trasy), červené označení bodů mimo trasu | implementováno (v81), čeká na test uživatele |
| 57 | Kurzor přesýpací hodiny, když aplikace pracuje (wait při otevírání souboru, progress při čekání na síť) | hotovo, potvrzeno uživatelem (2026-11-14) |
| 58 | Přichycení trasy k cestám (Snap to roads): map matching po síti z dlaždic / Overpass, náhrada tvarem cest, nepřichycené části červeně; tlačítko + Settings (při otevření, max. 25 m) | hotovo, potvrzeno uživatelem (2026-11-14) |
| 59 | Přesýpací hodiny (wait) i při výpočtu Generate turns a Snap to roads | implementováno (v84), čeká na test uživatele |

## Deník
### Cyklus 0 (2026-10-16)
- Prostudován OK-Trainer jako vzor (jeden index.html, PWA, prefers-color-scheme).
- Rozhodnutí uživatele: editují se waypointy; import URL přímo + záloha; UI anglicky; poznámky v `docs/dev/`.

### Cyklus 1 (2026-10-16)
- Specifikace: název „AddTurn GPX“; mapa vždy ve světlém provedení, tmavý režim jen pro GUI.
- Soubory: `index.html`, `manifest.json`, `sw.js`, `icon.svg`, `vendor/leaflet/` (Leaflet 1.9.4 z npm, ověřen sha512 integrity hash).
- Desktop: horní lišta + boční panel (skrývatelný, stav v localStorage). Mobil (≤760 px nebo dotyk s výškou ≤500 px): ikonová tlačítka 44 px, vysouvací spodní panel.
- Mapa: OSM dlaždice, atribuce, tlačítko „moje poloha“, pamatuje si pozici/zoom (localStorage `addturngpx.view`).
- Service worker cachuje jen soubory aplikace (stejný origin), ne mapové dlaždice.
- Test: headless Chrome přes CDP (desktop/mobil × světlý/tmavý, rozbalený panel, skrytý panel, telefon na šířku, tablet) — bez chyb v konzoli, dlaždice načteny, žádný horizontální scroll.
- Opraveno: úchyt spodního panelu přes celou šířku, těsná výška sbalené hlavičky.
- Chyba od uživatele: v Chrome přes `file://` vrací OSM dlaždice 403 „Access blocked“ — prohlížeč u file:// neposílá Referer, který OSM tile policy vyžaduje. Nelze obejít z aplikace. Řešení: u file:// trvalá hláška s návodem (lokální http server); u tile layer explicitně `referrerPolicy: strict-origin-when-cross-origin`. Přes http(s) (localhost, GitHub Pages) funguje.
- Uživatel otestoval v Chrome na desktopu, vše OK. Dále bude testovat přes GitHub Pages.

### Cyklus 2 (2026-10-16)
- Specifikace: `?url=` ano; relace v IndexedDB ano; šipky směru + značky start/cíl; vzorky v `samples/`.
- Během cyklu upřesněno uživatelem: hlavní cíl = Suunto GPX (sdílený odkaz na api.sports-tracker.com); formát souboru zachovat naprosto přesně, editovat jen wpt; začátek/konec zobrazit, needitovat.
- Implementováno: Open (File System Access API / input), drag & drop, Open URL dialog s chybovými hláškami a „Open local file instead“, `?url=`, převod github blob → raw, parsování GPX 1.0/1.1, kreslení trk/rte, šipky směru, S/F, seznam waypointů s výběrem (mapa ↔ seznam), info o souboru, zavření souboru, relace v IndexedDB.
- Test (headless Chrome, `scratchpad/test/scenario.mjs` + `cycle2.json`, `cycle2b.json`): 28 kroků — všechny vzorky, chybné soubory, 404, CORS blokace, neplatná URL, skutečný Suunto odkaz, `?url=` OK i chyba, obnovení relace, mobil (sheet, výběr sbalí sheet), zavření souboru. Bajtová shoda `gpx.text` se souborem po načtení i po obnovení relace, BOM zachován.
- Opraveno: overlay „Drop“ viditelný stále (`display:flex` přebíjel `hidden` → globální `[hidden]{display:none!important}`); u Begin/End duplicitní typ v seznamu; vybraný Begin ukazoval „F“.
- Uživatel otestoval import (GitHub Pages) — OK. `Waypoint1` je jeho testovací bod (použít pro test mazání).
- Chyba od uživatele: po výběru ze seznamu zůstal otevřený popisek předchozího (blízkého) bodu a překryl nový. Opraveno: při změně výběru `closeTooltip()` předchozího, vybraný marker `zIndexOffset 3000`. Cache v4.
- Uživatel potvrdil: popisky při přepínání aktivního waypointu OK (GitHub Pages).

### Cyklus 3 (2026-10-16)
- Specifikace: šipka v oranžovém kroužku natočená podle příjezdu; v seznamu nenatočená; varování u wpt mimo bod trasy (Suunto ho ignoruje). Typy dle tabulky od uživatele (DESIGN.md).
- Implementováno: `TURN_TYPES` (10 typů, levé = zrcadlené pravé SVG), obecná ikona pro bod bez typu / neznámý typ („Waypoint“), čitelné názvy typů (Bear right…), natočení podle příchozího úseku (index vrcholů podle souřadnic; u více výskytů — trasa tam a zpět — první výskyt za předchozím wpt), fallback nejbližší úsek; varování se vzdáleností k nejbližšímu bodu trasy (šedá značka s červeným čárkovaným okrajem); soubor bez trasy → upozornění v info o souboru; číslování jen editovatelných bodů.
- Nový vzorek `samples/all-turn-types.gpx` (Suunto styl, geometrie odpovídá typům, bod bez typu „Water“, bod „Off route“).
- Test: `cycle3.json` + regrese (`cycle2`, `cycle2b`, `tooltip`) — natočení všech typů odpovídá příjezdu, varování jen u „Off route“ (a u syntetických vzorků, které na trase neleží), bajtová shoda zachována.
- Opraveno během testu: bod za U-turn bral směr z dřívějšího průjezdu stejným bodem.

### Analýza Suunto specifikace + cyklus 3b (2026-10-16)
- Analýza https://apizone.suunto.com/route-description → DESIGN.md („Suunto specifikace – analýza“): 78 typů, pravidla vzniku waypointů, více trk/rte = více tras, priorita názvu trasy, credentials nejsou potřeba.
- Rozhodnutí uživatele: hned B+C+G+H; F (wpt z rtept/trkpt) jen zobrazit — později; E ikona pro každý typ bodu zájmu — později; D kruhové objezdy — později.
- Implementováno: `SUUNTO_TYPES` + `canonType` (case-insensitive), neznámý typ → „Waypoint“ + upozornění, „Name on watch“, upozornění na více tras, body zájmu se nenatáčí. Cache v6.
- Vzorek `samples/suunto-spec-cases.gpx` (malá písmena, neznámý typ, POI, jen name, jen type, 2× rte s name/desc).
- Test `cycle3b.json` + regrese (cycle2, cycle2b, cycle3, tooltip) bez chyb.

### Cyklus 3c (2026-10-16)
- Uživatel potvrdil 3b, chce dokončit D/E/F před editací.
- D: 6 typů kruhových objezdů (`Roundabout_exit_{1..5,n}_turn`) — kruh + příjezd (natáčí se), číslo výjezdu nenatočené.
- E: `POI_TYPES` — 60 typů (vč. Waypoint) s ikonou; Tabler Icons 3.19.0 (MIT, ověřen sha512) + 5 vlastních SVG; kategorie poi/danger/generic → barva značky.
- F: waypointy z rtept/trkpt s name/type — zobrazeny jen pro čtení, natočené podle příjezdu, Begin/End z bodů trasy → S/F (bez zdvojení).
- Vzorky: `samples/roundabouts-and-pois.gpx`, `samples/route-point-waypoints.gpx`.
- Test `cycle3c.json` (list všech 78 typů, objezdy, POI, body z trasy, mobil tmavý) + plná regrese — bez chyb. Upraveno: větší kruh objezdu, aby číslo bylo čitelné.
- Dotaz uživatele: „Separate wpt“ byl v seznamu před „Begin“ — nebyl to záměr (seznam = nejdřív wpt, pak body z trasy). Opraveno: seznam řazen podle polohy podél trasy (`routePos`: pořadí čáry + pořadí bodu, u bodu mimo trasu místo na nejbližším úseku), Begin vždy první, End poslední, při shodě/bez trasy pořadí v souboru. Kliknutí na značku přes `indexOf(item)`. Cache v8.
- Pozn.: bod mimo trasu vedle úseku, kudy trasa vede tam i zpět, se zařadí k prvnímu průjezdu (nejednoznačné).

### Cyklus 4 – specifikace (2026-10-16)
- Umístění jen na existující body trasy (přichycení, souřadnice textově zkopírované); trasa se nemění.
- Návrh typu podle úhlu trasy v bodě (≤15° rovně, ≤45° mírně, ≤135° odbočka, ≤170° ostře, jinak U-turn; směr ±), vždy jde změnit.
- Undo/Redo vícekrokové (Ctrl+Z / Ctrl+Y), historie jen v paměti.
- Editor: typ (výběr s ikonami: odbočky + objezdy, body zájmu) + název; existující desc a ostatní obsah zůstanou.
- Přidat (režim přidávání, klepnutí na trasu), přesun ◀/▶ po bodech trasy + tažení na desktopu (přichytí se), smazat s potvrzením; `<ele>` z bodu trasy.
- Všechny změny přímo v původním textu (jen dotčené úseky `<wpt>`); nový wpt ve stylu sousedů, pořadí wpt v souboru = pořadí na trase.
- Značka „Modified“, potvrzení před zavřením / otevřením jiného souboru. Relace ukládá upravený text (beforeunload netřeba — práce přežije reload).

### Cyklus 4 – implementace (2026-10-16)
- Textové úpravy otestovány nejdřív samostatně v Node (scratchpad/tt/run.js) na Suunto, víceřádkovém, bez-wpt a self-closing souboru + BOM; všechny výstupy well-formed.
- UI: tlačítka Add / Undo / Redo v liště; editor v panelu (typ – mřížka ikon: odbočky+objezdy, rozbalovací body zájmu; název; ◀/▶ po bodech trasy nebo „Snap to nearest route point“ u bodu mimo trasu; Delete s potvrzením); režim přidávání s lištou a tečkami bodů trasy; tažení na desktopu; „Modified“; potvrzovací dialog před zavřením / otevřením jiného souboru (i při startu s `?url=` a neuloženou relací).
- Test `cycle4.json` (17 kroků) + plná regrese: změna typu/názvu mění jen obsah elementu, Undo vrátí bajtově přesný originál (dirty=false), Ctrl+Y, ◀/▶ s přeřazením, přidání s návrhem typu, klik mimo trasu → hláška, smazání, relace po reloadu (Modified), potvrzovací dialog, přichycení cizího bodu (víceřádkový formát), tažení, mobil.
- Opraveno během testu: přesun za jiný wpt posouval zalomení řádků → „sloty“; headless nehlásí `pointer: fine` → tažení povoleno pro `not coarse`; zkrácená lišta přidávání na mobilu. Cache v9.

### Cyklus 5 – specifikace (2026-10-16)
- Ukládá se přesně text v paměti (UTF-8; BOM, konce řádků, deklarace beze změny). Po uložení zmizí „Modified“.
- Chrome/Edge desktop: Save přepíše původní soubor (File System Access, oprávnění jednou), Save as… = systémový dialog; soubor z URL → Save = Save as. Ostatní prohlížeče / mobil: stažení. Ctrl+S / Ctrl+Shift+S.
- Mobil: navíc „Share…“ (Web Share API se souborem), jen kde to prohlížeč umí (Chrome Android .gpx nejspíš nepovolí — ověřit v praxi).
- Název souboru stejný jako původní.
- Soubory s jiným kódováním než UTF-8: načíst ve svém kódování, při uložení převést na UTF-8 + upravit deklaraci (s upozorněním).

### Cyklus 5 – implementace (2026-10-16)
- `saveGpx`: Save = přepsat přes uložený file handle (oprávnění `readwrite` dle potřeby), jinak `showSaveFilePicker`, jinak stažení (`<a download>`). Save as… a Share… v info o souboru (Share jen když `navigator.canShare` soubor přijme). Ctrl+S / Ctrl+Shift+S (i při psaní v poli). Po uložení `cleanText` = uložený text → „Modified“ zmizí, Undo funguje dál.
- Kódování: `decodeText` čte podle deklarace (např. windows-1250), `textForSave` převede na UTF-8 a upraví jen deklaraci; upozornění v panelu a v hlášce.
- Vzorek `samples/windows-1250.gpx`.
- Test `cycle5.json` (mock `showSaveFilePicker`/handle + skutečné stažení přes CDP `Page.setDownloadBehavior`): uložení beze změn = bajtově stejné (i stažený soubor, `cmp`), Ctrl+S po úpravě přepíše přes handle a změní jen typ, Undo po uložení → Modified, Save as, windows-1250 → UTF-8 s češtinou, BOM zachován, zrušení dialogu bez chyby, mobil. Plná regrese bez chyb. Cache v10.
- Opraveno: hláška o převodu kódování ukazovala „UTF-8 to UTF-8“.
- Během cyklu nahlášeno uživatelem (TODO): přidání wpt na dlouhém úseku bez bodů; satelitní mapa.
- **Reálný test uživatele (test51.gpx):** upravený soubor naimportován do Suunto, hodinky trasu načetly, navigovaly a ukazovaly vzdálenost k dalšímu POI (= navigační instrukci). Pravidlo shodných souřadnic wpt/rtept potvrzeno v praxi.

### Cyklus 6 – specifikace (2026-10-16)
- Uživatel potvrdil výklad A: waypoint kdekoli na čáře trasy; kde v místě není bod trasy, vloží se nový bod přímo na čáru (tvar trasy beze změny). Odmítnuté výklady: B (bod mimo čáru), C (vždy nový bod jako Suunto).
- Detaily (navrženo Claudem, bez námitek): přichycení k existujícímu bodu do 12 px, jinak vložení; souřadnice/ele/time interpolované; styl od souseda; bez name/type; vložený bod po smazání wpt zůstává; ◀/▶ jen existující body; totéž při tažení.
- Dále: jemnější zoom kolečkem, tlačítko Fit route (ikona ⤢, „Show the whole route“) pod zoomem.

### Cyklus 6 – implementace (2026-10-16)
- Textové funkce `locateLinePoints`, `insertPointText`, `buildPointXml` (styl souseda vč. `" />"`), nejdřív otestované v Node (scratchpad/tt/run2.js): Suunto jednořádkový i podivně zalomený, track s time, self-closing trkpt, styl ze specifikace.
- `trackLines` nesou `kind`/`parent`/`idxs` (místo v souboru). `routeTargetAt`: bod do 12 px → existující; jinak do 40 px od čáry → nový bod na úseku (u konce úseku do 12 px → existující bod). `pointOnSegment`: poloha na čáře (Mercator), min. 6 desetinných míst, interpolace ele a u trkpt time. Nový bod uprostřed úseku → výchozí typ Waypoint. Totéž při tažení.
- Zoom: `zoomSnap 0.25`, `wheelPxPerZoomLevel 180` → kolečko po ½ úrovně, tlačítka +/− po 1. Ovládací prvek Fit route (⤢) pod „moje poloha“, neaktivní bez souboru; `fitRoute()` sdílí výřez s načtením.
- Test `cycle6.json` (10 kroků) + regrese: vložení uprostřed 225 px dlouhého úseku, Undo bajtově přesné, u bodu/konce úseku bez vložení, daleko → nová hláška, tažení na úsek, track s interpolovaným ele/time bez extensions, kolečko 0,5, Fit route. Cache v11.
- Pozn.: test BOM v cycle5.json potřebuje dočasný `samples/_bom-test.gpx` (po testu mazán) → bez něj 404.

### Cyklus 7 – specifikace (2026-10-16)
- Průzkum poskytovatelů (DESIGN.md „Mapové podklady“). Rozhodnutí uživatele: přepínač podkladů OSM (výchozí) + **OpenTopoMap** + **Esri World Imagery**; bez hybridní vrstvy; ČÚZK a Mapy.com ne → správa credentials není potřeba.
- Implementováno: `BASE_LAYERS` (OSM, OpenTopoMap {s} a–c maxNativeZoom 17 → zoom do 19 zvětšením, Esri World Imagery), `L.control.layers` vpravo nahoře, volba v localStorage. Cache v12.
- Test `cycle7.json`: přepínač, dlaždice Esri + atribuce, zapamatování po reloadu, OpenTopoMap na z19 bez chyb, mobil tmavý režim; regrese cycle2/2b/3c/4/6 bez chyb.

### Cyklus 7b – typ nového bodu z editoru (2026-10-16)
- Uživatel potvrdil výklad; implementováno samostatně kvůli jasnému commitu.
- Je-li vybraný editovatelný waypoint s typem bodu zájmu (POI_TYPES vč. Waypoint), nový bod dostane tento typ (`presetAddType`); typy odboček se nepřebírají (návrh podle úhlu). Lišta přidávání ukazuje typ („Tap the route to add a waypoint: Water point“), na mobilu zkrácená se třemi tečkami.
- Test `preset.json`: POI převzat i proti návrhu Left_turn, řetězení stejného typu, vybraná odbočka → návrh, bez výběru → návrh, mobil bez překryvu i s „Marine reserve“; regrese cycle4/6/2b. Cache v13.

### Cyklus 8 – specifikace (2026-10-16)
- Tlačítko „Generate turns…“ (v info o souboru) → karta v panelu s nastavením a **náhledem** na mapě (poloprůhledné značky, počet) → Apply. Jeden krok Undo.
- Režimy: **Add missing** (výchozí; doplní jen tam, kde v okolí není žádný waypoint) a **Replace all turns** (smaže odbočky typů, které generátor umí — Left/Right/Slight/Sharp/U-turn — a vypočítá nové; rozcestí, objezdy, rovně, body zájmu a Begin/End zůstanou — návrh Clauda, předložen uživateli).
- Výchozí min. úhel **20°**, min. rozestup **15 m** (rozhodnutí uživatele; v kartě jdou změnit, pamatují se).
- Úhel měřen na vzdálenost (okno = rozestup) před a za bodem; jedna zatáčka = jeden bod (z kandidátů v rozestupu podél trasy vítězí největší úhel); ochranná zóna = rozestup kolem všech zachovaných waypointů (i Begin/End, body z trasy) a začátku/konce čáry. Typ podle úhlu (≤45° mírně, ≤135° odbočka, ≤170° ostře, jinak U-turn). Rozcestí/objezdy/rovně se negenerují (z geometrie nelze poznat). Waypointy jen na existující body trasy, bez názvu.
- **Upřesnění uživatele během implementace:** instrukce mají smysl jen na křižovatkách — v zatáčce bez křižovatky negenerovat. Ověřeno: Overpass API (OSM) povoluje CORS, na test49 našel 1 křižovatku přesně v místě „Sharp right“. Rozhodnutí: **Overpass** (souřadnice trasy se posílají na overpass-api.de), větve = **všechny cesty vč. pěšin a stezek** (bez proposed/construction/abandoned…), navíc **rozcestí (fork)**, „rovně“ ne.

### Cyklus 8 – implementace (2026-10-16)
- Karta „Generate turns“ (tlačítko v info o souboru): režim Add missing / Replace all turns, min. úhel (výchozí 20°), min. rozestup (15 m), náhled na mapě, Apply = jeden krok Undo. Nastavení v localStorage `addturngpx.generator`.
- Křižovatky: Overpass `way(around:30, zjednodušená trasa (DP 5 m))[highway]; out geom;` → uzly s ≥ 3 sousedy; cache podle tvaru trasy; časový limit 90 s; srozumitelné chyby (síť, 429, HTTP, timeout).
- Detekce: nejbližší bod trasy ke křižovatce (≤ rozestup); úhel na okno = rozestup; rozcestí = právě 2 větve před jezdcem do ±60° (priorita, i při malém úhlu); jinak odbočka při |úhel| ≥ min. úhel; dedup podél trasy + ochranné zóny. Replace maže i fork typy (generátor je umí); objezdy, rovně, POI, Begin/End zůstávají.
- Test na „Vracov 5km.gpx“ (uživatel: problematické křižovatky, kde selhal Garmin i Suunto): 40 křižovatek, 8 pokynů (3× rozcestí s úhlem trasy 0–6°, 5 odboček); zatáčky −35°/+20° 300/200 m od křižovatky správně vynechány; průjezdy rovně bez pokynu. Apply: wpt přesně na rtept, pořadí trasy, `<rte>` i komentáře beze změny; opakované Add missing → 0; Replace 8/8; 2× Undo bajtově přesné; mobil. Regrese cycle4/6/preset/2b.
- Zjištění: Overpass blokuje HeadlessChrome (502) a curl (406) — běžný prohlížeč OK; test runner nastavuje běžný User-Agent. Hlavní server bývá pomalý (26–34 s); alternativní instance (private.coffee, kumi) z prohlížeče nefungují.
- Cache v15.

### Cyklus 9 – specifikace (2026-10-16)
- Pořadí dalších kroků dle uživatele: 1) waypointIndices, 2) pero na tabletu, 3) README.
- Ověřeno na „Vracov 5km.gpx“: `waypointIndices` = 0-based indexy rtept, na kterých leží wpt (Begin=0, End=36 ze 37 bodů).
- Řešení: po každé úpravě (commitEdit) seznam přepočítat z `<wpt>` ležících na bodech daného `<rte>` (shoda souřadnic, u opakovaných poloh výskyt v pořadí trasy), seřadit vzestupně, změnit jen text elementu a jen při rozdílu. Jen u souborů, které rozšíření mají; nic se nepřidává. Body z trasy (rtept s name/type) se nezapočítávají.
- Implementováno: `syncSuuntoIndices(text)` volané v `commitEdit` (všechny úpravy vč. generátoru a vložení bodu trasy). Cache v16.
- Test `cycle9.json` na Vracov: načtení beze změny (0,36); vložení POI na dlouhém úseku → 0,3,37; přidání na bod → 0,3,11,37; smazání POI → 0,11,37; 3× Undo bajtově přesné; mimo indexy a wpt se text nezmění; soubor bez rozšíření beze změny. Generátor ověřen s podstrčenými křižovatkami (Overpass měl výpadek, neodpovídal ani /api/status) → 0,14,16,21,36. Regrese bez chyb (cycle5 404 = známý chybějící dočasný BOM soubor).

### Cyklus 9b – instalace a sdílení (2026-10-16)
- Hlášení uživatele: Share nešlo ověřit; instalace na Androidu hlásí „This app is already installed“, i když není. Ověřeno: identifikátor z OK-Trainer převzatý není (start_url se liší). Pravděpodobná příčina: jen SVG ikony (WebAPK potřebuje PNG; OK Trainer Editor s PNG se instaluje) a/nebo zaseknutý stav dřívější instalace.
- Share: Chrome Android nepovoluje Web Share pro .gpx → tlačítko se nezobrazí (nezávisí na instalaci).
- Implementováno: `icons/icon-192.png`, `icon-512.png`, `icon-maskable-512.png` (obsah v bezpečné zóně 80 %), `apple-touch-icon.png` (z icon.svg přes Inkscape); manifest: `"id": "/addturngpx/"`, description, lang, PNG ikony + SVG; apple-touch-icon PNG; SW cachuje ikony (v17). Na dotykových zařízeních bez sdílení .gpx tip „Save the file, then open it from Downloads in the Suunto app“.
- Test: CDP `Page.getAppManifest` bez chyb, `Page.getInstallabilityErrors` prázdné, appId `…/addturngpx/`; tip jen na mobilu.
- Uživatel může zkontrolovat `chrome://webapks` a Nastavení → Aplikace.
- Výsledek u uživatele (Android): ani po 9b instalace nešla („already installed“, „Could not open app“); `chrome://webapks` AddTurn GPX neobsahoval. **Po odinstalaci OK-Trainer šla AddTurn GPX nainstalovat** → konflikt dvou PWA na stejném originu dushino.github.io (OK-Trainer manifest nemá `id`, rozsah vždy `./`). Doporučeno: nainstalovat AddTurn, pak znovu OK-Trainer a ověřit obě; případně doplnit `id` + PNG ikony i do OK-Traineru (jiný repozitář — jen se souhlasem uživatele).
- `chrome://webapks` po instalaci AddTurn (uživatel): Scope `https://dushino.github.io/addturngpx/`, Manifest Id `…/addturngpx/` — rozsah správný. Po instalaci AddTurn naopak nejde nainstalovat OK-Trainer („already installed“) → konflikt oboustranný.
- Hypotéza: manifest jen se SVG ikonami → Chrome nevytvoří WebAPK, „instaluje“ náhradně a takové instalace se na stejném originu blokují. AddTurn po 9b = řádný WebAPK.
- **Se souhlasem uživatele upraven i repozitář OK-Trainer** (necommitováno, commit/push dělá uživatel): `icons/` (192, 512, maskable 512, apple-touch 180 z jeho icon.svg), manifest `"id": "/OK-Trainer/"` + PNG ikony, apple-touch-icon PNG, sw.js ikony + `ok-trainer-v5`. CDP: bez chyb manifestu i instalovatelnosti. Čeká na ověření na Androidu (instalace OK-Traineru vedle AddTurn).
- **Vyřešení (uživatel):** problém s instalací byl zaseknutý stav Chrome v telefonu — pomohlo „Delete browsing data“; nyní jsou AddTurn GPX i OK-Trainer nainstalované a fungují. Můj mezitímní závěr „Chrome dovolí jen jednu PWA na origin“ byl **mylný**. Oprava ikon/id v obou aplikacích zůstává (je správná sama o sobě). Do README: při „This app is already installed“ / „Could not open app“ pomůže vymazat data prohlížení.

### Cyklus 10 – dotykové pero (2026-10-16)
- Specifikace (uživatel): Android tablet + aktivní pero (ne Samsung), používá nainstalovanou aplikaci. Pero: **tažení značek** (prst dál posouvá mapu) + **popisek při najetí perem**.
- Řešení: Pointer Events `pointerType` — v capture fázi `pointerdown` na mapě: pero/myš → tažení editovatelných značek povolit, prst → zakázat (Leaflet začíná tažení až na následném mousedown/touchstart). Najetí perem (`pointerover` s pointerType pen) otevře popisek značky. Nápověda k tažení v editoru i po prvním použití pera.
- **Zrušeno uživatelem během testu:** pero se chová jako přesnější klepnutí prstem, přesně podle očekávání → žádné zvláštní chování pera. Rozpracovaná implementace (tažení perem, popisek při najetí) byla ručně vrácena; index.html a sw.js jsou shodné s posledním commitem (cache zůstává v17).

### Cyklus 11 – README (2026-10-16)
- Osnova schválena (14 kapitol, CZ tyká jako OK-Trainer), se snímky, sdílený odkaz Suunto popsán obecně (bez neověřených názvů tlačítek).
- `README.md` (EN) a `README-CZ.md`; snímky `docs/img/` (overview, editor, generator, mobile — z trasy Vracov s vygenerovanými pokyny, JPEG). Neověřené názvy položek nastavení Chrome v CZ popsány obecně; tvrzení z fóra zmírněno.

### Cyklus 12 – specifikace (2026-10-18)
- Hlášení uživatele: Generate turns po smazání některých wpt (bez uložení) nenašel nic; nyní nenajde nic ani na čerstvé trase Vracov.
- Rozbor: (1) Overpass při přetížení vrací 200 s `remark` a prázdnými daty → bráno jako 0 křižovatek; (2) prázdný výsledek se cachuje → další pokusy nic, do reloadu; (3) odmítnutí bez CORS → zavádějící „no internet“. Navíc: API teď neodpovídá (homepage ano) — přetížení nebo limit IP; **moje testy jdou ze stejné veřejné IP jako uživatel** → v testech už Overpass neoslovovat (uložená data).
- 12a: `remark` = chyba, necachovat neúspěch, srozumitelné hlášky (přetížení / offline / timeout), tlačítko Try again, výrazný počet křižovatek; testy v repu `tests/` (runner + scénáře s očekáváním + uložená OSM data pro Vracov, mock Overpass).
- 12b (rozhodnutí uživatele): klik/klepnutí na trasu bez wpt → přidat (typ = typ vybraného bodu, je-li to bod zájmu, jinak návrh podle úhlu; jen v rámci sezení); klik na wpt nebo do ~20 px → výběr + editor; klik daleko od trasy → zrušit výběr; tlačítko Add a lišta zmizí; stejně na telefonu; ◀/▶ beze změny. Po 12b aktualizovat README a snímky.
- 12a implementováno: `remark` / prázdná či nečekaná odpověď = chyba; HTTP 429/502/503/504 a odmítnutí bez CORS → „server overloaded…“, offline → vlastní hláška, timeout `OVERPASS_TIMEOUT_MS`; cachuje se jen úspěch; karta: Try again, řádek s počtem křižovatek (0 → vysvětlení). Cache v18.
- **Chyba nalezená testem:** min. rozestup se používal i jako okno měření úhlu a max. vzdálenost bodu trasy od křižovatky → při větším rozestupu nesmyslné návrhy (300 m dalo víc návrhů než 45°). Opraveno: pevné `TURN_ANGLE_WINDOW_M = 15`, `JUNCTION_MATCH_M = 15`; rozestup jen pro odstup pokynů a od začátku/konce.
- **Testy v repu `tests/`:** `run.mjs` (vlastní statický server + headless Chrome + mock Overpass z `tests/fixtures/vracov-overpass.json` — data OSM API 0.6 kolem trasy Vracov, 76 cest; skutečný Overpass se v testech nevolá), `generator.json` (16 kroků vč. regrese „smazat bez uložení → znovu navrhne přesně smazané“ a „větší rozestup jen ubírá“), `editing.json` (11 kroků přesnosti textu). Vše prošlo.
- Závěr k hlášení uživatele: logika generátoru po smazání bodů funguje; pozorování způsobil nedostupný/přetížený Overpass (aplikace to dřív hlásila jako „0 nových“ a výsledek cachovala).
- **Hlášení uživatele po nasazení 12a (snímek):** „No junctions found near the route“ na trase Vracov. Reprodukováno: stejný dotaz na Overpass jednou vrátil 34 cest, o minutu později 0 cest bez `remark` (nejspíš vadná/přetížená instance za load balancerem). Oprava: `overpassQuery()` + v `loadJunctions` při prázdné odpovědi jedno automatické opakování po `OVERPASS_RETRY_MS` (2 s), pak chyba `OVERPASS_EMPTY` s Try again; prázdno se necachuje. Mock „empty“/„emptyOnce“ + 2 regresní testy; celkem 29/29. Cache v19.

### Cyklus 12b – implementace (2026-10-18)
- Uživatel potvrdil návrh beze změn (vč. kliku do prázdna = zavřít editor). Vlastní rozhodnutí (předloženo): dvojklik nepřibližuje (`doubleClickZoom: false`) — jinak by dvojklik na trasu přidal a hned vybral bod.
- Odstraněno tlačítko Add, lišta režimu přidávání a `addMode`. `map.on("click")`: otevřená karta generátoru → klik mimo trasu ji zavře, jinak nic; waypoint do 20 px (`nearestWptPx`) → výběr + editor; trasa (`routeTargetAt`) → `addWptAtTarget(target, presetAddType())`; jinak `deselectWpt()` (zavře editor, na mobilu sbalí panel). Esc zavře generátor / editor. Nápověda v panelu „Click/Tap the route to add a waypoint, … a waypoint to edit it.“ Cache v20.
- Test `tests/clicks.json` (11 kroků vč. mobilu, dlouhého úseku, generátoru); všechny sady 40/40. README EN/CZ a snímky `docs/img/` aktualizovány (bez tlačítka Add).

### Cyklus 12c – odolnost generátoru (2026-10-18)
- Uživatel: Overpass „víc nefunguje, než funguje“ — zvážit odstranění generátoru. Prověřeno: OSM editing API (`/api/0.6/map`) by technicky šlo (CORS, rychlé), ale API Usage Policy ho zakazuje pro read-only použití (odkazuje na Overpass) → nepoužít. Jiné instance Overpass z prohlížeče nefungují (CORS).
- Rozhodnutí uživatele: **A — ponechat a zodolnit**, pak vyzkoušet při běžném používání; při neúspěchu odstranit.
- Plán: trvalá cache dat o křižovatkách v IndexedDB (klíč = zjednodušený tvar trasy → vložení bodu na čáru nemění klíč; platnost 30 dní; „Refresh road data“), automatické opakování (max 3 pokusy, pauzy 5 s a 15 s) jen u opakovatelných chyb, průběh v kartě, zavření karty opakování zruší.
- Implementováno 12c: `overpassQuery` hází chyby s `retryable`; prázdná odpověď = opakovatelná chyba; `loadJunctions({force, onProgress, cancelled})`: paměť → IndexedDB store `junctions` (DB verze 2, klíč `roadDataKey()` = zjednodušená trasa DP 5 m na 5 des. míst, platnost 30 dní, max. 30 tras) → Overpass s až 3 pokusy (`OVERPASS_RETRY_DELAYS_MS` = 5 s, 15 s), zavření karty opakování zastaví. Karta: průběh pokusů, „Road data stored in this browser on … / downloaded now“ + „Refresh road data“. Cache v21.
- Testy: mock režimy `seq` a `http400`; generator.json 23 kroků (opakování, trvalé uložení po reloadu bez sítě, vložení bodu bez stahování, Refresh, HTTP 400 bez opakování, zavření karty zastaví opakování); všechny sady 45/45. README EN/CZ doplněno.

### Cyklus 13 – kategorie bodů zájmu (2026-10-18)
- Rozhodnutí uživatele: varianta B — skupiny Voda a moře (13), Příroda/terén/zvěř vč. lovu a rybaření (22), Jídlo a nocleh (12), Orientace a doprava (8) + beze změny Nebezpečí (4) a Obecný waypoint (1); ve výběru jeden oddíl „Points of interest“ s nadpisy skupin.
- Vlastní rozhodnutí (předloženo): vybraný bod už není modře vyplněný (kolize s modrou vody) — ponechá barvu typu, dostane modrý obrys + zvětšení. Barvy: voda #1c7ed6, příroda #5c940d (odlišná od S #2f9e44), jídlo a nocleh #8d5a2b, orientace #1098ad.
- Implementováno: `POI_GROUPS` (jediný zdroj kategorií; z dat ikon odstraněno `cat`), CSS barvy skupin, výběr = barva typu + modrý obrys (`box-shadow`) a zvětšení 1.3, výběr typu v editoru s nadpisy skupin a barevnou tečkou. Cache v22.
- Test `tests/categories.json` (5 kroků: 60 typů v 6 skupinách bez duplicit, dohodnuté přiřazení, odlišná barva každé skupiny na mapě, výběr ponechá barvu + obrys, 6 nadpisů a 60 tlačítek ve výběru); všechny sady 50/50. README EN/CZ: tabulka barev; snímek editoru znovu.

### Cyklus 14 – dokončení (2026-10-18)
- Logo + název v liště = odkaz na https://github.com/Dushino/addturngpx (nová záložka, `rel=noopener`, podtržení při najetí, focus obrys). README EN/CZ zmínka. Cache v23.
- `samples/prague-loop-1.1.gpx`: 4 wpt přichyceny na nejbližší trkpt (5,7 m, souřadnice textově zkopírované), jinak soubor beze změny. Brno už na bodech trasy leželo (49.1990 = 49.199 číselně) — v TODO byl omyl; multi-track nemá wpt.
- Testy: categories.json +2 kroky (odkaz loga, Praha bez varování); všechny sady 52/52.

### README – kapitola Na hodinkách (2026-10-18)
- Foto hodinek od uživatele → `docs/img/watch-navigation.jpg` (EXIF odstraněn). Popis jen podle uživatele: modré pole dole = upozornění na blížící se POI s ikonou a vzdáleností; pravé spodní pole = zbývající vzdálenost k dalšímu POI; ostatní pole dle nastavení displeje.
- Varování: při navigaci trasy pozpátku ukazují šipky špatně (pokyny platí pro směr plánování).
- Nastavení hodinek: vypnout navigaci po trase, zapnout upozornění na POI — přesné názvy a fotku dodá uživatel.

### README – doporučený postup (2026-10-18)
- Na přání uživatele: „Quick start“ nahrazen kapitolou **„Recommended workflow (tested on a watch)“ / „Doporučený postup (ověřeno na hodinkách)“**: aplikace Suunto → sdílený odkaz → AddTurn GPX (Open URL) → Generate/přidat → Save → import do aplikace Suunto → nastavení hodinek. Upozornění, že exporty odjinud (Routeplanner GPX, jiné plánovače) nejsou ověřené.
- Neověřeno (k potvrzení uživatelem): krok 1 „naplánovat v Routeplanneru a uložit do účtu Suunto, aby se objevila v aplikaci“; přesné názvy položek v aplikaci Suunto.
- Návrh k dotazu „ukládat ve struktuře test51“: soubory z doporučeného postupu už v této struktuře jsou (aplikace mění jen wpt). Pro soubory odjinud raději nejdřív import do aplikace Suunto → sdílený odkaz (struktura vznikne sama) než vlastní převod (nevíme, které rysy struktury jsou podstatné; falšovat `creator="Sports Tracker"` nedoporučeno).

### Cyklus 17 – výstup ve formátu test51 (2026-10-18)
- **Upřesnění cíle uživatelem:** AddTurn GPX má vždy ukládat soubory ve formátu `test51.gpx` (sdílený odkaz z mobilní aplikace Suunto) — ten se v hodinkách chová správně (waypointy hlásí jako waypointy). Soubory ze Suunto Routeplanneru se chovají jinak → jejich formát pro výstup nepoužívat; žádné vazby na Routeplanner.
- Rozhodnutí: `creator="Sports Tracker"` (jako test51); převod **při otevření** (upozornění + Modified); **všechny wpt s `<ele>`** (ruší rozhodnutí „nikdy“ z cyklu 16).
- Formát test51: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>`, `<gpx xmlns=GPX1.1 xmlns:xsi creator version="1.1" xsi:schemaLocation>`, vše na jednom řádku; `<metadata><name>` (+ `<author>` ze zdroje); wpt: Begin (ele,name,desc Auto-generated,type) → wpt v pořadí trasy (ele, [name], [desc], type) → End; `<rte>` jen `<rtept lat lon><ele/></rtept>`; žádné komentáře, extensions, waypointIndices, jmenný prostor suunto-rp.
- Převod: soubor už ve formátu (creator Sports Tracker, bez extensions/komentářů/trk) zůstane beze změny; jinak: trk/rte → jeden `<rte>` (souřadnice textově zachované), rtept/trkpt s name/type → samostatný wpt, chybějící Begin/End doplnit, instrukce Routeplanneru ponechat jako obyčejné wpt, z wpt ponechat jen ele/name/desc/type (ele z bodu trasy, chybí-li).
- Důsledek: `syncSuuntoIndices` (cykly 9, 16) odstraněn — po převodu waypointIndices neexistuje.
- Implementováno: `isSuuntoAppFormat` (creator Sports Tracker, GPX 1.1, jediný `<rte>`, bez trk/extensions/komentářů → beze změny), `convertToSuuntoFormat`, `prepareOpened` + `announceConversion` (toast, `dirty: true`) v `loadGpxText`, `openFromUrl` i `restoreSession` (starší relace s nepřevedeným souborem). Název do metadat: název rte/trk → metadata → `<gpx><name>` → název souboru. Author jen ze zdroje. Wpt mimo trasu → pořadí podle nejbližšího bodu trasy (zůstanou s varováním). Duplicitní rtept z Routeplanneru (u jeho waypointů) se zachovají.
- `<ele>` znovu: nový wpt, přesun (vždy nastaví), generátor. `syncSuuntoIndices`/`suuntoPlacement` odstraněny. Cache v26.
- Testy: zastaralé testy waypointIndices nahrazeny 7 kroky převodu (test51 beze změny, idempotence, Routeplanner → hlavička/1 řádek/bez extensions/Begin…End v pořadí/ele, pořadí prvků wpt, track → jeden rte + Begin/End Auto-generated, rtept s name/type → wpt, obnova staré relace); všechny sady 60/60. README EN/CZ (Saving, úvod, doporučený postup), tests/README.

### Cyklus 18 – název trasy (2026-10-21)
- Požadavek uživatele: editovat `<name>` trasy (původně dialog při Save as…). Rozhodnutí: pole **kdykoli v panelu** (místo řádku „Name on watch“), změna = běžná úprava s Undo a Modified; při vzniku nového souboru (Save as…, stažení) navrhnout `<název trasy>.gpx`.
- Implementace: `setRouteNameText` mění element, ze kterého Suunto název bere: `<name>` v rte/trk, má-li rte/trk název nebo popis; jinak `<metadata><name>` (chybí-li, vloží se jako první potomek metadata; chybí-li metadata, vloží se `<metadata><name>` jako první potomek gpx). Prázdný název odmítnut (toast). `suggestedFileName()` (nepovolené znaky → „_“). Soubor bez trasy nebo needitovatelný: jen text „Name on watch“. Cache v27.
- Testy: editing.json +5 kroků; všechny sady 65/65. README EN/CZ, tests/README.

### Cyklus 19 – křižovatky z vektorových dlaždic (2026-10-21)
- Analýza a prototyp: DESIGN.md „Křižovatky z vektorových dlaždic“. Rozhodnutí uživatele: pořadí OpenFreeMap → OSMF → Overpass; testovací dlaždice v repu OK; ověření na dalších trasách provede ručně. Nápad „stáhnout dlaždici s větším zvětšením“: nejde, obě služby mají max. z14 (vyšší zoomy jsou jen zvětšené z14).
- Implementace (`index.html`): `TILE_SOURCES`, `routeTiles` (pás 30 m, z14), `mvtLines` (vlastní dekodér MVT), `junctionsFromTiles` (síť v pixelech P18 = z14×4096; body ořezu se nepřichytávají; T a X opravy sbírají všechna dělicí místa úseku a dělí najednou; průsečík v existujícím bodě jedné čáry dělí jen druhou; mosty/tunely se nekříží; skoro souběžné úseky < 10° nejsou křížení; větve < 10° sloučené; jen uzly do 40 m od trasy), `loadJunctionsFromTiles` (TileJSON u OpenFreeMap, max. 4 souběžně, 1 opakování dlaždice, 204/404 = prázdná, žádná cesta ve všech dlaždicích = chyba, strop 300 dlaždic), `loadJunctionsOverpass` (dřívější kód). Záznam v IndexedDB má `source`; karta: „Road data … from OpenFreeMap …“ a atribuce podle zdroje. Cache v28.
- Opravené chyby během vývoje: druhé a další dělení téhož úseku se přeskočilo; průsečík padnuvší do bodu jedné čáry se zahodil.
- Testy: nový `tests/tiles.json` (11 kroků; mock dlaždic v `run.mjs` s režimy fixture/blocked/down/empty/failOnce/live), fixture `tests/fixtures/tiles/` (24 dlaždic, 636 kB); `generator.json` běží se zablokovanými dlaždicemi (testuje Overpass). Všechny sady 76/76.
- Ověření naživo (2026-10-21, Vracov 5km): OpenFreeMap 1,7 s, OSMF 1,3 s, obě 25 křižovatek u trasy a stejných 8 odboček jako Overpass.
- Oprava (hlášení uživatele 2026-10-21): neuložené návrhy generátoru zůstaly na mapě po otevření jiné trasy. `setGpx` teď kartu generátoru zavře (náhled smazán, rozběhnuté stahování se zastaví) – platí pro otevření souboru, URL, obnovu relace i zavření souboru. Regresní test v generator.json; všechny sady 77/77. Cache v29.

### Cyklus 20 – karta generátoru (2026-10-21)
- Požadavek uživatele: tlačítko v panelu přejmenovat na „Turns generator“ (jen otevře kartu); ke Apply a Cancel přidat „Generate turns“, které spustí generátor s nastavenými parametry.
- Rozhodnutí: změna parametru (úhel, rozestup, režim) náhled smaže a zamkne Apply („Settings changed – press Generate turns…“); data o cestách se stahují až po prvním Generate turns.
- Implementace: `openGenerator` jen vytvoří kartu; `runGenerator({force})` (poprvé / Refresh stáhne data, jinak přepočet z načtených křižovatek); `invalidateGenerator`; hlavní tlačítko (`primary`) je Generate turns, dokud není platný návrh, pak Apply; id `gen-run`, `gen-apply`; nadpis karty „Turns generator“. Cache v30.
- Testy: generator.json +3 kroky (otevření nic nestahuje, Generate turns, změna parametru zruší návrh a další Generate použije uložená data); ostatní testy volají `runGenerator()` po otevření; všechny sady 80/80. README EN/CZ, nový snímek `docs/img/generator.jpg`.

### Cyklus 21 – kurzor myši (2026-10-21)
- Požadavek uživatele: výchozí kurzor ruka neodpovídá tomu, že klik přidá waypoint. Rozhodnutí uživatele: kurzor „podle místa“.
- Implementace: `mapCursorMode` (stejná pravidla jako obsluha kliknutí: u waypointu do 20 px → `pick`; jinak nad trasou, je-li soubor editovatelný a karta generátoru zavřená → `add`; jinak nic = ruka Leafletu), `updateMapCursor` (třídy `cur-add` / `cur-pick` na kontejneru mapy, CSS crosshair / pointer, při tažení mapy zůstává ruka díky `body:not(.leaflet-dragging)`), `mousemove` přes requestAnimationFrame, `mouseout` vrací ruku; jen pro myš (`canDrag`), po přidání bodu kliknutím se kurzor hned obnoví. Cache v31.
- Test clicks.json +1 krok; všechny sady 81/81. README EN/CZ.
- README (2026-10-22, požadavek uživatele): nové snímky `docs/img/overview.jpg`, `editor.jpg`, `mobile.jpg` (pole Route name, tlačítko Turns generator); `generator.jpg` už byl nový z cyklu 20. Snímky z headless Chrome s mockem dlaždic, panel odscrollovaný nahoru, „Downloaded from dushino.github.io“.

### Cyklus 22 – ikona s většími okraji (2026-10-29)
- Požadavek uživatele (snímek z Androidu): kolečko a začátek šipky jsou moc blízko okraje ikony.
- `icon.svg`: obsah zabalen do `<g transform>`. Zmenšen na 0,76 a vycentrován (střed obsahu 85,95 → 96,96), takže okraje jsou asi 21–23 % místo 9–11 %.
- PNG vyrenderované headless Chromem ze stejného zdroje. Chrome neumí okno menší než ~500 px, proto se 192 a 180 px zmenšují z 512 px (LANCZOS).
  - `icon-192.png` a `icon-512.png` (purpose any, zaoblený čtverec): měřítko 0,76.
  - `icon-maskable-512.png` (plná plocha): měřítko 0,6, obsah asi 45 % strany. Android z adaptivní ikony ukazuje jen asi 2/3, takže obsah tvoří asi 2/3 viditelné plochy.
  - `apple-touch-icon.png` (plná plocha, iOS jen zaoblí rohy): měřítko 0,76.
- Cache v32.

### Cyklus 23 – service worker nemaže cache jiných aplikací (2026-10-29)
- Zjištěno při řešení instalace na Androidu: AddTurn GPX a OK Trainer běží na stejném originu `dushino.github.io`, takže sdílejí úložiště cache (a localStorage/IndexedDB, AddTurn má klíče s předponou `addturngpx.`). `sw.js` při aktivaci mazal **všechny** cache kromě aktuální, tedy i cache OK Traineru. Po aktualizaci jedné aplikace tak druhá přišla o offline verzi.
- (Hlášení „aplikace je již nainstalována“ po odinstalaci s tím nesouviselo: manifesty mají různé `id` i `scope`. Pomohlo ukončit a znovu spustit Chrome.)
- Oprava: `CACHE_PREFIX = "addturngpx-"`, `CACHE_NAME = CACHE_PREFIX + "v33"`. Při aktivaci se mažou jen cache s touto předponou. Cache v33.
- Test v headless Chrome (incognito, s profilem na disku hlásil CacheStorage interní chybu): stránka na stejném originu založí `OK-Trainer-v9` a `addturngpx-v1`, zaregistruje `/addturngpx/sw.js` → zůstanou `["OK-Trainer-v9","addturngpx-v33"]`.
- Obdobná oprava v OK Traineru (2026-10-29): `CACHE_PREFIX = "ok-trainer-"`, cache `ok-trainer-v6`. Stejný test: zůstanou `["addturngpx-v33","ok-trainer-v6"]`.
- Potvrzeno uživatelem 2026-10-30.

### Cyklus 24 – start bez signálu (2026-10-30)
- Hlášení uživatele: ve vlaku na místě, kde Android hlásí nulový signál, aplikace zůstala na splash screenu (ikona uprostřed); v režimu letadlo naběhla hned. OK Trainer stejně.
- Příčina: `sw.js` byl network-first bez časového limitu. V režimu letadlo `fetch` hned selže (`ERR_INTERNET_DISCONNECTED`) → cache. Při „lie-fi“ (připojení hlášené, síť neodpovídá, `navigator.onLine` = true) `fetch` visí desítky sekund až minuty a cache se nepoužije; čekání se sčítá (`index.html`, pak `leaflet.js`/`.css` blokující vykreslení).
- Varianty (analýza pro uživatele): A network-first s limitem (pořád ~2× limit čekání), **B cache-first + aktualizace novým service workerem a lištou** (zvoleno uživatelem, B1), C podle `navigator.connection` (nespolehlivé).
- Implementace: `sw.js` – `CORE_URLS`, navigace na `./` i `./index.html?…` → `index.html` z cache; instalace s `cache: "reload"`; `networkFirst` s `NETWORK_TIMEOUT_MS = 3000` (bez kopie v cache čeká na síť, do cache jen `response.ok`, `waitUntil` pro dokončení na pozadí); neúspěšná navigace mimo aplikaci → `index.html` jen pro navigace (dřív i pro obrázky apod.). `index.html` – lišta `#update-bar` nahoře uprostřed mapy, `controllerchange` jen pokud stránka už měla controller (první instalace nic nenabízí), Reload = `await saveSession()` + `location.reload()`, ✕ = skrýt; `reg.update()` při návratu do popředí nejvýš 1× za 10 min. Cache v34.
- Pozn.: po pushi se první spuštění ukáže ještě ve staré verzi, nová přijde lištou (README EN/CZ doplněno).
- Testy: `run.mjs` – řízení serveru `/__server` (`?hang=1/0` = síť bez odpovědi, `?sw=<verze>` = podvržená nová verze sw.js); nový `tests/offline.json` (11 kroků). Se starým `sw.js` se běh zasekne na navigaci bez signálu (ověřeno). Všechny sady 92/92.
- Nepožadováno / na později: časový limit pro `openFromUrl` (odkaz `?url=` bez signálu visí, UI ale funguje); vlastní cache mapových dlaždic; stejná oprava v OK Traineru (uživatel: zatím neměnit).
- Potvrzeno uživatelem 2026-10-30 (lišta se zobrazila, aktualizace proběhla; start bez signálu zatím nevyzkoušen – uživatel se ozve při problému). Následně stejná oprava v OK Traineru.
- OK Trainer (2026-10-30, požadavek uživatele, `../OK-Trainer`, necommitováno): stejný `sw.js` (cache-first pro `CORE_ASSETS` vč. fontů a `keepalive.wav`, ostatní network-first 3 s), cache `ok-trainer-v7`. Do cache jen status 200 a chyba `cache.put` se ignoruje (audio chodí po částech 206). Lišta `#updateBar` s překlady `update_available` / `update_reload` / `update_later` (EN v `EN_STRINGS`, CZ v `Languages/Český jazyk pro aplikaci.json`; uživatel s dříve importovaným českým balíčkem uvidí lištu anglicky, dokud balíček neimportuje znovu). Reload bez ukládání (vše je průběžně v localStorage). README EN/CZ. Ověřeno stejným scénářem jako `tests/offline.json` (runner z tohoto repa s `ROOT` na OK Trainer): 11/11.
- OK Trainer potvrzen uživatelem 2026-10-30 (chová se stejně jako AddTurn GPX), commitnut. Test s pomalými / žádnými daty u obou aplikací uživatel provede později.

### Testy na hodinkách – fórum Suunto, odložení (2026-10-30)
- Prostudována vlákna fóra Suunto 15997 (dotaz uživatele) a 15071 (odpovědi Joaquina ze Suunta) a odpověď supportu; shrnutí v DESIGN.md → „Fórum Suunto a odpověď supportu“. Hlavní zjištění: pole „k místu zájmu / waypointu“ počítá jen waypointy, odbočky TbT jen v dosahu notifikace (~20 m).
- Rozhodnutí uživatele: AddTurn neměnit, počkat na nový firmware a pak testy zopakovat; do té doby pokusy jen příležitostně při běhu.

### Plánovač tras – revize přístupu (2026-10-30)
- Uživatel: nečekat na firmware, začít s plánovačem. Revize: OSRM vyřazeno definitivně (bez výšky; AddTurn výšku nezjišťuje, jen přebírá ze souboru; horší volba cest pro pěší, málo profilů).
- GraphHopper ověřen klíčem uživatele (Free plán): kvalita na Vracov 5km 100 % do 10 m, výška ano, CORS ano, jen profily car/bike/foot, přísný minutový limit. BRouter: MIT platí jen pro software, podmínky serveru nezveřejněné. Podrobnosti v DESIGN.md.
- **Rozhodnutí uživatele:** GraphHopper s vlastním klíčem každého uživatele; API klíč už nepovažuje za překážku. Autorovi BRouteru se psát nebude. Spec prvního cyklu čeká na potvrzení.

### Cyklus 25 – plánovač tras, jádro (2026-10-30)
- Rozsah potvrzen uživatelem: klíč, New route, profil, klik přidá bod, Undo, délka, převýšení; jen nová trasa; na mobilu klepnutí + Undo. Vše za `?planner=1`.
- Implementováno v `index.html` (oddíl „Plánovač tras“), fronta podle DESIGN.md. Hotovou trasu zatím nejde uložit ani přežít reload (další cyklus). Cache v35.
- Testy: `tests/planner.json` (22 kroků, mock GraphHopperu v `run.mjs`), všechny sady 114/114. Ověřeno i se skutečným API v headless Chrome (4 body, 3 úseky, desktop i mobil, snímky).
- Na mobilu je karta ve sbaleném panelu skrytá → délka v hlavičce panelu, chyby i jako toast.

### Cyklus 26 – plánovač tras, úpravy a výstup (2026-10-30)
- Cyklus 25 uživatel potvrdil („funguje výborně“).
- Implementováno podle plánu (DESIGN.md). Na dotyku zůstává přidání a Undo/Redo, tažení a mazání je jen pro myš.
- Testy: planner.json 35 kroků, všechny sady 127/127. Se skutečným API a skutečnými událostmi myši (CDP) ověřeno: tažení bodu, tažení čáry, klik na bod, klik na čáru, klik do mapy, Finish; výstup `isSuuntoAppFormat` = true.

### Cyklus 27 – plánovač tras, dotyk a zveřejnění (2026-10-30)
- Cyklus 26 uživatel potvrdil.
- Dotyk a „Back to start“ podle DESIGN.md. Lišta se na šířce do 350 px zúží. `?planner=1` odstraněn, plánovač vidí všichni. README EN/CZ: oddíl o plánování, klíč, Free plán, soukromí, atribuce. Doporučený postup se nemění. Cache v37.
- Při ověření skutečnými dotykovými událostmi (CDP) se ukázalo, že dlouhý stisk přes `contextmenu` přidal bod na konec místo do čáry → vlastní rozpoznání. Znovu ověřeno: klepnutí, výběr, přesun, dlouhý stisk (úsek 1100 m rozdělen), Back to start.
- Testy: planner.json 43 kroků, všechny sady 135/135. Na skutečném telefonu ověří uživatel.
- Test uživatele: dlouhý stisk na tabletu funguje, na desktopu myší podle návrhu nic. Klepnutí na bod a pak do mapy uživatel neodhalil, zkoušel bod táhnout prstem → doplněno tažení bodu prstem (výběr klepnutím zůstává). Cache v38, testy 137/137; ověřeno i skutečnými dotykovými událostmi.

### Oprava: generátor na okruhu (2026-10-30)
- Uživatel: na okruhu z plánovače nejdou vygenerovat odbočky. Příčina: `simplifyLine` měřil vzdálenost od přímky začátek–konec; u okruhu (shodné souřadnice) je to nulová úsečka, vyšlo 0 a zbyly 2 body → jen 1 dlaždice kolem startu. Týkalo se každého přesně uzavřeného okruhu, nejen plánovače; plánovač je kvůli „Back to start“ jen odhalil.
- Oprava: vzdálenost od úsečky (`L.LineUtil.pointToSegmentDistance`). Na souboru uživatele: dřív 1 dlaždice / 1 křižovatka / 0 návrhů, teď 4 / 28 / 9. Regresní test v generator.json, cache v39.

### Hranice ostré odbočky (2026-10-30)
- Uživatel: bod 7 na trase „Route 2026-10-30-7-WP-wrong“ je Turn left, má být Sharp left. Změřeno: 131° vlevo, okno 15 m nezkreslené (úhel je stejný do 25 m), hranice ostré byla 135°.
- Změna: ostrá odbočka od 120° (úhel cest ≤ 60°), do 170°. Pravidlo sjednoceno v `turnTypeFor`, ruční přidání (`suggestType`) ho používá také. Cache v40.
- Potvrzeno uživatelem. Oprava okruhu a hranice 120° fungují.

### Cyklus 28 – odstranění Share (2026-10-31)
- Uživatel: Share na Androidu vždy hlásí „Could not share the file: Permission denied.“
- Příčina: Chromium povoluje Web Share jen pro seznam přípon a MIME typů (`share_service_impl.cc`), `.gpx` ani `application/gpx+xml` v něm nejsou. `navigator.canShare` typ nekontroluje (jen že soubory jsou), proto se tlačítko zobrazilo a `share()` pak selhal s `NotAllowedError`. Zápis z cyklu 9b, že se tlačítko nezobrazí, byl chybný a tip se na Androidu nikdy neukázal.
- Jinde to nemělo smysl: Chrome na Linuxu sdílení nemá, Windows/ChromeOS stejný seznam, Safari na iOS 17/18 podle WebKit bugu 261498 GPX do aplikací nenabízí.
- Rozhodnutí uživatele: Share úplně odstranit. Pryč je tlačítko, `canShareGpx`, `shareGpx` i tip na dotykových zařízeních. Postup „ulož a otevři ze Stažených“ zůstává v README. Cache v41.

### Cyklus 29 – vlastní creator a konce řádků (2026-10-31)
- Požadavek uživatele: pole vzdálenosti k dalšímu waypointu se nepodařilo rozchodit, proto pokus: `creator="AddTurn gpx 1.0"` a konce řádků kvůli čitelnosti. Tím se ruší pokyn „v AddTurn zatím nic neměnit“.
- `version="1.1"` zůstává: je to verze schématu GPX, kterou `xmlns` a `xsi:schemaLocation` vyžadují. Řádky jsou bez odsazení.
- Řádky: deklarace, `<gpx>`, `<metadata>`, každý `<wpt>`, `<rte>`, každý `<rtept>`, `</rte>`, `</gpx>`. Vložení a mazání bodů konce řádků převezme z mezer v souboru.
- **Změna chování:** beze změny zůstává jen soubor s `creator="AddTurn gpx 1.0"`. Export ze Suunta (`Sports Tracker`) se teď při otevření převádí a je hned *Modified*, jinak by se ho pokus netýkal. Ověřeno na 23 vzorcích: obsahují jen prvky, které převod zachová (`ele`, `name`, `desc`, `type`, `metadata`, `author`).
- Testy: nové fixtures `tests/fixtures/addturn-example.gpx` a `addturn-test51.gpx`, 2 nové kroky (přesný text převodu test51, konce řádků po úpravách). Všechny sady 141/141. Cache v42.
- Návrat při neúspěchu: konstanta `GPX_CREATOR` a `join("\n")` v `convertToSuuntoFormat`; `isSuuntoAppFormat` při návratu zase přijme `Sports Tracker`.
- Test uživatele: změna v pořádku, aplikace Suunto vygenerovaný soubor importovala bez problémů. Chování na hodinkách (pole vzdálenosti) zatím nenahlášeno.

### Cyklus 30 – Name z generátoru, Fit route, skrytí polohy (2026-10-31)
- Generátor: nové waypointy mají `<name>` = `typeLabel(typ)` (text tooltipu, např. „Bear right“). Tooltip se nezmění, `wptLabel` stejný název neopakuje.
- Doplněno navíc (rozhodnutí Claude): když se změní typ a název se rovná textu starého typu, změní se s ním, jinak by zůstal např. typ Turn left s názvem Bear right. Vlastní název zůstává.
- Fit route při plánování: `fitRoute` znal jen `gpxBounds` ze souboru, při plánování je `null`, proto bylo tlačítko vypnuté. Nově `routeBounds()`: u plánu body + nalezené úseky. Stav tlačítka se obnovuje v `renderPlan` a `closePlan`.
- Poloha: přepínač místo kliku do mapy (uživatel navrhl obojí, klik do mapy má v editoru a plánovači jiný význam). Stavy off → busy → on, ikona zapnutá = modrá s plným středem, title „Hide my location“, `aria-pressed`. Klepnutí při hledání ho zruší; pozdní odpověď se ignoruje.
- Testy: 5 nových kroků, všechny sady 146/146. Cache v43, po zjednodušení níže v44.
- Zjednodušení (uživatel): Name dostane každá nově vytvořená odbočka, ručně i generátorem (`turnName`, typy z `TURN_TYPES`), bod zájmu ne. Při změně typu se prázdný název nebo text starého typu nahradí textem nového typu, u bodu zájmu se odebere; vlastní název zůstává. Starší waypointy se hromadně nemění, název dostanou až při změně typu. Cache v44.

### Cyklus 31 – Settings (2026-10-31)
- Rozhodnutí uživatele: drawer zprava (ozubené kolo v liště vedle tlačítka panelu), na telefonu přes celou obrazovku. Z karty generátoru Minimum angle / spacing úplně pryč. Dialog klíče zrušen: chybějící nebo odmítnutý klíč otevře Settings a po uložení plánování pokračuje. Tlačítko „API key“ z karty plánovače pryč.
- Implementace: `<dialog id="settings-drawer">` (modální, Esc, klik mimo), `openSettings`, `askGhKey` (kurzor v poli), `genSettings`, `commitGenInput`. Parametry platí hned; změna při otevřené kartě zruší návrh (`invalidateGenerator`), beze změny návrh zůstane. Hodnota rozepsaná při zavření přes Esc se taky uloží. Esc v draweru nezavře kartu generátoru.
- Otevření / import souboru uživatel do tohoto cyklu nezařadil, zůstává na později.
- **Oprava lišty:** sedmé tlačítko způsobilo přetečení na telefonech 351–388 px (běžné šířky) i na 320 px. Zúžení teď začíná na 390 px (38 px), pod 330 px je 36 px. Test dřív hlídal jen 320 px, nově 320, 330, 331, 360, 390, 391.
- Testy: nová sada `tests/settings.json`, všechny sady 157/157. Vzhled ověřen na snímcích (desktop, telefon). Cache v45.

### Oprava: odbočka v křížení bez společného bodu (2026-11-01)
- Uživatel: generátor na trase Vracov 5.5km nenavrhl odbočku 90° vlevo (Windows, Chrome, poprvé). Se systémem to nesouvisí, stejný výsledek na Linuxu (28 křižovatek, 8 odboček).
- Příčina: v dlaždici jedna cesta bod křížení nemá (ležel v přímce) a bod druhé cesty (3540, 3015) leží přesně na jejím úseku (3385, 2906)–(4160, 3451). Test křížení bral jen `t`, `u` v otevřeném intervalu, takže vyšlo `t = 1` a `t = 0` a křižovatka nevznikla. Test T to nezachytí, cesta tam nekončí.
- Oprava: `junctionsFromTiles` bere i krajní hodnoty, kromě umělých bodů ořezu dlaždice. Na trase uživatele teď 29 křižovatek, 9 odboček, `Left_turn` −91° v bodě 9, stejné typy a místa jako v ručně doplněném GPX uživatele. Tolerance 1 px zamítnuta, viz DESIGN.md (bod 4 u prototypu), tam i zbývající díra.
- Testy: nová fixture `tests/fixtures/vracov-5.5km.gpx` (trasa uživatele bez odboček), 2 nové kroky v tiles.json, bez opravy oba selžou. Všechny sady 159/159. Cache v46.
- Test uživatele: po Refresh road data se odbočka objevila, oprava potvrzena (2026-11-01).

### Mazání road data při nové verzi (2026-11-01)
- Rozhodnutí uživatele: při přechodu na novou verzi smazat uložená road data, aby se změna výpočtu projevila bez ručního Refresh road data. Původní nápad mazat vše kromě Settings zamítnut: `session` drží neuloženou otevřenou a plánovanou trasu a aktualizace přijde sama na pozadí; výřez mapy a podklad jsou drobnosti; mapové podklady aplikace neukládá.
- Implementace: `clearRoadData` v `sw.js`, volá se v `activate` vedle mazání starých cache. Názvy databáze a úložiště jsou v `sw.js` napevno a musí se shodovat s `index.html`. Chyba úložiště aktivaci nezastaví. Nevýhoda: po aktualizaci generátor potřebuje síť.
- Testy: 2 nové kroky v offline.json (bez mazání selžou), README EN/CZ doplněny. Všechny sady 161/161. Cache v47.
- Test uživatele na GitHub Pages: po přechodu na v47 karta ukázala „Road data downloaded now from OpenFreeMap“, potvrzeno (2026-11-01).

### Cyklus 32 – otevření GPX ze systému (2026-11-01)
- Požadavek uživatele: aby aplikace byla v androidím seznamu „Otevřít v aplikaci“. PWA to neumí (viz DESIGN.md → „Otevření GPX ze systému“). Rozhodnutí uživatele: varianta bez nativní aplikace, tedy Sdílet; tvorbě APK se zatím vyhnout.
- Manifest: `share_target` (POST, multipart, pole `gpx`) a `file_handlers` (`.gpx`). `launch_handler` záměrně není: `focus-existing` by na Androidu mohl sdílení doručit bez navigace, takže by se POST do service workeru vůbec nedostal.
- `sw.js`: POST na `shared-gpx` uloží soubor do cache `addturngpx-shared` (název v hlavičce `X-File-Name`) a přesměruje 303 na `index.html?shared=1`. Funguje bez sítě. Tu cache `activate` nemaže, aby ji aktualizace nesmazala mezi POSTem a načtením stránky; stránka ji po vyzvednutí smaže sama.
- `index.html`: `openSharedFile` (`startup` větev `?shared`: odstranit parametr, obnovit relaci, zeptat se na neuloženou práci, otevřít, jinak hláška). `openLaunchedFile` přes `launchQueue` počká na `started`, soubor si nechá handle, takže Save přepíše originál.
- Známá drobnost na počítači: bez `launch_handler` se soubor otevře v novém okně. To nejdřív obnoví relaci, takže při neuloženém souboru v jiném okně se zeptá. Práce v původním okně tím nezmizí.
- Ověřeno: nová sada `tests/shared.json` (19 kroků), všechny sady 180/180. `Page.getAppManifest` v Chrome 156: žádné chyby, aplikace jde nainstalovat, `shareTarget` načtený. `file_handlers` DevTools nevypisují, parser ale nehlásí chybu.
- **Neověřeno:** skutečné sdílení na telefonu a skutečné otevření souboru na počítači. DevTools příkazy `PWA.*` na Linuxu nejsou, testy proto dostávají náhradní handle. Cache v48.
- 2026-11-03: uživatel potvrdil sdílení na Androidu: AddTurn GPX je v seznamu *Sdílet* a sdílený soubor otevře. Otevření na počítači (*Otevřít v programu*) zatím neověřeno.

### Cyklus 33 – skutečná příčina „already installed“ (2026-11-01)
- Hlášení uživatele: AddTurn GPX a OK Trainer nejdou nainstalovat vedle sebe, oboustranně, hláška „aplikace je již nainstalována“. Dřívější závěry (cyklus 9b „zaseknutý stav Chrome“, cyklus 23 „pomohlo restartovat Chrome“) byly **mylné**, šlo jen o obcházení.
- **Příčina: chyba Chrome pro Android** ([crbug.com/568841400](https://crbug.com/568841400)). Od M154 (crrev.com/c/8257064) `WebappRegistry.isAppInstalledForUrl()` porovnává jen origin (`hasAtLeastOneWebApkForOrigin`), takže jedna WebAPK na `dushino.github.io` označí za nainstalovaný celý origin. Spuštění je přitom podle `scope`, proto „Open“ končí hláškou „Could not open app“. Popis v commitu odpovídá přesně našim příznakům včetně obou hlášek. Na manifestech, ikonách ani `id` to nezáleží, u nás jsou v pořádku.
- **Oprava v Chromiu:** commit `2e165cdb08d7` (2026-10-13, main #1717887), rozhodování podle `scope`. Ověřeno na tazích zdrojového kódu: 155.0.8058.0 a 156.0.8078.79 chybu mají, 157.0.8103.5 taky, 157.0.8103.14 a novější opravu mají, 158 taky. Plán stabilní 157: 2026-11-03, postupné nasazování (na Androidu byla 157.0.8103.30 k 2026-10-28 jen na 0,25 %).
- Proč pomáhalo „Delete browsing data“: *Cookies and site data* obsahuje `DATA_TYPE_WEB_APP_DATA`, to vyprázdní `WebappRegistry`, Chrome pak o první aplikaci neví a druhá se nainstaluje. Zároveň to ale maže `localStorage` a IndexedDB, tedy API klíč GraphHopperu a nastavení (a data OK Traineru). Proto tip z README odstraněn.
- Obejít z webu to nejde bez přechodu na jiný origin (vlastní doména, jiný hosting). Kvůli chybě, kterou Chrome opravuje, to nemá smysl: přesun by přišel o data uživatelů. V kódu aplikace se nic nemění, verze `sw.js` zůstává v48.
- Chrome Beta (158) opravu má a má vlastní seznam WebAPK, jde v něm tedy druhou aplikaci nainstalovat hned. Taková aplikace ale běží nad daty Chrome Beta, ne stabilního Chrome.
- Na originu jsou další PWA (Czech-HAREC-A-Trainer, OK-Trainer-Editor, TTSSpeller, bez manifest `id`). Chyba se týká i jich. `id` nemají, ale mají různé `start_url`, takže nesplývají.
- **Neověřeno:** instalace na telefonu s Chrome 157 (zdrojový kód ano, zařízení ne).
- Uživatel potvrdil, že na telefonu má Chrome 156 (2026-11-01), tedy verzi s touto chybou. Diagnóze to odpovídá.
- 2026-11-03: uživatel aktualizoval Chrome na 156.0.8078.79, chyba trvá. Odpovídá to diagnóze (156.0.8078.79 je mezi ověřenými verzemi s chybou). Čeká se na stabilní 157 přes Google Play.
- **2026-11-06, vyřešil uživatel:** na telefonu i PC už instalace obou šla, na tabletu se stejnou verzí Chrome ne, ať zkoušel cokoliv. Pomohla změna `manifest.json` (commit 571932a): `start_url` `./index.html` → `/addturngpx/index.html`, `scope` `./` → `/addturngpx/` (OK Trainer to tak měl už dřív). Závěr cyklu 33 „na manifestech nezáleží“ byl tedy **chybný**. Proč to pomohlo, když se oba tvary podle specifikace vyhodnotí na stejnou adresu, zůstává nevysvětleno (DESIGN.md → „Instalace vedle dalších PWA“). Claude doplnil zvýšení cache na v62, aby nový manifest dostala i zařízení s uloženou starou verzí (`manifest.json` je v cache-first `CORE_ASSETS`).

### Oprava: odbočky na cestě zpět (2026-11-05)
- Uživatel: na trase s „Back to start“ generátor nenavrhl odbočky na cestě zpět. Příčina: `computeTurns` přiřadil každé křižovatce jen jeden nejbližší bod trasy; trasa zpět vede přes stejné body, takže druhý průchod se nezkoumal. Na trase uživatele (živé dlaždice): dřív 2 odbočky (body 2, 6), teď 4 (+ 12 `Right_turn`, 16 `Right_at_fork_turn`).
- Další dvě chyby při ověřování: ochranná zóna měřená vzdušnou čarou by odbočku zpět zablokovala, když už je v souboru odbočka tam (soubor uživatele); `analyzeWpt` přiřadil druhý waypoint se stejnými souřadnicemi ke stejnému průchodu (`>=` místo `>`), takže ikona a pořadí patřily cestě tam.
- Rozhodnutí uživatele: odbočka zpět na stejných souřadnicích. Chování hodinek neověřené → TODO T9.
- Testy: fixture `tests/fixtures/vracov-out-and-back.gpx` (Vracov 5.5km, body 0–13 a zpět), 4 nové kroky v tiles.json (na původním kódu 3 selžou). Všechny sady 184/184. Cache v49.
- Test uživatele na GitHub Pages: generátor navrhuje odbočky na cestě zpět správně, potvrzeno (2026-11-05). Test na hodinkách (T9) později.

### Cyklus 34 – Turns in advance (2026-11-05)
- Nápad uživatele: generovat odbočky s předstihem v metrech – dřívější ohlášení v hodinkách a na trase tam a zpět vizuálně oddělené pokyny pro oba směry.
- Rozhodnutí uživatele: odbočka se **posune** (na křižovatce nic nezůstane); když by předstih přeskočil jinou křižovatku, **zkrátí se**; výchozí hodnota **0 m** (beze změny chování).
- Implementace: volba `lead` (Settings, 0–100 m po 5 m). `computeTurns` si pamatuje polohy všech průchodů kolem křižovatek; bod odbočky = `s − lead`, ale nejdřív `LEAD_GAP_M` (10 m) za předchozí křižovatkou nebo zachovaným waypointem a ne blíž začátku čáry než rozestup; existující bod trasy do 1 m, jinak nový bod na úseku (`at.seg/at.t`). `applyGenerator` vloží body trasy od konce čáry (indexy dřívějších bodů platí), pak waypointy; jeden krok Undo. Ochranná zóna zachovaných waypointů pokrývá i úsek předstihu, ale nesahá za předchozí křižovatku (při lead 0 beze změny).
- Opraveno navíc: pole v Settings neuložilo 0 (`Number(v) || předchozí`).
- Známé omezení: po změně předstihu může Add missing turns u odbočky z dřívějšího generování navrhnout druhou → README radí Replace all turns. Vložené body trasy po Replace zůstanou (tvar trasy se nemění).
- Ověření: Vracov 5.5km s 30 m: 9 odboček na nových bodech, u bodu 5 zkráceno na 11 m (předchozí křižovatka 21 m); trasa tam a zpět: odbočka tam a zpět u rohu 42 m od sebe. Snímky Settings (desktop, telefon) a karty v pořádku.
- Testy: 3 kroky v tiles.json, 1 v settings.json, upravená očekávání uloženého nastavení (settings.json, generator.json). Všechny sady 188/188. Cache v50.
- Oprava po testu uživatele (trasa Okruh 12km, předstih 10 m): waypoint 2 „Keep left at fork“ místo „Turn left“. Dvě příčiny: (1) rozcestí 12 m od bodu trasy, kde trasa už odbočila (−101°), mělo přednost, i když trasa nejede po žádné jeho větvi → kontrola větve (45°); (2) křižovatka ležící mezi body trasy se do bariéry předstihu zapsala polohou bodu za ní → předstih bod odbočky vložil 0,8 m od této křižovatky (pokyn o křižovatku dřív) → kolmý průmět. Výsledek: `Left_turn` na křižovatce bez předstihu.
- Testy: fixture `tests/fixtures/okruh-start.gpx` (začátek trasy uživatele bez dvou vložených bodů) + 2 dlaždice OpenFreeMap (2026-11-05), 2 kroky v tiles.json (na kódu bez opravy selžou). Všechny sady 190/190. Cache v51.
- Uživatel potvrdil, že po opravě rozcestí a bariéry generátor funguje lépe (2026-11-05).
- Otočka bez waypointu (trasa Okruh 12km): obě otočky leží na konci krátké odbočky slepou cestou (22 m za křižovatkou s `Right_turn`, 23 m), ne na křižovatce, a generátor dával pokyny jen na křižovatkách. Na hodinkách: „Turn right“, pak otočka bez pokynu. Rozhodnutí uživatele: U_turn na každé otáčce, i mimo křižovatku. Moje upřesnění: jen kde se trasa vrací po stejné cestě (serpentiny ne). Text karty generátoru a README EN/CZ upraveny (i rada opravit nechtěnou odbočku slepou cestou).
- Testy: fixture `tests/fixtures/okruh-uturn.gpx` (bez bodu vloženého předstihem) + dlaždice 8974/5622, syntetická slepá cesta a serpentina (poloměr 3 m – bez kontroly stejné cesty by U-turn dostala; poloměr 8 m test nehlídal, obrátí se o méně než 150°). Všechny sady 192/192. Cache v52.
- Test uživatele: generování U-turn v pořádku, potvrzeno (2026-11-05). Cyklus 34 tím uzavřen (na hodinkách T10).

### Cyklus 35 – Edit route (2026-11-05)
- Dotaz uživatele: body existující trasy mimo plánovač posunout nešlo – aplikace to neuměla (po Finish se plán zahodí, v editaci jsou body trasy jen neinteraktivní tečky). Cíl uživatele: editace trasy s přeplánováním; tento cyklus je mezikrok (varianta 1, bez hledání cesty).
- Rozhodnutí uživatele: režim přes tlačítko **Edit route** (klik na čáru v něm nepřidává waypoint); posun, smazání i vložení (ovládání jako v plánovači); zatím bez přichycení ke křižovatkám.
- Rozhodnutí Claude: waypointy na posunutém bodu jdou s ním (jen ty na tomto průchodu – `hit`), se smazaným bodem zmizí (toast); Begin/End drží první/poslední bod (při smazání krajního bodu přejdou na nový krajní); min. 2 body; posunutý bod si nechá výšku (není odkud ji vzít), vložený ji má interpolovanou; souřadnice s desetinnými místy jako sousedé (`coordDecimals`, sdíleno s `pointOnSegment`).
- Implementace: body trasy nejsou značky (stovky bodů) – myš zachytí `mousedown` ve fázi capture na kontejneru mapy, je-li do 8 px od bodu / čáry (jinak se mapa posouvá normálně, ovládací prvky Leafletu vynechány); dotyk stejně jako plánovač (24 px, dlouhý stisk `PLAN_HOLD_MS`), lišta `plan-bar` sdílená. Úpravy textu bajt po bajtu (atributy lat/lon, `cutElement`, `insertPointText`), každá jeden krok Undo. Waypointy v režimu nejdou vybrat ani táhnout, otevření generátoru režim ukončí, na telefonu se panel zavře a toast řekne, kde je Done.
- Opraveno po snímcích: aktivní tlačítko s třídou `primary` bylo v panelu prázdné (styl `.file-actions` přebíjí pozadí) → `aria-pressed` s rámečkem; nápověda „Click the route to add a waypoint“ se v režimu skryje.
- Testy: nová sada `tests/routeedit.json` (10 kroků, myš i dotyk; ověřeno, že bez posunu waypointu selže). Všechny sady 202/202. README EN/CZ: oddíl Editing the route / Úpravy trasy. Cache v53.
- Test uživatele: Edit route funguje, potvrzeno (2026-11-05). Další krok: hledání cesty při úpravě bodu (cyklus 36).

### Cyklus 36 – Follow roads v Edit route (2026-11-05)
- Rozhodnutí uživatele: přeplánovat úsek **mezi sousedními waypointy, nejdál 500 m** na každou stranu; waypointy v úseku: **odbočky smazat, body zájmu přichytit** (do 50 m, jinak smazat); **přepínač Follow roads**, výchozí zapnuto (vypnuto = rovné úpravy z cyklu 35).
- Důsledek (upřesněno): kotvami jsou všechny waypointy na trase, takže v úseku jsou vždy jen waypointy na upravovaném bodu. Kotvy = poslední bod před hranicí a první za ní; body kotev zůstávají beze změny (jejich text i waypointy), odpověď GraphHopperu bez krajních (přichycených) bodů je nahradí body mezi nimi. Krajní bod trasy: kotva jen na jedné straně, Begin/End přejde na nový krajní bod; smazání krajního bodu bez hledání cesty.
- Implementace: `reroute` → `rerouteAnchors` + `ghRoute` (1 požadavek, 2–3 body, profil z plánovače) → `rerouteText` (textová náhrada rozsahu `rtept`, souřadnice na 6 míst, výška z GraphHopperu, body zájmu vložené znovu v pořadí trasy); jeden krok Undo. Během čekání `redit.busy`: karta „Finding the route…“, další úpravy ignorovány; změna trasy mezitím (Undo) odpověď zahodí. Chyby: 400 → rada zkusit jinam / vypnout Follow roads, 401 → Settings, bez klíče → Settings.
- Testy: 9 nových kroků v routeedit.json (mock; ověřeno, že bez kotev z waypointů selžou), stávající kroky si Follow roads vypnou. Všechny sady 211/211. README EN/CZ. Cache v54.
- **Neověřeno se skutečným GraphHopperem** (jen mock) – čeká na test uživatele.
- Test uživatele se skutečným GraphHopperem: funguje, potvrzeno (2026-11-05).

### Cyklus 37 – Generate turns jedním tlačítkem (2026-11-05)
- Požadavek uživatele: místo tlačítka Turns generator (karta s režimy, náhledem, Apply/Cancel) rovnou **Generate turns** s chováním „Replace all turns“, výsledek hned zapsat; kartu odstranit.
- Rozhodnutí uživatele: atribuce dat o křižovatkách **do řádku atribuce mapy** (po prvním použití zdroje, v rámci relace); Refresh road data → tlačítko **Clear road data v Settings** (smaže všechna uložená data o cestách).
- Rozhodnutí Claude: průběh stahování pod tlačítkem („Generating…“, tlačítko zakázané), výsledek a chyby v hlášce; zavření souboru stahování (opakování) zastaví bez hlášky; změna trasy během stahování → hláška „press again“; Edit route zůstává otevřený. Hláška počítá **skutečný rozdíl** (odbočka se stejným typem a polohou smazaná a znovu přidaná se nepočítá) – jinak by Replace hlásil „Added 10, removed 11“ i při změně jedné odbočky; beze změny „The turns are already up to date.“ (a žádný krok Undo).
- Implementace: `proposeTurns()` (data + `computeTurns`, mode replace, parametry ze Settings, `over` pro testy) + `generateTurns()` + `applyTurns()` (dřívější applyGenerator, vrací rozdíl); odstraněny `gen`, karta, náhled `genLayer`, invalidace při změně nastavení, CSS karty. Settings: nadpis „Generate turns“, vysvětlení Replace, Clear road data.
- Testy: generator.json přepsán (21 kroků; ověřeno, že při režimu „missing“ selžou); tiles.json přes `proposeTurns` (pomocník `__T.open` plní `window.gen` ve starém tvaru), settings/clicks/routeedit/planner upraveny. Všechny sady 202/202 (méně kroků než dřív – sloučené chyby serveru, zrušené kroky karty). README EN/CZ přepsány, nový snímek `docs/img/generator.jpg`. Cache v55.
- Test uživatele: Generate turns funguje správně, potvrzeno (2026-11-05).

### Cyklus 38 – editor waypointu bez Position on route (2026-11-05)
- Požadavek uživatele: odstranit oblast „Position on route“ (◀ Previous point / Next point ▶ a tip „you can also drag the marker“) – v praxi málo použitelná.
- Rozhodnutí Claude: tlačítko **Snap to nearest route point** zůstává (na snímku uživatele nebylo): ukazuje se jen u waypointu mimo bod trasy, jediná rychlá oprava varování „Suunto will ignore it“, README na něj odkazuje v legendě barev; je teď bez nadpisu.
- Testy: nový krok v clicks.json. Všechny sady 203/203. README EN/CZ (řádek o Previous / Next), nový snímek `docs/img/editor.jpg` (starý ukazoval Turns generator i Position on route). Cache v56.
- Test uživatele: změna v pořádku, potvrzeno (2026-11-05).

### Cyklus 39 – pokyny podle tvaru křižovatky (2026-11-05)
- Podnět uživatele: „Bear left“ na křižovatce, kde trasa jen mírně uhýbá a jiná cesta vede jinam, může být chápán jako příkaz odbočit; generátor a nápověda v editoru se navíc lišily (generátor 15 m okna a od 20°, editor k bodu trasy ≥ 15 m, rovně do 15°).
- Analýza: tabulka všech průchodů křižovatkami na Vracov 5km, Vracov 5.5km, Okruh start/u-turn (46) s úhly větví; simulace pravidel. Samotná hranice úhlu nerozliší potvrzené rozcestí (větev 52°) od křížení (větve 41–54°) → rozlišení konce cesty, která trasu kříží (protější větev do 20°).
- Pravidla schválená uživatelem (s jeho doplněním: z více větví na jednu stranu → prudší „Turn“, mírnější „Bear“; bez zesílení, je-li na té straně ještě prudší větev): > 45° odbočka; žádná jiná větev vpřed → nic; 15–45° s blízkou větví na téže straně → Turn / Bear podle pořadí; jinak blízké větve na jedné straně → Keep left/right at fork, na obou → Straight on (při ohybu Bear), žádné → nic. Pokyn netřeba → nic (ne Straight on); editor pak navrhne Straight on. Minimum angle zrušeno.
- Rozhodnutí Claude: generátor teď vytváří i Straight_turn, proto ho Generate turns nahrazuje (GEN_TYPES) – i ručně přidané „rovně“. Editor bere křižovatku z dat o cestách v paměti; po otevření souboru se uložená data načtou z prohlížeče (bez stahování), editor se pak překreslí.
- Implementace: `routeTurnAt` (okna 15 m), `turnInstruction(e, inB, branches)` (bez větví jen úhel: ≤15 rovně, ≤45 mírně, jinak `turnTypeFor`), `suggestType` + `junctionNear`, `storedJunctions` (čtení z úložiště vyčleněno z `loadJunctions`). Priorita kandidátů: rozcestí a rovně 1000, otočka mimo křižovatku 900, jinak úhel.
- Výsledek na testovacích trasách: 6 změn ze 46 (Vracov 5km/4, 5.5km/3, Okruh/2, Okruh/13 bez pokynu; 5.5km/5 Keep right; Vracov 5km/1 Keep left přibyl). Vracov 5.5km 8 odboček místo 9.
- Testy: modelové křižovatky, typy na reálných dlaždicích, shoda editoru a generátoru, editor z uložených dat; ověřeno, že bez zesílení i bez rozlišení křížení testy selžou. Upravena očekávání (počty, předstihy, Settings bez úhlu). Všechny sady 206/206. README EN/CZ. Cache v57.
- Oprava (hlášení uživatele: vygenerováno „Turn right“, nápověda „Bear right“): s předstihem leží odbočka před křižovatkou a nápověda měřila úhel v bodě předstihu. Nápověda teď hledá křižovatku jako generátor: v bodě, nebo první křižovatku / otočku před ním ve směru jízdy nejdál o nastavený předstih; poloha křižovatky = průmět na trasu (`alongRoute`), takže křižovatka těsně za bodem (jejímž nejbližším bodem se vložený bod stal) se nepočítá. Společné `junctionPasses`, `isTurnaround`, `turnPrio`. Test shody na 5 trasách × předstih 0/10/30 m (78 odboček, bez hledání dopředu selže). Všechny sady 207/207. Cache v58.
- Další hlášení uživatele (2026-11-05, čeká na data): (a) dvě místa, kde trasa jde rovně a odbočuje vedlejší pěšina → vygenerováno Keep left/right, uživatel chce nic / rovně; (b) trasa se na křížení stáčí ~40° a rovně pokračuje křižující cesta → nic, uživatel čeká Keep left. Příčina (b): vyřazení konce křižující cesty se uplatní i při ohybu trasy. Hypotéza (a): úhly nestačí, rozhodne druh cesty (track × path) – ověřit na GPX uživatele.
- Vyřešení hlášení: uživatel poslal GPX Okruh 12km (WP 2 a WP 11), druh cesty jako rozlišení zamítl, bod 2 (vyřazení křížení jen u rovné trasy) schválil. Data (živé dlaždice): WP 2 trasa 5°, větve −46° / +66° = křižovatka se zalomenou křižující cestou; WP 11 trasa 1°, větve +20° / −152° = cesta křížící trasu ostře (protější konec za trasou); 2442 m trasa −37°, rovně +17° = křižující cesta, ze které trasa sjíždí. Tři zpřesnění v DESIGN.md. Na celé trase Okruh 12km změna právě těchto tří míst (Keep right → nic, nic → Keep left, Keep left → nic), ostatních 21 beze změny; testovací trasy beze změny. Test s úhly z dat (každé zpřesnění má vlastní selhání). Všechny sady 208/208. README EN/CZ. Cache v59.
- Test uživatele: odbočky na trase Okruh 12km odpovídají jeho představě o terénu, potvrzeno (2026-11-05). Uživatel testuje dál; cyklus 39 zůstává otevřený pro další hlášení.
- Hlášení uživatele (trasa tam a zpět, cesta zpět u `49.063847`): čekal Keep right at fork, nebylo nic. Nebyla to chyba kódu, ale mezera pravidla: blízká větev se měřila jen od směru trasy (65° > 60°); dřívější pravidlo rozcestí („obě větve do ±60° od příjezdu“) by ho poznalo. Návrh: blízká i větev do 60° od příjezdu. Změní jen toto místo (testovací trasy a Okruh 12km beze změny). Test (bez úpravy selže). Všechny sady 209/209. Cache v60. Schváleno uživatelem (2026-11-05).
- Dotaz uživatele k „Bear left“ (WP 1 trasy Route 2026-11-05, 48.967605): podle dat trasa −22°, druhá cesta −66° na téže straně → mírnější ze dvou vlevo = Bear left, podle pravidel správně; uživatel souhlasí. Vysvětlen význam pokynů (Turn / Sharp / Bear / Keep / Straight / U-turn).

### Cyklus 40 – volba průchodu (2026-11-05)
- Hlášení uživatele: waypoint na místě, kudy trasa vede tam i zpět, se vždy přiřadí k prvnímu průchodu; chce dialog.
- Rozhodnutí uživatele: dialog při přidání i přesunu waypointu (Edit route beze změny); tlačítka „1st pass · 1.65 km · ↙“ (km od startu, šipka směru jízdy) + zvýraznění na mapě; přepínač **Pass** v editoru waypointu. Zápis: stejné souřadnice, když průchod pozná pořadí waypointů v souboru (mezi průchody leží jiný waypoint, např. U-turn), jinak **vlastní bod trasy 1 m před místem** ve směru jízdy zvoleného průchodu.
- Proč: průchod u stejných souřadnic pozná aplikace (a nejspíš hodinky) jen podle pořadí waypointů; bez waypointu mezi průchody se pořadím nedá zapsat, že jde o druhý průchod. Dva waypointy se stejnými souřadnicemi se přiřadí k po sobě jdoucím průchodům, takže druhý waypoint na tomtéž průchodu dostane vlastní bod.
- Implementace: `targetPasses` (bod se stejnými souřadnicemi, souvislé opakování = jeden průchod; úsek se stejnými konci i opačně), `passInfo`, `passPlacement` (nanečisto přiřazení jako `analyzeWpt` → případně cíl na úseku 1 m před bodem), `choosePass` (dialog `#pass-dialog` dole, světlé pozadí, mapa posunuta, aby místo bylo nad dialogem; najetí / fokus tlačítka zvýrazní 80 m trasy před místem), `placeWpt` / `moveWptToPass`; typ nového waypointu se navrhne podle zvoleného bodu trasy. Kliknutí doprostřed společného úseku: nový bod jen v úseku zvoleného průchodu (souřadnice jedinečné).
- Snímky: dialog původně zakrýval místo i zvýraznění → přesunut dolů. Na telefonu (bez najetí myší) je zvýrazněný první průchod.
- Testy: nová sada `tests/passes.json` (5 kroků; bez rozhodnutí o vlastním bodu selže). Všechny sady 214/214. README EN/CZ. Cache v61.
- Test uživatele: volba průchodu funguje, potvrzeno (2026-11-05).

### Oprava: rozdělené křižovatky v datech (2026-11-07)
- Hlášení uživatele (trasa Vřesky kopec 8.2 km, WP 10 = cesta zpět přes `49.066824`): Keep right at fork na cestě zpět nedává smysl. Data: silnice (tertiary) vede křižovatkou rovně, lesní cesta z ní odbočuje o 13° vpravo; na cestě tam je Keep right správně, na cestě zpět lesní cesta jen ústí do silnice. Příčina: dva uzly 0,3 m od sebe s náhodnými směry větví (artefakt opravy T/X), z jednoho falešné Keep right, z druhého Keep left.
- Oprava: sloučení uzlů do ≈ 1,2 m, směr větve na 5 m (DESIGN.md). Dopad viz DESIGN.md; Okruh 12km (potvrzený) se mění na dvou místech ze stejné příčiny – čeká na posouzení uživatele.
- Testy: fixture `tests/fixtures/vresky-fork.gpx` (úsek tam a zpět přes křižovatku, uložené dlaždice), krok v tiles.json (na původním kódu selže). Všechny sady 215/215. Cache v62.
- Test uživatele (2026-11-07): WP 10 se už negeneruje a všechny odbočky na trase Vřesky kopec jsou správně, potvrzeno. Dvě změny na Okruhu 12km (bod 238 Keep left, bod 245 bez pokynu) uživatel potvrdil jako správné (2026-11-07).

### Cyklus 41 – výběr bodu a průchozí body v Edit route (2026-11-07)
- Hlášení uživatele (Okruh 12km u školy): po ručním přesunu trasy na hlavní silnici klikl na waypoint „Turn right“ a trasa se vrátila na původní místo. Příčina: v Edit route klik na bod trasy mazal bod (i s waypointem na něm) a s Follow roads se úsek mezi sousedními waypointy přeplánoval; ručně posunuté body nebyly kotvami, takže GraphHopper vedl trasu svou cestou zpět kolem školy.
- Rozhodnutí uživatele: **klik bod vybere**, smazání tlačítkem Remove v liště (a klávesou Delete), další klik do mapy vybraný bod přesune (jako na telefonu); **ručně posunuté a vložené body = průchozí body**, přeplánování se o ně zastaví, na mapě plné, pamatují se k souboru (relace), ne v GPX.
- Rozhodnutí Claude: průchozími body jsou i body naklikané v plánovači (po Finish) – jsou to přesně body trasy uživatele; přichycené nové místo bodu po přeplánování (konec prvního úseku odpovědi GraphHopperu) je průchozí bod; Esc nejdřív zruší výběr; po puštění myši se ignoruje jen click, který prohlížeč pošle hned za ním (ne 300 ms – rychlý klik do mapy by se ztratil).
- Implementace: `gpx.vias` (klíče souřadnic, `setVias`, `viaSet`), ukládání v relaci (`saveSession` / `restoreSession`), kotvy `rerouteAnchors` = waypointy + průchozí body, `drawRouteEdit` (plné body, text lišty Click / Tap), myš: klik → `redit.sel`, klik na čáru / do mapy s výběrem → přesun, `reditSwallowClick`; klávesy Delete / Backspace / Esc.
- Testy: routeedit.json upraven (mazání přes výběr a Remove), nové kroky: výběr, přesun klikem, Delete, Esc, klik na značku waypointu nic nemaže, průchozí bod zastaví přeplánování (bez kotev z průchozích bodů selže), přichycený bod je průchozí, přežijí obnovení stránky; planner.json: body plánu po Finish jsou průchozí. Všechny sady 220/220. README EN/CZ (ovládání, průchozí body, klávesy). Cache v63.
- Test uživatele: chování při editaci je intuitivní a funguje podle očekávání, potvrzeno (2026-11-07).

### Cyklus 42 – úhel z mapy (2026-11-09)
- Hlášení uživatele: na trase Route 2026-11-09 nevznikla odbočka v místě, kam dal waypoint Danger. Analýza (data z API OSM, přepočet v Pythonu): křižovatka tří silnic (tertiary), trasa −43,8° v okně 15 m, druhá cesta +110° → pravidlo „ohyb bez blízké cesty“ → nic. Okno 10 m by dalo −51°.
- Návrh uživatele (maximum z úhlů na 5/10/15 m) zvážen, Claude navrhl úhel z větví mapy, uživatel schválil s podmínkou, že waypoint zůstane na trase (zůstává, umísťuje se na bod trasy jako dřív).
- Implementace: `mapTurn` v `turnInstruction` (generátor i nápověda editoru). Popis v DESIGN.md → Pokyny podle tvaru křižovatky. README EN/CZ. Cache v64.
- Ověřeno jen v headless Chrome na tomto PC (bez Node.js): skript jde zparsovat; `turnInstruction` na modelových případech: místo uživatele → Left_turn (z mapy −55°), bez dat Slight_left, rovné křížení nic, Y rozcestí Keep left, otočka U_turn, trasa mimo větve → úhel trasy.
- **Neověřeno:** automatické sady (`tiles.json` – typy na reálných dlaždicích, shoda editoru a generátoru, potvrzená trasa Okruh 12km). Očekávání se mohou změnit. Spustit na Linuxu.
- Automatické sady na Linuxu (2026-11-10): 220/220 beze změny očekávání (typy na reálných dlaždicích, shoda editoru a generátoru, Okruh 12km). Test uživatele: oprava na trase Route 2026-11-09 funguje.

### Cyklus 43 – úzké rozcestí (2026-11-10)
- Hlášení uživatele (trasa Route 2026-11-10 err1, waypoint Danger na místě chybějící odbočky): na rozcestí tracku a pěšiny pod malým úhlem nevznikla odbočka.
- Analýza (aplikace v headless Chrome se skutečnými dlaždicemi + data z API OSM): v uzlu 3777443492 vedou vpřed track (347°) a pěšina (338°), 9° od sebe; `junctionsFromTiles` je sloučil (`MERGE_BRANCH_DEG` 10°) → jediná cesta dál → nic. Pozn.: waypoint Danger (bod zájmu) chrání okolí, takže v souboru uživatele by generátor odbočku nepřidal ani po opravě.
- Návrh Claude: varianta A (sloučit jen čáry, které leží přes sebe) / B (snížit práh úhlu). Uživatel zvolil A a navrhl měřit i ve 20–30 m; použito pro porovnání čar (5, 10, 20, 30 m), úhel větve se dál měří v 5 m.
- Implementace: `junctionsFromTiles` sleduje čáru větve až 30 m (přes uzly bez větvení), `sameWay` (vzdálenost čar v `MERGE_CHECK_M` ≤ `MERGE_GAP_M` 1,5 m). Ladicí výpis: souběžné čáry ve fixturách ≤ 0,5 m, rozcestí uživatele 0,8 / 1,7 / 3,6 / 10,5 m. Cache v65.
- Testy: tiles.json + syntetické dlaždice (rozcestí 8°, dvojitá čára, čára 0,8 m a 2 m vedle) a reálná dlaždice `fixtures/vracov-narrow-fork.gpx` (4 větve, Keep right at fork, stejná nápověda editoru); dlaždice 14/8975/5628 už ve fixturách byla. Všechny sady 222/222.
- Test uživatele: funguje dobře, potvrzeno (2026-11-10).

### Cyklus 44 – výstup ve formátu Suunto Routeplanner (2026-11-11)
- Uživatel našel GPX „Vracov 6.2km“, o kterém autor tvrdí, že je pro Suunto ve správném formátu (hlavička a komentáře Routeplanneru, `waypointIndices`, každá odbočka 3× – Turn guidance, „Waypoint N“ Auto-generated, rtept).
- Claude upozornil: není to skutečný export Routeplanneru (ten má „Waypoint N“ jinde na zdvojeném rtept a pokyny mimo `waypointIndices`); doplněk „Waypoint N“ typu POI odpovídá nápadu „odbočka + POI“ z TODO (T2b: POI je v poli vzdálenosti trvale).
- Rozhodnutí uživatele: (1) nahradit test51, (2) přesně podle vzoru, (3) „Waypoint N“ ke všem odbočkám, body zájmu do Route waypoints, (4) i hlavička a creator přesně podle vzoru, wpt bez ele; soubor se sestaví celý znovu.
- Implementace: `toRoutePlannerFormat`, `routePlannerCompanions`, `prepareOpened(…, { fromFile })`, `textForSave` / `markSaved(internal)`. Popis v DESIGN.md. README EN/CZ (oddíl File format / Formát souboru, úvod, doporučený postup, Finish). Cache v66.
- Ověřeno v headless Chrome na kopii aplikace (Python http server, bez Node.js): vzorový soubor po otevření a uložení **shodný znak po znaku** (kromě mezery na konci jednoho řádku ve vzoru), otevře se se 6 waypointy (bez „Waypoint N“), vlastní výstup se otevře jako nezměněný a uloží znovu stejně, starý soubor AddTurn se označí jako převedený, Danger jde do Route waypoints, trasa bez odboček bez prázdných skupin, po uložení zůstává pracovní text.
- **Neověřeno:** automatické sady – `editing.json` (zachování bajt po bajtu při uložení, převod), `shared.json`, `planner.json` a další, které kontrolují uložený text, **selžou a musí se upravit** na Linuxu. Chování na hodinkách – test uživatele.

### Kontrola README (2026-11-11)
- Na žádost uživatele kontrola README EN/CZ proti kódu. Opraveno (oba jazyky): doporučený postup (ověřeno s dřívějším formátem; Open URL soubor převede; Save nedělá „jen waypointy“, ale formát Routeplanneru), lišta (tlačítko panelu, na telefonu jen ikony), „already installed“ (oprava manifestu 2026-11-06 + Chrome 157, místo „jen chyba Chrome“), Data a soukromí (GraphHopper i u Follow roads), zkratka Delete / Backspace, úplný příkaz testů (CZ měl jen 6 sad). CLAUDE.md: věta o úpravách „bajt po bajtu“.
- Screenshoty overview, generator, editor, mobile znovu nafoceny (headless Chrome na Windows, živé dlaždice OSM a OpenFreeMap, trasa Vracov 5km: 7 odboček). overview a mobile byly zastaralé (bez New route a Settings, s tlačítkem Turns generator). Telefon přes iframe 390 px (headless Chrome na Windows neumí okno užší než ~500 px). watch-navigation beze změny.
- Odstavec „Nastavení hodinek“ na pokyn uživatele **odstraněn** (není prokázané), krok 7 doporučeného postupu odkazuje jen na varování o jízdě pozpátku. Původní stav: odstavec (vypnout navigaci po trase, zapnout upozornění na POI) – z kódu ověřit nejde, výsledky T2b/T6 mu zčásti odporují; varování nahoře psal uživatel.

### Cyklus 45 – pokyn na křižovatce, směry v 5/10/20 m (2026-11-11)
- Hlášení uživatele (Brno, Route 2026-11-11): u WP 1 vygenerováno „Keep left at fork“, uživatel tam vidí spíš „Keep right“. Analýza (data OSM, přepočet v Pythonu): pokyn vznikl z křižovatky na Nádražní (uzel 370329011) 7,5 m vedle trasy, kterou trasa neprojíždí; skutečná křižovatka (uzel 8232609566) dává „nic“ (chodník doleva 90° = křižovatka, ne rozcestí).
- Pravidla uživatele: pokyn se vztahuje k místu, kde leží (jinde jen s Turns in advance); chybí-li tam bod trasy, přidat; směry měřit v 5, 10 a 20 m a rozhodnout podle největšího úhlu (uživatel to považoval za hotové z cyklu 42 – nebylo).
- Implementace: viz DESIGN.md → „Pokyn patří ke křižovatce, na které leží“ a „Oprava dlaždic“. Nové / změněné: `JUNCTION_LINE_M`, `BRANCH_DIR_M`, `routeTurnAtS`, `branchDirs`, `mapTurn(e, inB, J)`, `turnInstruction(e, inB, J)`, `junctionPasses(pts, cum, J)` (úseky, průmět), `junctionTurn`, umístění v `computeTurns`, `suggestType`, `J.dirs` v dlaždicích, Overpass a úložišti, `inTile` v `junctionsFromTiles`. `alongRoute` zrušeno. README EN/CZ. Cache v67.
- Ověřeno v headless Chrome (živé dlaždice OpenFreeMap), stará verze (HEAD) × nová na 9 trasách, předstih 0 a 10 m: Brno – Keep left zmizel, Turn left na novém bodu přímo v křižovatce (0,1 m, dřív bod 2 m vedle); Danger 9. 11., úzké rozcestí 10. 11., Vracov 5km / 5.5km / tam a zpět, okruh s otočkou – stejné typy i místa, předstih 10 m teď přesně 10,0 m od křižovatky (dřív 9,8–10,9); `okruh-start` a `vresky-fork` – navíc Keep left at fork na skutečném rozcestí uprostřed dlouhého úseku (dřív přehlédnuto, žádný bod trasy do 15 m); `okruh-start` Turn left zůstal, nově díky skutečné křižovatce (oprava dlaždic), ne rozcestí 10,8 m dál; `vresky-fork` s předstihem 10 m jen 2 m (nově viditelná křižovatka 12 m před rozcestím = bariéra). Nápověda editoru = generátor na všech trasách. Overpass (podvržená data `vracov-overpass.json`) = stejné odbočky jako dlaždice.
- **Neověřeno:** automatické sady (`tiles.json`: očekávané počty a polohy – nové odbočky u okruh-start/vresky-fork, předstih vresky-fork, polohy na nových bodech trasy; `passes.json`). Spustit a upravit na Linuxu.
- Test uživatele (v67, Brno): Keep left zmizel, „asi dobrý“ (na skutečné křižovatce žádný pokyn, v terénu nejspíš nevadí). Hlášení: ikona Turn left špatně natočená. Příčina: trasa zahýbá v bodě 4, 2 m před křižovatkou z mapy; waypoint teď leží v křižovatce a `incomingBearing` bral směr posledního úseku (už po odbočení, 60° místo 143°). Oprava: příchozí směr měřený `TURN_ANGLE_WINDOW_M` (15 m) zpět po trase (platí pro všechny šipky odboček i šipku v dialogu volby průchodu). Ověřeno v headless Chrome na souboru uživatele (143°, snímek). Cache v68.
- Test uživatele: šipka správně, chování cyklu 45 v pořádku (2026-11-11). Dotaz (Route 2026-11-11 err3, Danger 14,6 m od startu): odbočka vpravo nevznikla, protože leží blíž ke startu než Minimum spacing (15 m; vynechání kandidátů u začátku/konce + ochrana Begin). Návrh oddělit odstup od startu/cíle (např. 5 m) uživatel **nechce**: Minimum spacing zůstává jedno pro všechno (15 m je rozumné minimum kvůli chybě GNSS a mapových podkladů, i když selhává u hustých odboček).


### Cyklus 46 – citlivost rozcestí a Bear v Settings (2026-11-12)
- Požadavek uživatele: nastavitelná citlivost pro „at fork“, pak i pro Bear, s kontrolou, že se parametry nepřekrývají. Rozhodnutí: volba Low / Normal / High (ne číslo); fork se týká jen rozcestí (ne Straight on); pod hranicí pokyn nevzniká.
- `SENS_DEG` = { low 40, normal 60 (= `NEAR_BRANCH_DEG`), high 75 }, `genSettings()` → `fork`, `bear` (výchozí normal), `sensDeg` → `turnInstruction(e, inB, J, sens)` přes `junctionTurn` (generátor i nápověda v editoru). Settings: dva výběry `set-fork`, `set-bear` + vysvětlení. Cache v69.
- Pravidla a překryv: viz DESIGN.md → „Citlivost rozcestí a Bear“. Normal/Normal = beze změny proti cyklu 45.
- Ověřeno v headless Chrome (umělé křižovatky, všech 9 kombinací + výchozí): fork mění jen výsledky rozcestí, bear jen Bear; Turn, Straight on a bez dat beze změny. UI na šířce 400 px (výběr rozšířen, `width: auto`). Automatické testy na Linuxu čekají; testy, které kontrolují obsah `GEN_KEY`, nově uvidí i `fork` / `bear`.

### Cyklus 47 – výběr větve trasy v křižovatce (2026-11-13)
- Hlášení uživatele: trasa Route 2026-11-13 (Brno), bod 2 dával Keep right, správně Keep left. Rozbor a zkoušené varianty: DESIGN.md → „Chyba: špatně určená odjezdová větev“.
- `routeBranches` (směr trasy v 10 a 20 m × směry větví, průměr ≤ 45°), `mapTurn(…, match)`, `turnInstruction(…, sens, match)`, `junctionTurn` předává shodu. Cache v70.
- Ověřeno: HEAD × nová verze na 8 trasách (Brno 2026-11-13, Brno---work, 6 testovacích fixtures) – změna jen v hlášeném bodě a u jedné křižovatky vedle trasy (bez pokynu v obou verzích). Okruh 12 km vyzkouší uživatel.

### Cyklus 48 – výstup bez doprovodných „Waypoint N“ (2026-11-13)
- Rozhodnutí uživatele: doprovodné body „Waypoint N“ (typ Waypoint, Auto-generated) ke každé odbočce z cyklu 44 nejsou potřeba, na hodinky neměly vliv → nezapisovat.
- `toRoutePlannerFormat`: *Route waypoints* = jen body zájmu, `waypointIndices` = Begin, body zájmu, End. Zahazování doprovodných bodů při otevření zůstává (starší soubory se otevřou jako změněné). README EN/CZ (Formát souboru, Otevírání souborů). Cache v71.
- Ověřeno v headless Chrome: soubor ve starém tvaru (3 odbočky + 3× Waypoint N + Water_point) → otevře se jako změněný; uložený text má Turn guidance waypoints, v Route waypoints jen Water_point, indices `0,26,48`; znovu otevřený uložený soubor je nezměněný. Testy na Linuxu, které kontrolují uložený text, čekají na úpravu.

### Cyklus 49 – Crossroads ke každé odbočce (2026-11-13)
- Pokus uživatele: na místo každé odbočky ještě waypoint typu Crossroads se stejným názvem → pole „vzdálenost k POI / waypointu“ by mohlo ukazovat další odbočku a TbT fungovat dál. Zadání: zaškrtávací volba v nastavení; při zapnutí v GPX hned za odbočkou `<wpt …><name>Turn left</name><type>Crossroads</type></wpt>`.
- Implementace: nová sekce Settings „Saved file“ s volbou *Add a Crossroads waypoint at every turn* (`OUTPUT_KEY` = `addturngpx.output`, `outputSettings()`), `toRoutePlannerFormat(…, { crossroads })`; při otevření se doprovodná Crossroads zahodí (`routePlannerCompanions`). Do `waypointIndices` se nedávají. README EN/CZ. Cache v72.
- Ověřeno v headless Chrome: zapnuto → za každou ze 3 odboček Crossroads se stejným názvem a souřadnicemi, Water_point zůstává v Route waypoints, indices beze změny; znovu otevřený soubor nezměněný, v editoru 6 bodů (bez Crossroads); vypnuto → bez Crossroads, soubor se zapnutými se otevře jako změněný; výchozí stav vypnuto. UI na šířce 400 px.
- Upřesnění uživatele (2026-11-13): při otevření zahazovat jen Crossroads ze skupiny „Turn guidance waypoints“; Crossroads v „Route waypoints“ je uživatelova a zůstává. `routePlannerCompanions` sleduje komentáře mezi waypointy. Ověřeno: 3 doprovodné Crossroads zahozeny a znovu zapsány, 2 uživatelské (jedna na odbočce se stejným názvem) v editoru i v Route waypoints zůstaly, znovu otevřený soubor nezměněný. Cache v73.

### Cyklus 50 – waypointIndices na volbu (2026-11-13)
- Dotaz uživatele: má `waypointIndices` vliv? Nevíme – specifikace ji nezmiňuje, export z aplikace Suunto ji nemá; nejspíš ji čte jen Routeplanner. Rozhodnutí uživatele: volba v nastavení; zapnuto = indexy Begin, všech odboček, bodů zájmu a End (bez doprovodných Crossroads); vypnuto = sekce se nezapíše; výchozí vypnuto.
- `outputSettings().waypointIndices`, `toRoutePlannerFormat` (indexy i z `turns`, řádek jen při zapnuté volbě), Settings → Saved file (druhá zaškrtávací volba, pořadí volba + vysvětlení). README EN/CZ. Cache v74.
- Ověřeno v headless Chrome (soubor se 3 odbočkami, doprovodnými Crossroads, Water_point a 2 uživatelskými Crossroads): zapnuto → `0,1,11,16,26,38,48` (odbočky 1, 11, 16; uživatelská Crossroads na 16; body zájmu 26, 38), vypnuto → bez sekce; všechny kombinace s volbou Crossroads se znovu otevřou nezměněné; výchozí obě vypnuté. UI na šířce 400 px.
- Pozor: výchozí výstup se změnil (dřív sekce vždy) – testy na Linuxu kontrolující uložený text upravit.

### Cyklus 51 – kličky (2026-11-13)
- Měření hranice 5 → 8 / 10 m a směrů 10/20/30 m (DESIGN.md → „Měření …“), kontrola míst uživatelem (`samples/_MERENI_2026-11-13/`): hranice zůstává 5 m; u kličky Brno Test 1 chce uživatel oba pokyny, nebo žádný – dnes jen jeden. Volba uživatele: pravidlo c) podle situace.
- `JOG_MAX_DEG` = 30, `junctionTurn` vrací i `inB` a `straight`, v `computeTurns` párování dvojic (`pairAt`, `drop`, skupina kandidátů do 2 m). Napoprvé dvojice s dvěma uzly jedné křižovatky (Brno---work 72 m) spárovala nevybraný uzel a rozcestí v kličce se zahodilo – opraveno (skupina, rozcestí = oba). README EN/CZ. Cache v75.
- Ověřeno: viz DESIGN.md. Uživatel případně commit zruší.

### Cyklus 52 – Crossroads s předstihem (2026-11-13)
- Výsledek uživatele: Crossroads na stejném místě jako odbočka (cyklus 49) na hodinkách bez efektu. Požadavek: volba předstihu Crossroads; když má odbočka větší předstih, je v souboru před Crossroads, a naopak. Upřesnění: předstih od křižovatky.
- Implementace: viz DESIGN.md (cyklus 52). `computeTurns` (`place`, `ahead`, Crossroads s `cross`, řazení), `applyTurns` (sdílený nový bod přes objekt `at`, `name`/`desc`, počty jen odboček), `buildWptXml` s `desc`, `toRoutePlannerFormat` (Crossroads ve skupině odboček), `routePlannerCompanions` vrací `{ companions, autoCross }`, Settings (volba + Crossroads in advance v Generate turns, ze Saved file pryč). README EN/CZ. Cache v76.
- Oprava po hlášení uživatele (2026-11-13): Crossroads se měřila od křižovatky a zkracovala → u 3 odboček na stejném místě. Nově přesně X m po trase zpět od waypointu odbočky, bez zkracování, u všech vygenerovaných odboček (`place(li, sl, snap)`, snap 0,5 m). Settings a README EN/CZ přepsány. Cache v77.

### Regresní testy na Linuxu (2026-11-14)
- Požadavek uživatele: cykly 44–52 vznikly na Windows bez Node.js → spustit všechny sady na Linuxu. Výsledek před úpravou 190/222: žádná chyba aplikace, všechna selhání odpovídala záměrným změnám.
  - Starý formát testovacích souborů (22): `fixtures/addturn-*.gpx` jsou ve formátu test51, od cyklů 44/48/50 se otevřou jako „Modified“ (editing, shared; v planner se kvůli tomu *New route* zeptal a 17 kroků padalo za sebou).
  - Ukládání ve formátu Routeplanneru (2): Save nezapisuje pracovní text, deklarace bez `standalone`.
  - Nová nastavení (2): `fork`, `bear`, `crossroads`, `crossLead`, pole `set-cross-lead`.
  - `turnInstruction(e, inB, J)` bere od cyklu 45 objekt křižovatky (3 kroky s modelovými křižovatkami).
  - Výsledky generátoru z cyklu 45 (4): 81 místo 78 odboček (navíc Keep left at fork u `okruh-start` pro předstih 0/10/30 m; porovnáno se stavem v65, ostatní typy a místa stejné, předstih posunutý ≤ 1 m), Vřesky navíc `15:Left_at_fork_turn` (rozcestí 70 m dál uprostřed dlouhého úseku), Overpass × dlaždice: stejná odbočka jednou na bodu 16, podruhé na 17 – oba body mají stejné souřadnice (zdvojený rtept).
- Kontrola formátu: uložení a nové otevření všech 9 fixtures a 32 vzorků v `samples/` dá nezměněný soubor se stejným počtem waypointů (ztrácí se jen `<author>`, odbočky bez názvu dostanou název).
- Úpravy: nové fixtures `tests/fixtures/saved-example.gpx` a `saved-test51.gpx` (výstup aplikace z `addturn-*.gpx`, výchozí volby) pro „otevře se beze změny“ a „Save zapíše stejné bajty“; `addturn-test51.gpx` dál pro „starší soubor se otevře jako Modified“, převod exportu z aplikace Suunto a `setRouteNameText`. Overpass × dlaždice se porovnává podle polohy (≤ 1 m) a typu, ne čísla bodu. Modelové křižovatky jako `{ branches }`. Očekávání: nastavení, 81 odboček, Vřesky.
- Nové kroky: formát uloženého souboru (hlavička, metadata, skupiny, názvy odboček, bez ele u wpt, bez koncového konce řádku, znovu otevřený beze změny), *Write waypointIndices* (výchozí vypnuto, indexy `0,1,2,5,7`, soubor s indexy se otevře beze změny jen se zapnutou volbou), Crossroads z generátoru (0 m: stejné místo a název hned za odbočkou; 20 m: přesně 20,0 m po trase zpět, před odbočkou; další Generate je nahradí; v souboru ve skupině odboček bez desc a mimo waypointIndices; vypnutí je smaže). Hodnoty ověřeny (7 odboček, 7× Crossroads 20,0 m).
- Všechny sady 229/229. `tests/README.md` (editing, generator). Soubory aplikace beze změny → `CACHE_NAME` se nemění.
- Bez vlastních testů zůstávají pravidla z cyklů 45 (křižovatka vedle trasy, pokyn na novém bodu v průmětu, největší úhel z 5/10/20 m, „T“ v přesahu dlaždice), 46 (citlivost) a 51 (kličky) – v TODO.

### Cyklus 53 – odlišení vygenerovaných křižovatek (2026-11-14)
- Požadavek uživatele: Crossroads z generátoru (pokus pro pole vzdálenosti k odbočce) odlišit na mapě od bodů, které položil uživatel. Návrhy uživatele: zprůhlednit generované / zvětšit uživatelské / okraj uživatelských. Doporučeno a schváleno: odlišit generované – menší, mírně potlačené, pod ostatními značkami, při předstihu 0 m jen odznak na ikoně odbočky; v seznamu menší ikona a „generated“. Spojnici k odbočce uživatel zatím nechce; generované odbočky se zatím neodlišují.
- Rozhodnutí uživatele: ručně upravená vygenerovaná křižovatka se stane ručně přidanou (`ownWptText` odebere desc Auto-generated při změně názvu, typu a přesunu).
- Navíc oprava hlášky: když Generate turns změní jen křižovatky, hláška dřív tvrdila „The turns are already up to date.“.
- Podrobnosti: DESIGN.md → „Zobrazení vygenerovaných křižovatek“. README EN/CZ (tabulka barev, odstavec o Crossroads). Cache v78.
- Testy: 3 nové kroky v generator.json (0 m: skrytá značka, odznak, klik vybere odbočku, seznam, výběr ze seznamu; 20 m: vlastní značka 22 px pod odbočkou; ruční úprava názvu a přesun → uživatelův bod, Generate ho nechá), hláška při změně jen křižovatek. Všechny sady 232/232. Vzhled zkontrolován na snímcích (headless Chrome).
- Otevřené: uživatelova křižovatka na místě odbočky (0 m) chrání okolí jako každý zachovaný waypoint → další Generate turns tu odbočku smaže. Vyřešeno cyklem 54.

### Cyklus 54 – Crossroads jen tam, kde ji hodinky potřebují (2026-11-14)
- Podnět uživatele: ve městě s hustými odbočkami může vygenerovaná Crossroads vyjít těsně za předchozí křižovatkou nebo před ni. Pole hodinek ukazuje vzdálenost k odbočce správně samo na posledních 20 m (pevný dosah upozornění Suunta), tam Crossroads netřeba.
- Rozhodnutí uživatele: (1) odbočce nikdy nebrání žádná Crossroads, ani uživatelova (řeší otevřenou otázku z cyklu 53); (2) vygenerovaná Crossroads se nevytvoří, když by ležela nejvýš 20 m po trase za předchozím waypointem (odbočka, bod zájmu, uživatelova Crossroads, Begin), nebo před ním – varianta „negenerovat“, ne posun; měřeno ke Crossroads (ne k odbočce); 20 m pevně, ne v Settings.
- Implementace: `CROSS_FIELD_M`, `keptAt[].cross / auto`, `protects` a `barrier` bez Crossroads, `marks` v `computeTurns` (i waypoint na místě odbočky, aby uživatelova Crossroads při 0 m nedostala dvojnici). Nápověda v Settings, README EN/CZ, DESIGN.md. Cache v79.
- Testy (generator.json, 4 nové kroky, 1 upravený): Vracov 5km s předstihem 470 m – odbočky 17 m za předchozí a 49 m před ní bez Crossroads, ostatních 5 s ní; Begin 18 m / 23 m; bod zájmu 19,9 m / 20,2 m; uživatelova Crossroads na místě odbočky odbočku nesmaže (dřív 7 → 6) a nevznikne druhá. Všechny sady 236/236.

### Cyklus 55 – vzdálenosti a výška v seznamu waypointů (2026-11-14)
- Požadavek uživatele (před testy na hodinkách): u každé položky seznamu vzdálenost od startu, od předchozí odbočky, od předchozího jiného waypointu a nadmořská výška.
- Upřesnění uživatele: „jiný waypoint“ = předchozí waypoint, který není odbočka (bod zájmu, Crossroads i vygenerovaná, obecný Waypoint); Begin se nepočítá, chybí-li předchozí, ukáže se `---`; údaje vždy.
- `wptMetrics()`: vzdálenosti po trase v pořadí seznamu (`pos` → m, i víc čar za sebou), Begin 0, End celková délka; odbočka = `typeCat` „turn“ (i kruhové objezdy, rovně, otočka); výška z bodu trasy, jinak z waypointu, zaokrouhlená; waypoint mimo bod trasy jen „off the route · alt.“ a do předchozích se nepočítá. Řádek `.wdist` pod názvem, každý údaj nezalomitelný. README EN/CZ. Cache v80.
- Test (editing.json): saved-test51 + Café na bodu 5 + bod mimo trasu, hodnoty proti vzdálenostem spočítaným z bodů trasy. Všechny sady 237/237. Vzhled na snímku (počítač, telefon).

### Cyklus 56 – waypointy blízko trasy na trasu (2026-11-14)
- Podnět kolegy uživatele (soubor z UTMB): POI na mapě leží na trase, ve skutečnosti kousek vedle → hodinky ho ignorují. Stažený `samples/UTMB_2026_25e2a492e6.gpx` (LiveTrail) waypointy nemá (14 084 `trkpt`, souřadnice s plovoucím šumem `45.923519999999996`), chybu z něj ověřit nešlo.
- Analýza: aplikace už bod mimo bod trasy poznala a varovala (šedá ikona s čárkovaným okrajem), *Snap to nearest route point* ho ale dávalo na nejbližší **bod** trasy – na řídké trase třeba 100 m daleko. Vzdálenost ve varování byla k bodu, ne k čáře.
- Rozhodnutí uživatele: (1) tolerance 20 m výchozí; (2) automaticky při otevření, s Undo; (3) vždy, bez ohledu na původ souboru (i vlastní výstup AddTurn); (4) přesun na čáru všude, kde se přichytávalo na nejbližší bod.
- Implementace: `routePlaces` (místní minima vzdálenosti k čáře, v pixelech P18, metry z měřítka), `nearestRoutePlace` (nejbližší kandidát mezi polohami sousedních waypointů v souboru, jinak nejbližší vůbec), `placeTarget` (bod trasy do 1 m, jinak nový bod), `snapWaypointsText` + `snapOnOpen` (jeden krok Undo, jedna hláška i s převodem), `snapSettings` (`addturngpx.snap`), `ownPointBefore` (z `passPlacement`). Použito v: otevření souboru (`loadGpxText`, `openFromUrl`; ne obnova relace ani Finish plánovače), *Snap to the route* v editoru, Follow roads (bod zájmu na nový bod cesty v průmětu), řazení bodů mimo trasu při převodu, vzdálenost ve varování. `nearestVertexGeo` odstraněno.
- Rozhodnutí Claude: bod trasy, kudy trasa vede víckrát → při hromadném přichycení vlastní bod 1 m před ním (průchod nezávisí na pořadí); waypoint na bodu trasy se souřadnicemi jinak zapsanými dostane text bodu trasy (počítá se jako přesunutý o 0 m); 0 = vypnuto úplně; obnova relace se nepřichytává (uživatel mohl přichycení vrátit Undo). Vzhled: šedá ikona, plný červený okraj a červený odznak „!“, text v seznamu červeně, v panelu počet waypointů mimo trasu.
- Pozn.: uložený formát Routeplanneru má waypointy ve skupinách (odbočky, pak body zájmu), takže pořadí odbočky vůči bodu zájmu v souboru neplatí; volba průchodu pro bod mimo trasu je v takovém souboru jen přibližná (nejbližší, nebo mezi sousedy ve skupině).
- Testy: nová sada `snap.json` (11 kroků), `clicks.json` upraveno (tlačítko *Snap to the route*, nový bod trasy), `generator.json` (seznam polí generátoru v Settings bez `set-snap`). Všechny sady 248/248. Cache v81.
- Další krok (požadavek uživatele 2026-11-14): přichycení importované trasy (záznam GNSS, např. UTMB) k mapě, aby generátor odboček pracoval s cestami z mapy – viz TODO.

### Cyklus 57 – přesýpací hodiny (2026-11-14)
- Požadavek uživatele (z TODO): kurzor myši jako přesýpací hodiny, když aplikace pracuje. Test cyklu 56 proběhne později.
- Rozhodnutí Claude: dva druhy kurzoru. `wait` (přesýpací hodiny) při blokující práci – otevření souboru (Open, přetažení, sdílení z Androidu, Otevřít v programu, Open URL včetně stahování): čtení, převod, vykreslení a přichycení waypointů. `progress` (šipka s hodinami) při čekání na síť, kdy mapa dál reaguje – Generate turns, plánovač (GraphHopper, i během čekání na minutový limit), Follow roads. Ukládání, Finish plánovače a obnova relace bez kurzoru (rychlé, nebo při startu).
- Implementace: `busyStart` / `busyEnd` / `whileBusy` (počítadla pro každý druh, třídy `busy` / `busy-wait` na `<html>`, CSS `cursor … !important` pro všechny prvky), `nextPaint` (rAF + setTimeout – blokující práce začne až po vykreslení kurzoru), `openText` (obal `loadGpxText` pro UI; `loadGpxText` zůstává synchronní pro testy), `openFromUrl` → `openFromUrlNow`, `generateTurns` → `generateTurnsNow`, `planPump` s try/finally.
- Chyba nalezená testem a opravená: obal `planPump` další `await` vrstvou odložil `p.busy = false` o mikroúlohu → klik ve stejné úloze (test) se ztratil. Smyčka zůstala v jedné funkci.
- Testy: nová sada `busy.json` (6 kroků: Open URL i s chybou, otevření souboru – kurzor dřív než práce, Generate turns, plánovač s pozdrženou odpovědí, Follow roads). Všechny sady 254/254. Cache v82.

### Cyklus 58 – přichycení trasy k cestám (2026-11-14)
- Podnět uživatele: `samples/UTMB_2026_25e2a492e6.gpx` je záznam GNSS (14 084 bodů po ~12,5 m), ne trasa z mapy; generátor odboček potřebuje trasu na cestách (křižovatka do 5 m, trasa po větvi).
- Analýza: přichycení bod po bodu by dělalo zuby na křižovatkách (body před křižovatkou na příčné cestě), skákalo na sousední serpentinu a mezi body zkracovalo rohy. GraphHopper Map Matching: 1 kredit / 50 bodů (UTMB ≈ 280 z 500 denních), limit bodů na požadavek, jiná mapa než data generátoru → zamítnuto.
- Rozhodnutí uživatele: (1) tlačítko i volba v Settings „při otevření“; (2) přichycené části **nahradit** tvarem cest; (3) max. 25 m výchozí; (4) červeně jen části, které se nepodařilo přichytit (automaticky / tlačítkem); po novém přichycení nebo ruční úpravě modře; po uložení a novém přichycení jsou červené jen nepřichycené části.
- Implementace: refaktoring stahování (`fetchRouteTiles`, `fetchOverpassWays`, `tileNetwork` / `junctionsFromNetwork`, `overpassNodes` / `overpassNetwork` / `overpassJunctions`, pás `corridorM`); `loadRoadNetwork` (síť v paměti, `roadNetCache`), `stitchNetwork`, `roadGraph`, `roadCands`, `roadDijkstra` / `roadDistTo` / `roadPath`, `matchLine` (Viterbi: cena 0,5·(d/7 m)² + |po síti − v záznamu| / 5 m), `snapRouteText`, `snapRouteToRoads`, `snapRoadsOnOpen`, `redParts`, `applyRed`; `gpx.redLines` v historii Undo/Redo (`commitEdit(…, { red })`) a v relaci. Po přichycení se křižovatky pro novou trasu spočítají ze stejné sítě a uloží (Generate turns nic nestahuje).
- Zjištění při ladění (Vracov, skutečné UTMB): (a) síť z dlaždic je na hranicích dlaždic přerušená – generátor dlaždic zjednodušuje čáry v každé dlaždici zvlášť, takže tatáž cesta nemá v přesahu společný bod; i v OSM cesta někdy končí pár metrů od jiné → `stitchNetwork`: volný konec čáry se připojí k úseku jiné čáry do 3 m (i k překrývající se čáře se společným vzdáleným uzlem), jen pro přichycení, křižovatky dál z nesešité sítě; (b) kandidáti na překrývajících se čarách téže cesty se nesmí slučovat (spojené bývají jen na jednom konci) – slučují se jen na úsecích se společným uzlem; (c) rozkmit záznamu na místě dával zuby tam a zpět 2–5 m → otočky tam a zpět kratší než 15 m se odstraní (delší odbočka zůstane).
- Výsledek na UTMB (skutečné dlaždice OpenFreeMap, ruční ověření): 103 dlaždic, stažení + přichycení 4,7 s, 173,0 ze 174,4 km na cestách, 1,37 km v 15 červených úsecích (10× body 25–69 m od cest, 6× krátká spojnice 30–46 m bez cesty po síti), 14 084 → 11 999 bodů; Generate turns pak bez stahování 424 odboček (na nepřichyceném záznamu 340). Opakované přichycení změní ~20 bodů z 12 000.
- Rozhodnutí Claude: přichycení po otevření počká na konec úlohy s předchozím souborem; řetěz kratší než 3 body se nepoužije; síť v paměti se drží i pro původní trasu (Undo → nové přichycení bez stahování).
- Testy: nová sada `roadsnap.json` (13 kroků, záznam GNSS vyrobený z trasy Vracov 5,5 km: body po 10 m, rozkmit ±8 m, objížďka 80 m přes pole), `generator.json` (seznam polí generátoru bez `set-roadsnap-max`). Všechny sady 267/267. Cache v83.
- Potvrzeno uživatelem 2026-11-14 („snap to route funguje výborně“).

### Cyklus 59 – přesýpací hodiny při výpočtu odboček (2026-11-14)
- Požadavek uživatele: čekací kurzor i při vytváření odboček – u dlouhých tras to chvíli trvá.
- Příčina: Generate turns sice od cyklu 57 nastavoval `progress`, ale když jsou data cest už v paměti / v prohlížeči, výpočet (`computeTurns`) a zápis (`applyTurns` + překreslení) běžely hned bez vykreslení – prohlížeč kurzor nestihl ukázat, a `progress` (šipka) navíc neříká, že stránka nereaguje.
- Řešení: `generateTurnsNow` načte data (`loadJunctions`, kurzor `progress`), pak text „Finding the turns…“ pod tlačítkem, kurzor `wait`, `nextPaint()` a teprve potom výpočet a zápis. Rozhodnutí Claude: stejně Snap to roads – výpočet přichycení s `wait` (dřív `progress`). `proposeTurns` beze změny (používají ho testy).
- Testy: `busy.json` (výpočet odboček s uloženými daty: v okamžiku výpočtu `busy-wait` už vykreslený), `roadsnap.json` (totéž pro přichycení). Všechny sady 269/269. Cache v84.

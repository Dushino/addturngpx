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
| 8 | Automatické generování odboček | vyjasnění specifikace |
| 9 | README (EN/CZ), dokončení | — |

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

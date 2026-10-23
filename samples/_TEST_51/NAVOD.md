# Test T8 – návrat k test51 + napodobení exportu z cloudu Suunto (2026-10-23)

Cíl: (1) spolehlivě zopakovat původní „funkční“ test51 a zjistit, **zda pole ukazovalo vzdálenost
k odbočce už před notifikací**; (2) vyzkoušet, zda aplikace Suunto čte formát exportu z Cloud API
(Route API `export-gpx-route`, viz `docs/dev/DESIGN.md` → „Suunto API Zone – POI API…“).

Všechny soubory mají stejnou čáru jako test51 (8 rtept):

| Bod | Vzdálenost od startu |
|---|---|
| Begin | 0 m |
| Straight_turn | **231 m** |
| Sharp_right_turn „Turn sharp right“ | **248 m** |
| End | **408 m** |

| Soubor | Název v aplikaci | Zápis odboček | `turnWaypointsEnabled` |
|---|---|---|---|
| **test51.gpx** | test51 | `<wpt>` (creator „Sports Tracker“) – bajtově shodný s funkční verzí v2 (git 7f36bca) | – |
| **test51 cloud A.gpx** | test51 cloud A | `rtept/extensions/suunto:routePoint` (creator „Suunto app“, jmenný prostor `suunto:`), `wpt` jen Begin/End | `false` |
| **test51 cloud B.gpx** | test51 cloud B | totéž | `true` |

Cloud A a B se liší jen hodnotou `turnWaypointsEnabled` (a vymyšleným `suunto:id`, aby import nekolidoval).

## Kontrolní hodnoty – rozhodující měření
Pole č. 4 „Zbývající vzdálenost k místu zájmu / waypointu“ do ~20 m od startu ukazuje vzdálenost ke startu.
Potom **asi 30 m za startem**:

| Pole ukazuje | Význam |
|---|---|
| **~200 m** | odbočku bere jako waypoint → **funkční stav, který hledáme** |
| **~380 m** | ukazuje konec trasy → odbočku do pole nepočítá (jako T2b/T6) |

Pro jistotu zapsat i hodnotu **asi 100 m za startem** (~130 m = odbočka, ~310 m = konec).

## Pevný postup (pro každý soubor zvlášť)
1. Starou trasu stejného jména v aplikaci smazat (u test51 i případné „test51 test1“ nechat, ale nepoužívat).
2. U naposledy použité trasy mít „Navigace krok za krokem“ **zapnutou** (u test51 se stav nepřebírá, viz bod 4; nechat kvůli srovnání s cloud A/B).
3. Importovat soubor. Zapsat: **stav volby „Navigace krok za krokem“ u nové trasy hned po importu**
   (u cloud A/B je to zároveň test, zda aplikace čte `turnWaypointsEnabled`), zda jsou odbočky vidět na mapě v aplikaci
   (u cloud A/B: vidět vůbec? s ikonou? s názvem „Go straight“ / „Turn sharp right“?).
4. Zjištěno u test51 (2026-10-23): po importu je volba **vždy vypnutá** a odbočky na mapě nejsou vidět. Stav po importu
   zapsat, pak volbu **zapnout** a zkontrolovat, že jsou odbočky vidět. Bez zapnutí by se nebylo co měřit.
   U cloud A/B: pokud je volba po importu zapnutá (hlavně u B), je to doklad, že aplikace čte `turnWaypointsEnabled`.
5. Vynutit synchronizaci, počkat na dokončení.
6. V hodinkách zapsat: odbočky na mapě, pole č. 4 ve **30 m** a **100 m** za startem, notifikace (kdy, jaká ikona),
   pole č. 4 po notifikaci, údaj „Distance to next turn“ na obrazovce mapy.

Pořadí: **test51** (reprodukce) → **cloud A** → **cloud B**.

## Možné výsledky
- test51 ukáže ~200 m → funkční stav existuje; hledáme, čím se liší od T2b (formát je stejný → postup / stav aplikace).
- test51 ukáže ~380 m → test51 „fungoval“ jen v dosahu notifikace a jeho reprodukce problém neřeší.
- Cloud A/B se nenaimportuje nebo nemá odbočky → aplikace formát cloudu nečte (případně připravím variantu bez `suunto:id`).
- Cloud A a B se po importu liší stavem volby → aplikace čte `turnWaypointsEnabled`.

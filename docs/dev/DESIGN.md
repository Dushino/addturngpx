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

Oficiální popis formátu tras: https://apizone.suunto.com/route-description (analýza po cyklu 3).

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
| Begin/End | wpt s `<type>Begin/End</type>` = značky S/F, v seznamu „not editable“; odvozené S/F z čáry jen pokud je soubor nemá | požadavek uživatele |
| Odkaz `?url=` | otevře GPX z URL při startu, pak se parametr z adresního řádku odstraní (reload pak obnoví uloženou relaci, ne původní soubor) | rozhodnutí uživatele |
| GitHub odkazy | `github.com/…/blob/…` se automaticky převede na `raw.githubusercontent.com` | raw povoluje CORS |
| Relace | IndexedDB `addturngpx`/`session`, klíč `current`: {xml (= původní text), fileName, sourceUrl, handle, savedAt} — obnoví se po reloadu | rozhodnutí uživatele |
| Zobrazení trasy | `<trk>` plná modrá čára s bílým lemem; `<rte>` stejně, jen vedle tracku fialová přerušovaná; šipky směru (vlastní implementace, ~110 px rozestup, jen ve výřezu); značky start/cíl | rozhodnutí uživatele |
| Testovací data | `samples/` v repu | rozhodnutí uživatele |
| Git | Claude neprovádí žádné git operace | pravidlo uživatele |

## Otevřené otázky
- Které atributy waypointu editovat (name, desc, sym, type, ele…)? → cyklus editace
- Ukládání: File System Access API (Chrome/Edge desktop – lze přepsat původní soubor) vs. stažení souboru (ostatní prohlížeče, mobil). → cyklus ukládání
- Další mapové podklady (OpenTopoMap, Mapy.cz s API klíčem → správa credentials)? → pozdější cyklus

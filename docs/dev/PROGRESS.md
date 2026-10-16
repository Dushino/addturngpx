# Postup implementace

Každý cyklus: vyjasnění specifikace → implementace → test → oprava chyb →
potvrzení od uživatele → další cyklus.

| # | Feature | Stav |
|---|---|---|
| 0 | Vyjasnění cílů, založení poznámek | hotovo (2026-10-16) |
| 1 | Kostra aplikace: mapa OSM, responzivní layout, tmavý/světlý režim, PWA | hotovo, potvrzeno uživatelem (2026-10-16) |
| 2 | Načtení GPX (lokální soubor + URL), zobrazení trasy a waypointů | implementováno, otestováno, čeká na potvrzení |
| 3 | Editace waypointů (přidat, přesunout, upravit atributy, smazat) | — |
| 4 | Uložení GPX na lokální filesystém | — |
| 5 | Další mapové podklady, případně správa credentials | — |
| 6 | Nasazení na GitHub Pages, README | — |

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

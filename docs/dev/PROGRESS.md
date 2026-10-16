# Postup implementace

Každý cyklus: vyjasnění specifikace → implementace → test → oprava chyb →
potvrzení od uživatele → další cyklus.

| # | Feature | Stav |
|---|---|---|
| 0 | Vyjasnění cílů, založení poznámek | hotovo (2026-10-16) |
| 1 | Kostra aplikace: mapa OSM, responzivní layout, tmavý/světlý režim, PWA | implementováno, otestováno, čeká na potvrzení |
| 2 | Načtení GPX (lokální soubor + URL), zobrazení trasy a waypointů | — |
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

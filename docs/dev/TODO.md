# TODO

- [x] Cyklus 1: specifikace kostry potvrzena a implementována
- [x] Cyklus 1: ruční test uživatelem, potvrzeno
- [ ] Před cyklem 6: README.md (EN) a README-CZ.md, zmínit licenci Leafletu (BSD-2, `vendor/leaflet/LICENSE`)
- [ ] Při každé změně souborů aplikace zvýšit `CACHE_NAME` v sw.js
- [x] Ověřit nástroje pro testy: k dispozici google-chrome (headless), firefox, node 22, python3
- [ ] Cyklus 2: ruční test uživatelem, potvrzení
- [ ] Upřesnit atributy waypointu k editaci (cyklus 3) — u Suunto hlavně `<type>`: zjistit úplný seznam typů pokynů, které Suunto aplikace přijímá
- [ ] Cyklus 3: jak formátovat nový/změněný `<wpt>` (Suunto: vše na jednom řádku, pořadí ele/name/desc/type) a kam ho vložit (pořadí waypointů podél trasy?)
- [ ] Cyklus 3: má se u nového wpt doplňovat `<ele>` (Suunto ho má u všech)? Odkud — z nejbližšího rtept?
- [ ] Soubory v jiném kódování než UTF-8 (deklarace `encoding="…"`): zatím se dekódují jako UTF-8 — rozhodnout při ukládání (cyklus 4)
- [ ] Upřesnit způsob ukládání (cyklus 4)
- [ ] Rozhodnout o dalších mapových podkladech (cyklus 5)

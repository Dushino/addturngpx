# Měření 2026-11-13 – místa ke kontrole

Výřezy (~150 m) z tras, kde se pokyn liší mezi dnešní verzí a variantou z měření
(`docs/dev/DESIGN.md` → „Měření: hranice křižovatky u trasy a vzdálenosti směrů cest“).
Otevřít v AddTurn GPX a podívat se do mapy. Název waypointu říká, odkud pokyn je:

- **DNES** – současná verze (hranice 5 m, směry cest v 5/10/20 m),
- **A 8m** – varianta A: uzel křižovatky smí být až 8 m od trasy (dnes 5 m),
- **C** – varianta C: směry cest v 10/20/30 m (dnes 5/10/20 m),
- **uzel …** – uzel křižovatky z mapy, ze kterého pokyn vznikl (bod mimo trasu, šedý s červeným okrajem).

Pokyny obou verzí jsou v souboru současně – vybrat, který odpovídá skutečnosti.

| Soubor | Místo | Dnes | Varianta |
|---|---|---|---|
| `1 Brno-work 129m.gpx` | Brno---work, 129 m | Keep right at fork (uzel 0,15 m od trasy) | A: **stejný pokyn o 5 m dál**, z uzlu 6,97 m vedle trasy – v podstatě beze změny |
| `2 Brno-work 1023m.gpx` | Brno---work, 1023 m | nic | A: **nový Keep right at fork** z uzlu 7,52 m vedle trasy |
| `3 Brno-Test1 cik-cak.gpx` | Brno Test 1, 338–350 m | Turn left (338 m) | C: **Keep right at fork** (350 m, o 12 m dál, druhá ze dvou blízkých křižovatek); Turn left zmizí, protože rozcestí má přednost a obě jsou blíž než minimální rozestup 15 m |

Otázky: (2) patří na 1023 m „Keep right at fork“? (3) Je správně Turn left na 338 m, nebo Keep right at fork na 350 m?

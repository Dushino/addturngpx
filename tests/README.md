# Tests

Automated tests run the app in headless Google Chrome.

```
node tests/run.mjs tests/tiles.json tests/generator.json tests/editing.json tests/clicks.json tests/categories.json
```

Requirements: Node.js 22+ and Google Chrome. The runner looks for a `google-chrome` command; set `CHROME=/path/to/chrome` if yours is elsewhere. The runner starts its own local web server for the project folder, so you don't need to run one. Set `VERBOSE=1` to print the value each step returns.

| File | What it checks |
| --- | --- |
| `tiles.json` | Road data from **vector map tiles**: junctions from OpenFreeMap tiles without any Overpass request, the same junctions and proposed turns as Overpass on the Vracov route, source and credit in the card, stored with its source, tile decoder, fallback OpenFreeMap → OpenStreetMap vector tiles → Overpass, a tile retried after HTTP 500, empty tiles not trusted, too many tiles → Overpass, and synthetic tiles for the repairs (T-junction without a shared point, X-crossing, bridge, overlapping lines, line cut at the tile edge) |
| `generator.json` | **Turns generator** (with the tile sources blocked, so road data come from the Overpass mock): opening the card downloads nothing, Generate turns, a changed setting removes the preview and locks Apply, proposals at junctions, Apply/Undo, Add missing vs. Replace, deleting turns without saving and generating again, minimum spacing, settings, server failures with automatic retries (overloaded server, empty answer, HTTP 429, request refused, timeout; a non-retryable error is not retried; closing the card stops retrying; a failed answer is never cached), and road data stored in the browser (survives a reload, not downloaded again after inserting a route point, Refresh road data) |
| `clicks.json` | Mouse cursor by click target (crosshair over the route, pointer at a waypoint, hand elsewhere and with the generator card open), adding by clicking the route, selecting by clicking near a waypoint, closing the editor by clicking an empty place or with Esc, type taken from a selected point of interest, phone layout, interplay with the Generate turns card |
| `categories.json` | Point-of-interest groups: every type in exactly one group, the agreed mapping, a distinct colour per group, selection ring, grouped type picker |
| `editing.json` | Exact file preservation of Suunto app exports: loading, changing a type or name, Undo/Redo, adding a waypoint on a route point (with its elevation), inserting a route point on a long segment, moving a waypoint, saving, `windows-1250` → UTF-8. Conversion to the Suunto app format on open: a Suunto app export (test51) is not converted, conversion is idempotent, a Routeplanner file is converted (header, one line, no extensions, Begin…End in route order, elevation everywhere), tracks become one route with generated Begin/End, route points with a name/type become waypoints, an old unconverted session is converted on restore. Route name: editable field in the panel, only the right `<name>` changes (route name has priority over metadata), Undo, empty name refused, Save as suggests `<route name>.gpx` |

**The tests never contact the real data services.** Requests to the Overpass API are answered from `fixtures/vracov-overpass.json`, which holds OpenStreetMap data around `samples/Vracov 5km.gpx`, or replaced with simulated failures. Map tile requests are answered from `fixtures/tiles/openfreemap/` (OpenFreeMap, OpenMapTiles schema) and `fixtures/tiles/osmf/` (OpenStreetMap vector tiles, Shortbread schema): 12 tiles at zoom 14 around the same route, downloaded on 2026-10-21. Data © OpenStreetMap contributors (ODbL); OpenFreeMap tiles © OpenMapTiles.

The tile mock is set per source with `__setTiles({ of, osmf })` (the setting survives a page reload): `fixture`, `blocked` (HTTP 403), `down` (no network), `empty` (empty tiles), `failOnce` (the first request fails with HTTP 500), or `live` (the real service, for a manual check only; don't use it in committed tests).

Each scenario step is `{ "name", "eval", "expect"?, "nav"?, "w"?, "h"?, "mobile"?, "wait"? }`. `eval` is async code run inside the page, and its return value is compared key by key with `expect`. The exit code is non-zero if any step fails.

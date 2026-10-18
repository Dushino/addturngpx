# Tests

Automated tests run the app in headless Google Chrome.

```
node tests/run.mjs tests/generator.json tests/editing.json
```

Requirements: Node.js 22+ and Google Chrome. The runner looks for a `google-chrome` command; set `CHROME=/path/to/chrome` if yours is elsewhere. The runner starts its own local web server for the project folder, so you don't need to run one. Set `VERBOSE=1` to print the value each step returns.

| File | What it checks |
| --- | --- |
| `generator.json` | **Generate turns**: proposals at junctions, Apply/Undo, Add missing vs. Replace, deleting turns without saving and generating again, minimum spacing, settings, and server failures (overloaded server, empty answer with automatic retry, HTTP 429, request refused, timeout, a failed answer must not be cached) |
| `editing.json` | Exact file preservation: loading, changing a type or name, Undo/Redo, adding a waypoint on a route point, inserting a route point on a long segment (`suunto-rp:waypointIndices`), moving a waypoint, saving, `windows-1250` → UTF-8 |

**The tests never contact the real Overpass API.** Requests to it are answered from `fixtures/vracov-overpass.json`, which holds OpenStreetMap data around `samples/Vracov 5km.gpx` (© OpenStreetMap contributors, ODbL), or replaced with simulated failures.

Each scenario step is `{ "name", "eval", "expect"?, "nav"?, "w"?, "h"?, "mobile"?, "wait"? }`. `eval` is async code run inside the page, and its return value is compared key by key with `expect`. The exit code is non-zero if any step fails.

# Tests

Automated tests run the app in headless Google Chrome.

```
node tests/run.mjs tests/generator.json tests/editing.json tests/clicks.json tests/categories.json
```

Requirements: Node.js 22+ and Google Chrome. The runner looks for a `google-chrome` command; set `CHROME=/path/to/chrome` if yours is elsewhere. The runner starts its own local web server for the project folder, so you don't need to run one. Set `VERBOSE=1` to print the value each step returns.

| File | What it checks |
| --- | --- |
| `generator.json` | **Generate turns**: proposals at junctions, Apply/Undo, Add missing vs. Replace, deleting turns without saving and generating again, minimum spacing, settings, server failures with automatic retries (overloaded server, empty answer, HTTP 429, request refused, timeout; a non-retryable error is not retried; closing the card stops retrying; a failed answer is never cached), and road data stored in the browser (survives a reload, not downloaded again after inserting a route point, Refresh road data) |
| `clicks.json` | Adding by clicking the route, selecting by clicking near a waypoint, closing the editor by clicking an empty place or with Esc, type taken from a selected point of interest, phone layout, interplay with the Generate turns card |
| `categories.json` | Point-of-interest groups: every type in exactly one group, the agreed mapping, a distinct colour per group, selection ring, grouped type picker |
| `editing.json` | Exact file preservation: loading, changing a type or name, Undo/Redo, adding a waypoint on a route point, inserting a route point on a long segment (`suunto-rp:waypointIndices`), moving a waypoint, saving, `windows-1250` → UTF-8 |

**The tests never contact the real Overpass API.** Requests to it are answered from `fixtures/vracov-overpass.json`, which holds OpenStreetMap data around `samples/Vracov 5km.gpx` (© OpenStreetMap contributors, ODbL), or replaced with simulated failures.

Each scenario step is `{ "name", "eval", "expect"?, "nav"?, "w"?, "h"?, "mobile"?, "wait"? }`. `eval` is async code run inside the page, and its return value is compared key by key with `expect`. The exit code is non-zero if any step fails.

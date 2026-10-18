# AddTurn GPX

Česká verze je zde: [README-CZ.md](README-CZ.md)

Application: <https://dushino.github.io/addturngpx/>

AddTurn GPX adds turn-by-turn navigation instructions to GPX routes for **Suunto watches**. It runs entirely in your browser, with no server and no account.

Suunto watches show an instruction (turn left, keep right at a fork, …) and the distance to it while you navigate a route. They only do that for waypoints that meet strict conditions, though, and most GPX files, including many made in other planners, end up with no instructions at all. AddTurn GPX lets you open a route, add the instructions by hand or generate them automatically at real junctions, and save a file that the Suunto app imports correctly. Everything else in the file is kept exactly as it was.

![AddTurn GPX with a route and generated turn instructions](docs/img/overview.jpg)

## Quick start

1. In the **Suunto app**, share the route. You get a link (see [Opening a route](#opening-a-route)).
2. In AddTurn GPX, click **Open URL** and paste the link. You can also open a `.gpx` file from your device.
3. Click **Generate turns…** in the panel, check the preview on the map and click **Apply**. Or add instructions yourself by clicking the route.
4. Click **Save**.
5. Import the saved file into the Suunto app and sync it to your watch.

## Opening a route

- **Open URL**: paste a link to a GPX file. A route shared from the Suunto app gives a link like `https://api.sports-tracker.com/apiserver/v2/routes/export/…?brand=SUUNTOAPP&format=gpx-route`, and the app can download it directly. Links to files on `github.com` work too. Other websites work only if they allow other sites to download their files. If they don't, the app says so, and you can download the file in your browser and use **Open** instead.
- **Open**: choose a `.gpx` file on your device. On a computer you can also drag the file into the window.
- **Link that opens a route directly**: add `?url=` and the encoded address of the GPX file to the app address, for example `https://dushino.github.io/addturngpx/?url=https%3A%2F%2F…`.

The app remembers the open file and your unsaved changes, so closing the tab or reloading the page doesn't lose your work.

## The screen

- **Map**: the route with arrows showing the direction of travel, plus the waypoints. The buttons on the left zoom in and out, show your location, and **⤢ Fit route** shows the whole route. The layers button on the right switches between **OpenStreetMap**, **OpenTopoMap** (topographic map with contour lines) and **Satellite (Esri)**.
- **Panel** (on the right on a computer, a pull-up sheet at the bottom on a phone): file details, the name the watch will show (*Name on watch*), and the list of waypoints in the order you'll reach them on the route.
- **Toolbar**: Open, Open URL, Undo, Redo, Save.

<img src="docs/img/mobile.jpg" alt="AddTurn GPX on a phone" width="260">

The layout adapts to the screen (computer, tablet, phone), and the controls follow your system's light or dark mode. The map itself always stays light.

## Colours and icons

| Marker | Meaning |
| --- | --- |
| Orange circle with an arrow | Turn instruction. The arrow is rotated to match the direction you arrive from, so "turn right" points right as you'll see it on the ground. |
| Orange circle with a ring and number | Roundabout, the number is the exit |
| Blue circle with a symbol | Point of interest – water & sea (water, water point, river, lake, waterfall, beach, …) |
| Green circle with a symbol | Point of interest – nature, terrain & wildlife (forest, peak, cave, mushrooms, game, fishing spot, …) |
| Brown circle with a symbol | Point of interest – food & lodging (café, restaurant, hotel, camp, campfire, …) |
| Turquoise circle with a symbol | Point of interest – orientation & transport (info, sight, parking, road, trail, crossroads, geocache) |
| Red circle with a symbol | Safety: danger, avalanche, emergency, aid station |
| Purple circle with a pin | Plain waypoint (no type, or a type the watch doesn't know) |
| Green **S** / red **F** | Start and finish of the route (Suunto's *Begin* and *End*). Shown but not editable. |
| Grey with a dashed red outline | **The waypoint is not on a route point, so Suunto will ignore it.** The list shows the distance to the nearest route point, and the editor has a *Snap to nearest route point* button. |
| Blue ring, slightly larger | The selected waypoint (it keeps the colour of its type) |

All 78 waypoint types that Suunto supports have their own icon. In the editor, points of interest are listed under the same groups. Other warnings in the list:

- **Unknown type**: Suunto shows the waypoint as a plain *Waypoint*.
- **Several tracks or routes in one file**: Suunto imports each one as a separate route.

## Editing waypoints

![Editing a waypoint](docs/img/editor.jpg)

- **Add**: click (or tap) the route line where there is no waypoint yet. The new waypoint snaps to the nearest route point and its editor opens.
  - If there is no route point near the place you clicked (a long straight section), the app adds a new route point exactly on the line. The shape of the route doesn't change.
  - The type is suggested from the angle of the route at that point. If a waypoint with a point-of-interest type is selected (for example *Water point*), the new one gets the same type, which makes adding several of them quick.
- **Edit**: click a waypoint on the map (or close to it) or in the list to open the editor. Click an empty place of the map, or press Esc, to close the editor.
  - **Type**: turn instructions and roundabouts at the top, points of interest under *Points of interest*. A green dot marks the type suggested by the route angle.
  - **Name** (optional). Watches may shorten long names.
  - **◀ Previous point / Next point ▶** move the waypoint along the route.
  - **Delete waypoint**, with a confirmation.
- **Drag** a marker with the mouse (on a computer). It snaps to the route when you drop it.
- **Undo / Redo**: every change can be undone, including automatic generation as a single step.
- **Modified** next to the file name means the changes haven't been saved to a file yet. The app asks before you close the file or open another one.

## Automatic turn instructions

![Generating turn instructions](docs/img/generator.jpg)

**Generate turns…** in the file details panel proposes instructions automatically:

- It downloads the road and path network around the route from **OpenStreetMap** and places instructions **only at junctions**. A bend in the road without a junction gets no instruction.
- At a junction where the route changes direction by at least the *minimum angle*, it adds a turn (bear, turn, sharp, U-turn). It also recognises **forks**, where the way splits into two similar directions, and adds *Keep left / right at fork* even when the route goes almost straight. This is the case where watches typically give no instruction at all.
- **Add missing turns** keeps all existing waypoints and adds only new ones. **Replace all turns** first removes existing turn and fork waypoints and calculates them again. Roundabouts, "straight on", points of interest and start/finish are always kept.
- **Minimum angle** (default 20°) and **minimum spacing** (default 15 m) can be changed. Spacing prevents waypoints from ending up a few centimetres apart.
- The proposal appears on the map as a preview first and is written only after **Apply**. One **Undo** removes it all.
- Roundabouts and "straight on" can't be detected from the network shape, so add them by hand if you need them.
- Generating needs an internet connection the first time. The public OpenStreetMap data server is often busy. The app retries automatically (up to 3 attempts) and shows its progress; if it still fails, use **Try again** later.
- Once downloaded, the road data for a route are **stored in your browser for 30 days**, so generating again (also after reopening the app or adding waypoints) doesn't need the server. **Refresh road data** downloads them again, for example when the map has changed.

## Saving

- **Save** (Ctrl+S):
  - In Chrome and Edge on a computer, Save overwrites the file you opened.
  - For a route opened from a URL, it asks where to save.
  - In other browsers and on phones, the file is downloaded.
- **Save as…** (Ctrl+Shift+S) always asks for a new file.
- **On a phone**: Chrome on Android can't share GPX files to other apps. Save the file, then open it from *Downloads* in the Suunto app. Where the browser supports sharing GPX files, a **Share…** button appears.

**The file stays exactly as it was.** The app changes only the waypoints (and route points you added). Everything else is kept byte for byte: the XML declaration, metadata, extensions, line breaks and indentation. New waypoints are written in the same style as the existing ones.

- A file in an encoding other than UTF-8 (for example `windows-1250`) is read correctly and saved as UTF-8. The app tells you when this happens.
- Files from the **Suunto Routeplanner** contain a list of the route points that carry waypoints (`suunto-rp:waypointIndices`). The app keeps this list up to date after every change.

## How Suunto reads waypoints

According to [Suunto's route specification](https://apizone.suunto.com/route-description), a waypoint is imported only if:

- it is a `<wpt>` with **exactly the same coordinates as one of the route points** (`rtept`/`trkpt`), or
- it is a route point that has a `name` or `type`.

The first condition is the most common reason why waypoints from other GPX files disappear on import. AddTurn GPX always places waypoints on route points, copying the coordinates exactly, and warns you about any waypoint that isn't on one. A waypoint with no name gets an unnamed instruction. A waypoint with no type becomes a plain *Waypoint*. This was confirmed on real watches: they navigated the route and showed the distance to the next instruction.

## Installing on your phone and offline use

The app can be installed like a regular app, with its own icon, and it then works without an internet connection. Map tiles and automatic generation still need a connection.

- **Android (Chrome)**: open the app, then use the ⋮ menu → *Install app* (or *Add to Home screen*).
- **iPhone / iPad (Safari)**: Share → *Add to Home Screen*.

If Chrome on Android says *"This app is already installed"* although it isn't, or *"Could not open app"*, clear Chrome's browsing data (Settings → Privacy and security → *Delete browsing data*) and install again.

## Data and privacy

The app has no server and no user accounts, and it doesn't track you. Your open route, unsaved changes, settings and downloaded road data are stored only in your browser, on your device.

The app talks to other services only for these tasks:

- **Map tiles**: OpenStreetMap, OpenTopoMap or Esri, depending on the selected map.
- **Open URL**: downloads the file from the address you enter.
- **Generate turns**: sends the coordinates of the route to the public OpenStreetMap data service [Overpass API](https://overpass-api.de) to get the junctions around it.

## Keyboard shortcuts

| Shortcut | Action |
| --- | --- |
| Ctrl+Z | Undo |
| Ctrl+Y / Ctrl+Shift+Z | Redo |
| Ctrl+S | Save |
| Ctrl+Shift+S | Save as… |
| Esc | Close the editor or the Generate turns card |

On a Mac, use Cmd instead of Ctrl.

## Licence and credits

- AddTurn GPX is licensed under the [GNU GPL v3](LICENSE).
- Map library: [Leaflet](https://leafletjs.com) (BSD 2-Clause, `vendor/leaflet/LICENSE`).
- Icons for points of interest: [Tabler Icons](https://tabler.io/icons) (MIT, `vendor/tabler-icons/LICENSE`).
- Map data and maps:
  - © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors (ODbL)
  - [OpenTopoMap](https://opentopomap.org) (CC-BY-SA)
  - Satellite imagery © Esri (Source: Esri, Vantor, Earthstar Geographics, and the GIS User Community)
- Junction data: OpenStreetMap via the [Overpass API](https://overpass-api.de).

## For developers

- The whole app is a single `index.html` (HTML, CSS and JavaScript) with no build step and no dependencies apart from the bundled Leaflet. `sw.js` is the service worker for offline use. Increase `CACHE_NAME` whenever the app files change.
- Run it over HTTP, for example `python3 -m http.server` in the project folder, then open `http://localhost:8000`. Opened directly as a file (`file://`), OpenStreetMap blocks the map tiles.
- `samples/` contains test GPX files: Suunto exports, all turn types, roundabouts and points of interest, waypoints defined in route points, a `windows-1250` file and broken files.
- `tests/` contains automated tests. Run them with `node tests/run.mjs tests/generator.json tests/editing.json tests/clicks.json tests/categories.json`. See [tests/README.md](tests/README.md).
- `docs/dev/` contains development notes: design decisions, progress and the to-do list (in Czech).

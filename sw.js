// AddTurn GPX — service worker pro offline chod aplikace.
// Strategie: "network-first, cache jako záloha" — pokud je připojení
// k internetu, aplikace si vždy natáhne nejčerstvější verzi a zároveň si ji
// uloží do cache. Pokud připojení není, použije se poslední stažená verze.
// Obsluhují se jen soubory aplikace (stejný origin). Mapové dlaždice a GPX
// stahované z cizích URL jdou mimo service worker přímo na síť, aby cache
// nerostla bez omezení.

const CACHE_NAME = "addturngpx-v8";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.svg",
  "./vendor/leaflet/leaflet.js",
  "./vendor/leaflet/leaflet.css",
  "./vendor/leaflet/images/layers.png",
  "./vendor/leaflet/images/layers-2x.png",
  "./vendor/leaflet/images/marker-icon.png",
  "./vendor/leaflet/images/marker-icon-2x.png",
  "./vendor/leaflet/images/marker-shadow.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (new URL(event.request.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() =>
        caches.match(event.request).then((cached) => cached || caches.match("./index.html"))
      )
  );
});

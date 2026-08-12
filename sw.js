/**
 * Service Worker de BMEUsco — Operaciones Unitarias
 *
 * Estrategia: red primero, caché como respaldo. Cada vez que el estudiante
 * abre la app con internet, recibe la versión más reciente automáticamente.
 * Si no tiene conexión, usa la última versión guardada.
 *
 * IMPORTANTE PARA EL DOCENTE:
 * Cada vez que subas una actualización de index.html a GitHub Pages, cambia
 * el valor de CACHE_NAME de abajo (por ejemplo, de "-a" a "-b"). Eso hace que
 * los teléfonos que ya tenían la app instalada borren la versión vieja del
 * caché y descarguen la nueva la próxima vez que abran la app con internet.
 * Si no cambias este valor, la actualización igual llega (por la estrategia
 * de red primero), pero cambiarlo garantiza una limpieza total del caché viejo.
 */
const CACHE_NAME = 'bmeusco-2026-08-08-h';
const APP_SHELL = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request, { cache: 'no-store' })
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

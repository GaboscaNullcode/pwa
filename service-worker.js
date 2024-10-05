const CACHE_NAME = 'mi-pwa-cache-v1';
const urlsToCache = [
  '/',
  'https://start-test_prueba.toddle.site/',
  '/styles.css',
  '/app.js',
  '/cdn-cgi/imagedelivery/ZIty0Vhmkm0nD-fBKJrTZQ/test_prueba:NullCode.png/128',
  '/cdn-cgi/imagedelivery/ZIty0Vhmkm0nD-fBKJrTZQ/test_prueba:NullCode.png/540'
];

// Instalación del Service Worker y almacenamiento en caché
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar solicitudes de red para servir desde la caché
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response; // Devuelve desde la caché
        }
        return fetch(event.request); // Si no está en la caché, realiza la solicitud a la red
      })
  );
});

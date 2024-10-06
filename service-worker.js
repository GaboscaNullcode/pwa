const CACHE_NAME = 'mi-pwa-cache-v1';
const urlsToCache = [
  '/',
  'https://tasksai.toddle.site/',
  '/styles.css',
  '/app.js',
  'https://tasksai.toddle.site/cdn-cgi/imagedelivery/ZIty0Vhmkm0nD-fBKJrTZQ/azure_qui_gon_jinn_industrial_chinchilla:NullCode.png/128',
  'https://tasksai.toddle.site//cdn-cgi/imagedelivery/ZIty0Vhmkm0nD-fBKJrTZQ/azure_qui_gon_jinn_industrial_chinchilla:NullCode.png/540'
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

const CACHE_NAME = 'biriba-cache-v4.0'; // <-- MUDE ESTE NÚMERO A CADA ATUALIZAÇÃO

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon.svg',
  './idiomas/index.json'
];

self.addEventListener('install', (e) => {
  self.skipWaiting(); // Força o novo SW a assumir o controle assim que for instalado
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim()) // Assume o controle das abas abertas imediatamente
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
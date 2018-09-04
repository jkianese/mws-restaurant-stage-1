const cacheName = 'static-v1';

const cacheFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

// Call Install Event
self.addEventListener('install', event => {
    event.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            cache.addAll(cacheFiles);
        })
    );
});

// Call Activate Event
self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
          }).map(function(cacheFiles) {
            return caches.delete(cacheFiles);
          })
        );
      })
    );
  });

  // Call Fetch Event
  self.addEventListener('fetch', event => {
      event.respondWith(
          fetch(event.request).catch(() => caches.match(event.request)));
  }); 
  


console.log('Service Worker is registered');



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

/* MC WT 
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll(cacheFiles);
        })
    );
});
*/

/* From MDN Web Docs ExtendableEvent.waitUntil
 *  Install Event in Service Workers
 *
 *   addEventListener('install', event => {
 *       event.waitUntil(async function() {
 *           const cache = await caches.open('static-v1');
 *           await cache.addAll([
 *               '/', '/about/', '/static/styles.css'
 *           ]);
 *       }());
 *   });
 */
addEventListener('install', event => {
    event.waitUntil(
        caches.open('static-v1').then(function(cache) {
            return cache.addAll(cacheFiles);
        })
    );
});

/* MDN Web Docs
 *  FetchEvent.respondWith()
 */

addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                console.log('Found ', event.request, ' in cache');
                return response;
            }
            else {
                console.log('Could not find ', event.request, ' in cache');
                return fetch(event.request)
                .then(function(response) {
                    const clonedResponse = response.clone(); 
                    caches.open('static-v1').then(function(cache) {
                        cache.put(event.request, clonedResponse);
                    })
                    return response;
                })
                .catch(function(err) {
                    console.error(err);
                });
            }
        })
    );
});
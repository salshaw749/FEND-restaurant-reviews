const cacheName = "Restaurant-Reviews";
const db = [
    "./",
    "./index.html",
    "./restaurant.html",
    "./css/styles.css",
    "./data/restaurants.json",
    "./js/dbhelper.js",
    "./js/main.js",
    "./js/restaurant_info.js",
    "./img/1.jpg",
    "./img/2.jpg",
    "./img/3.jpg",
    "./img/4.jpg",
    "./img/5.jpg",
    "./img/6.jpg",
    "./img/7.jpg",
    "./img/8.jpg",
    "./img/9.jpg",
    "./img/10.jpg",
    "https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"
];

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open("cacheName").then(function(cache) {
            return cache.addAll(db);
        })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(

        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return (
                        cacheName.startsWith("cacheName") &&
                        cacheName != staticCacheName
                    );
                })
                .map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
        caches.match(event.request).then((response) => {

            if (response) {
                console.log('Found ', event.request.url, ' in cache');
                return response || fetch(event.request);;
            }

        }).catch(error => {
            console.log('error ', event.error);

        })
    );
});
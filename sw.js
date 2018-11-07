var CACHE_NAME = 'cache-v1';
var cacheUrls = [
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'https://fonts.googleapis.com/css?family=Dosis',
    'https://code.jquery.com/jquery-3.3.1.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.2/localforage.min.js',
    'https://azurlane.koumakan.jp/w/images/thumb/8/8b/Duration.png/25px-Duration.png',
    'https://azurlane.koumakan.jp/w/images/thumb/0/06/Armor.png/25px-Armor.png',
    'https://azurlane.koumakan.jp/w/images/thumb/e/e3/Refill.png/25px-Refill.png',
    'https://azurlane.koumakan.jp/w/images/thumb/d/d5/Firepower.png/25px-Firepower.png',
    'https://azurlane.koumakan.jp/w/images/thumb/4/40/Torpedo.png/25px-Torpedo.png',
    'https://azurlane.koumakan.jp/w/images/thumb/d/d2/Evasion.png/25px-Evasion.png',
    'https://azurlane.koumakan.jp/w/images/thumb/0/0f/AntiAir.png/25px-AntiAir.png',
    'https://azurlane.koumakan.jp/w/images/thumb/6/6a/Aviation.png/25px-Aviation.png',
    'https://azurlane.koumakan.jp/w/images/thumb/9/90/Consumption.png/25px-Consumption.png',
    'https://azurlane.koumakan.jp/w/images/thumb/1/16/ASW.png/25px-ASW.png',
    'https://azurlane.koumakan.jp/w/images/thumb/c/c4/Coinicon.png/25px-Coinicon.png',
    'https://azurlane.koumakan.jp/w/images/thumb/f/f2/Oilicon.png/25px-Oilicon.png',
    'https://azurlane.koumakan.jp/w/images/thumb/3/33/Medalicon.png/20px-Medalicon.png'
];
self.addEventListener('install', function(event){
    cacheUrls.forEach(function(item){
        const request = new Request(item, { mode: 'no-cors' });
        fetch(request).then(function(response){
            caches.open(CACHE_NAME).then(function(cache){
                return cache.put(request, response);
            });
        });
    });
});
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response){
            // Return cached content.
            if (response) {
                return response;
            }

            // Store request.
            var fetchRequest = event.request.clone();
            return fetch(fetchRequest).then(
                function(response){
                    if(!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    var responseToCache = response.clone();
                    caches.open(CACHE_NAME).then(function(cache) {
                        cache.put(event.request, responseToCache);
                    });
                    return response;
                }
            );
        })
    );
});
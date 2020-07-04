//This is the fetch event listener
self.addEventListener("fetch", (event) => {
    var currentUrl = new URL(event.request.url);
    if (currentUrl.origin === location.origin){
        var newRequest = new Request(event.request, {
            mode: "cors",
            credentials: "same-origin",
            headers: {
                YOUR_CUSTOM_HEADER_NAME: YOUR_CUSTOM_HEADER_VALUE,
            }
        });
        event.respondWith(fetch(newRequest));
    }
    else {
        event.respondWith(fetch(event.request));
    }
});
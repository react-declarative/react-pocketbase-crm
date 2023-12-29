self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.endsWith(".js") || event.request.url.endsWith(".html")) {
    event.respondWith(
      fetch(event.request, {
        cache: "no-store",
      })
    );
    return;
  }
  event.respondWith(fetch(event.request));
});

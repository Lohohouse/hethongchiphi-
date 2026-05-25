// Service Worker v15 — Auto-update mechanism
// File này chạy ở tầng TRƯỚC index.html, kiểm soát mọi request

const CACHE_VERSION = 'loho-v15';
const VERSION_URL = 'version.json';
const CRITICAL_FILES = ['index.html', 'app.js', 'version.json'];

// Install: cache các file quan trọng
self.addEventListener('install', function(event) {
  console.log('[SW] Install:', CACHE_VERSION);
  self.skipWaiting(); // Kích hoạt ngay, không đợi tab cũ đóng
});

// Activate: xóa cache cũ
self.addEventListener('activate', function(event) {
  console.log('[SW] Activate:', CACHE_VERSION);
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_VERSION; })
            .map(function(k) { console.log('[SW] Xóa cache cũ:', k); return caches.delete(k); })
      );
    }).then(function() {
      return self.clients.claim(); // Chiếm quyền điều khiển tất cả tab
    })
  );
});

// Fetch: network-first cho critical files, cache-first cho static
self.addEventListener('fetch', function(event) {
  var url = new URL(event.request.url);

  // Chỉ xử lý same-origin requests
  if (url.origin !== self.location.origin) return;

  var filename = url.pathname.split('/').pop();

  // Critical files (index.html, app.js, version.json) → LUÔN lấy từ network
  if (CRITICAL_FILES.indexOf(filename) !== -1 || url.pathname.endsWith('/')) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then(function(response) {
          // Cache bản mới
          var clone = response.clone();
          caches.open(CACHE_VERSION).then(function(cache) {
            cache.put(event.request, clone);
          });
          return response;
        })
        .catch(function() {
          // Offline → dùng cache
          return caches.match(event.request);
        })
    );
    return;
  }

  // Các file khác (CSS, fonts, images) → cache-first
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      return cached || fetch(event.request).then(function(response) {
        var clone = response.clone();
        caches.open(CACHE_VERSION).then(function(cache) {
          cache.put(event.request, clone);
        });
        return response;
      });
    })
  );
});

// Message: nhận lệnh từ app.js
self.addEventListener('message', function(event) {
  if (event.data === 'CHECK_UPDATE') {
    fetch(VERSION_URL + '?t=' + Date.now(), { cache: 'no-store' })
      .then(function(r) { return r.json(); })
      .then(function(ver) {
        self.clients.matchAll().then(function(clients) {
          clients.forEach(function(client) {
            client.postMessage({ type: 'VERSION_INFO', version: ver.version, minVersion: ver.minVersion });
          });
        });
      })
      .catch(function() {});
  }
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

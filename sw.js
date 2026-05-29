// Service Worker v18 — Fix attachment delete sync + force data refresh
// File này chạy ở tầng TRƯỚC index.html, kiểm soát mọi request

var CACHE_VERSION = 'loho-v18';
var VERSION_URL = 'version.json';
var CRITICAL_FILES = ['index.html', 'app.js', 'version.json', 'sw.js'];
var CHECK_INTERVAL = 60 * 1000; // Kiểm tra mỗi 60 giây
var _currentKnownVersion = 0;

// ──── Install: kích hoạt ngay ────
self.addEventListener('install', function(event) {
  console.log('[SW] Install:', CACHE_VERSION);
  self.skipWaiting();
});

// ──── Activate: xóa cache cũ + bắt đầu kiểm tra version ────
self.addEventListener('activate', function(event) {
  console.log('[SW] Activate:', CACHE_VERSION);
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_VERSION; })
            .map(function(k) { console.log('[SW] Xóa cache cũ:', k); return caches.delete(k); })
      );
    }).then(function() {
      return self.clients.claim();
    }).then(function() {
      // Bắt đầu kiểm tra version ngay sau khi activate
      _startVersionPolling();
    })
  );
});

// ──── Fetch: network-first cho critical files ────
self.addEventListener('fetch', function(event) {
  var url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  var filename = url.pathname.split('/').pop();

  // Critical files → LUÔN lấy từ network, thêm cache-busting
  if (CRITICAL_FILES.indexOf(filename) !== -1 || url.pathname.endsWith('/')) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then(function(response) {
          var clone = response.clone();
          caches.open(CACHE_VERSION).then(function(cache) {
            cache.put(event.request, clone);
          });
          return response;
        })
        .catch(function() {
          return caches.match(event.request);
        })
    );
    return;
  }

  // Các file khác → cache-first
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

// ──── Message: nhận lệnh từ app.js ────
self.addEventListener('message', function(event) {
  if (event.data === 'CHECK_UPDATE') {
    _checkVersionAndNotify();
  }
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  // App.js báo version hiện tại của nó
  if (event.data && event.data.type === 'REPORT_VERSION') {
    _currentKnownVersion = event.data.version || 0;
  }
});

// ══════════════════════════════════════════════════════
// PROACTIVE VERSION POLLING — kiểm tra tự động mỗi 60s
// ══════════════════════════════════════════════════════

var _pollingStarted = false;

function _startVersionPolling() {
  if (_pollingStarted) return;
  _pollingStarted = true;
  console.log('[SW] Bắt đầu kiểm tra version tự động mỗi 60s');

  // Kiểm tra ngay lần đầu
  _checkVersionAndNotify();

  // Lặp lại mỗi 60 giây
  setInterval(function() {
    _checkVersionAndNotify();
  }, CHECK_INTERVAL);
}

function _checkVersionAndNotify() {
  fetch(VERSION_URL + '?t=' + Date.now(), { cache: 'no-store' })
    .then(function(r) {
      if (!r.ok) return null;
      return r.json();
    })
    .then(function(ver) {
      if (!ver || !ver.version) return;

      // Gửi thông tin version cho TẤT CẢ clients
      self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clients) {
        clients.forEach(function(client) {
          client.postMessage({
            type: 'VERSION_INFO',
            version: ver.version,
            minVersion: ver.minVersion
          });
        });
      });
    })
    .catch(function(e) {
      console.warn('[SW] Version check failed:', e.message);
    });
}

// Khi SW start (bao gồm cả restart sau sleep), bắt đầu polling
_startVersionPolling();

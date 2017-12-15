self.addEventListener('install', function(e) {
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(e) {
  e.waitUntil(self.clients.claim());
});

// add Event Listener push to receive notification
self.addEventListener('push', function(event) {
	 event.waitUntil(
	 	self.registration.showNotification('SalonHero', {
	 		lang: 'vi',
	 		body: event.data ? event.data.text() : "Bạn có thông báo mới",
	 		icon: 'caesar.jpg',
	 	})
	 );
});

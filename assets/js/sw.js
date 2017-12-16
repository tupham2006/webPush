self.addEventListener('install', function(e) {
  e.waitUntil(self.skipWaiting());
  console.log('installed');
});

self.addEventListener('activate', function(e) {
  e.waitUntil(self.clients.claim());
  console.log('actived');

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


// self.addEventListener('notificationclick', function(e) {
//   if (e.notification.tag !== 'user_visible_auto_notification') {
//     // Open a same-origin page until https://code.google.com/p/chromium/issues/detail?id=457187
//     // is resolved.
//     clients.openWindow('redirect.html?url=' + encodeURIComponent(e.notification.tag));
//   }
// });
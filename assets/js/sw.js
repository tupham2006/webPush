console.log('call to this sw');
self.addEventListener('install', function(e) {
  console.log('installed');
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(e) {
  console.log('actived');
  e.waitUntil(self.clients.claim());

});

// add Event Listener push to receive notification
self.addEventListener('push', function(event) {
  console.log('push');

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
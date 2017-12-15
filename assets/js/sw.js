// add Event Listener push to receive notification
self.addEventListener('push', function(event) {
	 event.waitUntil(
	 	self.registration.showNotification('SalonHero', {
	 		lang: 'en',
	 		body: event.data ? event.data.text() : "Bạn có thông báo mới",
	 	})

	 	.then(function(NotificationEvent) { 
	 		console.log("NotificationEvent", NotificationEvent);
	 	})
	 );
});

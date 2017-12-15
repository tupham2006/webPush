// add Event Listener push to receive notification
self.addEventListener('push', function(event) {
	console.log(event)
	console.log(event.data)
	 event.waitUntil(
	 	self.registration.showNotification('SalonHero', {
	 		lang: 'en',
	 		body: event.data ? event.data : "Không hiển thị đưọc thông báo",
	 	})

	 	.then(function(NotificationEvent) { 
	 		console.log("NotificationEvent", NotificationEvent);
	 	})
	 );
});

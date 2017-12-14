// add Event Listener push to receive notification
self.addEventListener('push', function(event) {
	console.log(event)
	 event.waitUntil(
	 	self.registration.showNotification('SalonHero', {
	 		lang: 'vi',
	 		body: event.data ? event.data : "Không hiển thị đưọc thông báo",
	 	})

	 	.then(function(NotificationEvent) { 
	 		console.log("NotificationEvent", NotificationEvent)
	 	})
	 );
});

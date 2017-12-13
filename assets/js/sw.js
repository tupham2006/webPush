// self.addEventListener('push', function(event) {
// 	console.log(event)
// 	 event.waitUntil(
// 	 	self.registration.showNotification('SalonHero', {
// 	 		lang: 'vi',
// 	 		body: event.data ? event.data : "Không hiển thị đưọc thông báo",
// 	 	})

// 	 	.then(function(NotificationEvent) { 
// 	 		console.log("NotificationEvent", NotificationEvent)
// 	 	})
// 	 );
// });
// 

importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

firebase.initializeApp({messagingSenderId: "426490483066"});

var messaging = firebase.messaging();
messaging.setBackgroundMessageHandle(function(payload){
	var title = 'SalonHero';
	var option = {
		body: payload.data.status
	};
	return shelf.registration.showNotification(title, option);
})
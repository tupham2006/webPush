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

// Initialize Firebase
// var config = {
//   apiKey: "AIzaSyD-rhAxmfP7binLSBgNs4OC4JF0pS7x_AA",
//   authDomain: "push-web-74f54.firebaseapp.com",
//   databaseURL: "https://push-web-74f54.firebaseio.com",
//   projectId: "push-web-74f54",
//   storageBucket: "push-web-74f54.appspot.com",
//   messagingSenderId: "426490483066"
// };

firebase.initializeApp({messagingSenderId: "426490483066"});

var messaging = firebase.messaging();
messaging.setBackgroundMessageHandle(function(payload){
	var title = 'SalonHero';
	var option = {
		body: payload.data.status
	};
	return shelf.registration.showNotification(title, option);
})
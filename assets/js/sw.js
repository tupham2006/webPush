self.addEventListener('install', function(e) {
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(e) {
  e.waitUntil(self.clients.claim());
});

// add Event Listener push to receive notification
self.addEventListener('push', function(event) {
  var message = "Bạn có thông báo mới";
  var dataObj = {};

  try {
    dataObj = event.data.json();
    if(dataObj && dataObj.message){
      message = dataObj.message;
    }

  } catch(e){

  }
  
	 event.waitUntil(
	 	self.registration.showNotification('SalonHero', {
	 		lang: 'vi',
	 		body: message,
	 		icon: 'https://uploadfiles.io/ybuej',
	 	})
	 );
});

self.addEventListener('notificationclick', function(e) {
	console.log(e.notification);
  if (e.notification.tag !== 'user_visible_auto_notification') {
    // Open a same-origin page until https://code.google.com/p/chromium/issues/detail?id=457187
    // is resolved.
    clients.openWindow('redirect.html?url=' + encodeURIComponent(e.notification.tag));
  }
});
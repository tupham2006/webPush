var publicKey = "BFEo68txQDeRPcrmuxjyclLJnJzyWBwn7ZoakS2ymW1lr0HaRYJ3OKabljuqyFSWVrH-GTho6JiPpoX2HIJzn5o";
var privateKey = 'ytC0bAvbn0ZrhDnOfwEVVuYWOwl9HygRA69RJ_PXwOE';
const webpush = require('web-push');

module.exports = {
	register: function (req, res) {
		var key = req.param('key');
	},

	send: function(req, res){
		
		function urlBase64ToUint8Array(base64String) {
		  var padding = '='.repeat((4 - base64String.length % 4) % 4);
		  var base64 = (base64String + padding)
		    .replace(/\-/g, '+')
		    .replace(/_/g, '/');
		 
		  var rawData = window.atob(base64);
		  var outputArray = new Uint8Array(rawData.length);
		 
		  for (var i = 0; i < rawData.length; ++i) {
		    outputArray[i] = rawData.charCodeAt(i);
		  }
		  return outputArray;
		}

		var pushSubscription = {
			endpoint:"https://fcm.googleapis.com/fcm/send/dhwptTziGQA:APA91bFzuQNiHeslyZm5VHQ9flDrgwf0OKG5okaS9CfPynJtXHiOMyLORqBtbflbBpgT1MQHiRtEFLhWwBd-A851vgFV5iOoZbKqRbZwugngRB-enuJWe-n-IClsKHBmeRrE1MzS84qz",
			"expirationTime":null,
			keys:{
				p256dh:"BMCrojGuqQYWARLLY86LW_hTWP94Ab_G67jpKn6RrTLxL4m55OpB8KyNtzHCdAQ2Q1wsGBVsGFQdf0h7eUB4tSo=",
				auth:"SEh3oGONb9nrw2OchmLC8w=="
			}
		};

		var vapidKeys = {
		  publicKey: urlBase64ToUint8Array(publicKey),
		  privateKey: urlBase64ToUint8Array(privateKey)
		};

		webpush.setVapidDetails(
		  'https://damp-bayou-27809.herokuapp.com/',
		  vapidKeys.publicKey,
		  vapidKeys.privateKey
		);

		webpush.sendNotification(pushSubscription, 'Your Push Payload Text');
	}
};
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
			"endpoint":"https://fcm.googleapis.com/fcm/send/dAZTWIH_tPc:APA91bHZqgEhan4f_nL9V8G66-iqDE-RTE_o47_aNDjUjhkix6D60lZBU4KRIg6bNMxOwEkhwEDWe0Fj4JeEnJrVUjaJwlXF0SX-rpFozPJBTsxXiS0UfYBopgLuEZlK23tmzInih1jC",
			"keys":{
				"p256dh":"BGhdUD4dnpvErYLfQ3QUBc-sBkxL3V-yfwcpKOxm3cmhXuraBv5BMiFMPDUauny98NAF5T-xhNKoJds_PFUOYFU=",
				"auth":"71uky0cz6KvyUqG6n4W4IA=="
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
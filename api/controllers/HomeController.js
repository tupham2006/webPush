var publicKey = "BFEo68txQDeRPcrmuxjyclLJnJzyWBwn7ZoakS2ymW1lr0HaRYJ3OKabljuqyFSWVrH-GTho6JiPpoX2HIJzn5o";
var privateKey = 'ytC0bAvbn0ZrhDnOfwEVVuYWOwl9HygRA69RJ_PXwOE';
const webpush = require('web-push');

module.exports = {
	register: function (req, res) {
		var key = req.param('key');
	},

	send: function(req, res){

		var pushSubscription = {
			endpoint:"https://fcm.googleapis.com/fcm/send/dAZTWIH_tPc:APA91bHZqgEhan4f_nL9V8G66-iqDE-RTE_o47_aNDjUjhkix6D60lZBU4KRIg6bNMxOwEkhwEDWe0Fj4JeEnJrVUjaJwlXF0SX-rpFozPJBTsxXiS0UfYBopgLuEZlK23tmzInih1jC",
			keys:{
				p256dh:"BGhdUD4dnpvErYLfQ3QUBc-sBkxL3V-yfwcpKOxm3cmhXuraBv5BMiFMPDUauny98NAF5T-xhNKoJds_PFUOYFU=",
				auth:"71uky0cz6KvyUqG6n4W4IA=="
			}
		};

		var payload = "Có khách hàng đặt lịch";
		var option = {
			gcmAPIKey: "AIzaSyD-rhAxmfP7binLSBgNs4OC4JF0pS7x_AA",
		  vapidDetails: {
		    subject: 'https://damp-bayou-27809.herokuapp.com/',
		    publicKey: publicKey,
		    privateKey: privateKey
		  },
		};

		webpush.sendNotification(pushSubscription, payload, option)
		.then(function() {
      res.status(201);
    })
    .catch(function(error) {
      console.log(error);
      res.status(500);
    });
	}
};
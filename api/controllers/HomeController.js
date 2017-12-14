var publicKey = "BFEo68txQDeRPcrmuxjyclLJnJzyWBwn7ZoakS2ymW1lr0HaRYJ3OKabljuqyFSWVrH-GTho6JiPpoX2HIJzn5o";
var privateKey = 'ytC0bAvbn0ZrhDnOfwEVVuYWOwl9HygRA69RJ_PXwOE';
const webpush = require('web-push');

module.exports = {
	register: function (req, res) {
		console.log('ok');
		var endpoint = req.param('endpoint');
		var p256dh = req.param('p256dh');
		var auth = req.param('auth');
		console.log("endpoint", endpoint);
		console.log("p256dh", p256dh);
		console.log("auth", auth);
		return res.json({
			message: "success"
		});
	},

	send: function(req, res){

		var pushSubscription = {
			"endpoint":"https://fcm.googleapis.com/fcm/send/eNftrzJUYCA:APA91bFh8KCGs4ouwYCAO7El3zUD6ZTTYgpWZzafnQgX1LYI1wSsnYwOeQq6aAdx7Tk7hgzbVZN17SZK48e2afxdoDEGN8nCAuAuocBo05OCzGm745UqUZzeOcl7YAVorg3uQ2K-kXnH",
			"keys":{
				"p256dh":"BDkizV9XyQ3pWWOLXq_tw5-fI2ddqsQivME9dkXJHMFpjbE647iN8z7IC5H8Z7K_vwJIqc6b4WwH9_Py9XxltS8=",
				"auth":"_bFOUSygYxVtH1_h55D0ww=="
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
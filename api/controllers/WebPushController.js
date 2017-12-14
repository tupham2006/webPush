var publicKey = "BFEo68txQDeRPcrmuxjyclLJnJzyWBwn7ZoakS2ymW1lr0HaRYJ3OKabljuqyFSWVrH-GTho6JiPpoX2HIJzn5o";
var privateKey = 'ytC0bAvbn0ZrhDnOfwEVVuYWOwl9HygRA69RJ_PXwOE';
const webpush = require('web-push');

module.exports = {
	registerWebPush: function (req, res) {
		
		// get data from client
		// var userId = parseInt(req.session.currentUser.id);
		var userId = 249;
		var endpoint = (req.param("endpoint") ? req.param("endpoint") : "" ).toString().replace(/ /g, "");
		var p256dhKey = ( req.param("p256dh") ? req.param("p256dh") : "" ).toString().replace(/ /g, "");
		var authKey = ( req.param("auth") ? req.param("auth") : "" ).toString().replace(/ /g, "");

		// validate
		if(!userId || !endpoint || !p256dhKey || !authKey){
			return res.json({
				message: "Thiếu User ID hoặc token của trình duyệt",
				status: 0
			});
		}

		// data to create
		var data = {
			user_id: userId,
			endpoint: endpoint,
			p256dh_key: p256dhKey,
			auth_key: authKey
		};

		// query to create
		WebPush.createToken(data)
			.then(function(result){
				return res.json({
					message: "Đăng ký thành công",
					status: 1
				});
			})

			.catch(function(e){
				console.log("User :: " + userId + " :: register");
				return res.json({
					message: e.message,
					status: 0
				});
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
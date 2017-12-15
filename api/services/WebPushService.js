var publicKey = "BFEo68txQDeRPcrmuxjyclLJnJzyWBwn7ZoakS2ymW1lr0HaRYJ3OKabljuqyFSWVrH-GTho6JiPpoX2HIJzn5o";
var privateKey = 'ytC0bAvbn0ZrhDnOfwEVVuYWOwl9HygRA69RJ_PXwOE';
var gcmAPIKey = "AIzaSyD-rhAxmfP7binLSBgNs4OC4JF0pS7x_AA";

const webpush = require('web-push');

module.exports = {
	/**
	 * type: type of noti: booking, order...
	 * action: create, update
	 * req : client request
	 * @param  {[type]} req [description]
	 * @return {[type]}     [description]
	 */
	pushWeb: function(type, action, data, req, res) {

		if(!type || !action ||!data || !req || !res){
			return;
		}
		
		// get current host
		var merchantHost = req.host;
		// var userId = req.session.currentUser.id;
		var userId = 249;

		if(!merchantHost) return;

		// option
		var option = {
			gcmAPIKey: gcmAPIKey,
		  vapidDetails: {
		    subject: merchantHost,
		    publicKey: publicKey,
		    privateKey: privateKey
		  },
		};

		var payload = WebPushService.getPayload();

		WebPush.getTokenByUserId({ user_id: userId })
			.then(function(result){
				console.log(result);
				if(result && result.length > 0){
					WebPushService.PushNotification(result, payload, option, res);
				}
			});
	},

	getPayload: function(type, action, data){
		var message = "";

		switch(type){
			case "booking":
				message = generateBooking(action, data);				
		}
		return message;
	},

	generateBooking: function(action){
		var message = "";
		if(action == "create"){
			message = "Khách hàng " + data.customer_name + " vừa đặt lịch vào lúc "+ data.booked_at;
		} 
		return message;
	},

	PushNotification: function(token, payload, option, res){
		var webPushArray = [];
		for(var i in token){
			webPushArray.push(new Promise(function(resolve, reject){
				webpush.sendNotification(
					{ // sub push
						endpoint: token[i].endpoint,
						keys: {
							p256dh: token[i].p256dh_key,
							auth: token[i].auth_key
						}
					},
					payload, // content
					option // option
				)
				.then(function() {
		      return resolve();
		    })
		    .catch(function(e) {
		      return reject(e);
		    });
			}));
		}
		console.log("webPushArray", webPushArray);

		// promise all send message
		Promise.all(webPushArray)
			.then(function(){
				 return res.status(201);
			})
			.catch(function(e){
				console.log("WebPushService: ", e);
				 return res.status(500);
			});
	}

};
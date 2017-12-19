module.exports = {
	registerWebPush: function (req, res) {
		
		// get data from client
		// var userId = req.session.currentUser.id;
		// var merchantId = req.session.merchant.id;
		var userId = 249;
		var merchantId = 137;
		var endpoint = (req.param("endpoint") ? req.param("endpoint") : "" ).toString().replace(/ /g, "");
		var keys = ( req.param("keys") ? req.param("keys") : {});
		console.log("endpoint Register: ", endpoint);
		if(!keys || typeof keys !== "object"){
			return res.json({
				status: 0,
				message: "Token không đúng định dạng"
			});
		}

		var p256dhKey = keys.p256dh;
		var authKey = keys.auth;

		// validate
		if( !endpoint || !p256dhKey || !authKey){
			return res.json({
				message: "Thiếu token của trình duyệt",
				status: 0
			});
		}

		// data to create
		var data = {
			merchant_id: merchantId,
			user_id: userId,
			endpoint: endpoint,
			p256dh_key: p256dhKey,
			auth_key: authKey
		};

		// query to create
		WebPush.createToken(data)
			.then(function(result){
				return res.json({
					status: 1
				});
			})

			.catch(function(e){
				console.log("User " + userId + " : WebPushController :: registerPush ", e);
				return res.json({
					message: e.message,
					status: 0
				});
			});
	},

	deregisterWebPush: function(req, res){

		// get data from client
		// var userId = req.session.currentUser.id;

		var userId = 249;
		var endpoint = (req.param("endpoint") ? req.param("endpoint") : "" ).toString().replace(/ /g, "");
		console.log("endpoint deregister: ", endpoint);
		// validate
		if(!endpoint){
			return res.json({
				message: "Thiếu token của trình duyệt",
				status: 0
			});
		}

		// deregister 
		WebPush.deleteTokenByUserId(userId, endpoint)
			.then(function(){
				return res.json({
					status: 1
				});
			})

			.catch(function(e){
				console.log("User " + userId + " : WebPushController :: deregisterWebPush ", e);
				return res.json({
					status: 0,
					message: e.message
				});
			});
	},

	send: function(req, res){
		var data = {
			customer_name: "Phạm Bảo Tú",
			booked_at:new Date()
		};
		console.log('send')
		WebPushService.pushWeb("booking", "create", data, req, res);
	}
};
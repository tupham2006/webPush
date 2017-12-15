module.exports = {
	registerWebPush: function (req, res) {
		
		// get data from client
		// var userId = req.session.currentUser.id;
		var userId = 249;
		var endpoint = (req.param("endpoint") ? req.param("endpoint") : "" ).toString().replace(/ /g, "");
		var keys = ( req.param("keys") ? req.param("keys") : {});

		if(!keys || typeof keys !== "object"){
			return res.json({
				status: 0,
				message: "Token không đúng định dạng"
			});
		}

		var p256dhKey = keys.p256dh;
		var authKey = keys.auth;

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
				console.log("User " + userId + " : WebPushController :: registerPush ", e);
				return res.json({
					message: e.message,
					status: 0
				});
			});
	},

	send: function(req, res){
		var data = {
			customer_name: "Phạm Bảo Tú",
			booked_at:new Date()
		};

		WebPushService.pushWeb("booking", "create", data, req, res);
	}
};
var publicKey = "BDw6MSUkf-IHWX5idF4ciBCWKhaWLtXgnWRMIYo41I17KaKNQBPEzzNm3UzXazCEnkIX9dsg1BnPsHUduFTuAKI";
var privateKey = 'AAAAmYAW9uI:APA91bGd5b6lQ6oj-sIztzpIIjnkjnir3Qo7ZZ1C656cKXn-fa39vAm0wB4hty1mY2mZLvY-4ML7bpMSXrVKp9FFQXOaPZ9wqqwahnSH0yNuiZ7eBwH7R8E_Rz2XjIxpdXLPSylW4hiW';
const webpush = require('web-push');

module.exports = {
	register: function (req, res) {
		var key = req.param('key');
		console.log(key);
		return res.json({key: key});
	},
	send: function(req, res){
		var pushSubscription = {
			endpoint:"https://fcm.googleapis.com/fcm/send/dhwptTziGQA:APA91bFzuQNiHeslyZm5VHQ9flDrgwf0OKG5okaS9CfPynJtXHiOMyLORqBtbflbBpgT1MQHiRtEFLhWwBd-A851vgFV5iOoZbKqRbZwugngRB-enuJWe-n-IClsKHBmeRrE1MzS84qz",
			"expirationTime":null,
			keys:{
				p256dh:"BMCrojGuqQYWARLLY86LW_hTWP94Ab_G67jpKn6RrTLxL4m55OpB8KyNtzHCdAQ2Q1wsGBVsGFQdf0h7eUB4tSo=",
				auth:"SEh3oGONb9nrw2OchmLC8w=="
			}
		};

		var vapidKeys = {
		  publicKey: publicKey,
		  privateKey: privateKey
		};

		webpush.setVapidDetails(
		  'https://damp-bayou-27809.herokuapp.com/',
		  vapidKeys.publicKey,
		  vapidKeys.privateKey
		);

		webpush.sendNotification(pushSubscription, 'Your Push Payload Text');
	}
};
module.exports = {
	tableName: "web_push_tokens",
	globalId: "WebPush",
	attributes: {
		id:{type:"integer", autoIncrement: true, primaryKey:true},
    merchant_id: { type: 'integer', required: true},
    user_id: { type: 'integer', required: true},
    endpoint: { type: 'string', maxLength: 500, required: true },
    p256dh_key: { type: 'string', maxLength: 200, required: true },
    auth_key: { type: 'string', maxLength: 200, required: true },
    createdAt: { type: 'datetime', columnName: 'created_at' },
    updatedAt: { type: 'datetime', columnName: 'updated_at' },
	},

	/**
	 * Create new token
	 */
	createToken: function (data) {
		return new Promise(function(resolve, reject){

			// find record
			WebPush.findOne({
				user_id: data.user_id,
				endpoint: data.endpoint
			}).exec(function(err, webpush){
				if(err) return reject(err);
				if(!webpush || !Object.getOwnPropertyNames(webpush).length){ // not exist, create new
				
				// Create new
				WebPush.create(data)
					.exec(function(err, result){
						if(err) return reject(err);
						return resolve(result);
					});
				} else {
					return resolve(webpush);
				}
			});
		});	
	},

	/**
	 * Get token by user id
	 */
	getTokenByMerchantId: function(merchantId){
		return new Promise(function(resolve, reject){
			WebPush.find({
				merchant_id: merchantId
			}).exec(function(err, result){
				if(err) return reject(err);
				return resolve(result);
			});
		});
	},

	/**
	 * delete token
	 */
	deleteTokenByUserId: function(userId, endpoint){
		return new Promise(function(resolve, reject){
			WebPush.destroy({
				user_id: userId,
				endpoint: endpoint
			}).exec(function(err, result){
				if(err) return reject(err);
				return resolve();
			});
		});
	}
};
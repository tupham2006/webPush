module.exports = {
	tableName: "web_pushs",
	globalId: "WebPush",
	attributes: {
		id:{type:"integer", autoIncrement: true, primaryKey:true},
    user_id: { type: 'integer', maxLength: 11, required: true},
    endpoint: { type: 'string', maxLength: 500, required: true },
    p256dh_key: { type: 'string', maxLength: 500, required: true },
    auth_key: { type: 'string', maxLength: 500, required: true },
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
	 * delete token
	 */
};
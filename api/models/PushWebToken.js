module.exports = {
	tableName: "push_web_tokens",
	globalId: "PushWebToken",
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
			PushWebToken.create(data)
				.exec(function(err, result){
					if(err) return reject(err);
					return resolve(result);
				});
		});	
	},

	/**
	 * delete token
	 */
};
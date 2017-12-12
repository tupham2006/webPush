module.exports = {
	push: function () {
		// Initialize Firebase
	  var config = {
	    apiKey: "AIzaSyD-rhAxmfP7binLSBgNs4OC4JF0pS7x_AA",
	    authDomain: "push-web-74f54.firebaseapp.com",
	    databaseURL: "https://push-web-74f54.firebaseio.com",
	    projectId: "push-web-74f54",
	    storageBucket: "push-web-74f54.appspot.com",
	    messagingSenderId: "426490483066"
	  };

	  firebase.initializeApp(config);
	  const messaging = firebase.messaging();
	  messaging.requestPermission()
	  	.then(function(){
	  		console.log("Have permission");
	  	})

	  	.catch(function(e){
	  		console.log('error', e);
	  	})
	}
};
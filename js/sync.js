var Sync = {
	init: function() {
		this.db = new Firebase('https://fireveal-js.firebaseio.com/')

		Sync.addLocalListener()
		Sync.addCloudListener()

		Sync.handleDisconnect()
	},
	addLocalListener: function() {
		// Bind slide change events
		$(document).on('click touchstart', Sync.sendURL)
		$(document).on('keyup', Sync.sendURL)
	},
	sendURL: function() {
		// Send location update
		Sync.db.push(window.location.href)
	},
	addCloudListener: function() {
		// Receive location update from database
		Sync.db.limit(1).on('child_added', function(dataSnapshot) {
			Sync.receiveURL(dataSnapshot.val())
		})
	},
	receiveURL: function(data) {
		window.location.href = data
	},
	handleDisconnect: function() {
		// Clean database
		Sync.db.onDisconnect().remove()

		// Add current location if anybody is still connected
		Sync.db.once('value', function() {
			Sync.sendURL()
		})
	}
}

$(document).ready(function(){
	Sync.init()
})
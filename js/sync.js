var db = new Firebase('https://fireveal-js.firebaseio.com/')

var Sync = {
	addLocalListener: function() {
		$(document).on('click', Sync.sendEvent)
	},
	removeLocalListener: function() {
		$(document).off('click')
	},
	sendEvent: function(e) {
		Reveal.removeEventListeners()

		db.push(Sync.packageData(e))

		Reveal.addEventListeners()
	},
	packageData: function(e) {
		return {targetClass: e.target.className, type: e.type}
	},
	addCloudListener: function() {
		db.limit(1).on('child_added', function(dataSnapshot) {
			Sync.recceiveEvent(dataSnapshot.val())
		})
	},
	recceiveEvent: function(eventData) {
		Sync.removeLocalListener()

		var targetElem = '.' + eventData.targetClass.replace('enabled', '')
		$(targetElem).trigger(eventData.type)

		Sync.addLocalListener()
	}
}

$(document).ready(function(){
	Sync.addLocalListener()
	Sync.addCloudListener()
})
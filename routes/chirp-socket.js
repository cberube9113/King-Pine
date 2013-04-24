var user = require('../lib/user.js');
//var chirps = require('../lib/chirps.js');
var sql = require('../lib/sql.js');

//Server-side support for Chirp app:

addLocalChirp = function(data, uid, date){
	sql.addChirp(data, uid, date);
}

exports.init = function(socket) {
	socket.on('chirp', function(data) {
		console.log('Received post: ' + JSON.stringify(data));
		addLocalChirp(data["chirp"], data["userid"], data["timestamp"]);
		socket.emit('updateView', data);
	});
};
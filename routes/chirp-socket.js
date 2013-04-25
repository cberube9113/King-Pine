var user = require('../lib/user.js');
var chirps = require('../lib/chirps.js');

//Server-side support for Chirp app:

addLocalChirp = function(data, date, uid){
	chirps.addChirp(data, date, uid);
}

exports.init = function(socket, io) {
	socket.on('chirp', function(data) {
		console.log('Received post: ' + JSON.stringify(data));
		addLocalChirp(data["chirp"], data["timestamp"], data["userid"]);
		io.sockets.emit('updateView', data);
	});
};
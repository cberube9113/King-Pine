var sql = require('../lib/sql.js');

//Server-side support for Chirp app:

addLocalChirp = function(data, uid, date, username, name){
	sql.addChirp(data, uid, date, username, name);
}

exports.init = function(socket, io) {
	socket.on('chirp', function(data) {
		console.log('Received post: ' + JSON.stringify(data));
		addLocalChirp(data["chirp"], data["userid"], data["timestamp"], data["username"], data["name"]);
		io.sockets.emit('updateView', data);
	});
};
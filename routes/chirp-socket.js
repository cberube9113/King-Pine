var user = require('../lib/user.js');
var chirps = require('../lib/chirps.js');

//Server-side support for Chirp app:

addLocalChirp = function(req,res,data){
	var username = req.session.user.username;
	var uid = user.idlookup(username);
	var date = "Just now.";
	chirps.addChirp(data,date,uid);
}
exports.init = function(socket) {
	socket.on('post', function(data) {
		console.log('Received post: ' + JSON.stringify(data));
		addLocalChirp(data);
	socket.broadcast.emit('post', data);
	});
};
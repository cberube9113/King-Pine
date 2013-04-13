// A client object for communicating with the Chirp server.

function ChirpClient(config) {
	for (var prop in config) {
		this[prop]=config[prop];
	}
}

ChirpClient.prototype = {
	//Cache of posts received from server.
	posts : [],
var chirps = require('../lib/chirps.js');

exports.list = function(req,res) {
	var discoveryChirps = chirps.discover();
    res.render('discover', { title: 'Discover'
    						, discoveryChirps: discoveryChirps
    						, user: req.session.user.name  });
};
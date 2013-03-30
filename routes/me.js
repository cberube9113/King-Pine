var follow = require('../lib/follow.js');
var chirps = require('../lib/chirps.js');

exports.list = function(req,res) {
	var subject = req.session.user;
	var following = follow.numfollowing(subject);
	var followers = follow.numfollowers(subject);
	var nchirps = chirps.numchirps(subject);
	var chirpdata = chirps.info(subject);
    res.render('me', { title: 'Me',
    				   following: following,
    				   followers: followers,
    				   nchirps: nchirps,
    				   chirpdata: chirpdata,
    				   user: req.session.user.name});
};
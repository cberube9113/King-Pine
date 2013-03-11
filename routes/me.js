var follow = require('../lib/follow.js');
var lookup = require('../lib/idlookup.js');
var chirps = require('../lib/chirps.js');

exports.list = function(req,res) {
	var subject = 'kboggs'
	var following = follow.numfollowing(subject);
	var followers = follow.numfollowers(subject);
	var nchirps = chirps.numchirps(subject);
	var chirpdata = chirps.info(subject);
    res.render('me', { title: 'Me',
    				   following: following,
    				   followers: followers,
    				   nchirps: nchirps,
    				   chirpdata: chirpdata});
};
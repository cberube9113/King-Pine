var follow = require('../lib/follow.js');
var lookup = require('../lib/idlookup.js');

exports.list = function(req,res) {
	var subject = lookup.idlookup('rsims');
	var following = follow.numfollowing(subject);
	var followers = follow.numfollowers(subject);
    res.render('me', { title: 'Me',
    				   numfollowing: following,
    				   numfollowers: followers});
};
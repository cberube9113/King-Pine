var user = require('../lib/user.js');
var chirps = require('../lib/chirps.js');

exports.list = function(req,res) {
	var subject = req.session.user;
	var u = user.info(subject.username);
	var c = chirps.info(subject.username);
    res.render('home', { title: 'Chirper',
    					 name: u.name,
    					 email: u.email,
    					 chirps: c  });
};
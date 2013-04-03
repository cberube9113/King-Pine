var user = require('../lib/user.js');
var chirps = require('../lib/chirps.js');

exports.list = function(req,res) {
	var subject = req.session.user;
	var userdata = user.info(subject.username);
	var chirpdata = chirps.info(subject.username);
    res.render('home', { title: 'Chirper',
    					 name: userdata.name,
    					 email: userdata.email,
    					 chirps: chirpdata,
    					 user: req.session.user.name,
    					 message: req.flash('auth')
    });
};

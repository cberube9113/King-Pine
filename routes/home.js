var user = require('../lib/user.js');
var chirps = require('../lib/chirps.js');

exports.list = function(req,res) {
	var u = user.info('kboggs');
	var c = chirps.info('kboggs');
    res.render('home', { title: 'Chirper',
    					 name: u.name,
    					 email: u.email,
    					 chirps: c  });
};
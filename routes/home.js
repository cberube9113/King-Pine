var user = require('../lib/user.js');

exports.list = function(req,res) {
	var u = user.info('rsims');
    res.render('home', { title: 'Chirper',
    					 name: u.name,
    					 email: u.email });
};
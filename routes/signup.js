var user = require('../lib/user');


exports.list = function(req,res) {
  res.render('signup', { title: 'Sign Up for Chirper' });
};
var sql = require('../lib/sql.js');
	
exports.createRob = function(req,res)
{
	sql.addUser(1, 'Rob Sims', 'rsims2013@gmail.com', 'rsims', '123');
}

exports.delRob = function(req,res)
{
	sql.delUser(1);
}
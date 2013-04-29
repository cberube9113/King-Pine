var sql = require('../lib/sql.js');

exports.numfollowing = function(req,res){
	res.send(sql.numfollowing(0));
}
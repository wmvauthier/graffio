module.exports.users = function(application, req, res){
	res.render('home/gerencial_User.ejs');
}

module.exports.affiliate = function(application, req, res){
	res.render('home/gerencial_Affiliate.ejs');
}
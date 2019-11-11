module.exports.users = function(application, req, res){
	res.render('home/register_User.ejs');
}

module.exports.affiliate = function(application, req, res){
	res.render('home/register_Affiliate.ejs');
}
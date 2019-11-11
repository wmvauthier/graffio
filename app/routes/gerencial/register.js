module.exports = function(application){
	
	application.get('/register_User', function(req, res){
		application.app.controllers.register.users(application, req, res);
	});

	application.get('/register_Affiliate', function(req, res){
		application.app.controllers.register.affiliate(application, req, res);
	});

}
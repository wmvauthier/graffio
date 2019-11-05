module.exports = function(application){
	
	application.get('/register_User', function(req, res){
		application.app.controllers.register.users(application, req, res);
	});

}
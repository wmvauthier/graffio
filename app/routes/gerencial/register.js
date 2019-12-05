module.exports = function(application){
	
	application.get('/gerencial_User', function(req, res){
		application.app.controllers.gerencial.register.users(application, req, res);
	});

	application.get('/gerencial_Affiliate', function(req, res){
		application.app.controllers.gerencial.register.affiliate(application, req, res);
	});

}
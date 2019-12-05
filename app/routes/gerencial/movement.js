module.exports = function(application){
	
	application.get('/gerencial_Movement', function(req, res){
		application.app.controllers.gerencial.movement.movement(application, req, res);
	});

}
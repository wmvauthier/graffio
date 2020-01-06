module.exports = function(application){
	
	application.get('/dashboard_Movement_Daily', function(req, res){
		res.render('home/dashboard_Movement_Daily.ejs');
	});

}
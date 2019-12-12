module.exports = function(application){
	
	application.get('/gerencial_Movement', function(req, res){
		res.render('home/gerencial_Movement.ejs');
	});

}
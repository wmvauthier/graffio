module.exports = function (application) {

	application.get('/', function (req, res) {
		res.render('index/login.ejs');
	});

	application.get('/home', function (req, res) {
		res.render('home/home.ejs');
	});

}
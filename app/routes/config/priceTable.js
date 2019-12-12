module.exports = function(application){
	
	application.get('/config_PriceTable', function(req, res){
		res.render('home/config_priceTable.ejs');
	});

}
module.exports = function (application) {

    application.get('/config_dataClient', function (req, res) {
        res.render('home/config_dataClient.ejs');
    });

}
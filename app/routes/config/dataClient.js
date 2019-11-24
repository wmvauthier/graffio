module.exports = function (application) {

    application.get('/config_dataClient', function (req, res) {
        application.app.controllers.config.dataClient.dataClient(application, req, res);
    });

}
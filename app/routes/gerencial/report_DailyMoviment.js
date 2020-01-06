module.exports = function (application) {

    application.get('/report_DailyMovement', function (req, res) {
        res.render('home/report_DailyMovement.ejs');
    });

    application.get('/report_DailyMovementReport', function (req, res) {
        res.render('home/report_DailyMovementReport.ejs');
    });

}
function renderPage() {

    var loggedUserNome = localStorage.getItem("loggedUserNome");
    var loggedUserCargo = localStorage.getItem("loggedUserCargo");

    var mainDashboard = document.getElementById("mainDashboard");

    setDashboardHeader(mainDashboard);
    setDashboardSidebar(mainDashboard);

    $("#btnDAOUpdateNavUser").click(function () {
        DAOupdateNavUser();
    });

    $("#loggedUserNome").html(loggedUserNome);
    $("#loggedUserCargo").html(loggedUserCargo);

}
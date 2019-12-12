var alertFormLogin = $("#alertFormLogin");
var formLogin = $("#formLogin");

window.onload = function () {
    $("#alertFormLogin").css("display", "none");
}

function logout(token) {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            localStorage.clear();
            window.location.href = "./";
        }
    };

    var url = `http://${IP_DO_SERVIDOR}:3000/logout`;
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`token=${token}`);

}

formLogin.submit(function (evt) {

    evt.preventDefault();
    var xhttp = new XMLHttpRequest();

    var login = $('#username').val();
    var senha = $('#password').val();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.msg) {
                var c = $("#alertFormLogin").children();
                c[0].textContent = response.msg;
                c[2].textContent = response.hint;
                $("#alertFormLogin").css("display", "block");
            } else {
                var user = response.user;
                localStorage.setItem("loggedUserNome", user.nome);
                localStorage.setItem("loggedUserCargo", user.cargo);
                localStorage.setItem("token", user.token);
                window.location.href = "./home";
            }
        }
    };

    var url = `http://${IP_DO_SERVIDOR}:3000/login`;
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`user_login=${login}&user_senha=${senha}`);

});
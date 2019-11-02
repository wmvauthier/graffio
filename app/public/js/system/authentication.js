var alertFormLogin = document.getElementById("alertFormLogin");
var formLogin = document.getElementById("formLogin");

window.onload = function () {
    alertFormLogin.style.display = "none";
}

function logout(token) {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            localStorage.clear();
            window.location.href = "./";
        }
    };

    var url = "http://localhost:3000/logout";
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`token=${token}`);
    
}

formLogin.addEventListener('submit', function (evt) {

    evt.preventDefault();
    var xhttp = new XMLHttpRequest();

    var login = document.getElementById('username').value;
    var senha = document.getElementById('password').value;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.msg) {
                var c = alertFormLogin.childNodes;
                c[1].textContent = response.msg;
                c[3].textContent = response.hint;
                alertFormLogin.style.display = "block";
            } else {
                console.log(response);
                var user = response.user;
                localStorage.setItem("loggedUserNome", user.nome);
                localStorage.setItem("loggedUserCargo", user.cargo);
                localStorage.setItem("token", user.token);
                window.location.href = "./home";
            }
        }
    };

    var url = "http://localhost:3000/login";
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`user_login=${login}&user_senha=${senha}`);

});
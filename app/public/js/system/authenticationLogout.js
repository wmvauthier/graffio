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
var userTableBody = document.getElementById("userTableBody");
var nome = document.getElementById('nome').value;
var cargo = document.getElementById('cargo').value;
var user_login = document.getElementById('user_login').value;
var user_senha = document.getElementById('user_senha').value;
var nivel_acesso = document.getElementById('nivel_acesso').value;

function DAOgetAllUsers() {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            fillUserTable(userTableBody, response);
        }
    };

    var url = "http://localhost:3000/user";
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

}

function DAOregisterUser() {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            createUserToUserTable(userTableBody, response);
            $('#registerUserModal').modal('hide');
        }
    };

    var url = "http://localhost:3000/user";
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`nome=${nome}&cargo=${cargo}&user_login=${user_login}&user_senha=${user_senha}&nivel_acesso=${nivel_acesso}`);

}

function preRegisterUser() {
    document.getElementById('nome').value = "";
    document.getElementById('cargo').value = "";
    document.getElementById('user_login').value = "";
    document.getElementById('user_senha').value = "";
    document.getElementById('nivel_acesso').value = "";
    document.getElementById('btnDAOUser').onclick = DAOregisterUser();
    document.getElementById('registerUserModalTitle').innerHTML = "Insira as Informações do Novo Usuário";

}

function preChangeUser(id) {

    var data = id.getAttribute("dataID");
    userTableBody, nome, cargo, user_login, user_senha, nivel_acesso = "";

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            document.getElementById('nome').value = response.nome;
            document.getElementById('cargo').value = response.cargo;
            document.getElementById('user_login').value = response.user_login;
            document.getElementById('user_senha').value = response.user_senha;
            document.getElementById('nivel_acesso').value = response.nivel_acesso;
            //document.getElementById('btnDAOUser').onclick = DAOupdateUser();
            document.getElementById('registerUserModalTitle').innerHTML = "Insira as Novas Informações do Usuário";
            $('#registerUserModal').modal('show');
        }
    };

    var url = `http://localhost:3000/user/${data}`;
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

}

function preDeleteUser(id) {
    alert(user);
}

function fillUserTable(table, data) {

    table.innerHTML = "";

    data.forEach(function (user) {
        createUserToUserTable(table, user);
    });


}

//Insere Usuário na Lista de Usuários
function createUserToUserTable(table, user) {

    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");

    td1.innerHTML = user.id_user;
    td2.innerHTML = user.nome;
    td3.innerHTML = user.cargo;
    td4.innerHTML = user.user_login;
    td5.innerHTML = user.nivel_acesso;
    td6.innerHTML = `<button class="btn btn-rounded btn-warning" dataID="${user.id_user}" onclick="preChangeUser(this)">Editar</button>
                     <button class="btn btn-rounded btn-danger" dataID="${user.id_user}" onclick="preDeleteUser(this)">Excluir</button>`;

    td1.setAttribute("data-title", "ID");
    td2.setAttribute("data-title", "Nome");
    td3.setAttribute("data-title", "Cargo");
    td4.setAttribute("data-title", "Login");
    td5.setAttribute("data-title", "N. Acesso");
    td6.setAttribute("data-title", "Ações");

    td6.style = "text-align: center;"

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);

    table.appendChild(tr);

}
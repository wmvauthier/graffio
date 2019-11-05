var userTableBody = document.getElementById("userTableBody");
var nome = document.getElementById('nome').value;
var cargo = document.getElementById('cargo').value;
var user_login = document.getElementById('user_login').value;
var user_senha = document.getElementById('user_senha').value;
var nivel_acesso = document.getElementById('nivel_acesso').value;

document.getElementById("btnPreRegisterUser").addEventListener("click", function () {
    preRegisterUser();
});

document.getElementById("btnDAODeleteUser").addEventListener("click", function () {
    DAOdeleteUser();
});

document.getElementById("btnDAOUpdateUser").addEventListener("click", function () {
    DAOupdateUser();
});

document.getElementById("btnDAORegisterUser").addEventListener("click", function () {
    DAOregisterUser();
});

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

    var nome = document.getElementById('nome').value;
    var cargo = document.getElementById('cargo').value;
    var user_login = document.getElementById('user_login').value;
    var user_senha = document.getElementById('user_senha').value;
    var nivel_acesso = document.getElementById('nivel_acesso').value;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            console.log(response);
            createUserToUserTable(userTableBody, response);
            cleanRegisterUserForm();
            $('#registerUserModal').modal('hide');
        }
    };

    var url = "http://localhost:3000/user";
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`nome=${nome}&cargo=${cargo}&user_login=${user_login}&user_senha=${user_senha}&nivel_acesso=${nivel_acesso}`);

}

function DAOupdateUser() {

    var xhttp = new XMLHttpRequest();

    var id = document.getElementById('id_userUpd').value;
    var nome = document.getElementById('nomeUpd').value;
    var cargo = document.getElementById('cargoUpd').value;
    var user_login = document.getElementById('user_loginUpd').value;
    var user_senha = document.getElementById('user_senhaUpd').value;
    var nivel_acesso = document.getElementById('nivel_acessoUpd').value;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            DAOgetAllUsers();
            cleanUpdateUserForm();
            $('#updateUserModal').modal('hide');
        }
    };

    var url = `http://localhost:3000/user/${id}`;
    xhttp.open("PUT", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`id_user=${id}&nome=${nome}&cargo=${cargo}&user_login=${user_login}&user_senha=${user_senha}&nivel_acesso=${nivel_acesso}`);

}

function preRegisterUser() {
    cleanRegisterUserForm();
}

function preUpdateUser(id) {

    cleanUpdateUserForm();
    var data = id.getAttribute("dataID");
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            document.getElementById('id_userUpd').value = response.id_user;
            document.getElementById('nomeUpd').value = response.nome;
            document.getElementById('cargoUpd').value = response.cargo;
            document.getElementById('user_loginUpd').value = response.user_login;
            document.getElementById('user_senhaUpd').value = response.user_senha;
            document.getElementById('nivel_acessoUpd').value = response.nivel_acesso;
            $('#updateUserModal').modal('show');
        }
    };

    var url = `http://localhost:3000/user/${data}`;
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

}

function preDeleteUser(id) {

    cleanUpdateUserForm();
    var data = id.getAttribute("dataID");
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            document.getElementById('nomeDel').innerHTML = response.nome;
            document.getElementById('id_userDel').value = response.id_user;
            $('#deleteUserModal').modal('show');
        }
    };

    var url = `http://localhost:3000/user/${data}`;
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

}

function DAOdeleteUser() {

    var xhttp = new XMLHttpRequest();

    var id = document.getElementById('id_userDel').value;
    console.log(id);

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            DAOgetAllUsers();
            $('#deleteUserModal').modal('hide');
        }
    };

    var url = `http://localhost:3000/user/${id}`;
    xhttp.open("DELETE", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

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
    td6.innerHTML = `<button class="btn btn-rounded btn-warning" dataID="${user.id_user}" 
                        data-toggle="modal" data-target="#updateUserModal"
                        data-backdrop="static" onclick="preUpdateUser(this)">
                        Editar</button>
                     <button class="btn btn-rounded btn-danger" dataID="${user.id_user}"
                        data-toggle="modal" data-target="#deleteUserModal"
                        data-backdrop="static" onclick="preDeleteUser(this)">
                        Excluir</button>`;

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

function cleanRegisterUserForm() {
    document.getElementById('nome').value = "";
    document.getElementById('cargo').value = "";
    document.getElementById('user_login').value = "";
    document.getElementById('user_senha').value = "";
    document.getElementById('nivel_acesso').value = "";
}

function cleanUpdateUserForm() {
    document.getElementById('nomeUpd').value = "";
    document.getElementById('cargoUpd').value = "";
    document.getElementById('user_loginUpd').value = "";
    document.getElementById('user_senhaUpd').value = "";
    document.getElementById('nivel_acessoUpd').value = "";
}
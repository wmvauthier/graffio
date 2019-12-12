var userTableBody = $("#userTableBody")[0];
var nome = $('#nome').val();
var cargo = $('#cargo').val();
var user_login = $('#user_login').val();
var user_senha = $('#user_senha').val();
var nivel_acesso = $('#nivel_acesso').val();

$("#btnPreRegisterUser").click(function () {
    preRegisterUser();
});

$("#btnDAODeleteUser").click(function () {
    DAOdeleteUser();
});

$("#btnDAOUpdateUser").click(function () {
    DAOupdateUser();
});

$("#btnDAORegisterUser").click(function () {
    DAOregisterUser();
});

function DAOgetAllUsers() {

    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/user`);
    fillUserTable(userTableBody, response);

}

function DAOregisterUser() {

    var xhttp = new XMLHttpRequest();

    var nome = $('#nome').val();
    var cargo = $('#cargo').val();
    var user_login = $('#user_login').val();
    var user_senha = $('#user_senha').val();
    var nivel_acesso = $('#nivel_acesso').val();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            createUserToUserTable(userTableBody, response);
            cleanRegisterUserForm();
            $('#registerUserModal').modal('hide');
        }
    };

    var url = `http://${IP_DO_SERVIDOR}:3000/user`;
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`nome=${nome}&cargo=${cargo}&user_login=${user_login}&user_senha=${user_senha}&nivel_acesso=${nivel_acesso}`);

}

function DAOupdateUser() {

    var id = $('#id_userUpd').val();
    var nome = $('#nomeUpd').val();
    var cargo = $('#cargoUpd').val();
    var user_login = $('#user_loginUpd').val();
    var user_senha = $('#user_senhaUpd').val();
    var nivel_acesso = $('#nivel_acessoUpd').val();

    var url = `http://${IP_DO_SERVIDOR}:3000/user/${id}`;
    var data = `id_user=${id}&nome=${nome}&cargo=${cargo}&user_login=${user_login}&user_senha=${user_senha}&nivel_acesso=${nivel_acesso}`;

    httpPut(url, data);

    DAOgetAllUsers();
    cleanUpdateUserForm();
    $('#updateUserModal').modal('hide');

}

function preRegisterUser() {
    cleanRegisterUserForm();
}

function preUpdateUser(id) {

    cleanUpdateUserForm();
    var data = id.getAttribute("dataID");
    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/user/${data}`);

    $('#id_userUpd').val(response.id_user);
    $('#nomeUpd').val(response.nome);
    $('#cargoUpd').val(response.cargo);
    $('#user_loginUpd').val(response.user_login);
    $('#user_senhaUpd').val(response.user_senha);
    $('#nivel_acessoUpd').val(response.nivel_acesso);
    $('#updateUserModal').modal('show');

}

function preDeleteUser(id) {

    cleanUpdateUserForm();
    var data = id.getAttribute("dataID");
    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/user/${data}`);

    $('#nomeDel').html(response.nome);
    $('#id_userDel').val(response.id_user);
    $('#deleteUserModal').modal('show');

}

function DAOdeleteUser() {

    var id = $('#id_userDel').val();
    httpDelete(`http://${IP_DO_SERVIDOR}:3000/user/${id}`);
    DAOgetAllUsers();
    $('#deleteUserModal').modal('hide');

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
    td3.innerHTML = user.user_login;
    td4.innerHTML = user.cargo;
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
    $('#nome').val("");
    $('#cargo').val("");
    $('#user_login').val("");
    $('#user_senha').val("");
    $('#nivel_acesso').val("");
}

function cleanUpdateUserForm() {
    $('#nomeUpd').val("");
    $('#cargoUpd').val("");
    $('#user_loginUpd').val("");
    $('#user_senhaUpd').val("");
    $('#nivel_acessoUpd').val("");
}
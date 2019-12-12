function setProfile(user) {

    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/userN/${user}`);
    cleanUpdateNavUserForm();

    $('#id_navUserUpd').val(response.id_user);
    $('#navNomeUpd').val(response.nome);
    $('#navCargoUpd').val(response.cargo);
    $('#navUser_loginUpd').val(response.user_login);
    $('#navUser_senhaUpd').val(response.user_senha);
    $('#navNivel_acessoUpd').val(response.nivel_acesso);
    $('#updateNavUserModal').modal('show');

}

function DAOupdateNavUser() {

    var id = $('#id_navUserUpd').val();
    var nome = $('#navNomeUpd').val();
    var cargo = $('#navCargoUpd').val();
    var user_login = $('#navUser_loginUpd').val();
    var user_senha = $('#navUser_senhaUpd').val();
    var nivel_acesso = $('#navNivel_acessoUpd').val();

    var url = `http://${IP_DO_SERVIDOR}:3000/user/${id}`;
    var data = `id_user=${id}&nome=${nome}&cargo=${cargo}&user_login=${user_login}&user_senha=${user_senha}&nivel_acesso=${nivel_acesso}`;

    httpPut(url, data);

    cleanUpdateNavUserForm();
    $('#updateNavUserModal').modal('hide');

}

function cleanUpdateNavUserForm() {
    $('#navNomeUpd').val("");
    $('#navCargoUpd').val("");
    $('#navUser_loginUpd').val("");
    $('#navUser_senhaUpd').val("");
    $('#navNivel_acessoUpd').val("");
}

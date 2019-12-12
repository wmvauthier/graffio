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

    var xhttp = new XMLHttpRequest();

    var id = $('#id_navUserUpd').val();
    var nome = $('#navNomeUpd').val();
    var cargo = $('#navCargoUpd').val();
    var user_login = $('#navUser_loginUpd').val();
    var user_senha = $('#navUser_senhaUpd').val();
    var nivel_acesso = $('#navNivel_acessoUpd').val();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cleanUpdateNavUserForm();
            $('#updateNavUserModal').modal('hide');
        }
    };

    var url = `http://${IP_DO_SERVIDOR}:3000/user/${id}`;
    xhttp.open("PUT", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`id_user=${id}&nome=${nome}&cargo=${cargo}&user_login=${user_login}&user_senha=${user_senha}&nivel_acesso=${nivel_acesso}`);

}

function cleanUpdateNavUserForm() {
    $('#navNomeUpd').val("");
    $('#navCargoUpd').val("");
    $('#navUser_loginUpd').val("");
    $('#navUser_senhaUpd').val("");
    $('#navNivel_acessoUpd').val("");
}

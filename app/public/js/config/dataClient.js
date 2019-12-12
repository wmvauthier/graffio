
$("#btnResetForm").click(function () {
    $("#updateDataClientForm")[0].reset();
});

$("#btnDAOUpdateDataClient").click(function () {
    DAOupdateDataClient();
});

function DAOgetDataClient() {

    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/configParking`);

    $("#nome_fantasia").val(response.nome_fantasia);
    $("#razao_social").val(response.razao_social);
    $("#endereco").val(response.endereco);
    $("#cnpj").val(response.cnpj);
    $("#inscricao_municipal").val(response.inscricao_municipal);
    $("#telefone").val(response.telefone);
    $("#website").val(response.website);
    $("#email").val(response.email);

}

function DAOupdateDataClient() {

    var id = '1';
    var nome_fantasia = $("#nome_fantasia").val();
    var razao_social = $("#razao_social").val();
    var endereco = $("#endereco").val();
    var cnpj = $("#cnpj").val();
    var inscricao_municipal = $("#inscricao_municipal").val();
    var telefone = $("#telefone").val();
    var website = $("#website").val();
    var email = $("#email").val();

    var url = `http://${IP_DO_SERVIDOR}:3000/configParking/${id}`;
    var data = `id_parking=${id}
                &nome_fantasia=${nome_fantasia}
                &razao_social=${razao_social}
                &endereco=${endereco}
                &cnpj=${cnpj}
                &inscricao_municipal=${inscricao_municipal}
                &telefone=${telefone}
                &website=${website}
                &email=${email}`;

    httpPut(url, data);
    $("#updateDataClientForm")[0].reset();
    DAOgetDataClient();

}
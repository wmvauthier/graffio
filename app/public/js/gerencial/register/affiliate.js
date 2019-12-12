var affiliateTableBody = $("#affiliateTableBody")[0];
var nome = $('#nome').val();
var cnpj = $('#cnpj').val();

$("#btnPreRegisterAffiliate").click( function () {
    preRegisterAffiliate();
});

$("#btnDAODeleteAffiliate").click( function () {
    DAOdeleteAffiliate();
});

$("#btnDAOUpdateAffiliate").click( function () {
    DAOupdateAffiliate();
});

$("#btnDAORegisterAffiliate").click( function () {
    DAOregisterAffiliate();
});

function DAOgetAllAffiliates() {

    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/affiliate`);
    fillAffiliateTable(affiliateTableBody, response);

}

function DAOregisterAffiliate() {

    var xhttp = new XMLHttpRequest();

    var nome = $('#nome').val();
    var cnpj = $('#cnpj').val();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            createAffiliateToAffiliateTable(affiliateTableBody, response);
            cleanRegisterAffiliateForm();
            $('#registerAffiliateModal').modal('hide');
        }
    };

    var url = `http://${IP_DO_SERVIDOR}:3000/affiliate`;
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`nome=${nome}&cnpj=${cnpj}`);

}

function DAOupdateAffiliate() {

    var xhttp = new XMLHttpRequest();

    var id = $('#id_affiliateUpd').val();
    var nome = $('#nomeUpd').val();
    var cnpj = $('#cnpjUpd').val();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            DAOgetAllAffiliates();
            cleanUpdateAffiliateForm();
            $('#updateAffiliateModal').modal('hide');
        }
    };

    var url = `http://${IP_DO_SERVIDOR}:3000/affiliate/${id}`;
    xhttp.open("PUT", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`id_afiliado=${id}&nome=${nome}&cnpj=${cnpj}`);

}

function preRegisterAffiliate() {
    cleanRegisterAffiliateForm();
}

function preUpdateAffiliate(id) {

    cleanUpdateAffiliateForm();

    var data = id.getAttribute("dataID");
    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/affiliate/${data}`);

    $('#id_affiliateUpd').val(response.id_afiliado);
    $('#nomeUpd').val(response.nome);
    $('#cnpjUpd').val(response.cnpj);
    $('#updateAffiliateModal').modal('show');

}

function preDeleteAffiliate(id) {

    cleanUpdateAffiliateForm();

    var data = id.getAttribute("dataID");
    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/affiliate/${data}`);

    $('#nomeDel').html(response.nome);
    $('#id_affiliateDel').val(response.id_afiliado);
    $('#deleteAffiliateModal').modal('show');

}

function DAOdeleteAffiliate() {

    var id = $('#id_affiliateDel').val();
    httpDelete(`http://${IP_DO_SERVIDOR}:3000/affiliate/${id}`);
    DAOgetAllAffiliates();
    $('#deleteAffiliateModal').modal('hide');

}

function fillAffiliateTable(table, data) {

    table.innerHTML = "";

    data.forEach(function (affiliate) {
        createAffiliateToAffiliateTable(table, affiliate);
    });


}

//Insere Usuário na Lista de Usuários
function createAffiliateToAffiliateTable(table, affiliate) {

    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");

    td1.innerHTML = affiliate.id_afiliado;
    td2.innerHTML = affiliate.nome;
    td3.innerHTML = affiliate.cnpj;
    td4.innerHTML = `<button class="btn btn-rounded btn-warning" dataID="${affiliate.id_afiliado}" 
                        data-toggle="modal" data-target="#updateAffiliateModal"
                        data-backdrop="static" onclick="preUpdateAffiliate(this)">
                        Editar</button>
                     <button class="btn btn-rounded btn-danger" dataID="${affiliate.id_afiliado}"
                        data-toggle="modal" data-target="#deleteAffiliateModal"
                        data-backdrop="static" onclick="preDeleteAffiliate(this)">
                        Excluir</button>`;

    td1.setAttribute("data-title", "ID");
    td2.setAttribute("data-title", "Nome");
    td3.setAttribute("data-title", "CNPJ");
    td4.setAttribute("data-title", "Ações");

    td4.style = "text-align: center;"

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    table.appendChild(tr);

}

function cleanRegisterAffiliateForm() {
    $('#nome').val("");
    $('#cnpj').val("");
}

function cleanUpdateAffiliateForm() {
    $('nomeUpd').val("");
    $('cnpjUpd').val("");
}
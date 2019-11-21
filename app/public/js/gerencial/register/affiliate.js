var affiliateTableBody = document.getElementById("affiliateTableBody");
var nome = document.getElementById('nome').value;
var cnpj = document.getElementById('cnpj').value;

document.getElementById("btnPreRegisterAffiliate").addEventListener("click", function () {
    preRegisterAffiliate();
});

document.getElementById("btnDAODeleteAffiliate").addEventListener("click", function () {
    DAOdeleteAffiliate();
});

document.getElementById("btnDAOUpdateAffiliate").addEventListener("click", function () {
    DAOupdateAffiliate();
});

document.getElementById("btnDAORegisterAffiliate").addEventListener("click", function () {
    DAOregisterAffiliate();
});

function DAOgetAllAffiliates() {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            fillAffiliateTable(affiliateTableBody, response);
        }
    };

    var url = `http://${IP_DO_SERVIDOR}:3000/affiliate`;
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

}

function DAOregisterAffiliate() {

    var xhttp = new XMLHttpRequest();

    var nome = document.getElementById('nome').value;
    var cnpj = document.getElementById('cnpj').value;

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

    var id = document.getElementById('id_affiliateUpd').value;
    var nome = document.getElementById('nomeUpd').value;
    var cnpj = document.getElementById('cnpjUpd').value;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
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
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            document.getElementById('id_affiliateUpd').value = response.id_afiliado;
            document.getElementById('nomeUpd').value = response.nome;
            document.getElementById('cnpjUpd').value = response.cnpj;
            $('#updateAffiliateModal').modal('show');
        }
    };

    var url = `http://${IP_DO_SERVIDOR}:3000/affiliate/${data}`;
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

}

function preDeleteAffiliate(id) {

    cleanUpdateAffiliateForm();
    var data = id.getAttribute("dataID");
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            document.getElementById('nomeDel').innerHTML = response.nome;
            document.getElementById('id_affiliateDel').value = response.id_afiliado;
            $('#deleteAffiliateModal').modal('show');
        }
    };

    var url = `http://${IP_DO_SERVIDOR}:3000/affiliate/${data}`;
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

}

function DAOdeleteAffiliate() {

    var xhttp = new XMLHttpRequest();

    var id = document.getElementById('id_affiliateDel').value;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            DAOgetAllAffiliates();
            $('#deleteAffiliateModal').modal('hide');
        }
    };

    var url = `http://${IP_DO_SERVIDOR}:3000/affiliate/${id}`;
    xhttp.open("DELETE", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

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
    document.getElementById('nome').value = "";
    document.getElementById('cnpj').value = "";
}

function cleanUpdateAffiliateForm() {
    document.getElementById('nomeUpd').value = "";
    document.getElementById('cnpjUpd').value = "";
}
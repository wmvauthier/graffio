var courtyardWidgets = document.getElementById('courtyardWidgets');

document.getElementById("btnPreRegisterCourtyard").addEventListener("click", function () {
    preRegisterCourtyard();
});

document.getElementById("btnDAODeleteCourtyard").addEventListener("click", function () {
    DAOdeleteCourtyard();
});

document.getElementById("btnDAOUpdateCourtyard").addEventListener("click", function () {
    DAOupdateCourtyard();
});

document.getElementById("btnDAORegisterCourtyard").addEventListener("click", function () {
    DAOregisterCourtyard();
});

function DAOgetAllCourtyards() {

    courtyardWidgets.innerHTML = '';

    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/courtyard`);

    fillCourtyardTable(courtyardTableBody, response);

    var totalPatios = 0;
    var totalOnCourtyard = 0;
    var totalOutCourtyard = 0;
    var totalVagas = 0;
    var totalData = {};

    response.forEach(element => {

        totalPatios++;
        totalOnCourtyard += parseFloat(element.onCourtyard);
        totalOutCourtyard += parseFloat(element.outCourtyard);
        totalVagas = totalOnCourtyard + totalOutCourtyard;
        totalData = {
            "totalPatios": totalPatios,
            "totalOnCourtyard": totalOnCourtyard,
            "totalOutCourtyard": totalOutCourtyard,
            "totalVagas": totalVagas
        }

    });

    setCourtyardWidgets(courtyardWidgets, totalData);

}

function DAOregisterCourtyard() {

    var xhttp = new XMLHttpRequest();

    var nome = document.getElementById('nome').value;
    var qtd = document.getElementById('qtd').value;
    var tabela_preco = document.getElementById('tabela_preco').value;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            createCourtyardToCourtyardTable(courtyardTableBody, response);
            DAOgetAllCourtyards();
            cleanRegisterCourtyardForm();
            $('#registerCourtyardModal').modal('hide');
        }
    };

    var url = `http://${IP_DO_SERVIDOR}:3000/courtyard`;
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`nome=${nome}&qtd=${qtd}&tabela_preco=${tabela_preco}`);

}

function DAOupdateCourtyard() {

    var xhttp = new XMLHttpRequest();

    var id = document.getElementById('id_patioUpd').value;
    var nome = document.getElementById('nomeUpd').value;
    var qtd = document.getElementById('qtdUpd').value;
    var tabela_preco = document.getElementById('tabela_precoUpd').value;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            DAOgetAllCourtyards();
            cleanUpdateCourtyardForm();
            $('#updateCourtyardModal').modal('hide');
        }
    };

    var url = `http://${IP_DO_SERVIDOR}:3000/courtyard/${id}`;
    xhttp.open("PUT", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`id_patio=${id}&nome=${nome}&qtd=${qtd}&tabela_preco=${tabela_preco}`);

}

function DAOdeleteCourtyard() {

    var xhttp = new XMLHttpRequest();

    var id = document.getElementById('id_courtyardDel').value;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            DAOgetAllCourtyards();
            $('#deleteCourtyardModal').modal('hide');
        }
    };

    var url = `http://${IP_DO_SERVIDOR}:3000/courtyard/${id}`;
    xhttp.open("DELETE", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

}

function preRegisterCourtyard() {
    cleanRegisterCourtyardForm();
}

function preUpdateCourtyard(id) {

    cleanUpdateCourtyardForm();

    var data = id.getAttribute("dataID");
    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/courtyard/${data}`);

    document.getElementById('id_patioUpd').value = response.id_patio;
    document.getElementById('nomeUpd').value = response.nome;
    document.getElementById('qtdUpd').value = response.qtd;
    document.getElementById('tabela_precoUpd').value = response.tabela_preco;
    $('#updateCourtyardModal').modal('show');

}

function preDeleteCourtyard(id) {

    cleanUpdateCourtyardForm();

    var data = id.getAttribute("dataID");
    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/courtyard/${data}`);

    document.getElementById('nomeDel').innerHTML = response.nome;
    document.getElementById('id_courtyardDel').value = response.id_patio;
    $('#deleteCourtyardModal').modal('show');

}

function fillCourtyardTable(table, data) {

    table.innerHTML = "";

    data.forEach(function (courtyard) {
        createCourtyardToCourtyardTable(table, courtyard);
    });

}

//Insere Usuário na Lista de Usuários
function createCourtyardToCourtyardTable(table, courtyard) {

    var priceTable = httpGet(`http://${IP_DO_SERVIDOR}:3000/priceTable/${courtyard.tabela_preco}`);

    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");

    td1.innerHTML = courtyard.id_patio;
    td2.innerHTML = courtyard.nome;
    td3.innerHTML = courtyard.qtd;
    td4.innerHTML = priceTable.nome;
    td4.value = courtyard.tabela_preco;
    td5.innerHTML = `<button class="btn btn-rounded btn-warning" dataID="${courtyard.id_patio}" 
                        data-toggle="modal" data-target="#updateCourtyardModal"
                        data-backdrop="static" onclick="preUpdateCourtyard(this)">
                        Editar</button>
                     <button class="btn btn-rounded btn-danger" dataID="${courtyard.id_patio}"
                        data-toggle="modal" data-target="#deleteCourtyardModal"
                        data-backdrop="static" onclick="preDeleteCourtyard(this)">
                        Excluir</button>`;

    td1.setAttribute("data-title", "ID");
    td2.setAttribute("data-title", "Nome");
    td3.setAttribute("data-title", "Vagas");
    td4.setAttribute("data-title", "Tab. Preço");
    td5.setAttribute("data-title", "Ações");

    td5.style = "text-align: center;"

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    table.appendChild(tr);

}

function cleanRegisterCourtyardForm() {
    document.getElementById('nome').value = "";
    document.getElementById('qtd').value = "";
    document.getElementById('tabela_preco').value = "";
}

function cleanUpdateCourtyardForm() {
    document.getElementById('nomeUpd').value = "";
    document.getElementById('qtdUpd').value = "";
    document.getElementById('tabela_precoUpd').value = "";
}
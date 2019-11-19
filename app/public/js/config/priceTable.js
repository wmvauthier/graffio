var priceTableTableBody = document.getElementById("priceTableTableBody");
var nome = document.getElementById('nome').value;
var periodo = document.getElementById('periodo').value;
var valor = document.getElementById('valor').value;
var tabela_aux = document.getElementById('tabela_aux').value;

document.getElementById("btnPreRegisterPriceTable").addEventListener("click", function () {
    preRegisterPriceTable();
});

document.getElementById("btnDAODeletePriceTable").addEventListener("click", function () {
    DAOdeletePriceTable();
});

document.getElementById("btnDAOUpdatePriceTable").addEventListener("click", function () {
    DAOupdatePriceTable();
});

document.getElementById("btnDAORegisterPriceTable").addEventListener("click", function () {
    DAOregisterPriceTable();
});

function DAOgetAllPriceTables() {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            fillPriceTableTable(priceTableTableBody, response);
        }
    };

    var url = "http://localhost:3000/priceTable";
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

}

function DAOregisterPriceTable() {

    var xhttp = new XMLHttpRequest();

    var nome = document.getElementById('nome').value;
    var periodo = document.getElementById('periodo').value;
    var valor = document.getElementById('valor').value;
    var tabela_aux = document.getElementById('tabela_aux').value;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            createPriceTableToPriceTableTable(priceTableTableBody, response);
            cleanRegisterPriceTableForm();
            $('#registerPriceTableModal').modal('hide');
        }
    };

    var url = "http://localhost:3000/priceTable";
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`nome=${nome}&periodo=${periodo}&valor=${valor}&tabela_aux=${tabela_aux}`);

}

function DAOupdatePriceTable() {

    var xhttp = new XMLHttpRequest();

    var id = document.getElementById('id_tabela_precoUpd').value;
    var nome = document.getElementById('nomeUpd').value;
    var periodo = document.getElementById('periodoUpd').value;
    var valor = document.getElementById('valorUpd').value;
    var tabela_aux = document.getElementById('tabela_auxUpd').value;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            DAOgetAllPriceTables();
            cleanUpdatePriceTableForm();
            $('#updatePriceTableModal').modal('hide');
        }
    };

    var url = `http://localhost:3000/priceTable/${id}`;
    xhttp.open("PUT", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`id_tabela_preco=${id}&nome=${nome}&periodo=${periodo}&valor=${valor}&tabela_aux=${tabela_aux}`);

}

function DAOdeletePriceTable() {

    var xhttp = new XMLHttpRequest();

    var id = document.getElementById('id_priceTableDel').value;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            DAOgetAllPriceTables();
            $('#deletePriceTableModal').modal('hide');
        }
    };

    var url = `http://localhost:3000/priceTable/${id}`;
    xhttp.open("DELETE", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

}

function preRegisterPriceTable() {
    cleanRegisterPriceTableForm();
}

function preUpdatePriceTable(id) {

    cleanUpdatePriceTableForm();
    var data = id.getAttribute("dataID");
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            document.getElementById('id_tabela_precoUpd').value = response.id_tabela_preco;
            document.getElementById('nomeUpd').value = response.nome;
            document.getElementById('periodoUpd').value = response.periodo;
            document.getElementById('valorUpd').value = response.valor;
            document.getElementById('tabela_auxUpd').value = response.tabela_aux;
            $('#updatePriceTableModal').modal('show');
        }
    };

    var url = `http://localhost:3000/priceTable/${data}`;
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

}

function preDeletePriceTable(id) {

    cleanUpdatePriceTableForm();
    var data = id.getAttribute("dataID");
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            document.getElementById('nomeDel').innerHTML = response.nome;
            document.getElementById('id_priceTableDel').value = response.id_tabela_preco;
            $('#deletePriceTableModal').modal('show');
        }
    };

    var url = `http://localhost:3000/priceTable/${data}`;
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

}

function fillPriceTableTable(table, data) {

    table.innerHTML = "";

    data.forEach(function (priceTable) {
        createPriceTableToPriceTableTable(table, priceTable);
    });


}

//Insere Usuário na Lista de Usuários
function createPriceTableToPriceTableTable(table, priceTable) {

    var priceTableAux = httpGet(`http://localhost:3000/priceTableAux/${priceTable.tabela_aux}`);

    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");

    td1.innerHTML = priceTable.id_tabela_preco;
    td2.innerHTML = priceTable.nome;
    td3.innerHTML = priceTable.periodo;
    td4.innerHTML = priceTable.valor;
    td5.innerHTML = priceTableAux.nome;
    td5.value = priceTable.tabela_aux;
    td6.innerHTML = `<button class="btn btn-rounded btn-warning" dataID="${priceTable.id_tabela_preco}" 
                        data-toggle="modal" data-target="#updatePriceTableModal"
                        data-backdrop="static" onclick="preUpdatePriceTable(this)">
                        Editar</button>
                     <button class="btn btn-rounded btn-danger" dataID="${priceTable.id_tabela_preco}"
                        data-toggle="modal" data-target="#deletePriceTableModal"
                        data-backdrop="static" onclick="preDeletePriceTable(this)">
                        Excluir</button>`;

    td1.setAttribute("data-title", "ID");
    td2.setAttribute("data-title", "Nome");
    td3.setAttribute("data-title", "Período");
    td4.setAttribute("data-title", "Valor");
    td5.setAttribute("data-title", "Tab. Auxiliar");
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

function cleanRegisterPriceTableForm() {
    document.getElementById('nome').value = "";
    document.getElementById('periodo').value = "";
    document.getElementById('valor').value = "";
    document.getElementById('tabela_aux').value = "";
}

function cleanUpdatePriceTableForm() {
    document.getElementById('id_tabela_precoUpd').value = "";
    document.getElementById('nomeUpd').value = "";
    document.getElementById('periodoUpd').value = "";
    document.getElementById('valorUpd').value = "";
    document.getElementById('tabela_auxUpd').value = "";
}
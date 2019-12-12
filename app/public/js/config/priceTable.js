var priceTableTableBody = $("#priceTableTableBody")[0];
var nome = $('#nome').val();
var periodo = $('#periodo').val();
var valor = $('#valor').val();
var tabela_aux = $('#tabela_aux').val();

$("#btnPreRegisterPriceTable").click(function () {
    preRegisterPriceTable();
});

$("#btnDAODeletePriceTable").click(function () {
    DAOdeletePriceTable();
});

$("#btnDAOUpdatePriceTable").click(function () {
    DAOupdatePriceTable();
});

$("#btnDAORegisterPriceTable").click(function () {
    DAOregisterPriceTable();
});

function DAOgetAllPriceTables() {

    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/priceTable`);
    fillPriceTableTable(priceTableTableBody, response);

}

function DAOregisterPriceTable() {

    var xhttp = new XMLHttpRequest();

    var nome = $('#nome').val();
    var periodo = $('#periodo').val();
    var valor = $('#valor').val();
    var tabela_aux = $('#tabela_aux').val();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            createPriceTableToPriceTableTable(priceTableTableBody, response);
            cleanRegisterPriceTableForm();
            $('#registerPriceTableModal').modal('hide');
        }
    };

    var url = `http://${IP_DO_SERVIDOR}:3000/priceTable`;
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`nome=${nome}&periodo=${periodo}&valor=${valor}&tabela_aux=${tabela_aux}`);

}

function DAOupdatePriceTable() {

    var id = $('#id_tabela_precoUpd').val();
    var nome = $('#nomeUpd').val();
    var periodo = $('#periodoUpd').val();
    var valor = $('#valorUpd').val();
    var tabela_aux = $('#tabela_auxUpd').val();

    var url = `http://${IP_DO_SERVIDOR}:3000/priceTable/${id}`;
    var data = `id_tabela_preco=${id}&nome=${nome}&periodo=${periodo}&valor=${valor}&tabela_aux=${tabela_aux}`;

    httpPut(url, data);

    DAOgetAllPriceTables();
    cleanUpdatePriceTableForm();
    $('#updatePriceTableModal').modal('hide');

}

function DAOdeletePriceTable() {

    var id = $('#id_priceTableDel').val();
    httpDelete(`http://${IP_DO_SERVIDOR}:3000/priceTable/${id}`);
    DAOgetAllPriceTables();
    $('#deletePriceTableModal').modal('hide');

}

function preRegisterPriceTable() {
    cleanRegisterPriceTableForm();
}

function preUpdatePriceTable(id) {

    cleanUpdatePriceTableForm();

    var data = id.getAttribute("dataID");
    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/priceTable/${data}`);

    $('#id_tabela_precoUpd').val(response.id_tabela_preco);
    $('#nomeUpd').val(response.nome);
    $('#periodoUpd').val(response.periodo);
    $('#valorUpd').val(response.valor);
    $('#tabela_auxUpd').val(response.tabela_aux);
    $('#updatePriceTableModal').modal('show');

}

function preDeletePriceTable(id) {

    cleanUpdatePriceTableForm();
    var data = id.getAttribute("dataID");
    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/priceTable/${data}`);

    $('#nomeDel').html(response.nome);
    $('#id_priceTableDel').val(response.id_tabela_preco);
    $('#deletePriceTableModal').modal('show');

}

function fillPriceTableTable(table, data) {

    table.innerHTML = "";

    data.forEach(function (priceTable) {
        createPriceTableToPriceTableTable(table, priceTable);
    });


}

//Insere Usuário na Lista de Usuários
function createPriceTableToPriceTableTable(table, priceTable) {

    var priceTableAux = httpGet(`http://${IP_DO_SERVIDOR}:3000/priceTableAux/${priceTable.tabela_aux}`);

    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");

    td1.innerHTML = priceTable.id_tabela_preco;
    td2.innerHTML = priceTable.nome;
    td3.innerHTML = priceTable.periodo + "min";
    td4.innerHTML = "R$" + priceTable.valor;
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
    $('nome').val("");
    $('periodo').val("");
    $('valor').val("");
    $('tabela_aux').val("");
}

function cleanUpdatePriceTableForm() {
    $('id_tabela_precoUpd').val("");
    $('nomeUpd').val("");
    $('periodoUpd').val("");
    $('valorUpd').val("");
    $('tabela_auxUpd').val("");
}
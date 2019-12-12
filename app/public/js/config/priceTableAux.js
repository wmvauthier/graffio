var priceTableAuxTableBody = $("#priceTableAuxTableBody")[0];
var nome = $('#nome').val();
var periodo = $('#periodo').val();
var valor = $('#valor').val();
var valorPerda = $('#valorPerda').val();
var tolerancia = $('#tolerancia').val();

$("#btnPreRegisterPriceTableAux").click(function () {
    preRegisterPriceTableAux();
});

$("#btnDAODeletePriceTableAux").click(function () {
    DAOdeletePriceTableAux();
});

$("#btnDAOUpdatePriceTableAux").click(function () {
    DAOupdatePriceTableAux();
});

$("#btnDAORegisterPriceTableAux").click(function () {
    DAOregisterPriceTableAux();
});

function DAOgetAllPriceTableAuxs() {

    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/priceTableAux`);
    fillPriceTableAuxTable(priceTableAuxTableBody, response);

}

function DAOregisterPriceTableAux() {

    var nome = $('#nome').val();
    var periodo = $('#periodo').val();
    var valor = $('#valor').val();
    var valorPerda = $('#valorPerda').val();
    var tolerancia = $('#tolerancia').val();

    var url = `http://${IP_DO_SERVIDOR}:3000/priceTableAux`;
    var data = `nome=${nome}&periodo=${periodo}&valor=${valor}&valorPerda=${valorPerda}&tolerancia=${tolerancia}`;

    var response = httpPost(url, data);

    createPriceTableAuxToPriceTableAuxTable(priceTableAuxTableBody, response);
    cleanRegisterPriceTableAuxForm();
    $('#registerPriceTableAuxModal').modal('hide');

}

function DAOupdatePriceTableAux() {

    var id = $('#id_tabela_preco_auxUpd').val();
    var nome = $('#nomeUpd').val();
    var periodo = $('#periodoUpd').val();
    var valor = $('#valorUpd').val();
    var valorPerda = $('#valorPerdaUpd').val();
    var tolerancia = $('#toleranciaUpd').val();

    var url = `http://${IP_DO_SERVIDOR}:3000/priceTableAux/${id}`;
    var data = `id_tabela_preco_aux=${id}&nome=${nome}&periodo=${periodo}&valor=${valor}&valorPerda=${valorPerda}&tolerancia=${tolerancia}`;

    httpPut(url, data);

    DAOgetAllPriceTableAuxs();
    cleanUpdatePriceTableAuxForm();
    $('#updatePriceTableAuxModal').modal('hide');

}

function DAOdeletePriceTableAux() {

    var id = $('#id_priceTableAuxDel').val();
    httpDelete(`http://${IP_DO_SERVIDOR}:3000/priceTableAux/${id}`);
    DAOgetAllPriceTableAuxs();
    $('#deletePriceTableAuxModal').modal('hide');

}

function preRegisterPriceTableAux() {
    cleanRegisterPriceTableAuxForm();
}

function preUpdatePriceTableAux(id) {

    cleanUpdatePriceTableAuxForm();

    var data = id.getAttribute("dataID");
    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/priceTableAux/${data}`);

    $('#id_tabela_preco_auxUpd').val(response.id_tabela_preco_aux);
    $('#nomeUpd').val(response.nome);
    $('#periodoUpd').val(response.periodo);
    $('#valorUpd').val(response.valor);
    $('#valorPerdaUpd').val(response.valorPerda);
    $('#toleranciaUpd').val(response.tolerancia);
    $('#updatePriceTableAuxModal').modal('show');

}

function preDeletePriceTableAux(id) {

    cleanUpdatePriceTableAuxForm();

    var data = id.getAttribute("dataID");
    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/priceTableAux/${data}`);

    $('#nomeDel').html(response.nome);
    $('#id_priceTableAuxDel').val(response.id_tabela_preco_aux);
    $('#deletePriceTableAuxModal').modal('show');

}

function fillPriceTableAuxTable(table, data) {

    table.innerHTML = "";

    data.forEach(function (priceTableAux) {
        createPriceTableAuxToPriceTableAuxTable(table, priceTableAux);
    });


}

//Insere Usuário na Lista de Usuários
function createPriceTableAuxToPriceTableAuxTable(table, priceTableAux) {

    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");
    var td7 = document.createElement("td");

    td1.innerHTML = priceTableAux.id_tabela_preco_aux;
    td2.innerHTML = priceTableAux.nome;
    td3.innerHTML = priceTableAux.periodo + "min";
    td4.innerHTML = "R$" + priceTableAux.valor;
    td5.innerHTML = "R$" + priceTableAux.valorPerda;
    td6.innerHTML = priceTableAux.tolerancia + "min";
    td7.innerHTML = `<button class="btn btn-rounded btn-warning" dataID="${priceTableAux.id_tabela_preco_aux}" 
                        data-toggle="modal" data-target="#updatePriceTableAuxModal"
                        data-backdrop="static" onclick="preUpdatePriceTableAux(this)">
                        Editar</button>
                     <button class="btn btn-rounded btn-danger" dataID="${priceTableAux.id_tabela_preco_aux}"
                        data-toggle="modal" data-target="#deletePriceTableAuxModal"
                        data-backdrop="static" onclick="preDeletePriceTableAux(this)">
                        Excluir</button>`;

    td1.setAttribute("data-title", "ID");
    td2.setAttribute("data-title", "Nome");
    td3.setAttribute("data-title", "Período");
    td4.setAttribute("data-title", "Valor");
    td5.setAttribute("data-title", "Perda do Ticket");
    td6.setAttribute("data-title", "Tolerância");
    td7.setAttribute("data-title", "Ações");

    td7.style = "text-align: center;"

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);

    table.appendChild(tr);

}

function cleanRegisterPriceTableAuxForm() {
    $('#nome').val("");
    $('#periodo').val("");
    $('#valor').val("");
    $('#valorPerda').val("");
    $('#tolerancia').val("");
}

function cleanUpdatePriceTableAuxForm() {
    $('#id_tabela_preco_auxUpd').val("");
    $('#nomeUpd').val("");
    $('#periodoUpd').val("");
    $('#valorUpd').val("");
    $('#valorPerdaUpd').val("");
    $('#toleranciaUpd').val("");
}
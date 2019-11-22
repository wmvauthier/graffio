var priceTableAuxTableBody = document.getElementById("priceTableAuxTableBody");
var nome = document.getElementById('nome').value;
var periodo = document.getElementById('periodo').value;
var valor = document.getElementById('valor').value;
var valorPerda = document.getElementById('valorPerda').value;
var tolerancia = document.getElementById('tolerancia').value;

document.getElementById("btnPreRegisterPriceTableAux").addEventListener("click", function () {
    preRegisterPriceTableAux();
});

document.getElementById("btnDAODeletePriceTableAux").addEventListener("click", function () {
    DAOdeletePriceTableAux();
});

document.getElementById("btnDAOUpdatePriceTableAux").addEventListener("click", function () {
    DAOupdatePriceTableAux();
});

document.getElementById("btnDAORegisterPriceTableAux").addEventListener("click", function () {
    DAOregisterPriceTableAux();
});

function DAOgetAllPriceTableAuxs() {

    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/priceTableAux`);
    fillPriceTableAuxTable(priceTableAuxTableBody, response);

}

function DAOregisterPriceTableAux() {

    var xhttp = new XMLHttpRequest();

    var nome = document.getElementById('nome').value;
    var periodo = document.getElementById('periodo').value;
    var valor = document.getElementById('valor').value;
    var valorPerda = document.getElementById('valorPerda').value;
    var tolerancia = document.getElementById('tolerancia').value;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            createPriceTableAuxToPriceTableAuxTable(priceTableAuxTableBody, response);
            cleanRegisterPriceTableAuxForm();
            $('#registerPriceTableAuxModal').modal('hide');
        }
    };

    var url = `http://${IP_DO_SERVIDOR}:3000/priceTableAux`;
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`nome=${nome}&periodo=${periodo}&valor=${valor}&valorPerda=${valorPerda}&tolerancia=${tolerancia}`);

}

function DAOupdatePriceTableAux() {

    var xhttp = new XMLHttpRequest();

    var id = document.getElementById('id_tabela_preco_auxUpd').value;
    var nome = document.getElementById('nomeUpd').value;
    var periodo = document.getElementById('periodoUpd').value;
    var valor = document.getElementById('valorUpd').value;
    var valorPerda = document.getElementById('valorPerdaUpd').value;
    var tolerancia = document.getElementById('toleranciaUpd').value;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            DAOgetAllPriceTableAuxs();
            cleanUpdatePriceTableAuxForm();
            $('#updatePriceTableAuxModal').modal('hide');
        }
    };

    var url = `http://${IP_DO_SERVIDOR}:3000/priceTableAux/${id}`;
    xhttp.open("PUT", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`id_tabela_preco_aux=${id}&nome=${nome}&periodo=${periodo}&valor=${valor}&valorPerda=${valorPerda}&tolerancia=${tolerancia}`);

}

function DAOdeletePriceTableAux() {

    var xhttp = new XMLHttpRequest();

    var id = document.getElementById('id_priceTableAuxDel').value;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            DAOgetAllPriceTableAuxs();
            $('#deletePriceTableAuxModal').modal('hide');
        }
    };

    var url = `http://${IP_DO_SERVIDOR}:3000/priceTableAux/${id}`;
    xhttp.open("DELETE", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

}

function preRegisterPriceTableAux() {
    cleanRegisterPriceTableAuxForm();
}

function preUpdatePriceTableAux(id) {

    cleanUpdatePriceTableAuxForm();

    var data = id.getAttribute("dataID");
    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/priceTableAux/${data}`);

    document.getElementById('id_tabela_preco_auxUpd').value = response.id_tabela_preco_aux;
    document.getElementById('nomeUpd').value = response.nome;
    document.getElementById('periodoUpd').value = response.periodo;
    document.getElementById('valorUpd').value = response.valor;
    document.getElementById('valorPerdaUpd').value = response.valorPerda;
    document.getElementById('toleranciaUpd').value = response.tolerancia;
    $('#updatePriceTableAuxModal').modal('show');

}

function preDeletePriceTableAux(id) {

    cleanUpdatePriceTableAuxForm();

    var data = id.getAttribute("dataID");
    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/priceTableAux/${data}`);

    document.getElementById('nomeDel').innerHTML = response.nome;
    document.getElementById('id_priceTableAuxDel').value = response.id_tabela_preco_aux;
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
    td3.innerHTML = priceTableAux.periodo;
    td4.innerHTML = priceTableAux.valor;
    td5.innerHTML = priceTableAux.valorPerda;
    td6.innerHTML = priceTableAux.tolerancia;
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
    document.getElementById('nome').value = "";
    document.getElementById('periodo').value = "";
    document.getElementById('valor').value = "";
    document.getElementById('valorPerda').value = "";
    document.getElementById('tolerancia').value = "";
}

function cleanUpdatePriceTableAuxForm() {
    document.getElementById('id_tabela_preco_auxUpd').value = "";
    document.getElementById('nomeUpd').value = "";
    document.getElementById('periodoUpd').value = "";
    document.getElementById('valorUpd').value = "";
    document.getElementById('valorPerdaUpd').value = "";
    document.getElementById('toleranciaUpd').value = "";
}
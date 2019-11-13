var courtyardTableBody = document.getElementById("courtyardTableBody");
var nome = document.getElementById('nome').value;
var qtd = document.getElementById('qtd').value;
var tabela_preco = document.getElementById('tabela_preco').value;
var courtyardWidgets = document.getElementById('courtyardWidgets').value;

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

function DAOgetAllCourtyards(courtyardWidgets) {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            
            var response = JSON.parse(this.responseText);
            fillCourtyardTable(courtyardTableBody, response);

            response.forEach(element => {

                var xhttp2 = new XMLHttpRequest();
            
                xhttp2.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var dados = JSON.parse(this.responseText);
                        setCourtyardWidgets(courtyardWidgets,element);
                        setCourtyardChart(element, dados);
                        console.log(element);
                        console.log(dados);
                    }
                };
            
                var url = `http://localhost:3000/countDocumentsFromCourtyards/${element.id_patio}`;
                xhttp2.open("GET", url, true);
                xhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp2.send();
                
            });

        }
    };

    var url = "http://localhost:3000/courtyard";
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

}

function DAOregisterCourtyard() {

    var xhttp = new XMLHttpRequest();

    var nome = document.getElementById('nome').value;
    var qtd = document.getElementById('qtd').value;
    var tabela_preco = document.getElementById('tabela_preco').value;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            console.log(response);
            createCourtyardToCourtyardTable(courtyardTableBody, response);
            cleanRegisterCourtyardForm();
            $('#registerCourtyardModal').modal('hide');
        }
    };

    var url = "http://localhost:3000/courtyard";
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
            DAOgetAllCoutyards();
            cleanUpdateCourtyardForm();
            $('#updateCourtyardModal').modal('hide');
        }
    };

    var url = `http://localhost:3000/courtyard/${id}`;
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

    var url = `http://localhost:3000/courtyard/${id}`;
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
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            document.getElementById('id_patioUpd').value = response.id_patio;
            document.getElementById('nomeUpd').value = response.nome;
            document.getElementById('qtdUpd').value = response.qtd;
            document.getElementById('tabela_precoUpd').value = response.tabela_preco;
            $('#updateCourtyardModal').modal('show');
        }
    };

    var url = `http://localhost:3000/courtyard/${data}`;
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

}

function preDeleteCourtyard(id) {

    cleanUpdateCourtyardForm();
    var data = id.getAttribute("dataID");
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            document.getElementById('nomeDel').innerHTML = response.nome;
            document.getElementById('id_courtyardDel').value = response.id_patio;
            $('#deleteCourtyardModal').modal('show');
        }
    };

    var url = `http://localhost:3000/courtyard/${data}`;
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

}

function fillCourtyardTable(table, data) {

    table.innerHTML = "";

    data.forEach(function (courtyard) {
        createCourtyardToCourtyardTable(table, courtyard);
    });

}

//Insere Usuário na Lista de Usuários
function createCourtyardToCourtyardTable(table, courtyard) {

    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");

    td1.innerHTML = courtyard.id_patio;
    td2.innerHTML = courtyard.nome;
    td3.innerHTML = courtyard.qtd;
    td4.innerHTML = courtyard.tabela_preco;
    td5.innerHTML = courtyard.nome;
    td6.innerHTML = `<button class="btn btn-rounded btn-warning" dataID="${courtyard.id_patio}" 
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
    td5.setAttribute("data-title", "Ocupação");
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
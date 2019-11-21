var terminalWidgets = document.getElementById('terminalWidgets').value;

document.getElementById("btnPreRegisterTerminal").addEventListener("click", function () {
    preRegisterTerminal();
});

document.getElementById("btnDAODeleteTerminal").addEventListener("click", function () {
    DAOdeleteTerminal();
});

document.getElementById("btnDAOUpdateTerminal").addEventListener("click", function () {
    DAOupdateTerminal();
});

document.getElementById("btnDAORegisterTerminal").addEventListener("click", function () {
    DAOregisterTerminal();
});

function DAOgetAllTerminals(terminalWidgets) {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var response = JSON.parse(this.responseText);
            fillTerminalTable(terminalTableBody, response);
            var booleanFirstElement = true;

            // response.forEach(element => {

            //     var xhttp2 = new XMLHttpRequest();

            //     xhttp2.onreadystatechange = function () {
            //         if (this.readyState == 4 && this.status == 200) {
            //             var dados = JSON.parse(this.responseText);
            //             //setterminalWidgets(terminalWidgets, element, dados, booleanFirstElement);
            //             //setterminalChart(element, dados);
            //             booleanFirstElement = false;
            //         }
            //     };

            //     var url = `http://localhost:3000/countDocumentsFromTerminals/${element.id_terminal}`;
            //     xhttp2.open("GET", url, true);
            //     xhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            //     xhttp2.send();

            // });

        }
    };

    var url = `http://${IP_DO_SERVIDOR}:3000/terminal`;
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

}

function DAOregisterTerminal() {

    var xhttp = new XMLHttpRequest();

    var descricao = document.getElementById('descricao').value;
    var ip = document.getElementById('ip').value;
    var patio = document.getElementById('patio').value;
    var funcao = document.getElementById('funcao').value;
    var ip_cancela = document.getElementById('ip_cancela').value;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            console.log(response);
            createTerminalToTerminalTable(terminalTableBody, response);
            cleanRegisterTerminalForm();
            $('#registerTerminalModal').modal('hide');
        }
    };

    var url = `http://${IP_DO_SERVIDOR}:3000/terminal`;
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`descricao=${descricao}&ip=${ip}&patio=${patio}&funcao=${funcao}&ip_cancela=${ip_cancela}`);

}

function DAOupdateTerminal() {

    var xhttp = new XMLHttpRequest();

    var id = document.getElementById('id_terminalUpd').value;
    var descricao = document.getElementById('descricaoUpd').value;
    var ip = document.getElementById('ipUpd').value;
    var patio = document.getElementById('patioUpd').value;
    var funcao = document.getElementById('funcaoUpd').value;
    var ip_cancela = document.getElementById('ip_cancelaUpd').value;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            DAOgetAllTerminals();
            cleanUpdateTerminalForm();
            $('#updateTerminalModal').modal('hide');
        }
    };

    var url = `http://${IP_DO_SERVIDOR}:3000/terminal/${id}`;
    xhttp.open("PUT", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`id_terminal=${id}&descricao=${descricao}&ip=${ip}&patio=${patio}&funcao=${funcao}&ip_cancela=${ip_cancela}`);

}

function DAOdeleteTerminal() {

    var xhttp = new XMLHttpRequest();

    var id = document.getElementById('id_terminalDel').value;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            DAOgetAllTerminals();
            $('#deleteTerminalModal').modal('hide');
        }
    };

    var url = `http://${IP_DO_SERVIDOR}:3000/terminal/${id}`;
    xhttp.open("DELETE", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

}

function preRegisterTerminal() {
    cleanRegisterTerminalForm();
}

function preUpdateTerminal(id) {

    cleanUpdateTerminalForm();
    var data = id.getAttribute("dataID");
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            document.getElementById('id_terminalUpd').value = response.id_terminal;
            document.getElementById('descricaoUpd').value = response.descricao;
            document.getElementById('ipUpd').value = response.ip;
            document.getElementById('patioUpd').value = response.patio;
            document.getElementById('funcaoUpd').value = response.funcao;
            document.getElementById('ip_cancelaUpd').value = response.ip_cancela;
            $('#updateTerminalModal').modal('show');
        }
    };

    var url = `http://${IP_DO_SERVIDOR}:3000/terminal/${data}`;
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

}

function preDeleteTerminal(id) {

    cleanUpdateTerminalForm();
    var data = id.getAttribute("dataID");
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            document.getElementById('nomeDel').innerHTML = response.descricao;
            document.getElementById('id_terminalDel').value = response.id_terminal;
            $('#deleteTerminalModal').modal('show');
        }
    };

    var url = `http://${IP_DO_SERVIDOR}:3000/terminal/${data}`;
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

}

function fillTerminalTable(table, data) {

    table.innerHTML = "";

    data.forEach(function (terminal) {
        createTerminalToTerminalTable(table, terminal);
    });

}

//Insere Usuário na Lista de Usuários
function createTerminalToTerminalTable(table, terminal) {

    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");
    var td7 = document.createElement("td");

    td1.innerHTML = terminal.id_terminal;
    td2.innerHTML = terminal.descricao;
    td3.innerHTML = terminal.ip;
    td4.innerHTML = terminal.patio;
    td5.innerHTML = terminal.funcao;
    td6.innerHTML = terminal.ip_cancela;
    td7.innerHTML = `<button class="btn btn-rounded btn-warning" dataID="${terminal.id_terminal}" 
                        data-toggle="modal" data-target="#updateTerminalModal"
                        data-backdrop="static" onclick="preUpdateTerminal(this)">
                        Editar</button>
                     <button class="btn btn-rounded btn-danger" dataID="${terminal.id_terminal}"
                        data-toggle="modal" data-target="#deleteTerminalModal"
                        data-backdrop="static" onclick="preDeleteTerminal(this)">
                        Excluir</button>`;

    td1.setAttribute("data-title", "ID");
    td2.setAttribute("data-title", "Descrição");
    td3.setAttribute("data-title", "IP");
    td4.setAttribute("data-title", "Pátio");
    td5.setAttribute("data-title", "Função");
    td6.setAttribute("data-title", "IP da Cancela");
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

function cleanRegisterTerminalForm() {
    document.getElementById('descricao').value = "";
    document.getElementById('ip').value = "";
    document.getElementById('patio').value = "";
    document.getElementById('funcao').value = "";
    document.getElementById('ip_cancela').value = "";
}

function cleanUpdateTerminalForm() {
    document.getElementById('descricaoUpd').value = "";
    document.getElementById('ipUpd').value = "";
    document.getElementById('patioUpd').value = "";
    document.getElementById('funcaoUpd').value = "";
    document.getElementById('ip_cancelaUpd').value = "";
}
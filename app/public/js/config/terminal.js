var terminalWidgets = $('#terminalWidgets').val();

$("#btnPreRegisterTerminal").click(function () {
    preRegisterTerminal();
});

$("#btnDAODeleteTerminal").click(function () {
    DAOdeleteTerminal();
});

$("#btnDAOUpdateTerminal").click(function () {
    DAOupdateTerminal();
});

$("#btnDAORegisterTerminal").click(function () {
    DAOregisterTerminal();
});

function DAOgetAllTerminals(terminalWidgets) {

    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/terminal`);
    fillTerminalTable(terminalTableBody, response);

}

function DAOregisterTerminal() {

    var xhttp = new XMLHttpRequest();

    var descricao = $('#descricao').val();
    var ip = $('#ip').val();
    var patio = $('#patio').val();
    var funcao = $('#funcao').val();
    var ip_cancela = $('#ip_cancela').val();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
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

    var id = $('#id_terminalUpd').val();
    var descricao = $('#descricaoUpd').val();
    var ip = $('#ipUpd').val();
    var patio = $('#patioUpd').val();
    var funcao = $('#funcaoUpd').val();
    var ip_cancela = $('#ip_cancelaUpd').val();

    var url = `http://${IP_DO_SERVIDOR}:3000/terminal/${id}`;
    var data = `id_terminal=${id}&descricao=${descricao}&ip=${ip}&patio=${patio}&funcao=${funcao}&ip_cancela=${ip_cancela}`;

    httpPut(url, data);

    DAOgetAllTerminals();
    cleanUpdateTerminalForm();
    $('#updateTerminalModal').modal('hide');

}

function DAOdeleteTerminal() {

    var id = $('#id_terminalDel').val();
    httpDelete(`http://${IP_DO_SERVIDOR}:3000/terminal/${id}`);
    DAOgetAllTerminals();
    $('#deleteTerminalModal').modal('hide');

}

function preRegisterTerminal() {
    cleanRegisterTerminalForm();
}

function preUpdateTerminal(id) {

    cleanUpdateTerminalForm();

    var data = id.getAttribute("dataID");
    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/terminal/${data}`);

    $('#id_terminalUpd').val(response.id_terminal);
    $('#descricaoUpd').val(response.descricao);
    $('#ipUpd').val(response.ip);
    $('#patioUpd').val(response.patio);
    $('#funcaoUpd').val(response.funcao);
    $('#ip_cancelaUpd').val(response.ip_cancela);
    $('#updateTerminalModal').modal('show');

}

function preDeleteTerminal(id) {

    cleanUpdateTerminalForm();

    var data = id.getAttribute("dataID");
    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/terminal/${data}`);

    $('#nomeDel').html(response.descricao);
    $('#id_terminalDel').val(response.id_terminal);
    $('#deleteTerminalModal').modal('show');

}

function fillTerminalTable(table, data) {

    table.innerHTML = "";

    data.forEach(function (terminal) {
        createTerminalToTerminalTable(table, terminal);
    });

}

//Insere Usuário na Lista de Usuários
function createTerminalToTerminalTable(table, terminal) {

    var courtyard = httpGet(`http://${IP_DO_SERVIDOR}:3000/courtyard/${terminal.patio}`);

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
    td4.innerHTML = courtyard.nome;
    td4.value = terminal.patio;
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
    $('#descricao').val("");
    $('#ip').val("");
    $('#patio').val("");
    $('#funcao').val("");
    $('#ip_cancela').val("");
}

function cleanUpdateTerminalForm() {
    $('#descricaoUpd').val("");
    $('#ipUpd').val("");
    $('#patioUpd').val("");
    $('#funcaoUpd').val("");
    $('#ip_cancelaUpd').val("");
}
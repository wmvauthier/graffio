var documentTableBody = document.getElementById("documentTableBody");

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

function DAOgetAllDocuments() {

    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/document`);
    console.log(response);
    fillDocumentTable(documentTableBody, response);

}

function fillDocumentTable(table, data) {

    table.innerHTML = "";

    data.forEach(function (affiliate) {
        createDocumentToDocumentTable(table, affiliate);
    });


}

//Insere Usuário na Lista de Usuários
function createDocumentToDocumentTable(table, doc) {

    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");
    var td7 = document.createElement("td");
    var td8 = document.createElement("td");
    var td9 = document.createElement("td");

    // <th>ID</th>
    // <th>Tipo</th>
    // <th>Identificador</th>
    // <th>Entrada</th>
    // <th>Terminal</th>
    // <th>Saída</th>
    // <th>Terminal</th>
    // <th>Pátio</th>
    // <th>Status</th>

    td1.innerHTML = doc.id_document;
    td2.innerHTML = doc.document_type;
    td3.innerHTML = checkIdentifier(doc);
    td4.innerHTML = doc.data_entrada;
    td5.innerHTML = doc.terminal_entrada;
    td6.innerHTML = doc.data_saida;
    td7.innerHTML = doc.terminal_saida;
    td8.innerHTML = doc.patio;
    td9.innerHTML = checkStatus(doc.docStatus);

    td1.setAttribute("data-title", "ID");
    td2.setAttribute("data-title", "Nome");
    td3.setAttribute("data-title", "Identificador");
    td4.setAttribute("data-title", "Entrada");
    td5.setAttribute("data-title", "Terminal");
    td6.setAttribute("data-title", "Saída");
    td7.setAttribute("data-title", "Terminal");
    td8.setAttribute("data-title", "Pátio");
    td9.setAttribute("data-title", "Status");

    td8.style = "text-align: center";
    td9.style = "text-align: center";

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    tr.appendChild(td8);
    tr.appendChild(td9);

    table.appendChild(tr);

}

function checkStatus(status) {
    if (status == "true") {
        return `<span class="badge-dot badge-success mr-1"></span>`;
    } else if (status == "false") {
        return `<span class="badge-dot badge-danger mr-1"></span>`;
    }
}

function checkIdentifier(doc) {
    if (doc.document_type == "HOR") {
        return doc.ticket;
    } else if (doc.document_type == "MEN") {
        return doc.cartao;
    } else if (doc.document_type == "AFF") {
        return doc.nfce;
    } else if (doc.document_type == "AUT") {
        return doc.cartao;
    }
}

document.getElementById("btnResetForm").addEventListener("click", function () {
    document.getElementById("updateDataClientForm").reset();
});

document.getElementById("btnDAOUpdateDataClient").addEventListener("click", function () {
    DAOupdateDataClient();
});

function DAOgetDataClient() {

    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/configParking`);

    document.getElementById("nome_fantasia").value = response.nome_fantasia;
    document.getElementById("razao_social").value = response.razao_social;
    document.getElementById("endereco").value = response.endereco;
    document.getElementById("cnpj").value = response.cnpj;
    document.getElementById("inscricao_municipal").value = response.inscricao_municipal;
    document.getElementById("telefone").value = response.telefone;
    document.getElementById("website").value = response.website;
    document.getElementById("email").value = response.email;

}

function DAOupdateDataClient() {

    var xhttp = new XMLHttpRequest();

    var id = '1';
    var nome_fantasia = document.getElementById("nome_fantasia").value;
    var razao_social = document.getElementById("razao_social").value;
    var endereco = document.getElementById("endereco").value;
    var cnpj = document.getElementById("cnpj").value;
    var inscricao_municipal = document.getElementById("inscricao_municipal").value;
    var telefone = document.getElementById("telefone").value;
    var website = document.getElementById("website").value;
    var email = document.getElementById("email").value;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("updateDataClientForm").reset();
            DAOgetDataClient();
        }
    };

    var url = `http://${IP_DO_SERVIDOR}:3000/configParking/${id}`;
    xhttp.open("PUT", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`id_parking=${id}
                &nome_fantasia=${nome_fantasia}
                &razao_social=${razao_social}
                &endereco=${endereco}
                &cnpj=${cnpj}
                &inscricao_municipal=${inscricao_municipal}
                &telefone=${telefone}
                &website=${website}
                &email=${email}`);

}
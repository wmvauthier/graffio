function DAOgetAllCourtyards(courtyardWidgets) {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var response = JSON.parse(this.responseText);
            var booleanFirstElement = true;

            response.forEach(element => {

                var xhttp2 = new XMLHttpRequest();

                xhttp2.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var dados = JSON.parse(this.responseText);
                        setCourtyardWidgets(courtyardWidgets, element, dados, booleanFirstElement);
                        setCourtyardChart(element, dados);
                        booleanFirstElement = false;
                    }
                };

                var url = `http://${IP_DO_SERVIDOR}:3000/countDocumentsFromCourtyards/${element.id_patio}`;
                xhttp2.open("GET", url, true);
                xhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp2.send();

            });

        }
    };

    var url = `http://${IP_DO_SERVIDOR}:3000/courtyard`;
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

}
function DAOgetAllCourtyards(courtyardWidgets) {

    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/courtyard`);

    response.forEach(element => {
        var dados = httpGet(`http://${IP_DO_SERVIDOR}:3000/countDocumentsFromCourtyards/${element.id_patio}`);
        setCourtyardWidgets(courtyardWidgets, element, dados);
        setCourtyardChart(element, dados);
    });

}
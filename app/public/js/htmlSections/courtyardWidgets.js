function setCourtyardWidgets(courtyardWidgets, dados) {

    var div = document.createElement("div");

    div.innerHTML = `                
    <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

            <div class="row">

                <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-inline-block">
                                <h5 class="text-muted">Pátios</h5>
                                <h2 class="mb-0">${dados.totalPatios}</h2>
                            </div>
                            <div class="float-right icon-circle-medium  icon-box-lg  bg-primary-light mt-1">
                                <i class="fa fa-hashtag fa-fw fa-sm text-primary"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-inline-block">
                                <h5 class="text-muted">Ocupação Atual</h5>
                                <h2 class="mb-0">${((dados.totalOnCourtyard * 100) / dados.totalVagas).toFixed(0) + "%"}</h2>
                            </div>
                            <div class="float-right icon-circle-medium  icon-box-lg  bg-brand-light mt-1">
                                <i class="fa fa-percent fa-fw fa-sm text-brand"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-inline-block">
                                <h5 class="text-muted">Veículos no Pátio</h5>
                                <h2 class="mb-0">${dados.totalOnCourtyard}</h2>
                            </div>
                            <div
                                class="float-right icon-circle-medium  icon-box-lg  bg-secondary-light mt-1">
                                <i class="fa fa-car fa-fw fa-sm text-secondary"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-inline-block">
                                <h5 class="text-muted">Vagas Disponíveis</h5>
                                <h2 class="mb-0">${dados.totalOutCourtyard}</h2>
                            </div>
                            <div class="float-right icon-circle-medium  icon-box-lg  bg-info-light mt-1">
                                <i class="fa fa-eye fa-fw fa-sm text-info"></i>
                            </div>
                        </div>
                    </div>
                </div>

        </div>
    </div>
    `;

    courtyardWidgets.appendChild(div);

}

function setCourtyardChart(courtyard, dados) {

    if ($(`#c3chart_Occupation${courtyard.id_patio}`).length) {
        var chart = c3.generate({
            bindto: `#c3chart_Occupation${courtyard.id_patio}`,
            data: {
                columns: [
                    ['Afiliados', dados.Afiliados],
                    ['Mensalistas', dados.Mensalistas],
                    ['Horistas', dados.Horistas],
                    ['Disponível', dados.Disponível],
                    ['Autorizados', dados.Autorizados]
                ],
                type: 'donut',
                onclick: function (d, i) { console.log("onclick", d, i); },
                onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                onmouseout: function (d, i) { console.log("onmouseout", d, i); },

                colors: {
                    Disponível: '#F5F5F5'
                }
            },
            donut: {
                title: "Tipos de Clientes"
            }

        });

    }

}
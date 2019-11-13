function setCourtyardWidgets(courtyardWidgets, courtyard) {

    var token = localStorage.getItem("token");

    var div = document.createElement("div");
    div.innerHTML = `                
    <div class="row">
        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-inline-block">
                                <h5 class="text-muted">Nome</h5>
                                <h2 class="mb-0">${courtyard.nome}</h2>
                            </div>
                            <div class="float-right icon-circle-medium  icon-box-lg  bg-primary-light mt-1">
                                <i class="fa fa-pencil-alt fa-fw fa-sm text-primary"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-inline-block">
                                <h5 class="text-muted">ID</h5>
                                <h2 class="mb-0">${courtyard.id_patio}</h2>
                            </div>
                            <div class="float-right icon-circle-medium  icon-box-lg  bg-primary-light mt-1">
                                <i class="fa fa-hashtag fa-fw fa-sm text-primary"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-inline-block">
                                <h5 class="text-muted">Ocupação Atual</h5>
                                <h2 class="mb-0">${(courtyard.onCourtyard * 100 / courtyard.qtd) + "%"}</h2>
                            </div>
                            <div class="float-right icon-circle-medium  icon-box-lg  bg-brand-light mt-1">
                                <i class="fa fa-percent fa-fw fa-sm text-brand"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-inline-block">
                                <h5 class="text-muted">Veículos no Pátio</h5>
                                <h2 class="mb-0">${courtyard.onCourtyard}</h2>
                            </div>
                            <div
                                class="float-right icon-circle-medium  icon-box-lg  bg-secondary-light mt-1">
                                <i class="fa fa-car fa-fw fa-sm text-secondary"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-inline-block">
                                <h5 class="text-muted">Vagas Disponíveis</h5>
                                <h2 class="mb-0">${courtyard.outCourtyard}</h2>
                            </div>
                            <div class="float-right icon-circle-medium  icon-box-lg  bg-info-light mt-1">
                                <i class="fa fa-eye fa-fw fa-sm text-info"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div class="card">
                <h5 class="card-header">Percentual de Ocupação</h5>
                <div class="card-body">
                    <div id="c3chart_Occupation${courtyard.id_patio}"></div>
                </div>
            </div>
        </div>
    </div>
    `;

    courtyardWidgets.appendChild(div);

}

function setCourtyardChart(courtyard, dados){

    if ($(`#c3chart_Occupation${courtyard.id_patio}`).length) {
        var chart = c3.generate({
            bindto: `#c3chart_Occupation${courtyard.id_patio}`,
            data: {
                columns: [

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
        
        setTimeout(function () {
            chart.load({
                columns: [
                    ['Afiliados', dados.Afiliados],
                    ['Mensalistas', dados.Mensalistas],
                    ['Horistas', dados.Horistas],
                    ['Disponível', dados.Disponível],
                    ['Autorizados', dados.Autorizados]
                ]
            });
        }, 1500);

    }

}
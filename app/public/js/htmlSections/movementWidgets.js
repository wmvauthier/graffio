function setMovementWidgets(movementWidgets, dados) {

    var div = document.createElement("div");

    div.innerHTML = `                
    <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

            <div class="row">

                <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-inline-block">
                                <h5 class="text-muted">Veículos no Pátio</h5>
                                <h2 class="mb-0">${dados.documentsOnCourtyard}</h2>
                            </div>
                            <div class="float-right icon-circle-medium  icon-box-lg  bg-primary-light mt-1">
                                <i class="fa fa-car fa-fw fa-sm text-primary"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-inline-block">
                                <h5 class="text-muted">Hoje</h5>
                                <h2 class="mb-0">${(dados.documentsDay)}</h2>
                            </div>
                            <div class="float-right icon-circle-medium  icon-box-lg  bg-brand-light mt-1">
                                <i class="fa fa-calendar-alt fa-fw fa-sm text-brand"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-inline-block">
                                <h5 class="text-muted">Últimos 07 Dias</h5>
                                <h2 class="mb-0">${dados.documentsWeek}</h2>
                            </div>
                            <div
                                class="float-right icon-circle-medium  icon-box-lg  bg-secondary-light mt-1">
                                <i class="fa fa-calendar-alt fa-fw fa-sm text-secondary"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-inline-block">
                                <h5 class="text-muted">Mês Atual</h5>
                                <h2 class="mb-0">${dados.documentsMonth}</h2>
                            </div>
                            <div class="float-right icon-circle-medium  icon-box-lg  bg-info-light mt-1">
                                <i class="fa fa-calendar-alt fa-fw fa-sm text-info"></i>
                            </div>
                        </div>
                    </div>
                </div>

        </div>
    </div>
    `;

    movementWidgets.appendChild(div);

}

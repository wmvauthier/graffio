function setMovementWidgets(values, qtd, hours, averagePermTime) {

    var div = document.createElement("div");

    //var time = getActualTime();
    var time = "12/12/2019 02:37:28";
    var actHour = getHour(time);

    div.innerHTML = `

        <div class="row">

        <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
            <div class="card border-3 border-top border-top-primary">
                <div class="card-body">
                    <h5 class="text-muted">Horário de Pico do Dia</h5>
                    <div class="metric-value d-inline-block">
                        <h1 class="mb-1">${getRushHour(qtd, hours)}</h1>
                    </div>
                    ` + //<div class="metric-label d-inline-block float-right text-success font-weight-bold">
        //<span class="icon-circle-small icon-box-xs text-success bg-success-light"><i
        //        class="fa fa-fw fa-arrow-up"></i></span><span class="ml-1">5.86%</span>
        //</div>
        `</div>
            </div>
        </div>

        <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
            <div class="card border-3 border-top border-top-primary">
                <div class="card-body">
                    <h5 class="text-muted">Permanência Média</h5>
                    <div class="metric-value d-inline-block">
                        <h1 class="mb-1">${averagePermTime}min</h1>
                    </div>
                    ` + //<div class="metric-label d-inline-block float-right text-success font-weight-bold">
        //<span class="icon-circle-small icon-box-xs text-success bg-success-light"><i
        //        class="fa fa-fw fa-arrow-up"></i></span><span class="ml-1">5.86%</span>
        //</div>
        `</div>
            </div>
        </div>

        <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
            <div class="card border-3 border-top border-top-primary">
                <div class="card-body">
                    <h5 class="text-muted">Entradas por Hora</h5>
                    <div class="metric-value d-inline-block">
                        <h1 class="mb-1">${averageHourEntrance(qtd)}</h1>
                    </div>
                    ` + //<div class="metric-label d-inline-block float-right text-success font-weight-bold">
        //<span class="icon-circle-small icon-box-xs text-success bg-success-light"><i
        //        class="fa fa-fw fa-arrow-up"></i></span><span class="ml-1">5.86%</span>
        //</div>
        `</div>
            </div>
        </div>

        <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
            <div class="card border-3 border-top border-top-primary">
                <div class="card-body">
                    <h5 class="text-muted">Total de Entradas do Dia</h5>
                    <div class="metric-value d-inline-block">
                        <h1 class="mb-1">${getTotalEntrances(qtd)}</h1>
                    </div>
                    ` + //<div class="metric-label d-inline-block float-right text-success font-weight-bold">
        //<span class="icon-circle-small icon-box-xs text-success bg-success-light"><i
        //        class="fa fa-fw fa-arrow-up"></i></span><span class="ml-1">5.86%</span>
        //</div>
        `</div>
            </div>
        </div>

    </div>

    <div class="row">

    <div class="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12">
        <div class="card">
            <h5 class="card-header">Entradas das Últimas Horas</h5>
            <div class="card-body p-0">
                <ul class="traffic-sales list-group list-group-flush">
                    <li class="traffic-sales-content list-group-item"><span
                        class="traffic-sales-name">${fillWidget(values, actHour, 1, 'hour')}<span
                            class="traffic-sales-amount ">${fillWidget(values, actHour, 1, 'entrances')}<span
                                class="icon-circle-small icon-box-xs text-${fillWidget(values, actHour, 1, 'colorInsideIcon')} ml-4 bg-${fillWidget(values, actHour, 1, 'colorIcon')}"><i
                                    class="fa fa-fw fa-${fillWidget(values, actHour, 1, 'icon')}"></i></span><span
                                class="ml-1 text-${fillWidget(values, actHour, 1, 'textColor')}">${fillWidget(values, actHour, 1, 'percentage')}</span></span>
                        </span>
                    </li>
                    <li class="traffic-sales-content list-group-item"><span
                            class="traffic-sales-name">${fillWidget(values, actHour, 2, 'hour')}<span
                                class="traffic-sales-amount ">${fillWidget(values, actHour, 2, 'entrances')}<span
                                    class="icon-circle-small icon-box-xs text-${fillWidget(values, actHour, 2, 'colorInsideIcon')} ml-4 bg-${fillWidget(values, actHour, 2, 'colorIcon')}"><i
                                        class="fa fa-fw fa-${fillWidget(values, actHour, 2, 'icon')}"></i></span><span
                                    class="ml-1 text-${fillWidget(values, actHour, 2, 'textColor')}">${fillWidget(values, actHour, 2, 'percentage')}</span></span>
                        </span>
                    </li>
                    <li class="traffic-sales-content list-group-item"><span
                            class="traffic-sales-name">${fillWidget(values, actHour, 3, 'hour')}<span
                                class="traffic-sales-amount ">${fillWidget(values, actHour, 3, 'entrances')}<span
                                    class="icon-circle-small icon-box-xs text-${fillWidget(values, actHour, 3, 'colorInsideIcon')} ml-4 bg-${fillWidget(values, actHour, 3, 'colorIcon')}"><i
                                        class="fa fa-fw fa-${fillWidget(values, actHour, 3, 'icon')}"></i></span><span
                                    class="ml-1 text-${fillWidget(values, actHour, 4, 'textColor')}">${fillWidget(values, actHour, 3, 'percentage')}</span></span>
                        </span>
                    </li>
                    <li class="traffic-sales-content list-group-item"><span
                            class="traffic-sales-name">${fillWidget(values, actHour, 4, 'hour')}<span
                                class="traffic-sales-amount ">${fillWidget(values, actHour, 4, 'entrances')}<span
                                    class="icon-circle-small icon-box-xs text-${fillWidget(values, actHour, 4, 'colorInsideIcon')} ml-4 bg-${fillWidget(values, actHour, 4, 'colorIcon')}"><i
                                        class="fa fa-fw fa-${fillWidget(values, actHour, 4, 'icon')}"></i></span><span
                                    class="ml-1 text-${fillWidget(values, actHour, 4, 'textColor')}">${fillWidget(values, actHour, 4, 'percentage')}</span></span>
                        </span>
                    </li>
                    <li class="traffic-sales-content list-group-item"><span
                            class="traffic-sales-name">${fillWidget(values, actHour, 5, 'hour')}<span
                                class="traffic-sales-amount ">${fillWidget(values, actHour, 5, 'entrances')}<span
                                    class="icon-circle-small icon-box-xs text-${fillWidget(values, actHour, 5, 'colorInsideIcon')} ml-4 bg-${fillWidget(values, actHour, 5, 'colorIcon')}"><i
                                        class="fa fa-fw fa-${fillWidget(values, actHour, 5, 'icon')}"></i></span><span
                                    class="ml-1 text-${fillWidget(values, actHour, 5, 'textColor')}">${fillWidget(values, actHour, 5, 'percentage')}</span></span>
                        </span>
                    </li>
                    <li class="traffic-sales-content list-group-item"><span
                            class="traffic-sales-name">${fillWidget(values, actHour, 6, 'hour')}<span
                                class="traffic-sales-amount ">${fillWidget(values, actHour, 6, 'entrances')}<span
                                    class="icon-circle-small icon-box-xs text-${fillWidget(values, actHour, 6, 'colorInsideIcon')} ml-4 bg-${fillWidget(values, actHour, 6, 'colorIcon')}"><i
                                        class="fa fa-fw fa-${fillWidget(values, actHour, 6, 'icon')}"></i></span><span
                                    class="ml-1 text-${fillWidget(values, actHour, 6, 'textColor')}">${fillWidget(values, actHour, 6, 'percentage')}</span></span>
                        </span>
                    </li>
                    <li class="traffic-sales-content list-group-item "><span
                            class="traffic-sales-name">${fillWidget(values, actHour, 7, 'hour')}<span
                                class="traffic-sales-amount">${fillWidget(values, actHour, 7, 'entrances')}<span
                                    class="icon-circle-small icon-box-xs text-${fillWidget(values, actHour, 7, 'colorInsideIcon')} ml-4 bg-${fillWidget(values, actHour, 7, 'colorIcon')}"><i
                                        class="fa fa-fw fa-${fillWidget(values, actHour, 7, 'icon')}"></i></span><span
                                    class="ml-1 text-${fillWidget(values, actHour, 7, 'textColor')}">${fillWidget(values, actHour, 7, 'percentage')}</span></span>
                        </span>
                    </li>
                </ul>
            </div>`+
        //<div class="card-footer text-center">
        //    <a href="#" class="btn-primary-link">View Details</a>
        //</div>
        `</div>
    </div>

    <div class="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
        <div class="card">
            <h5 class="card-header">Entradas durante o Dia</h5>
            <div class="card-body">
                <div id="morris_totalrevenue"></div>
            </div>`+
        //<div class="card-footer">
        //    <p class="display-7 font-weight-bold"><span
        //            class="text-primary d-inline-block">$26,000</span><span
        //            class="text-success float-right">+9.45%</span></p>
        //</div>
        `</div>
    </div>

</div>
`;

    movementWidgets.appendChild(div);

}

function setMovementChart(hour, value) {

    Morris.Area({
        element: 'morris_totalrevenue',
        behaveLikeLine: true,
        data: [
            { x: hour[0], y: value[0], },
            { x: hour[1], y: value[1], },
            { x: hour[2], y: value[2], },
            { x: hour[3], y: value[3], },
            { x: hour[4], y: value[4], },
            { x: hour[5], y: value[5], },
            { x: hour[6], y: value[6], },
            { x: hour[7], y: value[7], },
            { x: hour[8], y: value[8], },
            { x: hour[9], y: value[9], },
            { x: hour[10], y: value[10], },
            { x: hour[11], y: value[11], },
            { x: hour[12], y: value[12], },
            { x: hour[13], y: value[13], },
            { x: hour[14], y: value[14], },
            { x: hour[15], y: value[15], },
            { x: hour[16], y: value[16], },
            { x: hour[17], y: value[17], },
            { x: hour[18], y: value[18], },
            { x: hour[19], y: value[19], },
            { x: hour[20], y: value[20], },
            { x: hour[21], y: value[21], },
            { x: hour[22], y: value[22], },
            { x: hour[23], y: value[23], }
        ],
        xkey: 'x',
        ykeys: ['y'],
        labels: [' Entradas'],
        lineColors: ['#5969ff'],
        resize: true

    });

}

function objectSum(obj) {
    var sum = 0;
    for (var el in obj) {
        if (obj.hasOwnProperty(el)) {
            sum += parseFloat(obj[el]);
        }
    }
    return sum;
}

function fillWidget(values, actHour, qtd, property) {
    
    if ((actHour - qtd) < 0) {
        return "";
    }

    if (property == 'hour') {
        return values[actHour - qtd].hour;
    } else if (property == 'entrances') {
        return values[actHour - qtd].entrances;
    } else if (property == 'colorInsideIcon') {
        return values[actHour - qtd].colorInsideIcon;
    } else if (property == 'colorIcon') {
        return values[actHour - qtd].colorIcon;
    } else if (property == 'icon') {
        return values[actHour - qtd].icon;
    } else if (property == 'textColor') {
        return values[actHour - qtd].textColor;
    } else if (property == 'percentage') {
        return values[actHour - qtd].percentage + "%";
    }

}

function getRushHour(values, res) {

    var index = 0;
    var sum = 0

    for (var i = 0; i < values.length; i++) {
        if (values[i] > sum) {
            sum = values[i];
            index = i;
        }
    }
    return res[index];

}

function averageHourEntrance(values) {

    var sum = 0;
    values.forEach(element => {
        sum += parseFloat(element);
    });
    return (sum / 24).toFixed(2);

}

function getTotalEntrances(values) {
    var sum = 0;
    values.forEach(element => {
        sum += parseFloat(element);
    });
    return sum;
}

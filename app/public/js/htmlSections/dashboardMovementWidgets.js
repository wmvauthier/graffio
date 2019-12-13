function setMovementWidgets(hour, val, perc) {

    var div = document.createElement("div");

    div.innerHTML = `
    <div class="row">

    <div class="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12">
        <div class="card">
            <h5 class="card-header">Entradas das Últimas Horas</h5>
            <div class="card-body p-0">
                <ul class="traffic-sales list-group list-group-flush">
                    <li class="traffic-sales-content list-group-item "><span
                            class="traffic-sales-name">${hour[1]}</span><span
                            class="traffic-sales-amount">${val[1]}<span
                                class="icon-circle-small icon-box-xs text-success ml-4 bg-success-light"><i
                                    class="fa fa-fw fa-arrow-up"></i></span><span
                                class="ml-1 text-success">${perc[1].value}%</span></span>
                    </li>
                    <li class="traffic-sales-content list-group-item"><span
                            class="traffic-sales-name">${hour[2]}<span
                                class="traffic-sales-amount">${val[2]}<span
                                    class="icon-circle-small icon-box-xs text-success ml-4 bg-success-light"><i
                                        class="fa fa-fw fa-arrow-up"></i></span><span
                                    class="ml-1 text-success">${perc[2].value}%</span></span>
                        </span>
                    </li>
                    <li class="traffic-sales-content list-group-item"><span
                            class="traffic-sales-name">${hour[3]}<span
                                class="traffic-sales-amount ">${val[3]}<span
                                    class="icon-circle-small icon-box-xs text-success ml-4 bg-success-light"><i
                                        class="fa fa-fw fa-arrow-up"></i></span><span
                                    class="ml-1 text-success">${perc[3].value}%</span></span>
                        </span>
                    </li>
                    <li class="traffic-sales-content list-group-item"><span
                            class="traffic-sales-name">${hour[4]}<span
                                class="traffic-sales-amount ">${val[4]}<span
                                    class="icon-circle-small icon-box-xs text-danger ml-4 bg-danger-light"><i
                                        class="fa fa-fw fa-arrow-down"></i></span><span
                                    class="ml-1 text-danger">${perc[4].value}%</span></span>
                        </span>
                    </li>
                    <li class="traffic-sales-content list-group-item"><span
                            class="traffic-sales-name">${hour[5]}<span
                                class="traffic-sales-amount ">${val[5]}<span
                                    class="icon-circle-small icon-box-xs text-danger ml-4 bg-danger-light"><i
                                        class="fa fa-fw fa-arrow-down"></i></span><span
                                    class="ml-1 text-danger">${perc[5].value}%</span></span>
                        </span>
                    </li>
                    <li class="traffic-sales-content list-group-item"><span
                            class="traffic-sales-name">${hour[6]}<span
                                class="traffic-sales-amount ">${val[6]}<span
                                    class="icon-circle-small icon-box-xs text-danger ml-4 bg-danger-light"><i
                                        class="fa fa-fw fa-arrow-down"></i></span><span
                                    class="ml-1 text-danger">${perc[6].value}%</span></span>
                        </span>
                    </li>
                    <li class="traffic-sales-content list-group-item "><span
                            class="traffic-sales-name">${hour[7]}<span
                                class="traffic-sales-amount">${val[7]}<span
                                    class="icon-circle-small icon-box-xs text-white ml-4 bg-black"><i
                                        class="fa fa-fw fa-arrow-down"></i></span><span
                                    class="ml-1 text-danger">${perc[7].value}%</span></span>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="card-footer text-center">
                <a href="#" class="btn-primary-link">View Details</a>
            </div>
        </div>
    </div>

    <div class="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
        <div class="card">
            <h5 class="card-header">Entradas durante o Dia</h5>
            <div class="card-body">
                <div id="morris_totalrevenue"></div>
            </div>
            <div class="card-footer">
                <p class="display-7 font-weight-bold"><span
                        class="text-primary d-inline-block">$26,000</span><span
                        class="text-success float-right">+9.45%</span></p>
            </div>
        </div>
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
function DAOgetAllMovement(movementWidgets) {

    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/document`);
    console.log(response);
    //var getValor

    //var time = getActualTime();
    var time = "12/12/2019 17:37:28";
    var actHour = getHour(time);

    var last7Hours = [actHour, actHour - 1, actHour - 2, actHour - 3, actHour - 4, actHour - 5, actHour - 6, actHour - 7, actHour - 8];
    var last7HoursValues = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var entrancesPerDay = ["00 AM", "01 AM", "02 AM", "03 AM", "04 AM", "05 AM", "06 AM", "07 AM", "08 AM", "09 AM", "10 AM", "11 AM",
        "12 PM", "13 PM", "14 PM", "15 PM", "16 PM", "17 PM", "18 PM", "19 PM", "20 PM", "21 PM", "22 PM", "23 PM"]
    var entrancesPerDayValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var percentageValues = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    response.forEach(element => {
        if (element.data_entrada) {

            if (checkYear(time, element.data_entrada)) {
                if (checkMonth(time, element.data_entrada)) {
                    if (checkWeek(time, element.data_entrada)) {
                        if (checkDay(time, element.data_entrada)) {

                            var dif = getHour(time) - getHour(element.data_entrada);
                            var h = getHour(element.data_entrada);

                            if (dif < 9) {
                                last7HoursValues[dif]++;
                            }

                            if ((h > -1) && (h < 24)) {
                                entrancesPerDayValues[h]++;
                            }

                        }
                    }
                }
            }
        }
    });

    console.log(last7HoursValues);

    //Calcular Percentagens para Exibicao
    for (var i = 1; i < percentageValues.length - 1; i++) {
        if ((last7HoursValues[i] == last7HoursValues[i + 1])) {
            percentageValues[i] = {
                "value": (0).toFixed(0),
                "icon": "a",
                "color-icon": "a",
                "color": "a",
                "totalVagas": "a"
            }
        } else if (last7HoursValues[i + 1] == 0) {
            percentageValues[i] = {
                "value": (last7HoursValues[i] * 100).toFixed(0),
                "icon": "a",
                "color-icon": "a",
                "color": "a",
                "totalVagas": "a"
            }
        } else {
            percentageValues[i] = {
                "value": (((last7HoursValues[i] - last7HoursValues[i + 1]) / last7HoursValues[i + 1]) * 100).toFixed(0),
                "icon": "a",
                "color-icon": "a",
                "color": "a",
                "totalVagas": "a"
            }
        }
        console.log("Valor para " + last7Hours[i] + " -> " + last7HoursValues[i] + " & " + last7HoursValues[i + 1] + " = " + percentageValues[i]);
    }

    console.log(percentageValues);

    //Formatar Horas para Exibicao
    for (var i = 0; i < last7Hours.length; i++) {
        if (last7Hours[i] > 11) {
            last7Hours[i] = last7Hours[i].toString() + ":00 PM";
        } else {
            last7Hours[i] = last7Hours[i].toString() + ":00 AM";
        }
    }

    //Formatar Entradas para Exibicao
    for (var i = 0; i < last7HoursValues.length; i++) {
        if (last7HoursValues[i] > 1) {
            last7HoursValues[i] = ("0" + last7HoursValues[i]).slice(-2).toString() + " entradas";
        } else if (last7HoursValues[i] == 1) {
            last7HoursValues[i] = ("0" + last7HoursValues[i]).slice(-2).toString() + " entrada";
        } else if (last7HoursValues[i] == 0) {
            last7HoursValues[i] = "Nenhuma entrada";
        }
    }

    //console.log(last7Hours);
    //console.log(last7HoursValues);
    //console.log(entrancesPerDay);
    //console.log(entrancesPerDayValues);

    //Definir os Widgets e a Dashboard em si

    setMovementWidgets(last7Hours, last7HoursValues, percentageValues);
    setMovementChart(entrancesPerDay, entrancesPerDayValues);

}
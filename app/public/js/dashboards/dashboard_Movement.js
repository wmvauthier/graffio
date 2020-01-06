function DAOgetAllMovement(movementWidgets) {

    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/document`);

    //var time = getActualTime();
    var time = "12/12/2019 18:37:28";

    var entrancesPerDay = ["00 AM", "01 AM", "02 AM", "03 AM", "04 AM", "05 AM", "06 AM", "07 AM", "08 AM", "09 AM", "10 AM", "11 AM",
        "12 PM", "13 PM", "14 PM", "15 PM", "16 PM", "17 PM", "18 PM", "19 PM", "20 PM", "21 PM", "22 PM", "23 PM"];
    var entrancesPerDayValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var percentageValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var averagePermTime = 0;
    var countAveragePermTime = 0;

    response.forEach(element => {
        if (element.data_entrada) {

            if (checkYear(time, element.data_entrada)) {
                if (checkMonth(time, element.data_entrada)) {
                    if (checkWeek(time, element.data_entrada)) {
                        if (checkDay(time, element.data_entrada)) {

                            var h = getHour(element.data_entrada);

                            if ((h > -1) && (h < 24)) {
                                entrancesPerDayValues[h]++;
                            }

                            if (element.data_saida) {

                                var hEnt = getHour(element.data_entrada) * 60;
                                var mEnt = getMinute(element.data_entrada);
                                var hSai = getHour(element.data_saida) * 60;
                                var mSai = getMinute(element.data_saida);

                                averagePermTime = parseFloat(hSai) + parseFloat(mSai) - hEnt - mEnt;
                                countAveragePermTime++;
                            }

                        }
                    }
                }
            }
        }
    });

    averagePermTime = (averagePermTime / countAveragePermTime).toFixed(0);
    //console.log(entrancesPerDayValues);

    //Calcular Percentagens para Exibicao
    for (var i = 0; i < entrancesPerDayValues.length; i++) {

        if ((entrancesPerDayValues[i - 1] == entrancesPerDayValues[i])) {
            percentageValues[i] = {
                "percentage": (0).toFixed(0),
                "hour": entrancesPerDay[i],
                "entrances": formatEntrances(entrancesPerDayValues[i]),
                "icon": "minus",
                "colorIcon": "dark",
                "colorInsideIcon": "white",
                "textColor": "black"
            }
        } else if ((entrancesPerDayValues[i - 1] == 0) && !(entrancesPerDayValues[i] == 0)) {
            percentageValues[i] = {
                "percentage": (entrancesPerDayValues[i] * 100).toFixed(0),
                "hour": entrancesPerDay[i],
                "entrances": formatEntrances(entrancesPerDayValues[i]),
                "icon": "arrow-up",
                "colorIcon": "success-light",
                "colorInsideIcon": "success",
                "textColor": "success"
            }
        } else if ((entrancesPerDayValues[i - 1] == undefined) && (entrancesPerDayValues[i] == 0)) {
            percentageValues[i] = {
                "percentage": (0).toFixed(0),
                "hour": entrancesPerDay[i],
                "entrances": formatEntrances(entrancesPerDayValues[i]),
                "icon": "minus",
                "colorIcon": "dark",
                "colorInsideIcon": "white",
                "textColor": "black"
            }
        } else if ((entrancesPerDayValues[i - 1] == undefined) && !(entrancesPerDayValues[i] == 0)) {
            percentageValues[i] = {
                "percentage": (entrancesPerDayValues[i] * 100).toFixed(0),
                "hour": entrancesPerDay[i],
                "entrances": formatEntrances(entrancesPerDayValues[i]),
                "icon": "arrow-up",
                "colorIcon": "success-light",
                "colorInsideIcon": "success",
                "textColor": "success"
            }
        } else {

            var result = (((entrancesPerDayValues[i] - entrancesPerDayValues[i - 1]) / entrancesPerDayValues[i - 1]) * 100).toFixed(0);

            if (result > 0) {
                percentageValues[i] = {
                    "percentage": result,
                    "hour": entrancesPerDay[i],
                    "entrances": formatEntrances(entrancesPerDayValues[i]),
                    "icon": "arrow-up",
                    "colorIcon": "success-light",
                    "colorInsideIcon": "success",
                    "textColor": "success"
                }
            } else {
                percentageValues[i] = {
                    "percentage": result,
                    "hour": entrancesPerDay[i],
                    "entrances": formatEntrances(entrancesPerDayValues[i]),
                    "icon": "arrow-down",
                    "colorIcon": "danger-light",
                    "colorInsideIcon": "danger",
                    "textColor": "danger"
                }
            }

        }

    }

    //Definir os Widgets e a Dashboard em si

    setMovementWidgets(percentageValues, entrancesPerDayValues, entrancesPerDay, averagePermTime);
    setMovementChart(entrancesPerDay, entrancesPerDayValues);

}

//Formatar Entradas para Exibicao
function formatEntrances(hour) {

    if (hour > 1) {
        return ("0" + hour).slice(-2).toString() + " entradas";
    } else if (hour == 1) {
        return ("0" + hour).slice(-2).toString() + " entrada";
    } else if (hour == 0) {
        return "Nenhuma entrada";
    }

}
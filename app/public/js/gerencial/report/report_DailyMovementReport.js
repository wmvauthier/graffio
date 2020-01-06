function DAOgetDataToReport(choosenTime) {

    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/document`);

    //var time = getActualTime();
    var time = choosenTime + " 23:59:59";

    var entrancesPerDay = ["00 AM", "01 AM", "02 AM", "03 AM", "04 AM", "05 AM", "06 AM", "07 AM", "08 AM", "09 AM", "10 AM", "11 AM",
        "12 PM", "13 PM", "14 PM", "15 PM", "16 PM", "17 PM", "18 PM", "19 PM", "20 PM", "21 PM", "22 PM", "23 PM"];
    var exitsPerDay = ["00 AM", "01 AM", "02 AM", "03 AM", "04 AM", "05 AM", "06 AM", "07 AM", "08 AM", "09 AM", "10 AM", "11 AM",
        "12 PM", "13 PM", "14 PM", "15 PM", "16 PM", "17 PM", "18 PM", "19 PM", "20 PM", "21 PM", "22 PM", "23 PM"];

    var entrancesPerDayValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var exitsPerDayValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    var percentageEntrancesValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var percentageExitsValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    var clientTypes = ['{"type":"AFF","description":"Afiliados"}', '{"type":"AUT","description":"Autorizados"}', '{"type":"MEN","description":"Mensalistas"}', '{"type":"HOR","description":"Horistas"}',];
    var clientTypesEntrances = [0, 0, 0, 0];
    var clientTypesExits = [0, 0, 0, 0];
    var countAveragePermTime = 0;
    var averagePermTime = 0;

    response.forEach(element => {
        if (element.data_entrada) {

            if (checkYear(time, element.data_entrada)) {
                if (checkMonth(time, element.data_entrada)) {
                    if (checkWeek(time, element.data_entrada)) {
                        if (checkDay(time, element.data_entrada)) {

                            var h = getHour(element.data_entrada);

                            if ((h > -1) && (h < 24)) {

                                entrancesPerDayValues[h]++;

                                for (var i = 0; i < clientTypes.length; i++) {
                                    var cliType = (JSON.parse(clientTypes[i]));
                                    if (cliType.type == element.document_type) {
                                        clientTypesEntrances[i]++;
                                    }
                                }

                            }

                            if (element.data_saida) {

                                if ((h > -1) && (h < 24)) {
                                    exitsPerDayValues[h]++;

                                    for (var i = 0; i < clientTypes.length; i++) {
                                        var cliType = (JSON.parse(clientTypes[i]));
                                        if (cliType.type == element.document_type) {
                                            clientTypesExits[i]++;
                                        }
                                    }

                                }

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

    //Tempo Médio de Permanência
    if (countAveragePermTime < 1) {
        averagePermTime = 0;
    } else {
        averagePermTime = (averagePermTime / countAveragePermTime).toFixed(0);
    }

    //Calcular Percentagens de Entradas para Exibição
    for (var i = 0; i < entrancesPerDayValues.length; i++) {

        if ((entrancesPerDayValues[i - 1] == entrancesPerDayValues[i])) {
            percentageEntrancesValues[i] = {
                "percentage": (0).toFixed(0),
                "hour": entrancesPerDay[i],
                "entrances": formatEntrances(entrancesPerDayValues[i]),
                "icon": "minus",
                "colorIcon": "dark",
                "colorInsideIcon": "white",
                "textColor": "black"
            }
        } else if ((entrancesPerDayValues[i - 1] == 0) && !(entrancesPerDayValues[i] == 0)) {
            percentageEntrancesValues[i] = {
                "percentage": (entrancesPerDayValues[i] * 100).toFixed(0),
                "hour": entrancesPerDay[i],
                "entrances": formatEntrances(entrancesPerDayValues[i]),
                "icon": "arrow-up",
                "colorIcon": "success-light",
                "colorInsideIcon": "success",
                "textColor": "success"
            }
        } else if ((entrancesPerDayValues[i - 1] == undefined) && (entrancesPerDayValues[i] == 0)) {
            percentageEntrancesValues[i] = {
                "percentage": (0).toFixed(0),
                "hour": entrancesPerDay[i],
                "entrances": formatEntrances(entrancesPerDayValues[i]),
                "icon": "minus",
                "colorIcon": "dark",
                "colorInsideIcon": "white",
                "textColor": "black"
            }
        } else if ((entrancesPerDayValues[i - 1] == undefined) && !(entrancesPerDayValues[i] == 0)) {
            percentageEntrancesValues[i] = {
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
                percentageEntrancesValues[i] = {
                    "percentage": result,
                    "hour": entrancesPerDay[i],
                    "entrances": formatEntrances(entrancesPerDayValues[i]),
                    "icon": "arrow-up",
                    "colorIcon": "success-light",
                    "colorInsideIcon": "success",
                    "textColor": "success"
                }
            } else {
                percentageEntrancesValues[i] = {
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

    //Calcular Percentagens de Saídas para Exibição
    for (var i = 0; i < exitsPerDayValues.length; i++) {

        if ((exitsPerDayValues[i - 1] == exitsPerDayValues[i])) {
            percentageExitsValues[i] = {
                "percentage": (0).toFixed(0),
                "hour": exitsPerDay[i],
                "exits": formatEntrances(exitsPerDayValues[i]),
                "icon": "minus",
                "colorIcon": "dark",
                "colorInsideIcon": "white",
                "textColor": "black"
            }
        } else if ((exitsPerDayValues[i - 1] == 0) && !(exitsPerDayValues[i] == 0)) {
            percentageExitsValues[i] = {
                "percentage": (exitsPerDayValues[i] * 100).toFixed(0),
                "hour": exitsPerDay[i],
                "exits": formatEntrances(exitsPerDayValues[i]),
                "icon": "arrow-up",
                "colorIcon": "success-light",
                "colorInsideIcon": "success",
                "textColor": "success"
            }
        } else if ((exitsPerDayValues[i - 1] == undefined) && (exitsPerDayValues[i] == 0)) {
            percentageExitsValues[i] = {
                "percentage": (0).toFixed(0),
                "hour": exitsPerDay[i],
                "exits": formatEntrances(exitsPerDayValues[i]),
                "icon": "minus",
                "colorIcon": "dark",
                "colorInsideIcon": "white",
                "textColor": "black"
            }
        } else if ((exitsPerDayValues[i - 1] == undefined) && !(exitsPerDayValues[i] == 0)) {
            percentageExitsValues[i] = {
                "percentage": (exitsPerDayValues[i] * 100).toFixed(0),
                "hour": exitsPerDay[i],
                "exits": formatEntrances(exitsPerDayValues[i]),
                "icon": "arrow-up",
                "colorIcon": "success-light",
                "colorInsideIcon": "success",
                "textColor": "success"
            }
        } else {

            var result = (((exitsPerDayValues[i] - exitsPerDayValues[i - 1]) / exitsPerDayValues[i - 1]) * 100).toFixed(0);

            if (result > 0) {
                percentageExitsValues[i] = {
                    "percentage": result,
                    "hour": exitsPerDay[i],
                    "exits": formatEntrances(exitsPerDayValues[i]),
                    "icon": "arrow-up",
                    "colorIcon": "success-light",
                    "colorInsideIcon": "success",
                    "textColor": "success"
                }
            } else {
                percentageExitsValues[i] = {
                    "percentage": result,
                    "hour": exitsPerDay[i],
                    "exits": formatEntrances(exitsPerDayValues[i]),
                    "icon": "arrow-down",
                    "colorIcon": "danger-light",
                    "colorInsideIcon": "danger",
                    "textColor": "danger"
                }
            }

        }

    }

    var firstReportMovementWidget = [0, 0, 0, 0];
    var secondReportMovementWidget = [0, 0, 0, 0, 0];
    var thirdReportMovementWidget = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // PRIMEIRO WIDGET
    for (var i = 0; i < clientTypes.length; i++) {

        var cliType = JSON.parse(clientTypes[i]);

        firstReportMovementWidget[i] = {
            "description": cliType.description,
            "entrances": clientTypesEntrances[i],
            "percentEntrances": (divAndCheck(clientTypesEntrances[i], countTotal(clientTypesEntrances)) * 100).toFixed(0) + "%",
            "exits": clientTypesExits[i],
            "percentExits": (divAndCheck(clientTypesExits[i], countTotal(clientTypesExits)) * 100).toFixed(0) + "%"
        }

    }

    // SEGUNDO WIDGET
    secondReportMovementWidget[0] = countTotal(entrancesPerDayValues);
    secondReportMovementWidget[1] = entrancesPerDay[returnIndexMax(entrancesPerDayValues)];
    secondReportMovementWidget[2] = entrancesPerDay[returnIndexMax(exitsPerDayValues)];
    secondReportMovementWidget[3] = divAndCheck(countTotal(entrancesPerDayValues), 24).toFixed(2) + " | " + divAndCheck(countTotal(exitsPerDayValues), 24).toFixed(2);
    secondReportMovementWidget[4] = averagePermTime + " min.";

    // TERCEIRO WIDGET
    for (var i = 0; i < thirdReportMovementWidget.length; i++) {

        thirdReportMovementWidget[i] = {
            "descriptionEntrances": percentageEntrancesValues[i].hour,
            "entrances": percentageEntrancesValues[i].entrances,
            "percentEntrances": percentageEntrancesValues[i].percentage,
            "descriptionExits": percentageExitsValues[i].hour,
            "exits": percentageExitsValues[i].exits,
            "percentExits": percentageExitsValues[i].percentage
        }

    }

    console.log(firstReportMovementWidget);
    console.log(secondReportMovementWidget);
    console.log(thirdReportMovementWidget);

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

function returnIndexMax(array) {
    var max = 0;
    var index = 0;

    for (var i = 0; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
            index = i;
        }
    }

    return index;

}

function returnIndexMin(array) {
    var min = 99999;
    var index = 0;

    for (var i = 0; i < array.length; i++) {
        if (array[i] < min) {
            min = array[i];
            index = i;
        }
    }

    return index;

}

function countTotal(array) {
    var sum = 0;
    for (var i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum;
}

function divAndCheck(num1, num2) {
    if (num2 == 0) {
        return 0;
    } else if (num1 == 0) {
        return 0;
    } else {
        return num1 / num2;
    }
}
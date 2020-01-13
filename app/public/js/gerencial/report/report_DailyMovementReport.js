function DAOgetDataToReport(choosenTime) {

    var response = httpGet(`http://${IP_DO_SERVIDOR}:3000/document`);

    var client = httpGet(`http://${IP_DO_SERVIDOR}:3000/configParking`);

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
    var thirdReportMovementWidget = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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
    secondReportMovementWidget[0] = countTotal(entrancesPerDayValues) + " Ent.";
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

    if (firstReportMovementWidget) {

        $("#clientType01").html(firstReportMovementWidget[0].description);
        $("#clientType02").html(firstReportMovementWidget[1].description);
        $("#clientType03").html(firstReportMovementWidget[2].description);
        $("#clientType04").html(firstReportMovementWidget[3].description);
        $("#clientType05").html("Total");

        $("#clientType01OldCourtyard").html("-");
        $("#clientType02OldCourtyard").html("-");
        $("#clientType03OldCourtyard").html("-");
        $("#clientType04OldCourtyard").html("-");
        $("#clientType05OldCourtyard").html("-");

        $("#clientType01Entrances").html(firstReportMovementWidget[0].entrances);
        $("#clientType02Entrances").html(firstReportMovementWidget[1].entrances);
        $("#clientType03Entrances").html(firstReportMovementWidget[2].entrances);
        $("#clientType04Entrances").html(firstReportMovementWidget[3].entrances);
        $("#clientType05Entrances").html(countTotal(entrancesPerDayValues));

        $("#clientType01EntrancesPercent").html(firstReportMovementWidget[0].percentEntrances);
        $("#clientType02EntrancesPercent").html(firstReportMovementWidget[1].percentEntrances);
        $("#clientType03EntrancesPercent").html(firstReportMovementWidget[2].percentEntrances);
        $("#clientType04EntrancesPercent").html(firstReportMovementWidget[3].percentEntrances);
        $("#clientType05EntrancesPercent").html("-");

        $("#clientType01Exits").html(firstReportMovementWidget[0].exits);
        $("#clientType02Exits").html(firstReportMovementWidget[1].exits);
        $("#clientType03Exits").html(firstReportMovementWidget[2].exits);
        $("#clientType04Exits").html(firstReportMovementWidget[3].exits);
        $("#clientType05Exits").html(countTotal(exitsPerDayValues));

        $("#clientType01ExitsPercent").html(firstReportMovementWidget[0].percentExits);
        $("#clientType02ExitsPercent").html(firstReportMovementWidget[1].percentExits);
        $("#clientType03ExitsPercent").html(firstReportMovementWidget[2].percentExits);
        $("#clientType04ExitsPercent").html(firstReportMovementWidget[3].percentExits);
        $("#clientType05ExitsPercent").html("-");

        $("#clientType01CancelCourtyard").html("-");
        $("#clientType02CancelCourtyard").html("-");
        $("#clientType03CancelCourtyard").html("-");
        $("#clientType04CancelCourtyard").html("-");
        $("#clientType05CancelCourtyard").html("-");

        $("#clientType01Lack").html("-");
        $("#clientType02Lack").html("-");
        $("#clientType03Lack").html("-");
        $("#clientType04Lack").html("-");
        $("#clientType05Lack").html("-");

        $("#clientType01LackPercent").html("-");
        $("#clientType02LackPercent").html("-");
        $("#clientType03LackPercent").html("-");
        $("#clientType04LackPercent").html("-");
        $("#clientType05LackPercent").html("-");

        $("#clientType01Courtesy").html("-");
        $("#clientType02Courtesy").html("-");
        $("#clientType03Courtesy").html("-");
        $("#clientType04Courtesy").html("-");
        $("#clientType05Courtesy").html("-");

        $("#clientType01CourtesyPercent").html("-");
        $("#clientType02CourtesyPercent").html("-");
        $("#clientType03CourtesyPercent").html("-");
        $("#clientType04CourtesyPercent").html("-");
        $("#clientType05CourtesyPercent").html("-");

        $("#clientType01Pay").html("-");
        $("#clientType02Pay").html("-");
        $("#clientType03Pay").html("-");
        $("#clientType04Pay").html("-");
        $("#clientType05Pay").html("-");

        $("#clientType01PayPercent").html("-");
        $("#clientType02PayPercent").html("-");
        $("#clientType03PayPercent").html("-");
        $("#clientType04PayPercent").html("-");
        $("#clientType05PayPercent").html("-");

    }

    if (secondReportMovementWidget) {

        $("#secondWidget01").html(secondReportMovementWidget[0]);
        $("#secondWidget02").html(secondReportMovementWidget[1]);
        $("#secondWidget03").html(secondReportMovementWidget[2]);
        $("#secondWidget04").html(secondReportMovementWidget[3]);
        $("#secondWidget05").html(secondReportMovementWidget[4]);

    }

    if (thirdReportMovementWidget) {

        $("#thirdWidget23description").html(thirdReportMovementWidget[23].descriptionEntrances);
        $("#thirdWidget23entrances").html(thirdReportMovementWidget[23].entrances);
        $("#thirdWidget23entrancesPercent").html(thirdReportMovementWidget[23].percentEntrances + "%");
        $("#thirdWidget23exits").html(thirdReportMovementWidget[23].exits);
        $("#thirdWidget23exitsPercent").html(thirdReportMovementWidget[23].percentExits + "%");

        $("#thirdWidget22description").html(thirdReportMovementWidget[22].descriptionEntrances);
        $("#thirdWidget22entrances").html(thirdReportMovementWidget[22].entrances);
        $("#thirdWidget22entrancesPercent").html(thirdReportMovementWidget[22].percentEntrances + "%");
        $("#thirdWidget22exits").html(thirdReportMovementWidget[22].exits);
        $("#thirdWidget22exitsPercent").html(thirdReportMovementWidget[22].percentExits + "%");

        $("#thirdWidget21description").html(thirdReportMovementWidget[21].descriptionEntrances);
        $("#thirdWidget21entrances").html(thirdReportMovementWidget[21].entrances);
        $("#thirdWidget21entrancesPercent").html(thirdReportMovementWidget[21].percentEntrances + "%");
        $("#thirdWidget21exits").html(thirdReportMovementWidget[21].exits);
        $("#thirdWidget21exitsPercent").html(thirdReportMovementWidget[21].percentExits + "%");

        $("#thirdWidget20description").html(thirdReportMovementWidget[20].descriptionEntrances);
        $("#thirdWidget20entrances").html(thirdReportMovementWidget[20].entrances);
        $("#thirdWidget20entrancesPercent").html(thirdReportMovementWidget[20].percentEntrances + "%");
        $("#thirdWidget20exits").html(thirdReportMovementWidget[20].exits);
        $("#thirdWidget20exitsPercent").html(thirdReportMovementWidget[20].percentExits + "%");

        $("#thirdWidget19description").html(thirdReportMovementWidget[19].descriptionEntrances);
        $("#thirdWidget19entrances").html(thirdReportMovementWidget[19].entrances);
        $("#thirdWidget19entrancesPercent").html(thirdReportMovementWidget[19].percentEntrances + "%");
        $("#thirdWidget19exits").html(thirdReportMovementWidget[19].exits);
        $("#thirdWidget19exitsPercent").html(thirdReportMovementWidget[19].percentExits + "%");

        $("#thirdWidget18description").html(thirdReportMovementWidget[18].descriptionEntrances);
        $("#thirdWidget18entrances").html(thirdReportMovementWidget[18].entrances);
        $("#thirdWidget18entrancesPercent").html(thirdReportMovementWidget[18].percentEntrances + "%");
        $("#thirdWidget18exits").html(thirdReportMovementWidget[18].exits);
        $("#thirdWidget18exitsPercent").html(thirdReportMovementWidget[18].percentExits + "%");

        $("#thirdWidget17description").html(thirdReportMovementWidget[17].descriptionEntrances);
        $("#thirdWidget17entrances").html(thirdReportMovementWidget[17].entrances);
        $("#thirdWidget17entrancesPercent").html(thirdReportMovementWidget[17].percentEntrances + "%");
        $("#thirdWidget17exits").html(thirdReportMovementWidget[17].exits);
        $("#thirdWidget17exitsPercent").html(thirdReportMovementWidget[17].percentExits + "%");

        $("#thirdWidget16description").html(thirdReportMovementWidget[16].descriptionEntrances);
        $("#thirdWidget16entrances").html(thirdReportMovementWidget[16].entrances);
        $("#thirdWidget16entrancesPercent").html(thirdReportMovementWidget[16].percentEntrances + "%");
        $("#thirdWidget16exits").html(thirdReportMovementWidget[16].exits);
        $("#thirdWidget16exitsPercent").html(thirdReportMovementWidget[16].percentExits + "%");

        $("#thirdWidget15description").html(thirdReportMovementWidget[15].descriptionEntrances);
        $("#thirdWidget15entrances").html(thirdReportMovementWidget[15].entrances);
        $("#thirdWidget15entrancesPercent").html(thirdReportMovementWidget[15].percentEntrances + "%");
        $("#thirdWidget15exits").html(thirdReportMovementWidget[15].exits);
        $("#thirdWidget15exitsPercent").html(thirdReportMovementWidget[15].percentExits + "%");

        $("#thirdWidget14description").html(thirdReportMovementWidget[14].descriptionEntrances);
        $("#thirdWidget14entrances").html(thirdReportMovementWidget[14].entrances);
        $("#thirdWidget14entrancesPercent").html(thirdReportMovementWidget[14].percentEntrances + "%");
        $("#thirdWidget14exits").html(thirdReportMovementWidget[14].exits);
        $("#thirdWidget14exitsPercent").html(thirdReportMovementWidget[14].percentExits + "%");

        $("#thirdWidget13description").html(thirdReportMovementWidget[13].descriptionEntrances);
        $("#thirdWidget13entrances").html(thirdReportMovementWidget[13].entrances);
        $("#thirdWidget13entrancesPercent").html(thirdReportMovementWidget[13].percentEntrances + "%");
        $("#thirdWidget13exits").html(thirdReportMovementWidget[13].exits);
        $("#thirdWidget13exitsPercent").html(thirdReportMovementWidget[13].percentExits + "%");

        $("#thirdWidget12description").html(thirdReportMovementWidget[12].descriptionEntrances);
        $("#thirdWidget12entrances").html(thirdReportMovementWidget[12].entrances);
        $("#thirdWidget12entrancesPercent").html(thirdReportMovementWidget[12].percentEntrances + "%");
        $("#thirdWidget12exits").html(thirdReportMovementWidget[12].exits);
        $("#thirdWidget12exitsPercent").html(thirdReportMovementWidget[12].percentExits + "%");

        $("#thirdWidget11description").html(thirdReportMovementWidget[11].descriptionEntrances);
        $("#thirdWidget11entrances").html(thirdReportMovementWidget[11].entrances);
        $("#thirdWidget11entrancesPercent").html(thirdReportMovementWidget[11].percentEntrances + "%");
        $("#thirdWidget11exits").html(thirdReportMovementWidget[11].exits);
        $("#thirdWidget11exitsPercent").html(thirdReportMovementWidget[11].percentExits + "%");

        $("#thirdWidget10description").html(thirdReportMovementWidget[10].descriptionEntrances);
        $("#thirdWidget10entrances").html(thirdReportMovementWidget[10].entrances);
        $("#thirdWidget10entrancesPercent").html(thirdReportMovementWidget[10].percentEntrances + "%");
        $("#thirdWidget10exits").html(thirdReportMovementWidget[10].exits);
        $("#thirdWidget10exitsPercent").html(thirdReportMovementWidget[10].percentExits + "%");

        $("#thirdWidget09description").html(thirdReportMovementWidget[09].descriptionEntrances);
        $("#thirdWidget09entrances").html(thirdReportMovementWidget[09].entrances);
        $("#thirdWidget09entrancesPercent").html(thirdReportMovementWidget[09].percentEntrances + "%");
        $("#thirdWidget09exits").html(thirdReportMovementWidget[09].exits);
        $("#thirdWidget09exitsPercent").html(thirdReportMovementWidget[09].percentExits + "%");

        $("#thirdWidget08description").html(thirdReportMovementWidget[08].descriptionEntrances);
        $("#thirdWidget08entrances").html(thirdReportMovementWidget[08].entrances);
        $("#thirdWidget08entrancesPercent").html(thirdReportMovementWidget[08].percentEntrances + "%");
        $("#thirdWidget08exits").html(thirdReportMovementWidget[08].exits);
        $("#thirdWidget08exitsPercent").html(thirdReportMovementWidget[08].percentExits + "%");

        $("#thirdWidget07description").html(thirdReportMovementWidget[07].descriptionEntrances);
        $("#thirdWidget07entrances").html(thirdReportMovementWidget[07].entrances);
        $("#thirdWidget07entrancesPercent").html(thirdReportMovementWidget[07].percentEntrances + "%");
        $("#thirdWidget07exits").html(thirdReportMovementWidget[07].exits);
        $("#thirdWidget07exitsPercent").html(thirdReportMovementWidget[07].percentExits + "%");

        $("#thirdWidget06description").html(thirdReportMovementWidget[06].descriptionEntrances);
        $("#thirdWidget06entrances").html(thirdReportMovementWidget[06].entrances);
        $("#thirdWidget06entrancesPercent").html(thirdReportMovementWidget[06].percentEntrances + "%");
        $("#thirdWidget06exits").html(thirdReportMovementWidget[06].exits);
        $("#thirdWidget06exitsPercent").html(thirdReportMovementWidget[06].percentExits + "%");

        $("#thirdWidget05description").html(thirdReportMovementWidget[05].descriptionEntrances);
        $("#thirdWidget05entrances").html(thirdReportMovementWidget[05].entrances);
        $("#thirdWidget05entrancesPercent").html(thirdReportMovementWidget[05].percentEntrances + "%");
        $("#thirdWidget05exits").html(thirdReportMovementWidget[05].exits);
        $("#thirdWidget05exitsPercent").html(thirdReportMovementWidget[05].percentExits + "%");

        $("#thirdWidget04description").html(thirdReportMovementWidget[04].descriptionEntrances);
        $("#thirdWidget04entrances").html(thirdReportMovementWidget[04].entrances);
        $("#thirdWidget04entrancesPercent").html(thirdReportMovementWidget[04].percentEntrances + "%");
        $("#thirdWidget04exits").html(thirdReportMovementWidget[04].exits);
        $("#thirdWidget04exitsPercent").html(thirdReportMovementWidget[04].percentExits + "%");

        $("#thirdWidget03description").html(thirdReportMovementWidget[03].descriptionEntrances);
        $("#thirdWidget03entrances").html(thirdReportMovementWidget[03].entrances);
        $("#thirdWidget03entrancesPercent").html(thirdReportMovementWidget[03].percentEntrances + "%");
        $("#thirdWidget03exits").html(thirdReportMovementWidget[03].exits);
        $("#thirdWidget03exitsPercent").html(thirdReportMovementWidget[03].percentExits + "%");

        $("#thirdWidget02description").html(thirdReportMovementWidget[02].descriptionEntrances);
        $("#thirdWidget02entrances").html(thirdReportMovementWidget[02].entrances);
        $("#thirdWidget02entrancesPercent").html(thirdReportMovementWidget[02].percentEntrances + "%");
        $("#thirdWidget02exits").html(thirdReportMovementWidget[02].exits);
        $("#thirdWidget02exitsPercent").html(thirdReportMovementWidget[02].percentExits + "%");

        $("#thirdWidget01description").html(thirdReportMovementWidget[01].descriptionEntrances);
        $("#thirdWidget01entrances").html(thirdReportMovementWidget[01].entrances);
        $("#thirdWidget01entrancesPercent").html(thirdReportMovementWidget[01].percentEntrances + "%");
        $("#thirdWidget01exits").html(thirdReportMovementWidget[01].exits);
        $("#thirdWidget01exitsPercent").html(thirdReportMovementWidget[01].percentExits + "%");

        $("#thirdWidget00description").html(thirdReportMovementWidget[00].descriptionEntrances);
        $("#thirdWidget00entrances").html(thirdReportMovementWidget[00].entrances);
        $("#thirdWidget00entrancesPercent").html(thirdReportMovementWidget[00].percentEntrances + "%");
        $("#thirdWidget00exits").html(thirdReportMovementWidget[00].exits);
        $("#thirdWidget00exitsPercent").html(thirdReportMovementWidget[00].percentExits + "%");

    }

    if (client) {
        $("#clientName").html(client.nome_fantasia);
    }

    if (choosenTime) {
        $("#choosenDay").html(choosenTime);
    }

    console.log(client);
    console.log(choosenTime);
    console.log(firstReportMovementWidget);
    console.log(secondReportMovementWidget);
    console.log(thirdReportMovementWidget);

}

//Formatar Entradas para Exibicao
function formatEntrances(hour) {

    if (hour > 1) {
        return ("0" + hour).slice(-2).toString();
    } else if (hour == 1) {
        return ("0" + hour).slice(-2).toString();
    } else if (hour == 0) {
        return ("00");
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
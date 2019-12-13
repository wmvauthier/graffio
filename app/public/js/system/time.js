function getActualTime() {

    var d = new Date();
    var month = d.getMonth() + 1;
    d = d.toString();

    var year = d.slice(11, 15);
    var day = d.slice(8, 10);
    var hour = d.slice(16, 24);
    d = d.slice(0, 5);

    return (`${day}/${month}/${year} ${hour}`);

}

function daysInMonth(time) {
    return new Date(getYear(time), getMonth(time), 0).getDate();
}

function checkYear(time, doc) {

    if (getYear(time) == getYear(doc)) {
        return true;
    } else {
        return false;
    }

}

function checkMonth(time, doc) {

    if (getMonth(time) == getMonth(doc)) {
        return true;
    } else {
        return false;
    }

}

function checkDay(time, doc) {

    if (getDay(time) == getDay(doc)) {
        return true;
    } else {
        return false;
    }

}

function getYear(time) {
    return time.slice(06, 10);
}

function getMonth(time) {
    return time.slice(03, 05);
}

function getDay(time) {
    return time.slice(00, 02);
}
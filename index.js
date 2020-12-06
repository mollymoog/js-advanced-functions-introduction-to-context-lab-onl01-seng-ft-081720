
function createEmployeeRecord(array) {
    const employee = {
        firstName: array[0], 
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee;
}

function createEmployeeRecords(arrayArray) {
    let arrayObject = arrayArray.map(array => createEmployeeRecord(array));
    return arrayObject;
}

function createTimeInEvent(empObj, dateStamp) {
    let [date, time] = dateStamp.split(" ");
    empObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date
    })
    return empObj;
}

function createTimeOutEvent(empObj, dateStamp) {
    let [date, time] = dateStamp.split(" ");
    empObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date
    })
    return empObj;
}

function hoursWorkedOnDate(empObj, dateStamp) {

    let inObj = empObj.timeInEvents.find(function(k) {
        return k.date === dateStamp;
    });
    let inHour = inObj.hour / 100;

    let outObj = empObj.timeOutEvents.find(function(k) {
        return k.date === dateStamp;
    });
    let outHour = outObj.hour / 100;

    return (outHour - inHour)
}
 
function wagesEarnedOnDate(empObj, dateStamp) {
    let payPerHour = empObj.payPerHour;
    let hWork = hoursWorkedOnDate(empObj, dateStamp);

    return (parseFloat(payPerHour.toString() * hWork));
}


function allWagesFor(empObj) {
    let daysWorked = empObj.timeInEvents.map(e => {return e.date})

    let totalPay = daysWorked.reduce(( function(total, dateStamp) {
        return total + wagesEarnedOnDate(empObj, dateStamp);
    }),
    0)
    return totalPay;
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(empObj) {
        return empObj.firstName == firstName;
    }
    )
}


let calculatePayroll = function(srcArray) {
    let payRoll = srcArray.reduce(function(total, empObj) {
        return total + allWagesFor(empObj);
    }, 0)

    return payRoll;
}

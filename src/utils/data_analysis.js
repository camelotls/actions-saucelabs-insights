const roundToTwoDecimals = (num) => {
    return +(Math.round(num + "e+2") + "e-2");
}

const formatTime = (time) => {
    let formattedTime;
    let [integerPart, decimalPart] = `${time}`.split('.');

    //Normalize seconds to base of 60, add minutes and seconds together and round to 2 decimals.
    formattedTime = roundToTwoDecimals(Number(`${parseFloat(integerPart)}.${parseFloat(decimalPart) * 60}`))
    formattedTime = `${formattedTime}`.replace('.', ':')

    //If time is for example 1:3 it should be 1:03.
    if (formattedTime.length === 3) {
        formattedTime = [formattedTime.slice(0, 2), '0', formattedTime.slice(2)].join('');
    }
    if (formattedTime.length === 1) {
        formattedTime = `${formattedTime}:00`;
    }
    return formattedTime
};

const testAverageDuration = (testList) => {
    let sumOfDurations = 0;
    testList.forEach((test) => {

        //Add only the passed test duration to keep the data clean.
        if (test.status === 'passed') {
            sumOfDurations += test.duration / 60
        }
    });
    let average = sumOfDurations / testList.length;

    return formatTime(average);
};

const testPassRate = (testData) => {
    let numberOfPassedTests = 0;
    testData.forEach((test) => {
        if (test.status === 'passed') {
            numberOfPassedTests += 1
        }
    });
    return roundToTwoDecimals(100 * numberOfPassedTests / testData.length);
};

module.exports = {
    testPassRate,
    testAverageDuration
}
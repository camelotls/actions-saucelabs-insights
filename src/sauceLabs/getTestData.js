const {getPastDate} = require('../utils/dates');
const {getData} = require('./dataFetcher');

const getTestData = async (testName) => {
    let finalTestData = [];
    let recordNumber = 0;
    let flag = true;
    while (flag) {
        const searchOptions = [
            ['start', getPastDate(7)],
            ['end', getPastDate(0)],
            ['query', `${testName}`],
            ['from', recordNumber]
        ];
        const testData = await getData('/v1/analytics/tests', searchOptions);
        testData.items.forEach((entry) => {
            finalTestData.push(entry)
        });

        if (!testData['has_more']) {
            flag = false;
        }
        recordNumber += 1000;
    }
    return finalTestData
}

module.exports = {
    getTestData
}
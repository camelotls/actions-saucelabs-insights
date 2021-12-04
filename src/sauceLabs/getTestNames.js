const {getData} = require('./dataFetcher');
const {getPastDate} = require('../utils/dates');
const {filterTests} = require('../utils/filter');
const _ = require('lodash');

const getTestNames = async (build) => {

    let recordNumber = 0;
    let flag = true;
    let testNames = [];

    //Retrieve the test data and only keep the test names.
    while (flag) {
        const testNamesData = await getData('/v1/analytics/tests',
            [
                ['start', getPastDate(30)],
                ['end', getPastDate(0)],
                ['from', recordNumber]
            ]);

        let testNamesDataFiltered = filterTests(
            testNamesData.items,
            'build',
            build
        );
        testNamesDataFiltered = filterTests(
            testNamesDataFiltered,
            'build',
            'master'
        );

        testNamesDataFiltered.forEach((entry) => {
            testNames.push(entry.name)
        });

        if (!testNamesData['has_more']) {
            flag = false;
        }
        recordNumber += 1000;
    }
    return _.uniq(testNames);
}
module.exports = {
    getTestNames
}
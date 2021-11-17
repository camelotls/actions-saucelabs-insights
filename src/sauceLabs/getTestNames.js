const {getData} = require('../sauceLabs/testDataFetcher');
const {getPastDate} = require('../utils/dates');
const {filterTests} = require('../utils/filter');
const _ = require('lodash');

const getTestNames = async (platform) => {
//Retrieve the test data and only keep the test names.
    const testNamesData = await getData(
        [
            ['start', getPastDate(7)],
            ['end', getPastDate(0)],
            ['scope', 'single'],
        ]);
    let testNamesDataFiltered = filterTests(
        testNamesData.items,
        'build',
        'build-master-branch'
    );
    testNamesDataFiltered = filterTests(
        testNamesDataFiltered,
        'os',
        platform
    );

    let testNames = [];
    testNamesDataFiltered.forEach((entry) => {
        if (entry.name) {
            testNames.push(entry.name)
        }
    });

    return _.sortedUniq(testNames.sort());
}
module.exports = {
    getTestNames
}
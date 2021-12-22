const {getData} = require('./dataFetcher');
const {getPastDate} = require('../utils/dates');
const {filterData} = require('../utils/filter');
const _ = require('lodash');

const extractDetails = async (build) => {

    let recordNumber = 0;
    let flag = true;
    let testNames = [];
    let platforms = [];
    //Retrieve the test data and only keep the test names.
    while (flag) {
        const data = await getData('/v1/analytics/tests',
            [
                ['start', getPastDate(30)],
                ['end', getPastDate(0)],
                ['from', recordNumber]
            ]);

        let testNamesDataFiltered = filterData(
            data.items,
            'build',
            build
        );
        testNamesDataFiltered = filterData(
            testNamesDataFiltered,
            'build',
            'master'
        );

        testNamesDataFiltered.forEach((entry) => {
            testNames.push(entry.name)
            platforms.push(entry.os)
        });

        if (!data['has_more']) {
            flag = false;
        }
        recordNumber += 1000;
    }
    return [_.uniq(testNames), _.uniq(platforms)];
};

module.exports = {
    extractDetails
}
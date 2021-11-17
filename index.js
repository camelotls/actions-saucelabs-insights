const {getData} = require('./src/sauceLabs/testDataFetcher');
const {testPassRate, testAverageDuration} = require('./src/utils/data_analysis');
const {filterTests} = require('./src/utils/filter');
const {getPastDate} = require('./src/utils/dates');
const Report = require('./src/reporter/reporter');

const fs = require('fs');
const {forEach} = require('p-iteration');
const _ = require('lodash');


const start = async () => {
    const url = '/v1/analytics/tests';

    //Retrieve the test data and only keep the test names
    const testNamesData = await getData(
        [
            ['start', getPastDate(7)],
            ['end', getPastDate(0)],
            ['scope', 'single'],
        ],
        url);
    const testNamesDataFiltered = filterTests(testNamesData.items, 'build', 'build-master-branch')
    let testNames = [];

    testNamesDataFiltered.forEach((entry) => {
        if (entry.name) {
            testNames.push(entry.name)
        }
    });

    testNames = _.sortedUniq(testNames.sort());
    let finalData = {}

    //TODO Remove the below debug code
    fs.writeFile(`debug/testNames.json`, JSON.stringify(testNames), function (err) {
        if (err) throw err;
    });
    console.log(testNames.length)

    //Loop through the test name list to generate the pass rate and the average test duration.
    await forEach(testNames, async (testName) => {
        const searchOptions = [
            ['start', getPastDate(7)],
            ['end', getPastDate(0)],
            ['query', `${testName}`],
        ];
        const testData = await getData(searchOptions, url);
        const filteredTestData = filterTests(testData.items, 'build', 'build-master-branch');

        //TODO The files created are used for debug purposes, should be removed
        // fs.writeFile(`debug/${test.replace(/\s/g, '-').replace(/\s/,'')}_build.json`, JSON.stringify(testByBuild), function (err) {
        //     if (err) throw err;
        // });

        finalData[`${testName}`] = new Report(
            `${testAverageDuration(filteredTestData)}`,
            `${testPassRate(filteredTestData)}`,
        );
        return finalData
    });
    console.table(finalData)
}

(async () => {
    await start();
})();
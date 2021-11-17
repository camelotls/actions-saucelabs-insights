const fs = require('fs');
const {forEach} = require('p-iteration');
const {getPastDate} = require('../utils/dates');
const {getData} = require('../sauceLabs/testDataFetcher');
const {filterTests} = require('../utils/filter');
const Report = require('../reporter/reporter');
const {testAverageDuration, testPassRate} = require('../utils/data_analysis');


const generateReport = async (testNames, platform) => {
    let finalData = {}

    //Loop through the test name list to generate the pass rate and the average test duration.
    await forEach(testNames, async (testName) => {
        const searchOptions = [
            ['start', getPastDate(7)],
            ['end', getPastDate(0)],
            ['query', `${testName}`],
        ];
        const testData = await getData(searchOptions);
        let filteredTestData = filterTests(testData.items, 'build', 'build-master-branch');
        filteredTestData = filterTests(filteredTestData, 'os', platform);
        //TODO The files created are used for debug purposes, should be removed
        // fs.writeFile(`debug/${test.replace(/\s/g, '-').replace(/\s/,'')}_build.json`, JSON.stringify(testByBuild), function (err) {
        //     if (err) throw err;
        // });

        finalData[`${testName}`] = new Report(
            `${testAverageDuration(filteredTestData)}`,
            `${testPassRate(filteredTestData)}`,
            `${platform}`
        );
        return finalData
    });
    return finalData;
}

module.exports = {
    generateReport
}
const {getTestData} = require('./src/sauceLabs/testDataFetcher');
const {getTestNames} = require('./src/sauceLabs/testsNameFetcher');
const {testPassRate, testAverageDuration} = require("./src/utils/data_analysis");
const {filterTests} = require('./src/utils/filter');
const fs = require('fs');
const Report = require("./src/reporter/reporter");
const {forEach} = require('p-iteration');

const start = async () => {

    //Retrieve the test data and only keep the test names
    const testNamesData = await getTestNames('1d');
    const testNamesDataFiltered = filterTests(testNamesData.items, 'build', 'build-master-branch')
    let testNames = []
    testNamesDataFiltered.forEach((entry) => {
        if (entry.name) {
            testNames.push(entry.name)
        }
    })

    let dataList = []

    //TODO Remove the below debug code
    fs.writeFile(`debug/testNames.json`, JSON.stringify(testNames), function (err) {
        if (err) throw err;
    });
    console.log(testNames.length)

    //Loop through the test name list to generate the pass rate and the average test duration.
    await forEach(testNames, async (testName) => {
        const testData = await getTestData('7d', testName);
        const filteredTestData = filterTests(testData.items,  'build','build-master-branch');

        //TODO The files created are used for debug purposes, should be removed
        // fs.writeFile(`debug/${test.replace(/\s/g, '-').replace(/\s/,'')}_build.json`, JSON.stringify(testByBuild), function (err) {
        //     if (err) throw err;
        // });

        const report = new Report(testName,
            `${testAverageDuration(filteredTestData)}`,
            `${testPassRate(filteredTestData)}`)
        dataList.push(report)
        return dataList
    });
    console.table(dataList)
}

(async () => {
    await start();
})();
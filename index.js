const {getTestNames} = require('./src/sauceLabs/getTestNames');
const {getTestData} = require('./src/sauceLabs/getTestData');
const {filterTests} = require('./src/utils/filter');
const {testPassRate, testAverageDuration} = require('./src/utils/data_analysis');
const {forEach} = require('p-iteration');
const Report = require('./src/reporter/reporter');

const start = async () => {

    const report = {};
    const testNames = await getTestNames(process.env.BRANCH_NAME);
    await forEach(testNames, async (testName) => {

        const testData = await getTestData(testName);
        let filteredTestData = filterTests(testData, 'build', process.env.BRANCH_NAME);

        if (testPassRate(filteredTestData) && testPassRate(filteredTestData) < 90) {
            report[`${testName}`] = new Report(
                `${testAverageDuration(filteredTestData) + '%'}`,
                `${testPassRate(filteredTestData)}`,
            );
        }
    })

    console.table(report)
}

(async () => {
    await start();
})();
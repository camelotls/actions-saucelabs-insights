const {getTestNames} = require('./src/sauceLabs/getTestNames');
const {forEach} = require('p-iteration');

const {getTestData} = require('./src/sauceLabs/getTestData');
const {filterTests} = require('./src/utils/filter');
const {testPassRate, testAverageDuration} = require('./src/utils/data_analysis');
const Report = require('./src/reporter/reporter');


const start = async () => {
    const builds = [
        'Execute_IOS_Tests',
        'Execute_Android_Tests',
    ];

    const report = {};
    await forEach(builds, async (build) => {
        const testNames = await getTestNames(build);
        await forEach(testNames, async (testName) => {
            const testData = await getTestData(testName);
            let filteredTestData = filterTests(testData, 'build', build);
            filteredTestData = filterTests(filteredTestData, 'build', 'master');


            if (testPassRate(filteredTestData) && testPassRate(filteredTestData) < 90) {
                report[`${testName}`] = new Report(
                    `${testAverageDuration(filteredTestData) + '%'}`,
                    `${testPassRate(filteredTestData)}`,
                );
            }
        })


    });
    console.table(report)
}

(async () => {
    await start();
})();
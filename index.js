const {extractDetails} = require('./src/sauceLabs/extractDetails');
const {getTestData} = require('./src/sauceLabs/getTestData');
const {filterData} = require('./src/utils/filter');
const {testPassRate, testAverageDuration} = require('./src/utils/data_analysis');
const {forEach} = require('p-iteration');
const Report = require('./src/reporter/reporter');
const fs = require("fs");

const start = async () => {

    const report = {};
    const [testNames, platforms] = await extractDetails(process.env.BRANCH_NAME);
    let testData;
    await forEach(testNames, async (testName) => {
        testData = await getTestData(testName);
        let filteredTestData = [];
        await forEach(platforms, async (platform) => {
            filteredTestData = filterData(testData, 'os', platform);
            if (testData) {
                filteredTestData = filterData(filteredTestData, 'build', process.env.BRANCH_NAME);
                if (testPassRate(filteredTestData) && testPassRate(filteredTestData) < Number(process.env.MINIMUM_PASS_RATE)) {
                    report[`${testName} (${platform})`] = new Report(
                        `${testPassRate(filteredTestData) + '%'}`,
                        `${testAverageDuration(filteredTestData)}`,
                        platform
                    );
                }
            }
        });
    });
    console.table(report);
};

(async () => {
    await start();
})();
const { extractDetails } = require("./src/sauceLabs/extractDetails");
const { getTestData } = require("./src/sauceLabs/getTestData");
const { filterData } = require("./src/utils/filter");
const {
  testPassRate,
  testAverageDuration,
} = require("./src/utils/dataAnalysis");
const { forEach } = require("p-iteration");
const Report = require("./src/reporter/reporter");

const start = async () => {
  let report = {};

  //Get the test names and the platforms
  const details = await extractDetails(process.env.BRANCH_NAME);
  const testNames = details.testNames;
  const platforms = details.platforms;

  await forEach(testNames, async (testName) => {
    //Get the test data for each test.
    const rawTestData = await getTestData(testName);
    let filteredTestData = rawTestData.map((data) => JSON.parse(data));

    await forEach(platforms, async (platform) => {
      let testData = filteredTestData;
      //Filter test data, first by os and then by the branch name
      testData = filterData(testData, {
        type: "os",
        value: platform,
      });
      testData = filterData(testData, {
        type: "build",
        value: process.env.BRANCH_NAME,
      });
      const passRate = testPassRate(testData);
      const averageTime = testAverageDuration(testData);

      if (Number(passRate) < Number(process.env.MINIMUM_PASS_RATE)) {
        report[`${testName} (${platform})`] = new Report(
          `${passRate + "%"}`,
          averageTime,
          platform
        );
      }
    });
  });
  console.table(report);
};

(async () => {
  await start();
})();

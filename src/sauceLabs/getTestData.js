const { getPastDate } = require("../utils/dates");
const { getData } = require("./dataFetcher");
const { forEach } = require("p-iteration");

const getTestData = async (testName) => {
  try {
    let finalTestData = [];
    let recordNumber = 0;
    let hasMoreResults = true;
    while (hasMoreResults) {
      const searchOptions = [
        ["start", getPastDate(process.env.TIMEFRAME)],
        ["end", getPastDate(0)],
        ["query", testName],
        ["from", recordNumber],
      ];
      const testData = await getData("/v1/analytics/tests", searchOptions);
      await forEach(testData.items, async (entry) => {
        finalTestData.push(JSON.stringify(entry));
      });
      if (!testData["has_more"]) {
        hasMoreResults = false;
      }
      recordNumber += 1000;
    }
    return finalTestData;
  } catch (error) {
    console.log(`Error while getting test data of test ${testName}`);
    return error;
  }
};

module.exports = {
  getTestData,
};

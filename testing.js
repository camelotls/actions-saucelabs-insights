const { extractDetails } = require("./src/sauceLabs/extractDetails");
const { getTestData } = require("./src/sauceLabs/getTestData");
const { filterData } = require("./src/utils/filter");
const {
  testPassRate,
  testAverageDuration,
} = require("./src/utils/dataAnalysis");
const { forEach } = require("p-iteration");
const Report = require("./src/reporter/reporter");
const { isArray } = require("lodash/lang");
const { value } = require("lodash/seq");

const start = async () => {
  let rawTestData = await getTestData("UI of More Screen");
  const testData = rawTestData.map((data) => JSON.parse(data));
  await forEach(testData, (test) => console.log(test.os));
  console.log(testData.length);
  const platform = "iOS 14.3";
  let filteredData = testData;
  filteredData = filterData(filteredData, { type: "os", value: platform });
  console.log(filteredData.length);
  filteredData = filterData(filteredData, {
    type: "build",
    value: "SP",
  });
  console.log(filteredData.length);
};

(async () => {
  await start();
})();

const {getTestNames} = require('./src/sauceLabs/getTestNames');

const fs = require('fs');
const _ = require('lodash');
const {generateReport} = require("./src/reportGenerator/generate_report");
const {forEach} = require("p-iteration");


const start = async () => {
    const platforms = ['Android', 'iOS'];
    await forEach(platforms, async (platform) => {
            const testNames = await getTestNames(platform);
            //TODO Remove the below debug code
            fs.writeFile(`debug/testNames_${platform}.json`, JSON.stringify(testNames), function (err) {
                if (err) throw err;
            });

            const report = await generateReport(testNames, platform);
            fs.writeFile(`debug/report_${platform}.json`, JSON.stringify(report), function (err) {
                if (err) throw err;
            });
            console.log(testNames.length)
            console.table(report);

        }
    )
}

(async () => {
    await start();
})();
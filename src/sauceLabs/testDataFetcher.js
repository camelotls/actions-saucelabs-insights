const fs = require('fs');
const bunyan = require('bunyan');
const {GETRequestWrapper} = require('./helper');
const log = bunyan.createLogger({name: 'actions-sauce-labs-insights'});

const sauce_credentials = {
    username: process.env.SAUCE_USERNAME,
    password: process.env.SAUCE_ACCESS_KEY
}

const getData = async (searchOptions) => {
    try {
        const response = await GETRequestWrapper(
            process.env.SAUCE_API_BASE_URL,
            sauce_credentials,
            '/v1/analytics/tests',
            searchOptions);

        // TODO The file created is used for debug purposes, should be removed
        // fs.writeFile(`debug/${testName.replace(/\s/g, '-').replace(/\//g, '')}_test.json`, response.body, function (err) {
        //     if (err) throw err;
        //     log.warn(`Data file for test named ${testName} was created successfully.`);
        // });

        return JSON.parse(response.body);
    } catch (error) {
        log.warn(`Request encountered the following error while fetching data with error: ${error.message}`);
        return error;
    }
}

module.exports = {
    getData
}
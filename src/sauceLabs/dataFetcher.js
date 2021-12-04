const fs = require('fs');
const bunyan = require('bunyan');
const {GETRequestWrapper} = require('./helper');
const log = bunyan.createLogger({name: 'actions-sauce-labs-insights'});

const sauce_credentials = {
    username: process.env.SAUCE_USERNAME,
    password: process.env.SAUCE_ACCESS_KEY
}

const getData = async (url, searchOptions) => {
    try {
        const response = await GETRequestWrapper(
            process.env.SAUCE_API_BASE_URL,
            sauce_credentials,
            url,
            searchOptions);

        return JSON.parse(response.body);
    } catch (error) {
        log.warn(`Request encountered the following error while fetching data with error: ${error.message}`);
        return error;
    }
}

module.exports = {
    getData
}
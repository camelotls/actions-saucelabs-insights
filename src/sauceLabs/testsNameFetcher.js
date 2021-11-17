const bunyan = require('bunyan');
const {GETRequestWrapper} = require('./helper');
const {getPastDate} = require('../utils/dates')

const log = bunyan.createLogger({name: 'actions-sauce-labs-insights'});

const sauce_credentials = {
    username: process.env.SAUCE_USERNAME,
    password: process.env.SAUCE_ACCESS_KEY
}

const getTestNames = async () => {
    try {
        const startDate = getPastDate(7);
        const endDate = getPastDate(0);

        const response = await GETRequestWrapper(
            process.env.SAUCE_API_BASE_URL,
            sauce_credentials,
            '/v1/analytics/tests',
            [
                ['start', `${startDate}`],
                ['end', `${endDate}`],
                ['scope', 'single'],
            ]);

        return JSON.parse(response.body)
    } catch (error) {
        log.warn(`Get test names request encountered the following error: ${error.message}`);
        return error;
    }
}

module.exports = {
    getTestNames
}
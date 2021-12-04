const got = require('got');


const GETRequestWrapper = async (
    apiPath,
    sauce_credentials,
    url,
    searchOptions
) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        Authorization: 'Basic',
        ...sauce_credentials
    };

    //Search for the maximum possible number of results.
    const baseSearchOptions = [
        ['size', '1000'],
        ['scope', 'single'],
        ['owner', `${process.env.SAUCE_OWNER}`],
    ]
    baseSearchOptions.forEach((option) => searchOptions.push(option))

    const searchParams = new URLSearchParams(searchOptions);

    return got(
        `${process.env.SAUCE_API_BASE_URL}${url}`,
        options,
        {searchParams}
    );
};

module.exports = {
    GETRequestWrapper
}
const { GETRequestWrapper } = require("./helper");

const sauce_credentials = {
  username: process.env.SAUCE_USERNAME,
  password: process.env.SAUCE_ACCESS_KEY,
};

const getData = async (url, searchOptions) => {
  try {
    const response = await GETRequestWrapper(
      sauce_credentials,
      url,
      searchOptions
    );

    return JSON.parse(response.body);
  } catch (error) {
    console.log(
      `Request encountered the following error while fetching data with error: ${error.message}`
    );
    return error;
  }
};

module.exports = {
  getData,
};

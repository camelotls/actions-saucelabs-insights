const filterTests = (dataList, filterType, filterName) => {
    return dataList.filter((data) => data[filterType].includes(`${filterName}`)
    );
}

module.exports = {
    filterTests
}
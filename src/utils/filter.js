const filterData = (dataList, filterType, filter) => {
    if (dataList) {
        return dataList.filter((data) => data[filterType].includes(`${filter}`)
        );
    }
    return []
};

module.exports = {
    filterData
}
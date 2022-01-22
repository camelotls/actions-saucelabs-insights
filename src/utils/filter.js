const filterData = (dataList, filter) => {
  return dataList.filter((data) =>
    data[filter.type].includes(`${filter.value}`)
  );
};

module.exports = {
  filterData,
};

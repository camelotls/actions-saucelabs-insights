const getPastDate = (daysBack) => {
    const currentDate = new Date();
    let startDate = new Date(currentDate.setDate(currentDate.getDate() - daysBack)).toISOString();
    return startDate.split('.')[0].concat('Z');
};

module.exports = {
    getPastDate
}
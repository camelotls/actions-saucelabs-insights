class Report {
    constructor(testName, averageTime, passRate) {
        this.testName = testName;
        this.averageTime = averageTime;
        this.passRate = passRate;
    }
}

module.exports = Report;
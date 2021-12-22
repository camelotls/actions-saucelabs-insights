# SauceLabs Insights Action

## Action description
A GitHub Action to gather data about tests running on SauceLabs and provide a health check of the tests. The action utilises [SauceLabs REST API](https://docs.saucelabs.com/dev/api).

## HOW TO USE
### INPUTS

####REQUIRED:

SAUCE_OWNER:
The name of one or more users in the organization who executed the requested tests.


SAUCE_USERNAME: Github secret for the sauce username

RUNS_ON_GITHUB: Indicates if the action runs on GitHub or locally, on a Docker container, for testing purposes

SAUCE_ACCESS_KEY: Github secret for the sauce access key

####OPTIONAL:

SAUCE_API_BASE_URL: SauceLabs base URL, default value https://api.eu-central-1.saucelabs.com

BRANCH_NAME: Name of the branch the action will use to get data from, default value master.

TIMEFRAME: How many days worth of data will the action use, default value '7'.

MINIMUM_PASS_RATE: Tests with pass rate lower than this value will be displayed, default value is '90'.

## Example Workflow
WIP

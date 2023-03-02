const assert = require('assert'),
    jsonHasDifferences = require('diffler'),
    packagejson = require('../package.json')

const packageMock = {
  "author": {
    "name": "Jim Manton"
  },
  "version": "14.1.5",
  "bundleDependencies": [],
  "dependencies": {
    "base-queue": "^2.0.0",
    "chai": "^4.3.7",
    "colors": "^1.4.0",
    "diffler": "^2.0.4",
    "fs": "^0.0.1-security",
    "log-queue": "^2.1.0",
    "mocha": "^10.2.0",
    "typescript": "^4.9.5",
    "valid-path": "^2.1.0"
  },
  "scripts": {
    "start": "node app.ts",
    "test": "mocha",
    "ditched": "ditched -a",
    "test_files": "node ./tests/files",
    "test_all": "node ./tests/all",
    "test_top_one": "node ./tests/top_one",
    "test_bottom_one": "node ./tests/bottom_one",
    "test_func_all": "node ./tests/func_all",
    "test_status_matching": "node ./tests/status_matching",
    "test_status_non_matching": "node ./tests/status_non_matching",
    "test_name_matching": "node ./tests/name_matching",
    "test_name_non_matching": "node ./tests/name_non_matching",
    "test_version_matching": "node ./tests/version_matching",
    "test_version_non_matching": "node ./tests/version_non_matching",
    "test_json_all": "node ./tests/json_all",
    "test_json_top_one": "node ./tests/json_top_one",
    "test_json_bottom_one": "node ./tests/json_bottom_one",
    "test_json_func_all": "node ./tests/json_func_all",
    "test_json_status_matching": "node ./tests/json_status_matching",
    "test_json_status_non_matching": "node ./tests/json_status_non_matching",
    "test_json_version_matching": "node ./tests/json_version_matching",
    "test_json_version_non_matching": "node ./tests/json_version_non_matching",
    "test_json_name_matching": "node ./tests/json_name_matching",
    "test_json_name_non_matching": "node ./tests/json_name_non_matching"
  },
  "keywords": [
    "queue",
    "processing",
    "appenders",
    "javascript",
    "synchronous",
    "objects",
    "promises",
    "mocha"
  ],
  "homepage": "https://github.com/jman717/queueobj",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/jman717/queueobj"
  },
  "deprecated": false,
  "description": "Queue File Objects",
  "email": "jrman@risebroadband.net",
  "license": "MIT",
  "main": "app.js",
  "name": "queueobj",
  "start": "node app.js"
}

describe('package.json', function () {
    it('should pass', function () {
      const difference = jsonHasDifferences(packagejson, packageMock)
      assert(JSON.stringify(difference) == "{}")
    })

    it('should fail', function () {
        packageMock.version = '0'
        assert(jsonHasDifferences(packagejson, packageMock))
    })
})

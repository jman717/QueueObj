const assert = require('assert'),
    jsonHasDifferences = require('diffler'),
    packagejson = require('../package.json')

const packageMock = {
  "author": {
    "name": "Jim Manton"
  },
  "version": "12.0.10",
  "bundleDependencies": false,
  "dependencies": {
    "chai": "^4.3.7",
    "node-console-colors": "^1.1.4",
    "diffler": "^2.0.4",
    "mocha": "^10.2.0"
  },
  "scripts": {
    "start": "node app.ts",
    "test": "mocha",
    "ditched": "ditched -a",
    "test_all": "node ./tests/test_all",
    "test_bottom_one": "node ./tests/test_bottom_one",
    "test_func_all": "node ./tests/test_func_all",
    "test_sync_all": "node ./tests/test_sync_all",
    "test_status": "node ./tests/test_status",
    "test_name": "node ./tests/test_name",
    "test_top_one": "node ./tests/test_top_one",
    "test_version": "node ./tests/test_version"
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
  "homepage": "https://github.com/jman717/QueueObj",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/jman717/QueueObj.git"
  },
  "deprecated": false,
  "description": "Queue Objects For Processing",
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

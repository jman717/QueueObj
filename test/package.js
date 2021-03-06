const assert = require('assert'),
    jsonHasDifferences = require('compare-json-difference'),
    packagejson = require('../package.json')

const packageMock = {
  "author": {
    "name": "Jim Manton"
  },
  "version": "7.2.2",
  "bundleDependencies": false,
  "dependencies": {
    "chai": "^4.3.3",
    "colors": "^1.4.0",
    "compare-json-difference": "^0.1.3",
    "mocha": "^8.4.0"
  },
  "scripts": {
    "start": "node app.ts",
    "test": "mocha"
  },
  "keywords": [
    "queue",
    "processing",
    "appenders",
    "javascript",
    "asynchronous",
    "synchronous",
    "await",
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
        assert(!jsonHasDifferences(packagejson, packageMock, true))
    })

    it('should fail', function () {
        packageMock.version = '0'
        assert(jsonHasDifferences(packagejson, packageMock, true))
    })
})

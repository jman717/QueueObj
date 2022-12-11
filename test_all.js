var colors = require('colors')

var queue = require("./app.js");

class test1 {
  process(callback) {
    callback({ success: { msg: `processing all test1` } })
  }
}

class test2 {

  process(callback) {
    callback({ success: { msg: `processing all test2` } })
  }
}

class test3 {
  process(callback) {
    callback({success: { msg: `processing all test3` }})
    // callback({ error: { msg: `there is some problem thrown here on test3` } })
  }
}

class test4 {
  process(callback) {
    callback({ success: { msg: `processing all test4` } })
  }
}

let qObj = new queue(), props = { appender: 'all', stats: true }

qObj.load(props).add(new test1()).add(new test2()).add(new test3()).add(new test4()).process({}).then(res => {
  qObj.logMsg(`success with all processing: (${res})`.bold.italic.green)
}, err => {
  qObj.logMsg(`error with all processing: (${err})`.red)  //show the execution time
})

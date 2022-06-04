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
  console.log(`success with all processing: (${JSON.stringify(res)})`.bold.italic.green)
}, err => {
  // console.log(`error with all processing: (${JSON.stringify(err)})`.red)  //show all results
  console.log(`error with all processing: (${err.execution_time})`.red)  //show the execution time
  err.responses.map((jItem, i) => {
    if (typeof jItem.error != 'undefined' && typeof jItem.error.msg != 'undefined') {
      console.log(`error: ${jItem.error.msg}`.red)  //show the error
    }
  })
})

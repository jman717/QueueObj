var colors = require('colors')

var queue = require("./app.js");

class test1 {
    process(callback) {
        callback({success: {msg: `processing test1`}})
    }
}

class test2 {
    process(callback) {
        callback({success: {msg: `processing test2`}})
    }
}

class test3 {
    process(callback) {
        callback({success: {msg: `processing test3`}})
    }
}

let qObj = new queue(), props = { appender: 'bottom_one', stats: false}

qObj.load(props).add(new test1()).add(new test2(qObj)).add(new test3()).process({}).then(res => {
    qObj.logMsg(`success with all sync processing: (${res})`.bold.italic.green)
}, err => {
    qObj.logMsg(`errors with all sync processing: (${err})`.red)
})

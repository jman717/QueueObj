var colors = require('colors')

var queue = require("./app.js");

class test1 {
    some_function(callback) {
        callback({success: {msg: `some_function test1`}})
    }
}

class test2 {
    a_func(callback) {
        callback({success: {msg: `a_func test2`}})
    }
}

class test3 {
    constructor(obj, run_func) {
        obj.add(run_func.some_new_func)
    }
    cool(callback) {
        callback({success: {msg: `cool test3`}})
    }
}

class test4 {
    some_new_func(callback) {
        callback({success: {msg: `some_new_func test4`}})
    }
}

let qObj = new queue(), props = { appender: 'func_all' }

let tst1 = new test1(),
    tst4 = new test4(),
    tst2 = new test2(),
    tst3 = new test3(qObj, tst4)

qObj.load(props).add(tst1.some_function).add(tst2.a_func).add(tst3.cool).process().then(res => {
    qObj.logMsg(`success with func_all processing: (${res})`.bold.italic.green)
}, err => {
    qObj.logMsg(`errors with func_all processing: (${err})`.red)
})


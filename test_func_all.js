var colors = require('colors')

var queue = require("./app.js");

class test1 {
    some_function(callback) {
        console.log(`some_function test1`.cyan)
        callback()
    }
}

class test2 {
    a_func(callback) {
        console.log(`a_func test2`.cyan)
        callback()
    }
}

class test3 {
    constructor(obj, run_func) {
        obj.add(run_func.some_new_func)
    }
    cool(callback) {
        console.log(`cool test3`.cyan)
        callback()
    }
}

class test4 {
    some_new_func(callback) {
        console.log(`some_new_func test4`.cyan)
        callback()
    }
}

let qObj = new queue(), props = { appender: 'func_all' }

let tst1 = new test1(),
    tst4 = new test4(),
    tst2 = new test2(),
    tst3 = new test3(qObj, tst4)

qObj.load(props).add(tst1.some_function).add(tst2.a_func).add(tst3.cool).process().then(res => {
    console.log(`success processing`.green)
})


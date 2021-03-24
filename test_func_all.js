var colors = require('colors')

var queue = require("./app.js");

class test1 {
  some_function(callback){
    console.log(`some_function test1`.cyan)
    callback()
  }
}

class test2 {
  a_func(callback){
    console.log(`a_func test2`.cyan)
    callback()
  }
}

class test3 {
  cool(callback){
    console.log(`cool test3`.cyan)
    callback()
  }
}

let tst1 = new test1(),
    tst2 = new test2(),
    tst3 = new test3()

let qObj = new queue(), props = { appender: 'func_all'}

qObj.load(props).add(tst1.some_function).add(tst2.a_func).add(tst3.cool).process().then(res => {
  console.log(`done`)
})

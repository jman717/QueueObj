var colors = require('colors')

var queue = require("./app.js");

class test1 {
  process(callback){
    console.log(`processing test1`.cyan)
    callback()
  }
}

class test2 {
  process(callback){
    console.log(`processing test2`.cyan)
    callback()
  }
}

class test3 {
  process(callback){
    console.log(`processing test3`.cyan)
    callback()
  }
}

let qObj = new queue(), props = { appender: 'top_one'}

qObj.load(props).add(new test1()).add(new test2()).add(new test3())

qObj.process().then(res => {
  console.log(`done with 1st obj`.green)
})

qObj.process().then(res => {
  console.log(`done with 2nd obj`.green)
})

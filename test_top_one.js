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

let qObj = new queue(), props = { appender: 'top_one', stats: true}

qObj.load(props).add(new test1()).add(new test2(qObj)).add(new test3()).process({}).then(res => {
  console.log(res)
}, err => {
  console.log(`errors with top item processing: (${err})`.red)
})

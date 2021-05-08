var colors = require('colors')

var queue = require("./app.js");

class test1 {
  process(callback){
    console.log(`processing all test1`.cyan)
    callback()
  }
}

class test2 {
  constructor(obj){
    obj.add(new test4())
  }

  process(callback){
    console.log(`processing all test2`.cyan)
    callback()
  }
}

class test3 {
  process(callback){
    console.log(`processing all test3`.cyan)
    callback()
  }
}

class test4 {
  process(callback){
    console.log(`processing all test4`.cyan)
    callback()
  }
}

let qObj = new queue(), props = { appender: 'all'}

qObj.load(props).add(new test1()).add(new test2(qObj)).add(new test3()).process({}).then(res => {
  console.log(`done`)
}, err => {
  console.log(`errors with all processing: (${err})`.red)
})

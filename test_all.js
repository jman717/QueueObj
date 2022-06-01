var colors = require('colors')

var queue = require("./app.js");

class test1 {
  process(callback){
    callback({success: `processing all test1`})
  }
}

class test2 {
  constructor(obj){
    obj.add(new test4())
  }

  process(callback){
    callback({success: `processing all test2`})
  }
}

class test3 {
  process(callback){
    callback({success: `processing all test3`})
  }
}

class test4 {
  process(callback){
    callback({success: `processing all test4`})
  }
}

let qObj = new queue(), props = { appender: 'all', stats: true}

qObj.load(props).add(new test1()).add(new test2(qObj)).add(new test3()).process({}).then(res => {
  console.log(res)
}, err => {
  console.log(`errors with all processing: (${err})`.red)
})

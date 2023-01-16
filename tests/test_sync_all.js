/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2021-03-22
* test_sync.js
*/

var colors = require('colors')
var queue = require("./app.js");

class test1 {
    constructor() {
        this.id = 100
        this.process = this.process.bind(this)
    }

    process(callback) {
        setTimeout(() => {
            qObj.logMsg(`processing test1`.cyan)
            qObj.logMsg(`some async process`)
            callback({success: {msg: `processing all (${this.id})`}})
        }, 3000)
    }
}

class test2 {
    constructor() {
        this.id = 200
        this.process = this.process.bind(this)
    }

    process(callback) {
        let msg = `some kinda problem here in id(${this.id})`
        // callback({error: {msg: msg}})  //this will show errors
        callback({success: {msg: `processing all (${this.id})}`}})   //this will show no errors
    }

    ping() {
        qObj.logMsg('hello from test2'.rainbow)
    }
}

class test3 {
    constructor() {
        this.id = 300
        this.process = this.process.bind(this)
    }

    process(callback) {
        callback({success: {msg: `processing all (${this.id})}`}})   
    }
}

class test4 {
    constructor() {
        let t = this
        t.id = 400
        t.custom_function = t.custom_function.bind(this)
    }

    custom_function(callback) {
        let msg = `custom func problem here id(${this.id})`
        setTimeout(() => {
            // callback({error: {msg: msg}})  //this will show errors
            callback({success: {msg: `processing all (${this.id})}`}})   //this will show no errors
        }, 3000)
    }
}
let tst4 = new test4()
let qObj = new queue(), props = { appender: 'sync_all' }

qObj.load(props).add(new test1()).add(new test2()).add(new test3()).add(tst4.custom_function)

qObj.process().then(res => {
    qObj.logMsg(`success with all sync processing: (${res})`.bold.italic.green)
}, err => {
    qObj.logMsg(`errors with all sync processing: (${err})`.red)
})



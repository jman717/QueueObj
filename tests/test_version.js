/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2021-03-22
* test_status.js
*/

var colors = require('colors')
var queue = require("./app.js");

class test1 {
    constructor() {
        let t = this
        t.id = 100
        t.version = "dev"

        t.process = t.process.bind(t)
    }

    process(callback) {
        callback({success: {msg: `processing test1 id(${this.id}) version(${this.version})`}})
    }
}

class test2 {
    constructor() {
        let t = this
        t.id = 200
        t.version = "dev"

        t.process = t.process.bind(t)
    }

    process(callback) {
        callback({success: {msg: `processing test2 id(${this.id}) version(${this.version})`}})
    }

    ping() {
        qObj.logMsg('hello from test2'.rainbow)
    }
}

class test3 {
    constructor() {
        let t = this
        t.id = 300
        t.version = "test"

        t.process = t.process.bind(t)
    }

    process(callback) {
        callback({success: {msg: `processing test3 id(${this.id}) version(${this.version})`}})
    }
}

class test4 {
    constructor() {
        let t = this
        t.id = 400
        t.version = "prod"

        t.process = t.process.bind(t)
    }

    process(callback) {
        callback({success: {msg: `processing test4 id(${this.id}) version(${this.version})`}})
    }
}

class test5 {
    constructor() {
        let t = this
        t.id = 500
        t.version = "v1234"

        t.process = t.process.bind(t)
    }

    process(callback) {
        callback({success: {msg: `processing test5 id(${this.id}) version(${this.version})`}})
    }
}
let qObj = new queue(), props = { appender: 'version' }

qObj.load(props).add(new test1()).add(new test2()).add(new test3()).add(new test4()).add(new test5())

qObj.process({ property: 'version', items: ['dev', 'test'] }).then(res => {
    qObj.logMsg(`success with status processing: (${JSON.stringify(res)})`.bold.italic.green)
}, err => {
    qObj.logMsg(`errors with status processing: (${JSON.stringify(err)})`.red)
})

// qObj.process({ property: 'version', items: ['v1234'] }).then(res => {
//     qObj.logMsg(`4) done with version synchronous processing: (${res})`.bold.italic.green)
// }, err => {
//     qObj.logMsg(`4) errors with version synchronous processing: (${err})`.red)
// })
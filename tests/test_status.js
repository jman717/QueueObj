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
        t.status = "new"

        t.process = t.process.bind(t)
    }

    process(callback) {
        callback({success: {msg: `processing test1 id(${this.id}) status(${this.status})`}})
    }
}

class test2 {
    constructor() {
        let t = this
        t.id = 200
        t.status = "error"

        t.process = t.process.bind(t)
    }

    process(callback) {
        let t = this, msg = `some kinda problem here`
        // callback({error: {msg: msg}})  //this will show errors
        callback({success: {msg: `processing test2 id(${this.id}) status(${this.status})`}})  //this will show no errors
    }

    ping() {
        qObj.logMsg('hello from test2'.rainbow)
    }
}

class test3 {
    constructor() {
        let t = this
        t.id = 300
        t.status = "secondary"

        t.process = t.process.bind(t)
    }

    process(callback) {
        callback({success: {msg: `processing test3 id(${this.id}) status(${this.status})`}})  //this will show no errors
    }
}

class test4 {
    constructor() {
        let t = this
        t.id = 400
        t.status = "new"

        t.process = t.process.bind(t)
    }

    process(callback) {
        callback({success: {msg: `processing test4 id(${this.id}) status(${this.status})`}})  //this will show no errors
    }
}

let qObj = new queue(), props = { appender: 'status', stats: true }

qObj.load(props).add(new test1()).add(new test2()).add(new test3()).add(new test4())

qObj.process({ property: 'status', items: ['init'] }).then(res => {
    qObj.logMsg(`success with status processing: (${res})`.bold.italic.green)
}, err => {
    qObj.logMsg(`errors with status processing: (${err})`.red)
})

// qObj.process({ property: 'status', items: ['error'] }).then(res => {
//     qObj.logMsg(`success with status error processing: (${JSON.stringify(res)})`.bold.italic.green)
// }, err => {
//     qObj.logMsg(`errors with status error processing: (${JSON.stringify(err)})`.red)
// })
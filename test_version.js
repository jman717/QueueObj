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
        let t = this
        console.log(`processing test1 version(${t.version})`.cyan)
        this.status = "done"
        callback()
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
        let t = this, msg = `some kinda error is detected here`
        console.log(`processing test2 version(${t.version})`.cyan)
        // callback({error: {msg: msg}})  //this will show errors
        callback()  //this will have no errors
    }

    ping() {
        console.log('hello from test2'.rainbow)
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
        let t = this
        console.log(`processing test3 version(${t.version})`.cyan)
        console.log(`some async process`)
        callback()
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
        let t = this
        console.log(`processing test4 version(${t.version})`.cyan)
        callback()
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
        let t = this
        console.log(`processing test5 version(${t.version})`.cyan)
        callback()
    }
}
let qObj = new queue(), props = { appender: 'version' }

qObj.load(props).add(new test1()).add(new test2()).add(new test3()).add(new test4()).add(new test5())

qObj.await({ version: ['dev', 'test'] }).then(res => {
    console.log(`1) done with version['dev', 'test']: (${res})`.green)
}, err => {
    console.log(`1) error['dev', 'test']: (${err})`.red)
})

qObj.await({ version: ['prod'] }).then(res => {
    console.log(`2) done with version['prod']: (${res})`.green)
}, err => {
    console.log(`2) error['prod']: (${err})`.red)
})

qObj.await({ version: ['v1234'] }).then(res => {
    console.log(`3) done with version['v1234']: (${res})`.green)
}, err => {
    console.log(`3) error['v1234']: (${err})`.red)
})

qObj.process().then(res => {
    console.log(`4) done with version synchronous processing: (${res})`.bold.italic.blue)
}, err => {
    console.log(`4) errors with version synchronous processing: (${err})`.red)
})
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
        console.log(`processing test1`.cyan)
        this.status = "done"
        callback()
    }
}

class test2 {
    constructor() {
        let t = this
        t.id = 200
        t.status = "new"

        t.process = t.process.bind(t)
    }

    process(callback) {
        let t = this, msg = `some kinda problem here`
        console.log(`processing test2`.cyan)
        t.status = "error"
        callback({error: {msg: msg}})  //this will show errors
        //t.status = "done"
        //callback()  //this will show no errors
    }

    ping() {
        console.log('hello from test2'.rainbow)
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
        setTimeout(()=>{
            console.log(`processing test3`.cyan)
            console.log(`some async process`)
            this.status = "done"
            callback()
        }, 2000)
    }
}

class test4 {
    constructor() {
        let t = this
        t.id = 400
        t.status = "new"
    }

    process(callback) {
        console.log(`processing test4`.cyan)
        callback()
    }
}

let qObj = new queue(), props = { appender: 'status' }

qObj.load(props).add(new test1()).add(new test2()).add(new test3()).add(new test4())

qObj.await({ status: ['new', 'secondary'] }).then(res => {
    console.log(`1) done with status'[new', 'secondary']: (${res})`.green)
}, err => {
    console.log(`1) error['new', 'secondary']: (${err})`.red)
})

qObj.await({ status: ['third'] }).then(res => {
    console.log(`2) done with status['third']: (${res})`.green)
}, err => {
    console.log(`2) error['third']: (${err})`.red)
})

qObj.process().then(res => {
    console.log(`3) done with status processing: (${res})`.bold.italic.blue)
}, err => {
    console.log(`3) errors with status processing: (${err})`.red)
})
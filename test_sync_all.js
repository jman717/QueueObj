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
    }

    process(callback) {
        console.log(`processing test1`.cyan)
        callback()
    }
}

class test2 {
    constructor() {
        this.id = 200
    }

    process(callback) {
        let msg = `some kinda problem here`
        console.log(`processing test2`.cyan)
        //callback({error: {msg: msg}})  //this will show errors
        callback()  //this will show no errors
    }

    ping() {
        console.log('hello from test2'.rainbow)
    }
}

class test3 {
    constructor() {
        this.id = 300
    }

    process(callback) {
        console.log(`processing test3`.cyan)
        callback()
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
        console.log(`processing test4`.cyan)
        //callback({error: {msg: msg}})  //this will show errors
        callback()  //this will show no errors
    }
}
let tst4 = new test4()
let qObj = new queue(), props = { appender: 'sync_all' }

qObj.load(props).add(new test1()).add(new test2()).add(new test3()).add(tst4.custom_function)

qObj.process().then(res => {
    console.log(`done with all sync processing: (${res})`.bold.italic.white)
}, err => {
    console.log(`errors with all sync processing: (${err})`.red)
})



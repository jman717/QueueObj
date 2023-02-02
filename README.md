[![npm Package](https://img.shields.io/npm/v/queueobj.svg)](https://www.npmjs.org/package/queueobj)
[![License](https://img.shields.io/npm/l/queueobj.svg)](https://github.com/jman717/queueobj/blob/master/LICENSE)
[![CodeQL](https://github.com/jman717/QueueObj/actions/workflows/github-actions.yml/badge.svg)](https://github.com/jman717/QueueObj/blob/main/.github/workflows/github-actions.yml)
[![Node.js CI](https://github.com/jman717/QueueObj/actions/workflows/node.js.yml/badge.svg)](https://github.com/jman717/QueueObj/actions/workflows/node.js.yml)

[![NPM](https://nodei.co/npm/queueobj.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/queueobj/)

Queue javascript objects dynamically then process the queue according to the appender.

Included tag appenders:

* all - synchronous - process all added objects.
* func_all - synchronous - process custom functions to added objects.
* top_one - synchronous - process only the object in the 0(zero) position of the process array.
* bottom_one - synchronous - process only the object in the last position of the process array.
* sync_all - synchronous - All appenders are synchronous now. Sync_all is no different than all.
* status - synchronous - queue and process all objects by status.
* name - synchronous - queue and process all objects by name.
* version - synchronous - queue and process all objects by version.

Mocha Test
---------
```
npm test
```

General Setup Test
---------
```
npm run test_all
npm run test_top_one
npm run test_bottom_one
npm run test_func_all
npm run test_sync_all
npm run test_status
npm run test_version
npm run test_name

```

Usage
---------
```js

var colors = require('node-console-colors')
var queue = require("queueobj");

class test1 {
    constructor() {
        this.id = 100
        this.process = this.process.bind(this)
    }

    process(callback) {
        setTimeout(() => {
            console.log(`processing test1`.cyan)
            console.log(`some async process`)
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
        console.log('hello from test2'.rainbow)
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
let qObj = new queue(), props = { appender: 'name' }

qObj.load(props).add(new test1()).add(new test2()).add(new test3()).add(tst4.custom_function)

qObj.process().then(res => {
    console.log(`success with all sync processing: (${JSON.stringify(res)})`.bold.italic.green)
}, err => {
    console.log(`errors with all sync processing: (${JSON.stringify(err)})`.red)
})

```


# QueueObj
Queue javascript objects dynamically then process the queue according to the appender.

Included tag appenders:

* all - asynchronous - process all added objects.
* func_all - asynchronous - process custom functions to added objects.
* top_one - asynchronous - process only the object in the 0(zero) position of the process array.
* bottom_one - asynchronous - process only the object in the last position of the process array.
* array - asynchronous - process object in various ways: by items, or by Ids.
* sync - synchronous - process object in various ways: by items, or by Ids.

Installation
---------
```
npm install QueueObj
```

Mocha Test
---------
```
npm test
```

General Setup Test
---------
```
node test_all
node test_top_one
node test_bottom_one
node test_func_all
node test_array
node test_sync

```

Usage
---------
```js

var colors = require('colors')
var queue = require("queueobj");

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
        callback({error: {msg: msg}})  //this will show errors
        //callback()  //this will show no errors
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

let qObj = new queue(), props = { appender: 'sync' }

qObj.load(props).add(new test1()).add(new test2()).add(new test3())

qObj.await({ items: [0, 1] }).then(res => {
    console.log(`1) done with items[0,1]: (${res})`.green)
}, err => {
    console.log(`1) error[0, 1]: (${err})`.red)
})

qObj.await({ items: [1, 2] }).then(res => {
    console.log(`2) done with items[1,2]: (${res})`.green)
}, err => {
    console.log(`2) error[1,2]: (${err})`.red)
})

qObj.await({ items: [2, 1, 2] }).then(res => {
    console.log(`3) done with items[2,1,2]: (${res})`.green)
}, err => {
    console.log(`3) error[2, 1, 2]: (${err})`.red)
})

qObj.await({ items: [2] }).then(res => {
    console.log(`4) done with item[2]: (${res})`.green)
}, err => {
    console.log(`4) error[2]: (${err})`.red)
})

qObj.await({ items: [0] }).then(res => {
    console.log(`5) done with item[0]: (${res})`.green)
}, err => {
    console.log(err.red)
})

qObj.getObjectById(200).ping()

qObj.await({ byIds: [300, 200, 100] }).then(res => {
    console.log(`6) done with byId: [300, 200, 100] (${res})`.bold.italic.underline.yellow)
}, err => {
    console.log(`6) error[300, 200, 100]: (${err})`.red)
})

qObj.await({ byIds: [300] }).then(res => {
    console.log(`7) done with byId: [300] (${res})`.bold.italic.underline.yellow)
}, err => {
    console.log(`7) error[300]: (${err})`.red)
})

qObj.process().then(res => {
    console.log(`8) done with all sync processing: (${res})`.bold.italic.white)
}, err => {
    console.log(`8) errors with all sync processing: (${err})`.red)
})

```


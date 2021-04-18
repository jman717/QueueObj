# QueueObj
Queue javascript objects dynamically then process the queue according to the appender.

Included tag appenders:

* all - process all added objects.
* func_all - process custom functions to added objects.
* top_one - process only the object in the 0(zero) position of the process array.
* bottom_one - process only the object in the last position of the process array.
* array - process object in various ways: all, by items, or by Ids.

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

```

Usage
---------
```js

var colors = require('colors')

var queue = require("QueueObj");

class test1 {
    process(callback) {
        console.log(`processing test1`.cyan)
        callback()
    }
}

class test2 {
    constructor(){
        this.id = 200
    }

    process(callback) {
        console.log(`processing test2`.cyan)
        callback()
    }

    ping(){
        console.log('hello from test2'.rainbow)
    }
}

class test3 {
    process(callback) {
        console.log(`processing test3`.cyan)
        callback()
    }
}

let qObj = new queue(), props = { appender: 'array' }

qObj.load(props).add(new test1()).add(new test2()).add(new test3())

qObj.process({ items: [0, 1] }).then(res => {
    console.log(`done with items[0,1]`.green)

    qObj.process({ items: [1, 2] }).then(res => {
        console.log(`done with items[1,2]`.green)

        qObj.process({ items: [2, 1, 2] }).then(res => {
            console.log(`done with items[2,1,2]`.green)
            qObj.process({ items: [2] }).then(res => {
                console.log(`done with item[2]`.green)
                qObj.process({ items: [6] }).then(res => {
                    console.log(`done with item[6]`.green)
                }, err => {
                    console.log(err.red)
                })
            })
        })
    })
})

qObj.getObjectById(200).ping()

qObj.process({ byIds: [100, 300] }).then(res => {
    console.log(`done with byId: [100, 300]`.bold.italic.underline.yellow)
})

qObj.process().then(res => {
    console.log(`done with all processing`.bold.italic.underline.green)
})

```


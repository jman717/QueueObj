var colors = require('colors')

var queue = require("./app.js");

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
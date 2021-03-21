    "use strict"

/* @author Jim Manton: jrman@risebroadband.net
* @since 2021-03-19
* Main processing app
*/

var colors = require('colors')

class QueueObj {
    constructor({ display, output }) {
        var t = this
        try {
            console.log(`jrm debug 3/20`)
        } catch (e) {
            e.message = "log4js-tagline app.js init error: " + e.message
            throw (e)
        }
    }
}

export default queueObjects;

exports = module.exports = function ( props ) {
    return new QueueObj( props )
}


/*
class queueObjects {
    constructor(props) {
        this.objectsArray = []
        this.process = this.process.bind(this)
        this.all = this.all.bind(this)
        this.resolve = null
        this.reject = null
    }

    add = (obj) => {
        if (typeof obj == 'object') {
            this.objectsArray.push(obj)
        }
        return this
    }

    process = (props) => {
        if (typeof props != `undefined` &&
            typeof props.what != `undefined`) {
            switch (props.what) {
                case 'item':
                    if (typeof props.index == 'number')
                        return this.item(props)
                case 'all':
                    return new Promise((resolve, reject) => {
                        this.resolve = resolve
                        this.reject = reject
                        this.all()
                    });
            }
        }
    }

    item = (props) => {
        alert(`jrm debug 3/19 item 10.00 (${JSON.stringify(this.processed)})`)
        // if (typeof this.objectsArray[props.index] != 'undefined' &&
        //     typeof this.objectsArray[props.index].process == 'function') {
        //     if (this.processed.indexOf(props.index) < 0)
        //         this.processed.push(props.index)
        //     return new Promise((resolve, reject) => {
        //         //reject('some error')
        //         if (this.processed <= this.objectsArray.length)
        //             if (typeof this.objectsArray[props.index] != 'undefined' &&
        //                 typeof this.objectsArray[props.index].process == 'function')
        //                 resolve(this.objectsArray[props.index].process())
        //         reject(`no function to process()`)
        //     });
        // }
        // return new Promise((resolve, reject) => {
        //     reject(`no object to process()`)
        // });
    }

    all = () => {
        if (this.objectsArray.length == 0) {
            this.resolve(`jrm debug 3/19 done with all`)
        } else {
            this.objectsArray[0].process(() => {
                this.objectsArray.shift()
                this.all()
            })
        }
    }
}

export default queueObjects;
*/
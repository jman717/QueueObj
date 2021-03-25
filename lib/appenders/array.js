/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2021-03-22
*/

var base = require('./base.js')
var colors = require('colors')

exports = module.exports = class array extends base {
    constructor(props) {
        super(props)
        var t = this
        t.aname = 'all.js'
        t.process_array = []
        t.process = t.process.bind(this)
        return t
    }

    process(array = []) {
        let t = this, obj, itm
        if (typeof array != 'undefined' && typeof array.items != 'undefined' && array.items.length > 0) {
            t.getParent().resolve = null
            t.getParent().reject = null
            t.process_array = array
        }
        if (t.getParent().resolve == null && t.getParent().reject == null) {
            return new Promise((resolve, reject) => {
                t.getParent().resolve = resolve
                t.getParent().reject = reject
                t.process()
            });
        }
        itm = t.process_array.items.shift()
        obj = t.getParent().getItemToProcess(itm)
        if (t.getParent().objs.length < itm)
            return t.getParent().reject(`item (${itm}) has no associated object`)
        if (typeof obj == 'undefined') {
            return t.getParent().resolve('processing done')
        }

        obj.process(() => {
            t.process()
        })
    }
}

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
        t.process_props = []
        t.process = t.process.bind(this)
        return t
    }

    process(props) {
        let t = this, pop = { items: [] }
        if (typeof props == 'undefined') {
            t.getParent().objs.map((item, i) => {
                pop.items.push(i)
            })
            return t.process_all(pop)

        }

        if ((typeof props != 'undefined' &&
            typeof props.items != 'undefined' &&
            props.items.length > 0)) {
            return t.process_items(props)
        }

        if ((typeof props != 'undefined' &&
            typeof props.byIds != 'undefined' &&
            props.byIds.length > 0)) {
            return t.process_byIds(props)
        }
    }

    process_items(props) {
        let t = this, obj, itm
        if ((typeof props != 'undefined' &&
            typeof props.items != 'undefined' &&
            props.items.length > 0)) {
            t.getParent().resolve = null
            t.getParent().reject = null
            t.process_props = props
        }
        if (t.getParent().resolve == null && t.getParent().reject == null) {
            return new Promise((resolve, reject) => {
                t.getParent().resolve = resolve
                t.getParent().reject = reject
                t.process_items()
            });
        }

        if (typeof t.process_props != 'undefined' &&
            typeof t.process_props.items != 'undefined') {
            itm = t.process_props.items.shift()
            obj = t.getParent().getItemToProcess(itm)
        } else {
            itm = null
            obj = null
        }

        if (obj == null || typeof obj == 'undefined') {
            return t.getParent().resolve('processing done')
        }

        obj.process(() => {
            t.process_items()
        })
    }

    process_byIds(props) {
        let t = this, obj, itm
        if ((typeof props != 'undefined' &&
            typeof props.byIds != 'undefined' &&
            props.byIds.length > 0)) {
            t.getParent().resolve = null
            t.getParent().reject = null
            t.process_props = props
        }
        if (t.getParent().resolve == null && t.getParent().reject == null) {
            return new Promise((resolve, reject) => {
                t.getParent().resolve = resolve
                t.getParent().reject = reject
                t.process_byIds()
            });
        }

        if (typeof t.process_props != 'undefined' &&
            typeof t.process_props.byIds != 'undefined') {
            itm = t.process_props.byIds.shift()
            obj = t.getParent().getItemToProcess(itm)
        } else {
            itm = null
            obj = null
        }
        if (itm == null) {
            return t.getParent().reject(`no item to process`)
        }
        if (obj == null || typeof obj == 'undefined') {
            return t.getParent().resolve('processing done')
        }

        obj.process(() => {
            t.process_byIds()
        })
    }

    process_all(props) {
        let t = this, obj, itm

        if ((typeof props != 'undefined' &&
            typeof props.items != 'undefined' &&
            props.items.length > 0)) {
            t.getParent().resolve = null
            t.getParent().reject = null
            t.process_props = props
        }

        if (t.getParent().resolve == null && t.getParent().reject == null) {
            return new Promise((resolve, reject) => {
                t.getParent().resolve = resolve
                t.getParent().reject = reject
                t.process_all()
            });
        }

        if (typeof t.process_props != 'undefined' &&
            typeof t.process_props.items != 'undefined') {
            itm = t.process_props.items.shift()
            obj = t.getParent().getItemToProcess(itm)
        } else {
            itm = null
            obj = null
        }

        if (obj == null || typeof obj == 'undefined') {
            return t.getParent().resolve('processing done')
        }

        obj.process(() => {
            t.process_all()
        })
    }
}

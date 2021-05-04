/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2021-03-22
* lib/appenders/sync.js
*/

var base = require('./base.js')
var colors = require('colors')

exports = module.exports = class sync extends base {
    constructor(props) {
        super(props)
        var t = this
        t.aname = 'async.js'
        t.props_array = []
        t.resolve_array = []
        t.reject_array = []
        t.process_item = -1
        t.process_array_item = -1

        t.process = t.process.bind(this)
        t.process_all = t.process_all.bind(this)
        t.add = t.add.bind(this)
        return t
    }

    add(props) {
        let t = this
        t.props_array.push(props)
        return new Promise((resolve, reject) => {
            t.resolve_array.push(resolve)
            t.reject_array.push(reject)
        });
    }

    process() {
        let t = this
        t.process_item = 0
        t.process_array_item = 0
        return new Promise((resolve, reject) => {
            t.props_array.push({ the: 'end' })
            t.resolve_array.push(resolve)
            t.reject_array.push(reject)
            t.process_all()
        });
    }

    process_all() {
        let t = this, obj
        t.props_array.map((props, i) => {
            if (i == t.process_item) {
                if (typeof props != 'undefined' && typeof props.the != 'undefined' && props.the == 'end') {
                    t.resolve_array[i](`success`)
                }

                if (typeof props != 'undefined' && typeof props.do != 'undefined' && props.do == 'all') {
                    props.items = []
                    t.props_array.map((itm, y)=>{
                        props.items.push(y)
                    })
                }

                if (typeof props != 'undefined' && typeof props.items != 'undefined') {
                    props.items.map((pItem, x) => {
                        if (x == t.process_array_item) {
                            obj = t.getParent().getItemToProcess(pItem)
                            obj.process(() => {
                                t.process_array_item++
                                if (t.process_array_item < props.items.length) {
                                    t.process_all()
                                } else {
                                    t.resolve_array[t.process_item](`success`)
                                    t.process_item++
                                    t.process_array_item = 0
                                }
                            })
                        }
                    })
                }

                if (typeof props != 'undefined' && typeof props.byIds != 'undefined') {
                    props.byIds.map((pItem, x) => {
                        if (x == t.process_array_item) {
                            obj = t.getParent().getObjectById(pItem)
                            obj.process(() => {
                                t.process_array_item++
                                if (t.process_array_item < props.byIds.length) {
                                    t.process_all()
                                } else {
                                    t.resolve_array[t.process_item](`success`)
                                    t.process_item++
                                    t.process_array_item = 0
                                }
                            })
                        }
                    })
                }
            }
        })
    }
}

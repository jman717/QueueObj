"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2017-10-01
*/

exports = module.exports = class base {
    constructor(props) {
        let t = this
        t.aname = 'sync.js'
        t.props_array = []
        t.resolve_array = []
        t.reject_array = []
        t.process_item = -1
        t.process_array_item = -1
        t.any_errors = false
        t.getParent = props.getParent

        t.process = t.process.bind(this)
        t.process_all = t.process_all.bind(this)
    }

    await(props) {
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
        let t = this, obj, msg, xItems = null, pro
        t.props_array.map((props, i) => {
            if (i == t.process_item) {
                if (typeof props != 'undefined' && typeof props.the != 'undefined' && props.the == 'end') {
                    if (t.any_errors)
                        t.reject_array[i](`there were errors`)
                    else
                        t.resolve_array[i](`success`)
                    return
                }

                if (typeof props != 'undefined') {
                    if (typeof props.items != 'undefined')
                        xItems = props.items
                    if (typeof props.byIds != 'undefined')
                        xItems = props.byIds
                }

                if (xItems != null) {
                    xItems.map((pItem, x) => {
                        if (x == t.process_array_item) {
                            obj = (typeof props.items != 'undefined') ? t.getParent().getItemToProcess(pItem) : t.getParent().getObjectById(pItem);
                            pro = (typeof obj == 'function') ? obj : obj.process;

                            pro((obj_props) => {
                                if (typeof obj_props != 'undefined' &&
                                    typeof obj_props.error != 'undefined' &&
                                    typeof obj_props.error.msg != 'undefined' &&
                                    typeof obj_props.error.msg == 'string') {
                                    msg = `error: ${obj_props.error.msg}`
                                    msg += (typeof obj.id != 'undefined') ? ` id(${obj.id})` : ``;
                                    t.any_errors = true
                                    t.reject_array[t.process_item](msg)
                                }
                                t.process_array_item++
                                if (t.process_array_item < xItems.length) {
                                    t.process_all()
                                } else {
                                    msg = `success`
                                    t.resolve_array[t.process_item](msg)
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


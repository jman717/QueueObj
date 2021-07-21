/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2017-10-01
* lib/appenders/base.js
*/

var colors = require('colors')

exports = module.exports = class base {
    constructor(props) {
        let t = this
        t.props_array = []
        t.resolve_array = []
        t.reject_array = []
        t.status_props_array = []
        t.process_item = -1
        t.process_array_item = -1
        t.any_errors = false
        t.getParent = props.getParent
        t.dt_start = null
        t.dt_end = null

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
        t.dt_start = new Date(); // start measuring time
        t.props_array = []
        t.resolve_array = []
        t.reject_array = []
        t.status_props_array = []

        return new Promise((resolve, reject) => {
            t.props_array.push({ the: 'end' })
            t.resolve_array.push(resolve)
            t.reject_array.push(reject)
            t.process_all()
        });
    }

    getStats() {
        let t = this, msg, st = `${t.dt_start}`.green, ed = `${t.dt_end}`.green, ml = `${t.dt_end - t.dt_start}`.green
        msg = `success`.green
        if (t.getParent().getStats())
            msg += `\nstart(${st}) end(${ed}) milliseconds(${ml})`
        return msg
    }

    process_all() {
        let t = this, obj, xItems = null, pro, itm, msg
        t.props_array.map((props, i) => {
            if (i == t.process_item) {
                if (typeof props != 'undefined' && typeof props.the != 'undefined' && props.the == 'end') {
                    if (t.any_errors)
                        t.reject_array[i](`there were errors`)
                    else {
                        t.dt_end = new Date();
                        t.resolve_array[i](t.getStats())
                    }
                    return
                }

                if (typeof props != 'undefined') {
                    if (typeof props.items != 'undefined') {
                        xItems = props.items
                        itm = 'items'
                    }
                    if (typeof props.byIds != 'undefined') {
                        xItems = props.byIds
                        itm = 'byIds'
                    }
                    if (typeof props.status != 'undefined') {
                        xItems = []
                        if (t.status_props_array.length == 0) {
                            t.getParent().getObjs().map((aItem, i) => {
                                xItems.push(i)
                            })
                        }
                        itm = 'status'
                    }
                }

                if (xItems != null) {
                    xItems.map((pItem, x) => {
                        if (x == t.process_array_item) {
                            try {
                                switch (itm) {
                                    case 'status':
                                    case 'items':
                                        obj = t.getParent().getItemToProcess(pItem)
                                        break
                                    case 'byIds':
                                        obj = t.getParent().getObjectById(pItem);
                                        break
                                }
                            } catch (e) {
                                console.log(`base error: (${e.message})`.red)
                            }
                            pro = (typeof obj == 'function') ? obj : obj.process;
                            if (itm == 'status') {
                                if (typeof pro != 'undefined' &&
                                    typeof obj.status != 'undefined' &&
                                    props.status.indexOf(obj.status) > -1) {
                                    //do nothing
                                } else {
                                    t.process_array_item++
                                    if (t.process_array_item < xItems.length)
                                        t.process_all()
                                    return
                                }
                            }

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
                                if (t.process_array_item < xItems.length)
                                    t.process_all()
                                else {
                                    t.dt_end = new Date();
                                    t.resolve_array[t.process_item](t.getStats())
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


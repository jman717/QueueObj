/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2017-10-01
* lib/appenders/base.js
*/

var colors = require('colors')

exports = module.exports = class base {
    constructor(props) {
        let t = this
        t.await_array = []
        t.resolve_array = []
        t.reject_array = []
        t.process_objs_item = 0
        t.process_props_item = 0
        t.any_errors = false
        t.getParent = props.getParent
        t.dt_start = null
        t.dt_end = null

        t.process = t.process.bind(this)
        t.process_all = t.process_all.bind(this)
    }


    await(props) {
        let t = this
        t.await_array.push(props)
        return new Promise((resolve, reject) => {
            t.resolve_array.push(resolve)
            t.reject_array.push(reject)
        });
    }

    process() {
        let t = this
        t.process_objs_item = 0
        t.process_props_item = 0
        t.await_item = 0
        t.dt_start = new Date(); // start measuring time
        // t.await_array = []
        // t.resolve_array = []
        // t.reject_array = []
        // t.status_props_array = []

        return new Promise((resolve, reject) => {
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
        let t = this, obj, pro, itm, msg, itm_type, props_type, datA
        try {
            try {
                if (t.process_objs_item >= t.getParent().getObjs().length) {
                    t.await_item++
                    t.resolve_array[t.resolve_array.length - 1](t.getStats())
                    return
                }
            } catch (e) {
                return
            }
            try {
                datA = t.await_array[t.await_item].dat_array
            } catch (e) {
                return
            }
            try {

                datA.map((dat_item, i) => {
                    if (i == t.process_props_item) {
                        if (t.process_props_item < datA.length) {
                            if ((t.await_item) >= t.await_array.length) {
                                t.resolve_array[t.resolve_array.length - 1](t.getStats())
                                return
                            }
                            t.getParent().getObjs().map((pItem, x) => {
                                if (x == t.process_objs_item) {
                                    try {
                                        obj = t.getParent().getItemToProcess(x)
                                    } catch (e) {
                                        e.message = `base error: (${e.message})`
                                        throw e
                                    }
                                    if (typeof obj != 'undefined' && typeof obj.getType != 'function') {
                                        obj.getType = (o) => { return t.aname }
                                    }
                                    if (obj.getType(obj) == dat_item) {
                                        try {
                                            pro = (typeof obj == 'function') ? obj : obj.process;
                                        } catch (e) {
                                            console.log(`pro error: (${e.message})`.red)
                                            throw e
                                        }

                                        pro((obj_props) => {
                                            try {

                                                if (typeof obj_props != 'undefined') {
                                                    if (typeof obj_props.error != 'undefined' &&
                                                        typeof obj_props.error.msg != 'undefined' &&
                                                        typeof obj_props.error.msg == 'string') {
                                                        msg = `error: ${obj_props.error.msg}`
                                                        msg += (typeof obj.id != 'undefined') ? ` id(${obj.id})` : ``;
                                                        t.any_errors = true
                                                        t.reject_array[t.process_props_item](msg)
                                                    } else {
                                                        console.log(`${JSON.stringify(obj_props)}`.green)
                                                    }
                                                }
                                                t.process_objs_item++
                                                if (t.process_props_item < datA.length) {
                                                    t.process_all()
                                                } else {
                                                    t.dt_end = new Date();
                                                    t.resolve_array[t.process_props_item - 1](t.getStats())
                                                    t.process_props_item = 0
                                                    t.process_objs_item = 0
                                                }
                                            } catch (e) {
                                                console.log(`proessing error: (${e.message})`.red)
                                                throw e
                                            }
                                        })
                                    } else {
                                        t.process_objs_item++
                                        if (t.process_objs_item >= t.getParent().getObjs().length) {
                                            t.resolve_array[t.resolve_array.length - 1](t.getStats())
                                        }
                                    }
                                } else {
                                    if (t.process_objs_item >= t.getParent().getObjs().length) {
                                        t.process_objs_item = 0
                                        t.process_props_item++
                                        if (t.process_props_item >= datA.length) {
                                            t.await_item++
                                            t.process_props_item = 0
                                            if (t.await_item <= t.await_array.length)
                                                t.process_all()
                                        }
                                    }
                                }
                            })
                        }
                    }
                })
            } catch (e) {
                e.message = `await error: ${e.message}`
                throw e
            }
        } catch (e) {
            console.log(`process_all error: ${e.message}`.red)
        }
    }
}


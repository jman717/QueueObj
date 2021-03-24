"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2021-03-22
*/

var base = require('./base.js')
var colors = require('colors')

exports = module.exports = class eval_all extends base {
    constructor(props) {
        super(props)
        var t = this
        t.aname = 'all.js'
        return t
    }

    process() {
        let t = this, func
        try {
            if (t.getParent().resolve == null && t.getParent().reject == null) {
                return new Promise((resolve, reject) => {
                    t.getParent().resolve = resolve
                    t.getParent().reject = reject
                    t.process()
                });
            }
            func = t.getParent().getObjectToProcess()
            if (typeof func == 'undefined') {
                return t.getParent().resolve('done')
            }

            func(() => {
                t.process()
            })
        } catch (e) {
            e.message = "eval_all process error: " + e.message
            console.log(e.message)
            throw (e)
        }
    }
}

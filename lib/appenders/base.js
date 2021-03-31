"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2017-10-01
*/

exports = module.exports = class base {
    constructor(props) {
        try {
            var t = this
            t.props = props
            t.getParent = t.props.getParent
            t.process = t.process.bind(this)
            return t
        } catch (e) {
            e.message = "queueObj base.js constructor error: " + e.message
            throw (e)
        }
    }

    process(props = null) {
        try {
            let t = this, obj, func
            if (t.getParent().resolve == null && t.getParent().reject == null) {
                return new Promise((resolve, reject) => {
                    t.getParent().resolve = resolve
                    t.getParent().reject = reject
                    t.process()
                });
            }
            switch (t.aname) {
                case 'all':
                    obj = t.getParent().getObjectToProcess()
                    if (typeof obj == 'undefined') {
                        return t.getParent().resolve('done')
                    }

                    obj.process(() => {
                        t.process()
                    })
                    break
                case 'top_one':
                    obj = t.getParent().getObjectToProcess()
                    if (typeof obj == 'undefined') {
                        return t.getParent().reject('nothing to process')
                    }

                    obj.process(() => {
                        t.getParent().resolve('done')
                        t.getParent().resolve = null
                        t.getParent().reject = null
                    })
                    break
                case 'bottom_one':
                    obj = t.getParent().getBottomObjectToProcess()
                    if (typeof obj == 'undefined') {
                        return t.getParent().reject('nothing to process')
                    }

                    obj.process(() => {
                        t.getParent().resolve('done')
                        t.getParent().resolve = null
                        t.getParent().reject = null
                    })
                    break
                case 'func_all':
                    func = t.getParent().getObjectToProcess()
                    if (typeof func == 'undefined') {
                        return t.getParent().resolve('done')
                    }

                    func(() => {
                        t.process()
                    })
                    break
            }

        } catch (e) {
            e.message = "queueObj base.js process error: " + e.message
            throw (e)
        }
    }
}


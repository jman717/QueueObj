
/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2023-02-02
* apps.js
*/

let file_requre_data = [
    { props: { id: 100, name: "all", absolute_path: __filename, check: true } }
]

exports = module.exports = class BaseQueue {
    constructor(props = {}) {
        let t = this, fname = `BaseQueue.constructor`
        try {
            t.appender = null
            t.relative_path = props.relative_path

            t.init = t.init.bind(t)
            t.load = t.load.bind(t)
            t.process = t.process.bind(t)
            t.process_count = 0
            t.reported = false

            if (typeof props.parent == 'undefined') {
                console.log(`${fname}: props.parent not defined`)
            }
            t.parent = props.parent
            t.logMsg = props.logMsg
            t.resolve = props.resolve
            t.reject = props.reject

            return t
        } catch (e) {
            e.message = `${fname} error: ${e.message}`
            throw (e)
        }
    }

    init(props = {}) {
        let t = this, fname = `BaseQueue.init`
        t.logMsg({ msg: `${fname}`.debug, type: 'debug' })
    }

    load(props = {}) {
        let t = this, fname = `BaseQueue.load`, a, app, req, msg
        try {
            props.parent = t
            app = props.appender
            a = t.relative_path + app + '.js'
            try {
                req = require(a)
            } catch (e) {
                msg = { "msg": `${fname} error: (${e.message})`.error, "type": "error" }
                // t.logMsg(msg)
                throw e
            }
            t.logMsg({ "msg": `${fname} loading appender(${a})`.debug, "type": "debug" })
            props.relative_path = t.relative_path
            t.appender = new req(props)
            return t
        } catch (e) {
            e.message = `${fname} error: (${e.message})`
            throw e
        }
    }

    process() {
        let t = this, fname = `BaseQueue.process`, app, res, error_count = 0
        try {
            if (t.process_count > t.appender.main_process_objects.length)
                t.appender.status = "done"
            t.logMsg({ msg: `${fname} status(${t.appender.status}) process_count(${t.process_count}) process array size(${t.appender.main_process_objects.length})`.debug, type: 'debug' })
            switch (t.appender.status) {
                case "init":
                    t.appender.init()
                    break
                case "process":
                    t.appender.process()
                    break
                case "wait":
                    setTimeout(() => {
                        t.process()
                    }, 2000)
                    break
                case "done":
                    if (!t.reported) {
                        t.reported = true
                        res = t.appender.get_results_array()
                        res.map((json, i) => {
                            if (typeof json.success != "undefined")
                                t.logMsg({ msg: `${JSON.stringify(json.success)}`.success, type: 'success' })
                            if (typeof json.error != "undefined") {
                                t.logMsg({ msg: `${JSON.stringify(json.error)}`.error, type: 'error' })
                                error_count++
                            }
                        })
                        if (error_count) {
                            res.error_count = error_count
                            t.reject(res)
                        } else {
                            t.resolve(res)
                        }
                    }
                    return t
            }
        } catch (e) {
            t.reject(`${fname}: ${e.message}.`)
        }
    }
}

/* @author Jim Manton: jrman@risebroadband.net
* @since 2023-01-15
* Main processing app
*/

let base_queue = require("./base_queue/app"),
    log_queue = require("./log-queue/app"),
    fs = require('fs'),
    validPath = require('valid-path')

const { memoryUsage } = require('process')

var log_data = [
    { props: { id: 100, name: "console_basic", absolute_path: __filename, check: true } }
]


var log_object = class log_obj {
    constructor(props) {
        let t = this
        t.id = props.id
        t.log = props.log
        t.name = props.name
        t.path = props.relative_path
        t.absolute_path = props.absolute_path
        t.status = 'init'
        t.errors = false
        t.error_msg = 'none'

        t.process = t.process.bind(t)
        t.do_checks = t.do_checks.bind(t)

        if (props.check) {
            t.do_checks()
        }

        return t
    }

    do_checks() {
        let t = this, path_to_check,
            last_item = t.absolute_path.split("\\").pop(),
            check_file = t.absolute_path.split(last_item)[0], check_path = t.path.split('../')

        check_file = check_file.replace(/\\/g, "/");
        path_to_check = validPath(t.path);

        if (!path_to_check.valid) {
            t.errors = true
            t.error_msg = `id = ${t.id} name(${t.name}) Error in ${path_to_check.data.input}: ${path_to_check.error})`
        }

        // check_path.map((dat, i) => {
        //     if (/^[a-zA-Z._]+$/.test(dat)) {
        //         if (dat != '.' || dat != '..')
        //             check_file += dat + '/'
        //     }
        // })
        // check_file = check_file.slice(0, -1)
        check_file += check_path[1]
        check_file += `${t.name}.js`
        try {
            if (!fs.existsSync(check_file)) {
                t.errors = true
                t.error_msg = `id = ${t.id} name(${t.name}) file (${check_file} does not exist)`
            }
        } catch (e) {
            e.message = "file_obj do_checks error: " + e.message
            throw (e)
        }
    }

    process(callback) {
        let t = this
        if (t.errors)
            callback({ error: {msg: t.error_msg} })
        else {
            callback({ success: {msg: `id = ${t.id} name(${t.name}) success`} })
        }
    }
}

exports = module.exports = class QueueObj {
    constructor() {
        var t = this, fname = 'QueueObj.constructor'
        try {
            t.promise = null
            t.resolve = null
            t.reject = null
            t.promise_2q = null
            t.resolve_2q = null
            t.reject_2q = null
            t.successMsg = ''
            t.log_queue = null

            t.logMsg = t.logMsg.bind(t)
            t.init = t.init.bind(t)
            t.process = t.process.bind(t)
            t.getFileObject = t.getFileObject.bind(t)

            // t.logMsg(`QueueObj.constructor`.debug)

            return t
        } catch (e) {
            e.message = `QueueObj app.js constructor error: ${e.message}`.error
            console.log(e.message)
        }
    }

    init() {
        var t = this, fname = `QueueObj.init`
        try {
            t.promise = new Promise((resolve, reject) => {
                t.resolve = resolve
                t.reject = reject
            })
            t.promise_2q= new Promise((resolve, reject) => {
                t.resolve_2q = resolve
                t.reject_2q = reject
            })
            return t
        } catch (e) {
            t.logMsg({ msg: `${fname} error: (${e.message})`.error, type: 'error' })
            // e.message = `QueueObj app.js constructor error: ${e.message}`.error
            // console.log(e.message)
        }
    }

    process(props = {}) {
        let t = this, fname = `app.process`

        // if (typeof props.data_to_process_array == 'undefined')
        //     t.reject('base_queue no props.data_to_process_array')

        if (typeof props.appender == 'undefined')
            t.reject('base_queue no props.appender')

        if (typeof props.process_objects == 'undefined')
            t.reject(`props.process_objects not defined`)

        try {
            t.log_queue = new log_queue({
                parent: t,
                relative_path: "../base_queue/appenders/log/",
                exclude_logMsg: props.exclude_logMsg,
                resolve: t.resolve,
                reject: t.reject
            }).init({
                appender: "console_basic",
                process_objects: [log_object],
                data_to_process_array: log_data
            })
            t.base_queue = new base_queue({   
                parent: t,
                relative_path: "./appenders/",
                logMsg: t.logMsg,
                resolve: t.resolve_2q,
                reject: t.reject_2q
            }).load(props).process()
            return t.promise_2q
        } catch (e) {
            console.log(`${fname} error: (${e.message})`)
        }
    }

    getFileObject() {
        return this.qJson.get_class_obj_array()
    }

    logMsg(props = { msg: '', type: '' }) {
        let t = this, fname = "QueueObj.logMsg"
        try {
            if (typeof props.msg == "undefined")
                throw new Error(`no msg property in (${JSON.stringify(props)}) `)
            if (typeof props.type == "undefined")
                throw new Error(`no type property in (${JSON.stringify(props)}) `)
            if (t.log_queue != null && typeof t.log_queue.logMsg != 'undefined') {
                t.log_queue.logMsg(props)
            } else {
                throw new Error(`t.log_queue does not exist`)
            }
        } catch (e) {
            e.message = `${fname} error: ${e.message})`
            t.reject(e.message)
        }
    }
}
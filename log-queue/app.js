/* @author Jim Manton: jrman@risebroadband.net
* @since 2023-01-15
* Main processing app
*/

let colors = require('colors'),
    base_queue = require("../base_queue/app")

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red',
    success: 'green'
});

exports = module.exports = class LogQueue {
    constructor(props) {
        var t = this, fname = `LogQueue.constructor`
        try {

            t.parent = props.parent
            t.relative_path = props.relative_path
            t.exclude_logMsg = props.exclude_logMsg
            t.resolve = props.resolve
            t.reject = props.reject

            t.init = t.init.bind(t)
            t.logMsg = t.logMsg.bind(t)
            t.logMsg({ msg: `${fname}`.debug, type: 'debug' })

            return t
        } catch (e) {
            e.message = `${fname} error: ${e.message}`
            throw (e)
        }
    }

    init(props) {
        var t = this, fname = `LogQueue.init`
        try {
            t.base_queue = new base_queue({
                parent: t,
                relative_path: t.relative_path,
                logMsg: t.logMsg,
                resolve: t.resolve,
                reject: t.reject
            }).load(props).process()
            return t
        } catch (e) {
            e.message = `${fname} error: ${e.message}`
            throw (e)
        }
    }

    logMsg(props = {}) {
        let t = this, fname = "log_queue.logMsg"
        try {
            if (typeof props.msg == "undefined")
                throw new Error(`no msg property in (${JSON.stringify(props)}) `)
            if (typeof props.type == "undefined")
                throw new Error(`no type property in (${JSON.stringify(props)}) `)
            if (typeof t.exclude_logMsg != "undefined")
                if (t.exclude_logMsg.indexOf(props.type) > -1)
                    return
            console.log(props.msg)
        } catch (e) {
            e.message = `${fname} error: ${e.message}`
            console.log(e.message)
            throw e
        }
    }
}
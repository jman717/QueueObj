/* @author Jim Manton: jrman@risebroadband.net
* @since 2021-03-19
* Main processing app
*/

var colors = require('colors'),
    all = require('./lib/appenders/all'),
    func_all = require('./lib/appenders/func_all'),
    top_one = require('./lib/appenders/top_one'),
    bottom_one = require('./lib/appenders/bottom_one'),
    sync_all = require('./lib/appenders/sync_all'),
    status = require('./lib/appenders/status'),
    version = require('./lib/appenders/version')

class QueueObj {

    constructor() {
        try {
            var t = this
            t.id = 0
            t.appenders_dir = './lib/appenders/'
            t.props = {}
            t.all = null
            t.top_one = null
            t.bottom_one = null
            t.array = null
            t.status = null
            t.version = null
            t.stats = false
            t.sync_all = null
            t.func_all = null
            t.objs = []
            t.resolve = null
            t.reject = null

            t.load = t.load.bind(this)
            t.process = t.process.bind(this)
            t.getParent = t.getParent.bind(this)
            t.getObjectToProcess = t.getObjectToProcess.bind(this)
            t.getObjectById = t.getObjectById.bind(this)
            t.getObjs = t.getObjs.bind(this)
            t.logMsg = t.logMsg.bind(this)
            return t
        } catch (e) {
            e.message = "queueObj app.js constructor error: " + e.message
            throw (e)
        }
    }

    getStats() {
        return this.stats
    }

    getObjectById(id) {
        let t = this, i
        for (i = 0; i < t.objs.length; i++) {
            if (typeof t.objs[i] != 'undefined' &&
                typeof t.objs[i].id != 'undefined' &&
                t.objs[i].id == id) {
                return t.objs[i]
            }
        }
        return null
    }

    getObjectByStatus(status) {
        let t = this, i
        for (i = 0; i < t.objs.length; i++) {
            if (typeof t.objs[i] != 'undefined' &&
                typeof t.objs[i].status != 'undefined' &&
                t.objs[i].status == status) {
                return t.objs[i]
            }
        }
        return null
    }

    getObjectByVersion(version) {
        let t = this, i
        for (i = 0; i < t.objs.length; i++) {
            if (typeof t.objs[i] != 'undefined' &&
                typeof t.objs[i].version != 'undefined' &&
                t.objs[i].version == version) {
                return t.objs[i]
            }
        }
        return null
    }

    count() {
        return this.objs.length
    }

    get(num) {
        if (num < this.objs.length)
            return this.objs[num]
        return false
    }

    getObjectToProcess() {
        return this.objs.shift()
    }

    getBottomObjectToProcess() {
        return this.objs.pop()
    }

    getItemToProcess(itm) {
        return this.objs[itm]
    }

    logMsg(msg, props = {}) {
        console.log(msg)
    }

    load(props) {
        try {
            var t = this
            t.props = props
            t.stats = (typeof props.stats != 'undefined') ? props.stats : false;
            if (typeof props != `undefined`) {
                if (typeof props.appender != `undefined` &&
                    typeof props.appender == 'string') {
                    props.getParent = t.getParent
                    switch (props.appender) {
                        case 'all':
                            t.all = new all(props)
                            break
                        case 'top_one':
                            t.top_one = new top_one(props)
                            break
                        case 'bottom_one':
                            t.bottom_one = new bottom_one(props)
                            break
                        case 'func_all':
                            t.func_all = new func_all(props)
                            break
                        case 'array':
                            t.array = new array(props)
                            break
                        case 'status':
                            t.status = new status(props)
                            break
                        case 'version':
                            t.version = new version(props)
                            break
                        case 'sync_all':
                            t.sync_all = new sync_all(props)
                            break
                        default:
                            throw new Error(`appender(${props.appender}) not found`)
                    }
                }
                return t
            }
        } catch (e) {
            e.message = "queueObj app.js load error: " + e.message
            t.logMsg(e.message)
            throw (e)
        }
    }

    add(obj) {
        var t = this
        try {
            if (t.all != null) {
                obj._getProperty = (o) => {
                    return 'all'
                }
            }
            if (t.top_one != null) {
                obj._getProperty = (o) => {
                    return 'top_one'
                }
            }
            if (t.bottom_one != null) {
                t.objs = []
                obj._getProperty = (o) => {
                    return 'bottom_one'
                }
            }
            if (t.func_all != null) {
                obj._getProperty = (o) => {
                    return 'func_all'
                }
            }
            if (t.sync_all != null) {
                obj._getProperty = (o) => {
                    return 'sync_all'
                }
            }
            if (typeof obj.status != 'undefined') {
                obj._getProperty = (o) => {
                    return o.status
                }

            }
            if (typeof obj.version != 'undefined') {
                obj._getProperty = (o) => {
                    return o.version
                }
            }
            if (t.top_one != null) {
                if (t.objs.length == 0) {
                    t.objs.push(obj)
                }
                return t
            }
            t.objs.push(obj)
            return t
        } catch (e) {
            e.message = "queueObj app.js add error: " + e.message
            t.logMsg(e.message.red)
            throw (e)
        }
    }

    getParent() {
        return this
    }

    getObjs() {
        return this.objs
    }

    process(props = {}) {
        try {
            var t = this
            switch (t.props.appender) {
                case 'all':
                    return t.all.process(props)
                case 'top_one':
                    return t.top_one.process(props)
                case 'bottom_one':
                    return t.bottom_one.process(props)
                case 'func_all':
                    return t.func_all.process(props)
                case 'sync':
                case 'sync_all':
                    return t.sync_all.process(props)
                case 'status':
                    return t.status.process(props)
                case 'version':
                    return t.version.process(props)
                default:
                    throw new Error(`nothing to process`)
            }
        } catch (e) {
            e.message = "queueObj app.js load error: " + e.message
            t.logMsg(e.message.red)
            throw (e)
        }
    }
}

exports = module.exports = function (props) {
    return new QueueObj(props)
}
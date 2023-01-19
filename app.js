/* @author Jim Manton: jrman@risebroadband.net
* @since 2021-03-19
* Main processing app
*/

var colors = require('colors'),
    file_queue = new require('file-obj-queue'),             //('./file-queue'),
    file_requre_data = [
        { props: { id: 100, name: "all", path: "./lib/appenders/all.js", absolute_path: __filename, check: true } },
        { props: { id: 101, name: "func_all", path: "./lib/appenders/func_all.js", absolute_path: __filename, check: true } },
        { props: { id: 102, name: "top_one", path: "./lib/appenders/top_one.js", absolute_path: __filename, check: true } },
        { props: { id: 103, name: "bottom_one", path: "./lib/appenders/bottom_one.js", absolute_path: __filename, check: true } },
        { props: { id: 104, name: "sync_all", path: "./lib/appenders/sync_all.js", absolute_path: __filename, check: true } },
        { props: { id: 105, name: "status", path: "./lib/appenders/status.js", absolute_path: __filename, check: true } },
        { props: { id: 106, name: "name", path: "./lib/appenders/name.js", absolute_path: __filename, check: true } },
        { props: { id: 107, name: "version", path: "./lib/appenders/version.js", absolute_path: __filename, check: true } }
    ]

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
            t.name = null
            t.version = null
            t.stats = false
            t.sync_all = null
            t.name = null
            t.func_all = null
            t.objs = []
            t.resolve = null
            t.reject = null
            t.qRequire = new file_queue().init({ input_data: file_requre_data })  

            t.load = t.load.bind(t)
            t.process = t.process.bind(t)
            t.getParent = t.getParent.bind(t)
            t.getObjectToProcess = t.getObjectToProcess.bind(t)
            t.getObjectById = t.getObjectById.bind(t)
            t.getObjs = t.getObjs.bind(t)
            t.logMsg = t.logMsg.bind(t)
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
            var t = this, file_obj, obj
            t.props = props
            file_obj = t.qRequire.getFileObject()

            t.stats = (typeof props.stats != 'undefined') ? props.stats : false;
            if (typeof props != `undefined`) {
                if (typeof props.appender != `undefined` &&
                    typeof props.appender == 'string') {
                    props.getParent = t.getParent
                    file_obj.map((jsObj, i) => {
                        if (jsObj.name == props.appender) {
                            obj = require(jsObj.path)                            
                            eval(`t.${jsObj.name} = new obj(props)`) 
                        }
                    })
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
            if (t.name != null) {
                obj._getProperty = (o) => {
                    return 'name'
                }
            }
            if (typeof obj.status != 'undefined') {
                obj._getProperty = (o) => {
                    return o.status
                }

            }
            if (typeof obj.name != 'undefined') {
                obj._getProperty = (o) => {
                    return o.name
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
                case 'name':
                    return t.name.process(props)
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
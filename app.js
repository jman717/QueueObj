/* @author Jim Manton: jrman@risebroadband.net
* @since 2021-03-19
* Main processing app
*/

var colors = require('colors'),
    all = require('./lib/appenders/all'),
    func_all = require('./lib/appenders/func_all'),
    top_one = require('./lib/appenders/top_one'),
    bottom_one = require('./lib/appenders/bottom_one'),
    sync = require('./lib/appenders/sync'),
    sync_all = require('./lib/appenders/sync_all'),
    status = require('./lib/appenders/status')

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
            t.sync = null
            t.status = null
            t.stats = false
            t.sync_all = null
            t.func_all = null
            t.objs = []
            t.resolve = null
            t.reject = null

            t.load = t.load.bind(this)
            t.process = t.process.bind(this)
            t.await = t.await.bind(this)
            t.getParent = t.getParent.bind(this)
            t.getObjectToProcess = t.getObjectToProcess.bind(this)
            t.getObjectById = t.getObjectById.bind(this)
            t.getObjs = t.getObjs.bind(this)
            return t
        } catch (e) {
            e.message = "queueObj app.js init error: " + e.message
            throw (e)
        }
    }

    getStats (){
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

    count() {
        return t.objs.length
    }

    get(num) {
        if (num < t.objs.length)
            return t.objs[num]
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

    load(props) {
        try {
            var t = this
            t.props = props
            t.stats = (typeof props.stats != 'undefined') ?  props.stats : false;
            if (typeof props != `undefined` &&
                typeof props.appender != `undefined` &&
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
                    case 'sync':
                    case 'sync_all':
                        t.sync = new sync(props)
                        break
                    default:
                        throw new Error(`appender(${props.appender}) not found`)
                }
                return t
            }
        } catch (e) {
            e.message = "queueObj app.js load error: " + e.message
            console.log(e.message)
            throw (e)
        }
    }

    add(obj) {
        try {
            var t = this
            t.objs.push(obj)
            return t
        } catch (e) {
            e.message = "queueObj app.js add error: " + e.message
            console.log(e.message)
            throw (e)
        }
    }

    getParent() {
        return this
    }

    getObjs() {
        return this.objs
    }

    process() {
        try {
            var t = this, pro = { items: [] }
            switch (t.props.appender) {
                case 'all':
                    t.objs.map((item, i) => {
                        pro.items.push(i)
                    })
                    t.all.await(pro)
                    return t.all.process()
                case 'top_one':
                    pro.items = [0]
                    return t.top_one.process()
                case 'bottom_one':
                    pro.items = [pro.items.length - 1]
                    return t.bottom_one.process()
                case 'func_all':
                    t.objs.map((item, i) => {
                        pro.items.push(i)
                    })
                    t.func_all.await(pro)
                    return t.func_all.process()
                case 'sync':
                    return t.sync.process()
                case 'status':
                    return t.status.process()
                case 'sync_all':
                    t.objs.map((item, i) => {
                        pro.items.push(i)
                    })
                    t.sync.await(pro).then(res => {
                        console.log(`done with ${JSON.stringify(pro)}: (${res})`.green)
                    }, err => {
                        console.log(`error ${JSON.stringify(pro)}: (${err})`.red)
                    })
                    return t.sync.process()
                default:
                    throw new Error(`nothing to process`)
            }
        } catch (e) {
            e.message = "queueObj app.js load error: " + e.message
            console.log(e.message)
            throw (e)
        }
    }

    await(props) {
        try {
            var t = this
            if (t.sync != null)
                return t.sync.await(props)
            if (t.status != null)
                return t.status.await(props)
        } catch (e) {
            e.message = "queueObj app.js load error: " + e.message
            console.log(e.message)
            throw (e)
        }
    }
}

exports = module.exports = function (props) {
    return new QueueObj(props)
}
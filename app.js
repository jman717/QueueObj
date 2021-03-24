/* @author Jim Manton: jrman@risebroadband.net
* @since 2021-03-19
* Main processing app
*/

var colors = require('colors'),
    all = require('./lib/appenders/all'),
    func_all = require('./lib/appenders/func_all'),
    top_one = require('./lib/appenders/top_one'),
    bottom_one = require('./lib/appenders/bottom_one')

class QueueObj {

    constructor() {
        try {
            var t = this
            t.appenders_dir = './lib/appenders/'
            t.props = {}
            t.load = t.load.bind(this)
            t.process = t.process.bind(this)
            t.getParent = t.getParent.bind(this)
            t.getObjectToProcess = t.getObjectToProcess.bind(this)
            t.all = null
            t.top_one = null
            t.bottom_one = null
            t.func_all = null
            t.objs = []
            t.resolve = null
            t.reject = null
        } catch (e) {
            e.message = "log4js-tagline app.js init error: " + e.message
            throw (e)
        }
    }

    getObjectToProcess() {
        return this.objs.shift()
    }

    getBottomObjectToProcess() {
        return this.objs.pop()
    }

    load(props) {
        try {
            var t = this
            t.props = props
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

    process() {
        try {
            var t = this
            switch (t.props.appender) {
                case 'all':
                    return t.all.process(t.props)
                case 'top_one':
                    return t.top_one.process(t.props)
                case 'bottom_one':
                    return t.bottom_one.process(t.props)
                case 'func_all':
                    return t.func_all.process(t.props)
                default:
                    throw new Error(`nothing to process`)
            }
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
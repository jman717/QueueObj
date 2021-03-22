/* @author Jim Manton: jrman@risebroadband.net
* @since 2021-03-19
* Main processing app
*/

var colors = require('colors')

class QueueObj {

    constructor({ display, output }) {
        try {
            var t = this
            t.appenders_dir = './lib/appenders/'
            t.props = {}
            t.load = t.load.bind(this)
            t.process = t.process.bind(this)
            t.getParent = t.getParent.bind(this)
            t.getObjectToProcess = t.getObjectToProcess.bind(this)
            t.all = null
            t.objs = []
            t.resolve = null
            t.reject = null
        } catch (e) {
            e.message = "log4js-tagline app.js init error: " + e.message
            throw (e)
        }
    }

    getObjectToProcess(){
        return this.objs.shift()
    }

    load(props) {
        try {
            var t = this
            t.props = props
            if (typeof props != `undefined` &&
                typeof props.appender != `undefined` &&
                typeof props.appender == 'string') {
                var a = t.appenders_dir + props.appender + '.js'
                console.log('queueObj file loading=' + a.green)
                props.getParent = t.getParent
                var load = require(a)
                switch (props.appender) {
                    case 'all' :
                        t.all = new load(props)
                        break
                        default:
                            throw new Error(`appender(${props.appender}) not found`)
                }
                return t
            }
        } catch (e) {
            ``
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
                case 'all' :
                    return t.all.process(t.props)
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
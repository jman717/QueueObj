/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2023-2-5
* func_all.js
*/

var base = require('./base.js')

exports = module.exports = class func_all extends base {
	constructor(props) {
		super(props)
		var t = this, fname = 'func_all.constructor'
		try {
			t.aname = 'func_all'
			t.main_process_objects = []

			if (t.appender != t.aname)
				throw new Error(`(${t.appender}) does not equal the appender name (${t.aname}))`)

			t.parent.logMsg({msg: `${fname} objects to process count(${t.get_objects_to_process().length})`.debug, type: "debug"})

			t.init = t.init.bind(t)
			t.process = t.process.bind(t)
			t.custom_function = t.custom_function.bind(t)

			return t
		} catch (e) {
            e.message = `${fname} error: ${e.message})`
            throw e
			// t.parent.app_reject(`${fname} error: ${e.message})`)
		}
	}

	init(props = {}) {
		var t = this, fname = `func_all.init`, obj
		try {
			t.parent.logMsg({msg: `${fname}`.debug, type: "debug"})

			if (typeof t.get_objects_to_process()[0] == "undefined")
				throw new Error(`get_objects_to_process[0] has no data`)

			t.get_objects_to_process().map((dat, i) => {
				dat = {props: {id: (i+1), log: t.parent.logMsg}}
				obj = t.get_objects_to_process()[i]
				t.main_process_objects.push(new obj(dat.props))
			})

			super.init(props)
			return t
		} catch (e) {
            e.message = `${fname} error: ${e.message})`
			t.parent.logMsg({msg: `${fname} error: ${e.message}`.error, type: "error"})
            throw e
			// t.parent.app_reject(`${fname} error: ${e.message})`)
		}
	}

	custom_function(func){
		var t = this, fname = `func_all.custom_function`
		try {
			t.parent.logMsg({msg: `${fname} typeof func(${typeof func}) WORK HERE`.bgBrightMagenta, type: "debug"})
			return t
		} catch (e) {
            e.message = `${fname} error: ${e.message})`
			t.parent.logMsg({msg: `${fname}`.error, type: "error"})
            throw e
		}
	}

	process(props = {}) {
		var t = this, fname = `func_all.process`
		try {
			t.parent.logMsg({msg: `${fname}`.debug, type: "debug"})

			super.process(props)
			return t
		} catch (e) {
            e.message = `${fname} error: ${e.message})`
            throw e
			// t.parent.app_reject(`${fname} error: ${e.message})`)
		}
	}
}
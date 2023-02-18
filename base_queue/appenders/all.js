/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2023-2-5
* all.js
*/

var base = require('./base.js')

exports = module.exports = class all extends base {
	constructor(props) {
		super(props)
		var t = this, fname = 'all.constructor'
		try {
			t.aname = 'all'
			t.main_process_objects = []

			if (t.appender != t.aname)
				throw new Error(`(${t.appender}) does not equal the appender name (${t.aname}))`)

			t.parent.logMsg({msg: `${fname} objects to process count(${t.get_objects_to_process().length})`.debug, type: "debug"})

			t.init = t.init.bind(t)
			t.process = t.process.bind(t)

			return t
		} catch (e) {
            e.message = `${fname} error: ${e.message})`
            throw e
			// t.parent.app_reject(`${fname} error: ${e.message})`)
		}
	}

	init(props = {}) {
		var t = this, fname = `all.init`, obj
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
            throw e
			// t.parent.app_reject(`${fname} error: ${e.message})`)
		}
	}

	process(props = {}) {
		var t = this, fname = `all.process`
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
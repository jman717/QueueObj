/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2023-2-5
* bottom_one.js
*/

var base = require('./base.js')

exports = module.exports = class bottom_one extends base {
	constructor(props) {
		super(props)
		var t = this, fname = 'bottom_one.constructor'
		try {
			t.aname = 'bottom_one'
			t.main_process_objects = []

			if (t.appender != t.aname)
				throw new Error(`(${t.appender}) does not equal the appender name (${t.aname}))`)

			t.parent.logMsg({ msg: `${fname} objects to process count(${t.get_objects_to_process().length})`.debug, type: "debug" })

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
		var t = this, fname = `bottom_one.init`, obj, dat, gotp
		try {
			t.parent.logMsg({ msg: `${fname}`.debug, type: "debug" })

			if (typeof t.get_objects_to_process()[0] == "undefined")
				throw new Error(`get_objects_to_process[0] has no data`)

			gotp = t.get_objects_to_process()
			obj = gotp[gotp.length - 1]
			dat = { props: { id: gotp.length, log: t.parent.logMsg } }
			t.main_process_objects.push(new obj(dat.props))

			super.init(props)
			return t
		} catch (e) {
			e.message = `${fname} error: ${e.message})`
			throw e
			// t.parent.app_reject(`${fname} error: ${e.message})`)
		}
	}

	process(props = {}) {
		var t = this, fname = `bottom_one.process`
		try {
			t.parent.logMsg({ msg: `${fname}`.debug, type: "debug" })

			super.process(props)
			return t
		} catch (e) {
			e.message = `${fname} error: ${e.message})`
			throw e
			// t.parent.app_reject(`${fname} error: ${e.message})`)
		}
	}
}
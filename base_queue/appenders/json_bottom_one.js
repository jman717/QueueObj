/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2023-2-5
* json_bottom_one.js
*/

var base = require('./base.js')

exports = module.exports = class json_bottom_one extends base {
	constructor(props) {
		super(props)
		var t = this, fname = 'json_bottom_one.constructor'
		try {
			t.aname = 'json_bottom_one'
			t.main_process_objects = []

			if (typeof props.data_to_process_array == 'undefined')
				throw new Error(`props.data_to_process_array not defined`)

			if (t.appender != t.aname)
				throw new Error(`(${t.appender}) does not equal the appender name (${t.aname}))`)

			t.parent.logMsg({ msg: `${fname}`.debug, type: "debug" })

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
		var t = this, fname = `json_bottom_one.init`, obj, dat, len
		try {``
			t.parent.logMsg({ msg: `${fname}`.debug, type: "debug" })

			if (typeof t.get_objects_to_process()[0] == "undefined")
				throw new Error(`get_objects_to_process[0] has no data`)

			try {
				obj = t.get_objects_to_process()[0]
				len = t.get_data_to_process_array().length - 1
				dat = t.get_data_to_process_array()[len]
				dat.props.log = t.parent.logMsg
				dat.props.relative_path = t.relative_path
				t.main_process_objects.push(new obj(dat.props))
			} catch (e) {
				e.message = `${fname} error: ${e.message}`
				t.parent.logMsg({msg: e.message.error, type: "error"})
				throw e
			}

			super.init(props)
			return t
		} catch (e) {
			e.message = `${fname} error: ${e.message})`
			throw e
			// t.parent.app_reject(`${fname} error: ${e.message})`)
		}
	}

	process(props = {}) {
		var t = this, fname = `json_bottom_one.process`
		try {
			t.parent.logMsg({msg: `${fname} length(${t.main_process_objects.length})`.debug, type: "debug"})

			super.process(props)
			return t
		} catch (e) {
			e.message = `${fname} error: ${e.message})`
			throw e
			// t.parent.app_reject(`${fname} error: ${e.message})`)
		}
	}
}
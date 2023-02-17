/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2023-2-5
* console_basic.js
*/

var base = require('../base.js')

exports = module.exports = class console_basic extends base {
	constructor(props) {
		super(props)
		var t = this, fname = 'console_basic.constructor'
		try {
			t.aname = 'console_basic'
			t.main_process_objects = []

			if (t.appender != t.aname)
				throw new Error(`(${t.appender}) does not equal the appender name (${t.aname}))`)

			t.parent.logMsg({ msg: `${fname}`.debug, type: "debug" })

			t.init = t.init.bind(t)
			t.process = t.process.bind(t)

			return t
		} catch (e) {
			e.message = `${fname} error: ${e.message})`
			throw e
		}
	}

	init(props = {}) {
		var t = this, fname = `console_basic.init`, gotp, gdtpa, obj
		try {
			t.parent.logMsg({ msg: `${fname}`.debug, type: "debug" })

			if (typeof t.get_objects_to_process()[0] == "undefined")
				throw new Error(`get_objects_to_process[0] has no data`)

			t.get_objects_to_process().map((dat, i) => {
				obj = t.get_objects_to_process()[i]
				try {
					t.get_data_to_process_array().map((dat_pro, y)=>{
						dat_pro.props.relative_path = t.relative_path
						t.main_process_objects.push(new obj(dat_pro.props))
					})
				} catch (e) {
					throw new Error(`cannot create new obj error: (${e.message})`)
				}
			})
			super.init(props)
			return t
		} catch (e) {
			e.message = `${fname} error: ${e.message})`
			throw e
			// t.parent.app_reject(`${fname} error: ${e.message})`)
		}
	}

	process() {
		var t = this, fname = `console_basic.process`
		try {
			t.parent.logMsg({ msg: `${fname}`.debug, type: "debug" })

			super.process()
			return t
		} catch (e) {
			e.message = `${fname} error: ${e.message})`
			throw e
			// t.parent.app_reject(`${fname} error: ${e.message})`)
		}
	}
}
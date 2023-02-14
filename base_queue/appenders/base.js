/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2023-02-03
* base.js
*/

exports = module.exports = class base {
    constructor(props) {
        let t = this, fname = `base.constructor`
        try {
            t.parent = props.parent
            t.parent.logMsg({msg: `${fname}`.debug, type: "debug"})
            t.relative_path = ''
            t.class_obj_array = []
            t.data_to_process_array = []
            t.objects_to_process = []
            t.results_array = []
            t.appender = ''

            if (typeof props.relative_path == 'undefined')
                throw new Error(`props.relative_path not defined`)

            if (typeof props.process_objects == 'undefined')
                throw new Error(`props.process_objects not defined`)

            if (typeof props.appender == 'undefined')
                throw new Error(`appender not defined)`)

            t.appender = props.appender
            t.data_to_process_array = props.data_to_process_array
            t.objects_to_process = props.process_objects
            t.relative_path = props.relative_path

            t.init = t.init.bind(t)
            t.get_objects_to_process = t.get_objects_to_process.bind(t)
            t.get_data_to_process_array = t.get_data_to_process_array.bind(t)
            t.process = t.process.bind(t)
            t.get_results_array = t.get_results_array.bind(t)

            return t
        } catch (e) {
            e.message = `${fname} error: ${e.message})`
            throw e
            // t.parent.app_reject(`${fname} error: ${e.message})`)
        }
    }
	
	process (props = {}) {
		var t = this, fname = `base.process`
		try {
			t.parent.logMsg({msg: `${fname}`.debug, type: "debug"})

			return t
		} catch (e) {
            e.message = `${fname} error: ${e.message})`
            throw e
			// t.parent.app_reject(`${fname} error: ${e.message})`)
		}
	}

    get_results_array () {
        return this.results_array
    }

    get_data_to_process_array () {
        return this.data_to_process_array
    }

    get_objects_to_process () {
        return this.objects_to_process
    }
    
	init (props = {}) {
		var t = this, fname = `base.init`
		try {
			t.parent.logMsg({msg: `${fname}`.debug, type: "debug"})
			return t
		} catch (e) {
            e.message = `${fname} error: ${e.message})`
            throw e
			// t.parent.app_reject(`${fname} error: ${e.message})`)
		}
	}
}

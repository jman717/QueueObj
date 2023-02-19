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
            t.parent.logMsg({ msg: `${fname}`.debug, type: "debug" })
            t.status = "init"
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

    process() {
        var t = this, fname = `base.process`, pro, pro_process
        try {
            t.parent.logMsg({ msg: `${fname}`.debug, type: "debug" })

            if (t.parent.process_count > t.main_process_objects.length) {
                t.status = "done"
                t.parent.process()
                return
            }
            if (t.status == "process") {
                pro = t.main_process_objects[t.parent.process_count++]
                if (typeof pro != "undefined") {
                    if (typeof pro.base_queue_process_function == "function")
                        pro_process = pro.base_queue_process_function
                    else
                        if (typeof pro.process == "function")
                            pro_process = pro.process

                    t.parent.logMsg({ msg: `${fname} status(${t.status}) count(${t.parent.process_count}) main objects(${t.main_process_objects.length})`.debug, type: "debug" })

                    pro_process((res) => {
                        t.results_array.push(res)
                        t.status = "process"
                        t.parent.process()
                        return
                    })
                } else
                    t.status = "done"
            }
            if (t.status != "done")
                t.status = "wait"
            t.parent.process()
        } catch (e) {
            e.message = `${fname} error: ${e.message})`
            t.parent.logMsg({ msg: `${fname} error: (${e.message})`.error, type: "error" })
            throw e
            // t.parent.app_reject(`${fname} error: ${e.message})`)
        }
    }

    get_results_array() {
        return this.results_array
    }

    get_data_to_process_array() {
        return this.data_to_process_array
    }

    get_objects_to_process() {
        return this.objects_to_process
    }

    init(props = {}) {
        var t = this, fname = `base.init`, pr
        try {
            t.parent.logMsg({ msg: `${fname}`.debug, type: "debug" })
            t.status = "process"
            t.parent.process()
        } catch (e) {
            e.message = `${fname} error: ${e.message})`
            throw e
        }
    }
}

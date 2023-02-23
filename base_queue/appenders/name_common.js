/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2023-02-03
* name_common.js
*/

exports = module.exports = class name_common {
    constructor(props) {
        let t = this, fname = `name_common.constructor`
        try {
            t.parent = props.parent
            t.log = props.log
            t.log({ msg: `${fname}`.debug, type: "debug" })

            return t
        } catch (e) {
            e.message = `${fname} error: ${e.message})`
            t.log({ msg: `${fname}: ${e.message}`.error, type: "error" })
            throw e
            // t.parent.app_reject(`${fname} error: ${e.message})`)
        }
    }

    init(props) {
        let t = this, fname = `name_common.init`, obj_a, is, xis, obj, dat
        try {
            obj = props.obj
            dat = props.dat
            t.log({ msg: `${fname}`.debug, type: "debug" })
            is = t.parent.get_include_names()
            xis = t.parent.get_exclude_names()
            obj_a = new obj(dat.props)
            if (typeof is != "undefined") {
                if (typeof obj_a != "undefined" &&
                    typeof obj_a.name != "undefined" &&
                    is.indexOf(obj_a.name) > -1) {
                    t.parent.main_process_objects.push(new obj(dat.props))
                }
            }
            if (typeof xis != "undefined") {
                if (typeof obj_a != "undefined" &&
                    typeof obj_a.name != "undefined" &&
                    xis.indexOf(obj_a.name) < 0) {
                    t.parent.main_process_objects.push(new obj(dat.props))
                }
            }
            return t
        } catch (e) {
            e.message = `${fname} error: ${e.message})`
            t.log({ msg: `${fname}: ${e.message}`.error, type: "error" })
            throw e
            // t.parent.app_reject(`${fname} error: ${e.message})`)
        }
    }
}

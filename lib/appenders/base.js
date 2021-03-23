"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2017-10-01
*/

exports = module.exports = class base {
    constructor(props) {
        try {
            var t = this
            t.props = props
            t.getParent = t.props.getParent
            t.process = t.process.bind(this)
            return t
        } catch (e) {
            e.message = "queueObj base.js constructor error: " + e.message
            throw (e)
        }
    }
}


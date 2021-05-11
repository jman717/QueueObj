/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2021-03-22
* lib/appenders/status.js
*/

var base = require('./base.js')

exports = module.exports = class status extends base {
    constructor(props) {
        super(props)
        var t = this
        t.aname = 'status'
		t.pro_types = ['status']
        return t
    }
}
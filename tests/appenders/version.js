/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2023-2-5
* lib/appenders/status.js
*/

var base = require('./base.js')

exports = module.exports = class version extends base {
    constructor(props) {
        super(props)
        var t = this
        t.aname = 'version'
		t.pro_types = ['version']
        return t
    }
}
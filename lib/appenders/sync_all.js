/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2023-2-5
* lib/appenders/sync_all.js
*/

var base = require('./base.js')

exports = module.exports = class sync_all extends base {
    constructor(props) {
        super(props)
        var t = this
        t.aname = 'sync_all'
		t.pro_types = ['items']
        return t
    }
}

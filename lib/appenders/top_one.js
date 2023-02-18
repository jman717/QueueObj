/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2023-2-5
* lib/appenders/top_one.js
*/

var base = require('./base.js')

exports = module.exports = class top_one extends base{
	constructor(props) {
		super(props)
        var t = this
		t.aname = 'top_one'
		t.pro_types = ['items']
		return t
    }
}

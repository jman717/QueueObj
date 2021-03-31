"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2021-03-22
*/

var base = require('./base.js')
var colors = require('colors')

exports = module.exports = class top_one extends base{
	constructor(props) {
		super(props)
        var t = this
		t.aname = 'top_one'
		return t
    }
}

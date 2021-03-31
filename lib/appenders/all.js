"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2021-03-22l
*/

var base = require('./base.js')
var colors = require('colors')

exports = module.exports = class all extends base{
	constructor(props) {
		super(props)
        var t = this
		t.aname = 'all'
        t.process = t.process.bind(this)
		return t
    }
}

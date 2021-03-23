"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2021-03-22
*/

var base = require('./base.js')
var colors = require('colors')

exports = module.exports = class all extends base{
	constructor(props) {
		super(props)
        var t = this
		t.aname = 'all.js'
		return t
    }

    process() {
        let t = this, obj
        if (t.getParent().resolve == null && t.getParent().reject == null) {
            return new Promise((resolve, reject) => {
                t.getParent().resolve = resolve
                t.getParent().reject = reject
                t.process()
            });
        }
        obj = t.getParent().getObjectToProcess()
        if (typeof obj == 'undefined') {
            return t.getParent().resolve('done')
        }
 
        obj.process(()=>{
            t.process()     
        })
    }
}

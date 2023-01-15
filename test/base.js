var assert = require('assert');

describe('base', function () {
    let base, bs

    beforeEach(function () {
        bs = require('../lib/appenders/base.js')
        base = new bs({getParent: ()=>{}})
    })

    it('base should pass', function () {
        assert(typeof base != 'undefined')
    })

    it('base.process is a function', function () {
        assert(typeof base.process == 'function')
    })
    
    it('base.process_all is a function', function () {
        assert(typeof base.process_all == 'function')
    })
})

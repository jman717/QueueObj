var assert = require('assert');

describe('app', function () {

    describe('require', function () {
        it('colors', function () {
            try {
                colors = require('colors')
                if (typeof colors == 'undefined') {
                    throw new Error('no colors')
                }
            } catch (e) {
                assert(false)
            }
        })
    })
})

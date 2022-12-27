var assert = require('assert');

describe('app', function () {

    describe('require', function () {
        it('colors app', function () {
            try {
                colors = require('colors')
                if (typeof colors == 'undefined') {
                    throw new Error('no colors')
                }
            } catch (e) {
                assert(false)
            }
        })
        it('all appender', function () {
            try {
                all = require('../lib/appenders/all')
                if (typeof all == 'undefined') {
                    throw new Error('no all appender')
                }
            } catch (e) {
                assert(false)
            }
        })
        it('func_all appender', function () {
            try {
                func_all = require('../lib/appenders/func_all')
                if (typeof func_all == 'undefined') {
                    throw new Error('no func_all')
                }
            } catch (e) {
                assert(false)
            }
        })
        it('top_one appender', function () {
            try {
                top_one = require('../lib/appenders/top_one')
                if (typeof top_one == 'undefined') {
                    throw new Error('no top_one')
                }
            } catch (e) {
                assert(false)
            }
        })
        it('bottom_one appender', function () {
            try {
                bottom_one = require('../lib/appenders/bottom_one')
                if (typeof bottom_one == 'undefined') {
                    throw new Error('no bottom_one')
                }
            } catch (e) {
                assert(false)
            }
        })
        it('sync_all appender', function () {
            try {
                sync_all = require('../lib/appenders/sync_all')
                if (typeof sync_all == 'undefined') {
                    throw new Error('no sync_all')
                }
            } catch (e) {
                assert(false)
            }
        })
        it('status appender', function () {
            try {
                statuss = require('../lib/appenders/status')
                if (typeof statuss == 'undefined') {
                    throw new Error('no status')
                }
            } catch (e) {
                assert(false)
            }
        })
        it('version appender', function () {
            try {
                version = require('../lib/appenders/version')
                if (typeof version == 'undefined') {
                    throw new Error('no version')
                }
            } catch (e) {
                assert(false)
            }
        })
    })
})

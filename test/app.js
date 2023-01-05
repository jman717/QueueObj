var assert = require('assert');

describe('app', function () {
    let app, application

    it('app.constructor should pass', function () {
        application = require('../app.js')
        assert(app = new application())
    })

    it('app.process is a function', function () {
        assert(typeof app.process == 'function')
    })
    
    it('app.getParent is a function', function () {
        assert(typeof app.getParent == 'function')
    })
    
    it('app.getObjectToProcess is a function', function () {
        assert(typeof app.getObjectToProcess == 'function')
    })
        
    it('app.getObjectById is a function', function () {
        assert(typeof app.getObjectById == 'function')
    })
            
    it('app.getObjs is a function', function () {
        assert(typeof app.getObjs == 'function')
    })
                
    it('app.logMsg is a function', function () {
        assert(typeof app.logMsg == 'function')
    })
})

describe('require', function () {
    
    it('base', function () {
        assert(require('../lib/appenders/base'))
    })

    it('colors app', function () {
        assert(require('colors'))
    })

    it('all appender', function () {
        assert(require('../lib/appenders/all'))
    })

    it('func_all appender', function () {
        assert(require('../lib/appenders/func_all'))
    })

    it('top_one appender', function () {
        assert(require('../lib/appenders/top_one'))
    })

    it('bottom_one appender', function () {
        assert(require('../lib/appenders/bottom_one'))
    })

    it('sync_all appender', function () {
        assert(require('../lib/appenders/sync_all'))
    })

    it('status appender', function () {
        assert(require('../lib/appenders/status'))
    })

    it('version appender', function () {
        assert(require('../lib/appenders/version'))
    })
})

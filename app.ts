/* @author Jim Manton: jrman@risebroadband.net
* @since 2021-03-19
* Main processing app
*/

var colors = require('colors')

class QueueObj {
    constructor({ display, output }) {
        var t = this
        try {
            console.log(`jrm debug 3/20`)
        } catch (e) {
            e.message = "log4js-tagline app.js init error: " + e.message
            throw (e)
        }
    }
}


exports = module.exports = function ( props) {
    return new QueueObj( props )
}
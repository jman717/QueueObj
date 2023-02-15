var queue = require("../app.js")

var tst1 = class test1 {
  process(callback) {
    callback({ success: { msg: `processing all test1` } })
  }
}

var tst2 = class test2 {
  constructor(props) {
    let t = this, fname = "test_all.test2.constructor"

    props.log({msg: `This object is id (${props.id}). Doing processing here`.bgBrightCyan, type: "info"})
    }
  process(callback) {
      callback({ success: { msg: `processing all test2` } })
    }
  }

var tst3 = class test3 {
  process(callback) {
    // callback({success: { msg: `processing all test3` }})
    callback({ error: { msg: `there is some problem thrown here on test3` } })
  }
}

var tst4 = class test4 {
  process(callback) {
    callback({ success: { msg: `processing all test4` } })
  }
}

var qObj = new queue()

qObj.init().process({
  appender: "all",
  exclude_logMsg: ["debug"],   /* example ["debug", "info"] */
  process_objects: [tst1, tst2, tst3, tst4]
}).then((success) => {
  qObj.logMsg({ msg: `test success: {msg: "all objects processed with no errors"}`.success, type: "success" })
}, (error) => {
  if (typeof error == "string") {
    qObj.logMsg({ msg: `error: ${error}`.error, type: "error" })
  } else {
    let add_s = (error.error_count > 1) ? 's' : ''
    qObj.logMsg({ msg: `${error.error_count} error${add_s} detected`.error, type: "error" })
  }
})

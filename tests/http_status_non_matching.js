var queue = require("../app.js")

var tst1 = class test1 {
  constructor(props) {
    let t = this, fname = "status.test1.constructor"
    t.log = props.log
    t.id = props.id
    t.status = "init"

    t.process = t.process.bind(t)
  }

  process(callback) {
    let t = this, fname = "status.test1.process"
    t.log({ msg: `This object (${fname}) is id (${t.id}) status (${t.status}). Do stuff here`.bgBrightGreen, type: "info" })
    callback({ success: { msg: `processing all test1` } })
  }
}

var tst2 = class test2 {
  constructor(props) {
    let t = this, fname = "status.test2.constructor"
    t.log = props.log
    t.id = props.id
    t.status = "step 1"

    t.process = t.process.bind(t)
  }

  process(callback) {
    let t = this, fname = "status.test2.process"
    t.log({ msg: `This object (${fname}) is id (${t.id}) status (${t.status}). Do stuff here`.bgBrightGreen, type: "info" })
    setTimeout(() => {
      callback({ success: { msg: `processing all test2` } })
    }, 4000)
  }
}

var tst3 = class test3 {
  constructor(props) {
    let t = this, fname = "status.test3.constructor"
    t.log = props.log
    t.id = props.id
    t.status = "remove"

    t.process = t.process.bind(t)
  }

  process(callback) {
    let t = this, fname = "status.test3.process"
    t.log({ msg: `This object (${fname}) is id (${t.id}) status (${t.status}). Do stuff here`.bgBrightGreen, type: "info" })
    // callback({success: { msg: `processing all test3` }})
    callback({ error: { msg: `there is some problem thrown here on test3` } })
  }
}

var tst4 = class test4 {
  constructor(props) {
    let t = this, fname = "status.test4.constructor"
    t.log = props.log
    t.id = props.id
    t.status = "delete"

    t.process = t.process.bind(t)
  }

  process(callback) {
    let t = this, fname = "status.test4.process"
    t.log({ msg: `This object (${fname}) is id (${t.id}) status (${t.status}). Do stuff here`.bgBrightGreen, type: "info" })
    callback({ success: { msg: `processing all test4` } })
  }
}

var qObj = new queue()

qObj.init().process({
  appender: "status",
  xlog: {appender: "http", hostname: "127.0.0.1", port: 3003},
  exclude_logMsg: ["debug", "info"],   /* example ["debug", "info"] */
  exclude_status: ["delete"],
  process_objects: [tst1, tst2, tst3, tst4]
}).then((success) => {
  qObj.logMsg({ msg: `test success: {msg: "status matching objects processed with no errors"}`.success.italic.bold, type: "success" })
  qObj.log_queue.server()
}, (error) => {
  if (typeof error == "string") {
    qObj.logMsg({ msg: `error: ${error}`.error.italic.bold, type: "error" })
  } else {
    let add_s = (error.error_count > 1) ? 's' : ''
    qObj.logMsg({ msg: `${error.error_count} error${add_s} detected`.error.italic.bold, type: "error" })
  }
  qObj.log_queue.server()
})

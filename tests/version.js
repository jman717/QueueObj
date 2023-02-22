var queue = require("../app.js")

var tst1 = class test1 {
  constructor(props) {
    let t = this, fname = "version.test1.constructor"
    t.log = props.log
    t.id = props.id
    t.version = "2.00"

    t.process = t.process.bind(t)
  }

  process(callback) {
    let t = this, fname = "version.test1.process"
    t.log({ msg: `This object (${fname}) is id (${t.id}) version (${t.version}). Do stuff here`.bgBrightGreen, type: "info" })
    callback({ success: { msg: `processing ${fname}) is id (${t.id}) version (${t.version})` } })
  }
}

var tst2 = class test2 {
  constructor(props) {
    let t = this, fname = "version.test2.constructor"
    t.log = props.log
    t.id = props.id
    t.version = "1.00"

    t.process = t.process.bind(t)
  }

  process(callback) {
    let t = this, fname = "version.test2.process"
    t.log({ msg: `This object (${fname}) is id (${t.id}) version (${t.version}). Do stuff here`.bgBrightGreen, type: "info" })
    setTimeout(() => {
      callback({ success: { msg: `processing ${fname}) is id (${t.id}) version (${t.version})` } })
    }, 4000)
  }
}

var tst3 = class test3 {
  constructor(props) {
    let t = this, fname = "version.test3.constructor"
    t.log = props.log
    t.id = props.id
    t.version = "1.00"

    t.process = t.process.bind(t)
  }

  process(callback) {
    let t = this, fname = "version.test3.process"
    t.log({ msg: `This object (${fname}) is id (${t.id}) version (${t.version}). Do stuff here`.bgBrightGreen, type: "info" })
    // callback({success: { msg: `processing ${fname}) is id (${t.id}) version (${t.version})` }})
    callback({ error: { msg: `there is some problem thrown here on ${fname}) is id (${t.id}) version (${t.version})` } })
  }
}

var tst4 = class test4 {
  constructor(props) {
    let t = this, fname = "version.test4.constructor"
    t.log = props.log
    t.id = props.id
    t.version = "3.00"

    t.process = t.process.bind(t)
  }

  process(callback) {
    let t = this, fname = "version.test4.process"
    t.log({ msg: `This object (${fname}) is id (${t.id}) version (${t.version}). Do stuff here`.bgBrightGreen, type: "info" })
    callback({ success: { msg: `processing ${fname}) is id (${t.id}) version (${t.version})` } })
  }
}

var qObj = new queue()

qObj.init().process({
  appender: "version",
  exclude_logMsg: ["debug"],   /* example ["debug", "info"] */
  include_version: ["1.00", "3.00"],
  process_objects: [tst1, tst2, tst3, tst4]
}).then((success) => {
  qObj.logMsg({ msg: `test success: {msg: "version objects processed with no errors"}`.success.italic.bold, type: "success" })
}, (error) => {
  if (typeof error == "string") {
    qObj.logMsg({ msg: `error: ${error}`.error.italic.bold, type: "error" })
  } else {
    let add_s = (error.error_count > 1) ? 's' : ''
    qObj.logMsg({ msg: `${error.error_count} error${add_s} detected`.error.italic.bold, type: "error" })
  }
})

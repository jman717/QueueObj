var queue = require("../app.js")

var tst1 = class test1 {
  constructor(props) {
    let t = this, fname = "name_matching.test1.constructor"
    t.log = props.log
    t.id = props.id
    t.name = "test 1"

    t.process = t.process.bind(t)
  }

  process(callback) {
    let t = this, fname = "name_matching.test1.process"
    t.log({ msg: `This object (${fname}) is id (${t.id}) name (${t.name}). Do stuff here`.bgBrightGreen, type: "info" })
    callback({ success: { msg: `processing all ${t.name}` } })
  }
}

var tst2 = class test2 {
  constructor(props) {
    let t = this, fname = "name_matching.test2.constructor"
    t.log = props.log
    t.id = props.id
    t.name = "test 2"

    t.process = t.process.bind(t)
  }

  process(callback) {
    let t = this, fname = "name_matching.test2.process"
    t.log({ msg: `This object (${fname}) is id (${t.id}) name (${t.name}). Do stuff here`.bgBrightGreen, type: "info" })
    setTimeout(() => {
      callback({ success: { msg: `processing all ${t.name}` } })
    }, 4000)
  }
}

var tst3 = class test3 {
  constructor(props) {
    let t = this, fname = "name_matching.test3.constructor"
    t.log = props.log
    t.id = props.id
    t.name = "test 3"

    t.process = t.process.bind(t)
  }

  process(callback) {
    let t = this, fname = "name_matching.test3.process"
    t.log({ msg: `This object (${fname}) is id (${t.id}) name (${t.name}). Do stuff here`.bgBrightGreen, type: "info" })
    // callback({success: { msg: `processing all ${t.name}` }})
    callback({ error: { msg: `there is some problem thrown here on ${t.name}` } })
  }
}

var tst4 = class test4 {
  constructor(props) {
    let t = this, fname = "name_matching.test4.constructor"
    t.log = props.log
    t.id = props.id
    t.name = "test 4"

    t.process = t.process.bind(t)
  }

  process(callback) {
    let t = this, fname = "name_matching.test4.process"
    t.log({ msg: `This object (${fname}) is id (${t.id}) name (${t.name}). Do stuff here`.bgBrightGreen, type: "info" })
    callback({ success: { msg: `processing all ${t.name}` } })
  }
}

var qObj = new queue()

qObj.init().process({
  appender: "name",
  exclude_logMsg: ["debug"],   /* example ["debug", "info"] */
  include_names: ["test 2", "test 4"],
  process_objects: [tst1, tst2, tst3, tst4]
}).then((success) => {
  qObj.logMsg({ msg: `test success: {msg: "name matching objects processed with no errors"}`.success.italic.bold, type: "success" })
}, (error) => {
  if (typeof error == "string") {
    qObj.logMsg({ msg: `error: ${error}`.error.italic.bold, type: "error" })
  } else {
    let add_s = (error.error_count > 1) ? 's' : ''
    qObj.logMsg({ msg: `${error.error_count} error${add_s} detected`.error.italic.bold, type: "error" })
  }
})

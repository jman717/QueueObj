var queue = require("../app.js")

var tst1 = class test1 {
  constructor(props) {
    let t = this, fname = "test_all.test1.constructor"
    t.log = props.log
    t.id = props.id
    t.base_queue_process_function = t.custom_function

    t.custom_function = t.custom_function.bind(t)
    t.base_queue_process_function = t.base_queue_process_function.bind(t)
  }

  custom_function(callback) {
    let t = this, fname = "test_all.test1.custom_function"
    t.log({ msg: `This object (${fname}) is id (${t.id}). Do stuff here`.bgBrightGreen, type: "info" })
    callback({ success: { msg: `processing all test1` } })
  }
}

var tst2 = class test2 {
  constructor(props) {
    let t = this, fname = "test_all.test2.constructor"
    t.log = props.log
    t.id = props.id
    t.base_queue_process_function = t.another_function

    t.another_function = t.another_function.bind(t)
    t.base_queue_process_function = t.base_queue_process_function.bind(t)
  }

  another_function(callback) {
    let t = this, fname = "test_all.test2.another_function"
    t.log({ msg: `This object (${fname}) is id (${t.id}). Do stuff here`.bgBrightGreen, type: "info" })
    // callback({ success: { msg: `processing all test2` } })
    setTimeout(() => {  
      callback({ success: { msg: `processing all test2` } })
    }, 4000)
  }
}

var tst3 = class test3 {
  constructor(props) {
    let t = this, fname = "test_all.test3.constructor"
    t.log = props.log
    t.id = props.id
    t.base_queue_process_function = t.third_test

    t.third_test = t.third_test.bind(t)
    t.base_queue_process_function = t.base_queue_process_function.bind(t)
  }

  third_test(callback) {
    let t = this, fname = "test_all.test3.third_test"
    t.log({ msg: `This object (${fname}) is id (${t.id}). Do stuff here`.bgBrightGreen, type: "info" })
    // callback({success: { msg: `processing all test3` }})
    callback({ error: { msg: `there is some problem thrown here on test3` } })
  }
}

var tst4 = class test4 {
  constructor(props) {
    let t = this, fname = "test_all.test4.constructor"
    t.log = props.log
    t.id = props.id
    t.base_queue_process_function = t.last_shot

    t.last_shot = t.last_shot.bind(t)
    t.base_queue_process_function = t.base_queue_process_function.bind(t)
  }

  last_shot(callback) {
    let t = this, fname = "test_all.test4.process"
    t.log({ msg: `This object (${fname}) is id (${t.id}). Do stuff here`.bgBrightGreen, type: "info" })
    callback({ success: { msg: `processing all test4` } })
  }
}

var qObj = new queue()

qObj.init().process({
  appender: "func_all",
  exclude_logMsg: ["debug"],   /* example ["debug", "info"] */
  process_objects: [tst1, tst2, tst3, tst4],
}).then((success) => {
  qObj.logMsg({ msg: `test success: {msg: "func_all objects processed with no errors"}`.success.italic.bold, type: "success" })
}, (error) => {
  if (typeof error == "string") {
    qObj.logMsg({ msg: `error: ${error}`.error.italic.bold, type: "error" })
  } else {
    let add_s = (error.error_count > 1) ? 's' : ''
    qObj.logMsg({ msg: `${error.error_count} error${add_s} detected`.error.italic.bold, type: "error" })
  }
})

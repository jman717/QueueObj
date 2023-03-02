[![npm Package](https://img.shields.io/npm/v/queueobj.svg)](https://www.npmjs.org/package/queueobj)
[![License](https://img.shields.io/npm/l/queueobj.svg)](https://github.com/jman717/queueobj/blob/master/LICENSE)
[![CodeQL](https://github.com/jman717/QueueObj/actions/workflows/github-actions.yml/badge.svg)](https://github.com/jman717/QueueObj/blob/main/.github/workflows/github-actions.yml)
[![Node.js CI](https://github.com/jman717/QueueObj/actions/workflows/node.js.yml/badge.svg)](https://github.com/jman717/QueueObj/actions/workflows/node.js.yml)

[![NPM](https://nodei.co/npm/queueobj.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/queueobj/)

Queue javascript objects dynamically then process the queue according to the appender. All appenders are handled synchronously.

```

Included tag appenders:

* files - See if inputed files exists.
* all - process all added objects.
* top_one - process only the object in the 0(zero) position of the process array.
* bottom_one - process only the object in the last position of the process array.
* func_all - process custom function names in created objects. Custom processing names can be used in any appender, this is just one example.
* status - queue and process all objects by status.
* name - queue and process all objects by name.
* version - queue and process all objects by version.

* json_all - process a class object per json input array variables.
* json_top_one - process a class object per the first json input array variable.
* json_bottom_one - process a class object per the last json input array variable.
* json_func_all - process custom function names in created objects. Custom processing names can be used in any json appender, this is just one example.
* json_status - queue and process all objects by status.
* json_name - queue and process all objects by name.
* json_version - queue and process all objects by version.

Mocha Test
---------
```
npm test
```

General Setup Test
---------
npm run test_files  
npm run test_all   
npm run test_top_one   
npm run test_bottom_one   
npm run test_func_all   
npm run test_status_matching   
npm run test_status_non_matching   
npm run test_name_matching   
npm run test_name_non_matching   
npm run test_version_matching   
npm run test_version_non_matching   
npm run test_json_all   
npm run test_json_top_one   
npm run test_json_bottom_one   
npm run test_json_func_all   
npm run test_json_status_matching   
npm run test_json_status_non_matching   
npm run test_json_version_matching   
npm run test_json_version_non_matching   
npm run test_json_name_matching   
npm run test_json_name_non_matching   

```

Usage
---------

var queue = require("queueobj");

var tst1 = class test1 {
  constructor(props) {
    let t = this, fname = "test_all.test1.constructor"
    t.log = props.log
    t.id = props.id
  }

  process(callback) {
    let t = this, fname = "test_all.test1.process"
    t.log({ msg: `This object (${fname}) is id (${t.id}). Do stuff here`.bgBrightGreen, type: "info" })
    callback({ success: { msg: `processing all test1` } })
  }
}

var tst2 = class test2 {
  constructor(props) {
    let t = this, fname = "test_all.test2.constructor"
    t.log = props.log
    t.id = props.id
  }

  process(callback) {
    let t = this, fname = "test_all.test2.process"
    t.log({ msg: `This object (${fname}) is id (${t.id}). Do stuff here`.bgBrightGreen, type: "info" })
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
  }

  process(callback) {
    let t = this, fname = "test_all.test3.process"
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

  }

  process(callback) {
    let t = this, fname = "test_all.test4.process"
    t.log({ msg: `This object (${fname}) is id (${t.id}). Do stuff here`.bgBrightGreen, type: "info" })
    callback({ success: { msg: `processing all test4` } })
  }
}

var qObj = new queue()

qObj.init().process({
  appender: "all",
  exclude_logMsg: ["debug"],   /* example ["debug", "info"] */
  process_objects: [tst1, tst2, tst3, tst4]
}).then((success) => {
  qObj.logMsg({ msg: `test success: {msg: "all objects processed with no errors"}`.success.italic.bold, type: "success" })
}, (error) => {
  if (typeof error == "string") {
    qObj.logMsg({ msg: `error: ${error}`.error.italic.bold, type: "error" })
  } else {
    let add_s = (error.error_count > 1) ? 's' : ''
    qObj.logMsg({ msg: `${error.error_count} error${add_s} detected`.error.italic.bold, type: "error" })
  }
})

```


console.log(`jrm debug 3/20 ts`)

var queue = require("./app.ts")

let qObj = new queue({
    "display": ["trace", "debug", "info", "warn", "error", "fatal", "mark"],
    "output": {
      "to_console": { "show": true, "color": {"trace": "blue", 
                                              "debug": "magenta", 
                                              "info": "bgBlue", 
                                              "warn": "yellow", 
                                              "error": "red", 
                                              "fatal": "red", 
                                              "mark": "white" }},      /* send output to console.log */
      "to_local_file": true,   /* send output to the local file */
      "to_datadog": true        /* send output to datadog (when the datadog appender is configured) */
    }
  })
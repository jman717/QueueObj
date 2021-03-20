# QueueObj
Queue javascript objects dynamically then process the queue to completion.

Included tag appenders:

* route - to display path or service name
* line - displays file name and line number
* action - displays action name
* stopwatch - displays time elapsed for a particular tag.
* counter - displays counts applied to a tag.
* error - displays an error message from the try/catch block along with the class/function if available from the stack, or simply display an error message.
* class_function - display the class and function name.
* display - ability to turn tags on or off
* counter - count how many itterations a tag has been inputted to. Helpfull in turning tags on/off.
* datadog - for metrics including increment, incrementBy, gauge, histogram, and set.
* email - Appenders and cron settings allows flexible email delivery options


Installation
---------
```
npm install log4js-tagline
```

Mocha Test
---------
```
npm test
```

General Setup Test
---------
```
node test
```

Usage
---------

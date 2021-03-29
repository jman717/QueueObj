# QueueObj
Queue javascript objects dynamically then process the queue according to the appender.

Included tag appenders:

* all - process all added objects.
* func_all - process functions to all added objects.
* top_one - process only the object in the 0(zero) position of the process array.
* bottom_one - process only the object in the last position of the process array.
* array - process object in various ways: all, items, or byIds.

Installation
---------
```
npm install QueueObj
```

Mocha Test
---------
```
npm test
```

General Setup Test
---------
```
node test_all
node test_top_one
node test_bottom_one
node test_func_all
node test_array

```

Usage
---------

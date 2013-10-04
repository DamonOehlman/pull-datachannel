# pull-dc

[Pull Stream](https://github.com/dominictarr/pull-stream) interfaces for
working with WebRTC data channels.  While this is not an official part of
the [rtc.io](http://www.rtc.io/) suite they do work very nicely with them
and the
[Sharing using Data Channels demo](https://github.com/rtc-io/demo-sharing)
makes use of these pull-streams.


[![NPM](https://nodei.co/npm/pull-dc.png)](https://nodei.co/npm/pull-dc/)


## Reference

### read

Create a pull-stream source on a `RTCDataChannel`.

```js
var pull = require('pull-stream');
var dc = require('pull-dc');
var channel = getDataChannel(); // magic happens here

// read the data coming from the stream and log it out
pull(
  dc.read(channel),
  pull.log()
);
```

### write

Create a pull-stream sink on a `RTCDataChannel`.

```js
var pull = require('pull-stream');
var dc = require('pull-dc');
var channel = getDataChannel(); // magic happens here

// write the values to the data channel
pull(
  pull.values([1, 2, 3]),
  dc.write(channel)
);
```

## License(s)

### MIT

Copyright (c) 2013 Damon Oehlman <damon.oehlman@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

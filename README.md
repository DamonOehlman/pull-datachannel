# pull-datachannel

[Pull Stream](https://github.com/dominictarr/pull-stream) interfaces for
working with WebRTC data channels.  While this is not an official part of
the [rtc.io](http://www.rtc.io/) suite they do work very nicely with them
and the
[Sharing using Data Channels demo](https://github.com/rtc-io/demo-sharing)
makes use of these pull-streams.


[![NPM](https://nodei.co/npm/pull-datachannel.png)](https://nodei.co/npm/pull-datachannel/)


## Example Usage

Displayed below is an example that demonstrates how pull-streams can 
be used in conjunction with the data channel to transmit and receive
data via data-channels:

```js
var quickconnect = require('rtc-quickconnect');
var pull = require('pull-stream');
var observable = require('pull-observable');
var dc = require('pull-datachannel');

// capture the pointer on the document
var point = require('point')(document);

quickconnect({ ns: 'dctest', data: true, dtls: true })
  .on('dc:open', function(channel, peerId) {
    console.log('data channel opened for peer: ' + peerId);

    // stream the pointer information across the datachannel
    pull(
      observable(point),
      pull.map(JSON.stringify),
      dc.write(channel)
    );

    // read incoming pointer information
    pull(
      dc.read(channel),
      pull.map(JSON.parse),
      pull.log()
    );
  });
```

__NOTE:__ At this stage, even though I'm sending only text data I am still
seeing data-channel exceptions in chrome :(

Also if you aren't seeing events across the connection, it's important
to note that [point](https://github.com/DamonOehlman/point) is a simple
library that captures unified pointer events (mouse and touch) so you will
need to click and drag the mouse to create move events.

## Reference

### read

Create a pull-stream source on a `RTCDataChannel`.

```js
var quickconnect = require('rtc-quickconnect');
var pull = require('pull-stream');
var randomName = require('random-name');
var dc = require('pull-datachannel');

quickconnect({ ns: 'dctest', data: true })
  .on('dc:open', function(channel, peerId) {
    console.log('data channel opened for peer: ' + peerId);

    // when we get data, log it
    pull(
      dc.read(channel),
      pull.log()
    );

    sendRandomNames(channel);
  });

function sendRandomNames(channel) {
  setTimeout(function() {
    channel.send(randomName());
    sendRandomNames(channel);
  }, Math.random() * 1000);
}
```

### write

Create a pull-stream sink on target data channel.

```js
var quickconnect = require('rtc-quickconnect');
var pull = require('pull-stream');
var dc = require('pull-datachannel');

quickconnect({ ns: 'dctest', data: true, dtls: true })
  .on('dc:open', function(channel, peerId) {
    console.log('data channel opened for peer: ' + peerId);

    channel.addEventListener('message', function(evt) {
      console.log('received data: ', evt.data);
    });

    // send some data to the channel
    pull(
      pull.values([1, 2, 3, 4]),
      dc.write(channel)
    );
  });
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

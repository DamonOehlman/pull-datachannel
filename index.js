var pull = require('pull-core');

/**
  # pull-datachannel

  [Pull Stream](https://github.com/dominictarr/pull-stream) interfaces for
  working with WebRTC data channels.  While this is not an official part of
  the [rtc.io](http://www.rtc.io/) suite they do work very nicely with them
  and the
  [Sharing using Data Channels demo](https://github.com/rtc-io/demo-sharing)
  makes use of these pull-streams.

  ## Example Usage

  Displayed below is an example that demonstrates how pull-streams can 
  be used in conjunction with the data channel to transmit and receive
  data via data-channels:

  <<< examples/shared-pointer.js

  __NOTE:__ At this stage, even though I'm sending only text data I am still
  seeing data-channel exceptions in chrome :(

  Also if you aren't seeing events across the connection, it's important
  to note that [point](https://github.com/DamonOehlman/point) is a simple
  library that captures unified pointer events (mouse and touch) so you will
  need to click and drag the mouse to create move events.

  ## Reference
**/

/**
  ### read

  Create a pull-stream source on a `RTCDataChannel`.

  <<< examples/read.js

**/
exports.read = pull.Source(function(dc) {
  var buffer = [];
  var next = [];

  dc.addEventListener('message', function handleMessage(evt) {
    // if we are waiting for a value provide it, otherwise buffer
    // ignore the initial undefined value
    next.length ?
      next.shift()(null, evt.data) :
      buffer[buffer.length] = evt.data;
  });

  return function(end, cb) {
    if (end) {
      dc.removeEventListener('message', handleMessage);
      return cb(end);
    }

    // if we have items in the buffer, return the first
    if (buffer.length) {
      return cb(false, buffer.shift());
    }

    // otherwise, wait for an item to hit the buffer
    next = [cb];
  };
});

/**
  ### write

  Create a pull-stream sink on target data channel.

  <<< examples/write.js

**/
exports.write = pull.Sink(function(read, dc, done) {
  function next(end, data) {
    if (end) {
      return (done || function() {})(end);
    }

    // TODO: check ready state of the datachannel
    // console.log(dc.bufferedAmount, dc.readyState, dc.protocol);

    // process the data
    try {
      dc.send(data);
    }
    catch (e) {
      // console.log('captured error: ', e);
    }

    // read the next data chunk
    read(null, next);
  }

  read(null, next);
});
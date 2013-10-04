var pull = require('pull-core');

/**
  # pull-datachannel

  [Pull Stream](https://github.com/dominictarr/pull-stream) interfaces for
  working with WebRTC data channels.  While this is not an official part of
  the [rtc.io](http://www.rtc.io/) suite they do work very nicely with them
  and the
  [Sharing using Data Channels demo](https://github.com/rtc-io/demo-sharing)
  makes use of these pull-streams.

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

  To be completed.  

**/
exports.write = pull.Sink(function(read, dc, done) {

});
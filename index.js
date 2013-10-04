var pull = require('pull-core');

/**
  # pull-dc

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
**/
exports.read = pull.Source(function(dc) {

});

/**
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

**/
exports.write = pull.Sink(function(read) {

});
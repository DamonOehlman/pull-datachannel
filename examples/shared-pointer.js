var quickconnect = require('rtc-quickconnect');
var pull = require('pull-stream');
var observable = require('pull-observable');
var dc = require('../');

// capture the pointer on the document
var point = require('point')(document);

quickconnect({ ns: 'dctest', data: true })
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
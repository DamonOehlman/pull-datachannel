var qc = require('rtc-quickconnect');
var pull = require('pull-stream');
var randomName = require('random-name');
var dc = require('../');

qc({ ns: 'dctest', signaller: 'http://sig.rtc.io:50000', data: true })
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
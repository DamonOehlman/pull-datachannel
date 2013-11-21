var qc = require('rtc-quickconnect');
var pull = require('pull-stream');
var dc = require('../');

qc({ ns: 'dctest', signaller: 'http://sig.rtc.io:50000', data: true, dtls: true })
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
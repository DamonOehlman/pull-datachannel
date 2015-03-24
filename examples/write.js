var qc = require('rtc-quickconnect');
var pull = require('pull-stream');
var dc = require('../');

qc('https://switchboard.rtc.io/', { room: 'pulldc-write' })
  .createDataChannel('test')
  .on('channel:opened:test', function(peerId, channel) {
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

var qc = require('rtc-quickconnect');
var pull = require('pull-stream');
var observable = require('pull-observable');
var dc = require('../');

// create a canvas to draw the remote line
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');

// initialise the canvas height and width and add to the doc
canvas.width = 640;
canvas.height = 480;
document.body.appendChild(canvas);

// capture the pointer on the document
var point = require('point')(canvas);

function drawCursor(color) {
  var lastXY = [];

  return function(args) {
    var xy = args.slice(0, 2);
    var data = args[2];

    if (data.type === 'move') {
      context.strokeStyle = color;
      context.beginPath();
      context.moveTo.apply(context, lastXY);
      context.lineTo.apply(context, xy);
      context.stroke();
      context.closePath();
    }

    // save the last xy
    lastXY = [].concat(xy);

    return args.slice(0, 3);
  };
}

qc('https://switchboard.rtc.io/', { room: 'pulldc-sharedpointer' })
  .createDataChannel('cursor')
  .on('channel:opened:cursor', function(peerId, channel) {
    console.log('data channel opened for peer: ' + peerId);

    // stream the pointer information across the datachannel
    pull(
      observable(point),
      pull.map(drawCursor('#000')),
      pull.map(JSON.stringify),
      dc.write(channel)
    );

    // read incoming pointer information
    pull(
      dc.read(channel),
      pull.map(JSON.parse),
      pull.drain(drawCursor('#F00'))
    );
  });

'use strict';

const bleno = require('bleno');
const KeyboardPadService = require('./service');

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state + ', address = ' + bleno.address);
  if (state === 'poweredOn') {
    bleno.startAdvertising('Keyboard Pad', ['b0d0']);
  } else {
    bleno.stopAdvertising();
  }
});

/* Linux only events */

bleno.on('accept', function(clientAddress) {
  console.log('on -> accept, client: ' + clientAddress);
  bleno.updateRssi();
});

bleno.on('disconnect', function(clientAddress) {
  console.log('on -> disconnect, client: ' + clientAddress);
});

bleno.on('rssiUpdate', function(rssi) {
  console.log('on -> rssiUpdate: ' + rssi);
});

/* End Linux only events */

bleno.on('mtuChange', function(mtu) {
  console.log('on -> mtuChange: ' + mtu);
});

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));
  if (!error) {
    bleno.setServices([
      new KeyboardPadService()
    ]);
  }
});

bleno.on('advertisingStop', function() {
  console.log('on -> advertisingStop');
});

bleno.on('servicesSet', function(error) {
  console.log('on -> servicesSet: ' + (error ? 'error ' + error : 'success'));
});

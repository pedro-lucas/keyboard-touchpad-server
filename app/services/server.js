'use strict';

const bleno = require('bleno');
const KeyboardPadService = require('./keyboard-touchpad-service');
const kServerUUID = 'b0d0';

const manager = {
  state: 'poweredOn',
  advertising: false,
  start() {
    this.state = 'poweredOn';
    this.startBleno();
  },
  stop() {
    this.state = 'poweredOff';
    this.stopBleno();
  },
  restart() {
    this.stop();
    this.start();
  },
  startBleno() {
    if(bleno.state === 'poweredOn' && !this.advertising) {
      this.advertising = true;
      bleno.startAdvertising('Keyboard Pad', [kServerUUID]);
    }
  },
  stopBleno() {
    if(!this.advertising) {
      bleno.stopAdvertising();
      this.advertising = false;
    }
  },
  isBluetoothOn() {
    return bleno.state === 'poweredOn';
  },
  isServerOn() {
    return this.state === 'poweredOn';
  },
  isAdvertising() {
    return advertising;
  },
  get bluetoothState() {
    return bleno.state;
  }
};

module.exports = manager;

bleno.on('stateChange', state => {
  console.log('on -> stateChange: ' + state + ', address = ' + bleno.address);
  if (manager.state === 'poweredOn' && state === 'poweredOn') {
    manager.startBleno();
  }else{
    manager.stopBleno();
  }
});

/* Linux events only */

bleno.on('accept', clientAddress => {
  console.log('on -> accept, client: ' + clientAddress);
  bleno.updateRssi();
});

bleno.on('disconnect', clientAddress => {
  console.log('on -> disconnect, client: ' + clientAddress);
});

bleno.on('rssiUpdate', rssi => {
  console.log('on -> rssiUpdate: ' + rssi);
});

/* End Linux only events */

bleno.on('mtuChange', mtu => {
  console.log('on -> mtuChange: ' + mtu);
});

bleno.on('advertisingStart', err => {
  console.log('on -> advertisingStart: ' + (err ? 'error ' + err : 'success'));
  if (!err) {
    manager.advertising = true;
    bleno.setServices([
      new KeyboardPadService()
    ]);
  }
});

bleno.on('advertisingStop', () => {
  manager.advertising = false;
  console.log('on -> advertisingStop');
});

bleno.on('servicesSet', err => {
  console.log('on -> servicesSet: ' + (err ? 'error ' + err : 'success'));
});

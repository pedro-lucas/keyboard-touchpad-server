const Model = require('./device');

class DeviceBluetooth extends Device {

  constructor(id, name, socket) {
    this._socket = socket;
  }

  get mode() {
    return 'Bluetooth';
  }

}

module.exports = Device;

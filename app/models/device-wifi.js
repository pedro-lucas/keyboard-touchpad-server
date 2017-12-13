const Model = require('./device');

class DeviceWifi extends Device {

  constructor(id, name, socket) {
    this._socket = socket;
  }

  get mode() {
    return 'Wifi';
  }

}

module.exports = Device;

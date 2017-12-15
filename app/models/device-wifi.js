const Model = require('./device');

class DeviceWifi extends Device {

  constructor(id, name, client) {
    this._client = client;
    this.ip = client.conn.remoteAddress;
  }

  toRaw() {
    let obj = super.toRaw();
    obj.ip = this.ip;
    return obj;
  }

  get mode() {
    return 'Wifi';
  }

}

module.exports = Device;

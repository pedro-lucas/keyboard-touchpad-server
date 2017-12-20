const Model = require('./device');
const i18n = require("i18n");

class DeviceWifi extends Device {

  constructor(id, name, client) {
    this._client = client;
    this.ip = client.conn.remoteAddress;
    this._client.on('command', this.onCommand.bind(this));
    this._client.on('disconnect', this.onDisconnect.bind(this));
  }

  onCommand(command) {

    try {
      super.onCommand(command);
    }catch(e) {
      client.emit('error', e.getMessage());
    }

    /*
    - Mouse
    {
      "type": "mouse",
      "mode": "relative|absolute",
      "x": 1,
      "y": 1
    }
    - Keyboard
    {
      "type": "keyboard",
      "keyCode": 30
    }
    */

    return true;

  }

  onDisconnect() {
    this._client.removeListener('command', this.onCommand);
    this._client.removeListener('disconnect', this.onDisconnect);
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

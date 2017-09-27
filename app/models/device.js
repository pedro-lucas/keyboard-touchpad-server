const Model = require('./model');

class Device extends Model {

  constructor(id, name, mode) {
    super();
    this.id = id != undefined ? id : "";
    this.name = name != undefined ? name : "";
    this.mode = mode != undefined ? mode : Device.MODE_WIFI;
  }

  toString() {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      mode: this.mode
    });
  }

  static get MODE_BLUETOOTH() {
    return 1;
  }

  static get MODE_WIFI() {
    return 2;
  }

  static getModeString(mode) {
    if(mode == Device.MODE_BLUETOOTH) return "Bluetooth";
    return "Wifi";
  }

}

module.exports = Device;

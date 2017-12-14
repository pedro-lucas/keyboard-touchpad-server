const Model = require('./model');

class Device extends Model {

  constructor(id, name) {
    super();
    this.id = id != undefined ? id : "";
    this.name = name != undefined ? name : "";
    this.platform = 1; //1-android, 2-ios, 3-web
  }

  toString() {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      platform: this.platform,
      mode: this.mode
    });
  }

  get mode() {
    return 'Undefined';
  }

}

module.exports = Device;

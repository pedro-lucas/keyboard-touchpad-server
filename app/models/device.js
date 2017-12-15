const Model = require('./model');

class Device extends Model {

  constructor(id, name) {
    super();
    this.id = id != undefined ? id : "";
    this.name = name != undefined ? name : "";
    this.platform = 1; //1-android, 2-ios, 3-web TODO: Tenho que definir como capturar essa informação
  }

  toString() {
    return JSON.stringify(this.toRaw());
  }

  toRaw() {
    return {
      id: this.id,
      name: this.name,
      platform: this.platform,
      className: this.constructor.name
    };
  }

  get mode() {
    return 'Undefined';
  }

}

module.exports = Device;

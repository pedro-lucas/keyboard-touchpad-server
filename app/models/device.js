const Model = require('./model');

class Device extends Model {

  constructor(id, name) {
    super();
    this.id = id != undefined ? id : "";
    this.name = name != undefined ? name : "";
  }

  toString() {
    return JSON.stringify({
      id: this.id,
      name: this.name
      mode: this.mode
    });
  }

  get mode() {
    return 'Undefined';
  }

}

module.exports = Device;

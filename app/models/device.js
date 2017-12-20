const Model = require('./model');
const i18n = require("i18n");

class Device extends Model {

  constructor(id, name) {
    super();
    this.id = id != undefined ? id : "";
    this.name = name != undefined ? name : "";
    this.platform = 1; //1-android, 2-ios, 3-web TODO: Tenho que definir como capturar essa informação
  }

  onCommand(command) {
    if(!command || (command.type != "mouse" && command.type != "keyboard")) {
      throw new Error(i18n.__('Invalid command type'));
    }else if(command.type == "keyboard" && !command.keyCode) {
      throw new Error(i18n.__('Invalid keyboard sinal'));
    }else if(command.type == "mouse" && ((command.mode != "relative" && command.mode != "absolute") || !Number.isInteger(command.x) || !Number.isInteger(command.y))) {
      throw new Error(i18n.__('Invalid mouse command'));
    }
    //TODO: Executar comando
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

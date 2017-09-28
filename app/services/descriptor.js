const bleno = require('bleno');
const BlenoDescriptor = bleno.Descriptor;

class Descriptor extends BlenoDescriptor {

  constructor() {
    super({
      uuid: '2901',
      value: 'Keyboard pad'
    });
  }

}

module.exports = Descriptor;

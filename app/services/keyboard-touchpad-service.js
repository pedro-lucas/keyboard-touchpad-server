'use strict';

const bleno = require('bleno');
const BlenoPrimaryService = bleno.PrimaryService;
const ReadWriteNotifyCharacteristic = require('./characteristic');

class KeyboardTouchpadService extends BlenoPrimaryService {

  constructor() {
    super({
      uuid: 'b0d0',
      characteristics: [
        new ReadWriteNotifyCharacteristic()
      ]
    });
  }

}

module.exports = KeyboardTouchpadService;

const bleno = require('bleno');
const BlenoCharacteristic = bleno.Characteristic;
const Descriptor = require('./descriptor');

class ReadWriteNotifyCharacteristic extends BlenoCharacteristic {

  constructor() {
    super({
      uuid: 'b0d1',
      properties: ['write', 'writeWithoutResponse', 'notify'],
      value: null,
      descriptors: [
        new Descriptor()
      ]
    });
  }

  onReadRequest(offset, callback) {
    console.log('onReadRequest', offset, callback);
    callback(this.RESULT_SUCCESS, "");
  }

  onWriteRequest(data, offset, withoutResponse, callback) {
    this.value = data;
    console.log('Characteristic - onWriteRequest: value =', this.value.toString('utf8'), offset, withoutResponse);
    if (this.updateValueCallback) {
      console.log('Characteristic - notifying');
      this.updateValueCallback(this.value);
    }
    callback(this.RESULT_SUCCESS);
  }

  onSubscribe(maxValueSize, updateValueCallback) {
    console.log('Characteristic - onSubscribe', maxValueSize);
    super.onSubscribe(maxValueSize, updateValueCallback);
  }

  onUnsubscribe() {
    super.onUnsubscribe();
    console.log('Characteristic - onUnsubscribe');
  }

  onNotify() {
    console.log('onNotify');
  }

  onIndicate() {
    console.log('onIndicate');
  }

}

module.exports = ReadWriteNotifyCharacteristic;

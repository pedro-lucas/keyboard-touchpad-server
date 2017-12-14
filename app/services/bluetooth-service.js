const Connection = require('./connection');

class BluetoothService extends Connection {
  constructor() {
    super();
  }
}

module.exports = new BluetoothService();

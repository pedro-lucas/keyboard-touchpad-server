const Service = require('./service');
const Store = require('electron-store');

class Devices extends Service {

  constructor() {
    super();
    this.paired = Store.get('paired', []);
    this.blocked = Store.get('blocked', []);
    this.connected = [];
  }

  pair(device) {
    if(this.paired(device) == -1) {
      this.paired.push(device);
      this.save('paired');
      this.emit(Devices.EVENT_PAIR, device);
    }
  }

  unpair(device) {
    let index = this.paired(device);
    if(index > -1) {
      this.paired.splice(index, 1);
      this.save('paired');
      this.emit(Devices.EVENT_UNPAIR, device);
    }
  }

  block(device) {
    if(this.blocked(device) == -1) {
      this.blocked.push(device);
      this.save('blocked');
      this.emit(Devices.EVENT_BLOCK, device);
    }
  }

  unblock(device) {
    let index = this.blocked(device);
    if(index > -1) {
      this.blocked.splice(index, 1);
      this.save('blocked');
      this.emit(Devices.EVENT_UNBLOCK, device);
    }
  }

  addConnectedDevice(device) {
    if(this.connected(device) == -1) {
      const fDisconnect = () => {
        let index = this.connected(device);
        if(index > -1) {
          this.connected.splice(index, 1);
          device.removeListener('disconnect', fDisconnect);
          this.emit(Devices.EVENT_DISCONNECT, device);
        }
      };
      this.pair(device);
      this.connected.push(device);
      device.on('disconnect', fDisconnect);
      this.emit(Devices.EVENT_CONNECT, device);
    }
  }

  connected(id) {
    return this.search(this.connected, id);
  }

  paired(id) {
    return this.search(this.paired, id);
  }

  blocked(id) {
    return this.search(this.blocked, id);
  }

  search(devices, id) {
    let check = -1;
    devices.forEach(d, i => {
      if(d.id == id) {
        check = i;
      }
      return check == -1;
    });
    return check;
  }

  save(key) {
    let values = this[key];
    let filtered = [];
    values.forEach(d => {
      filtered.push(d.toString());
    });
    Store.set(key, filtered);
  }

  static get EVENT_CONNECT() {
    return 'event-connect';
  }

  static get EVENT_DISCONNECT() {
    return 'event-disconnect';
  }

  static get EVENT_PAIR() {
    return 'event-pair';
  }

  static get EVENT_UNPAIR() {
    return 'event-unpair';
  }

  static get EVENT_BLOCK() {
    return 'event-block';
  }

  static get EVENT_UNBLOCK() {
    return 'event-unblock';
  }

}

module.exports = new Devices();

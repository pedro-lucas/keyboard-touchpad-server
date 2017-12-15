const Service = require('./service');

class Devices extends Service {

  constructor() {
    super();
    this.paired = [];
    this.blocked = [];
    this.connected = [];
  }

  pair(device) {
    if(this.paired(device) == -1) {
      this.paired.push(device);
    }
  }

  unpair(device) {
    let index = this.paired(device);
    if(index > -1) {
      this.paired.splice(index, 1);
    }
  }

  addConnectedDevice(device) {
    
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

}

module.exports = new Devices();

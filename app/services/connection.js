const Service = require('./service');

module.exports = class Connection extends Service {

  constructor() {
    super();
    this.paired = [];
    this.blocked = [];
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

  paired(id) {
    return this.search(this.paired, id);
  }

  blocked(device) {
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

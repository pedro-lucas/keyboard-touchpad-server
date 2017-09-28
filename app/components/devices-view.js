const $ = require('jquery');
const ComponentView = require('./component-view');
const Device = require('../models/device');
const i18n = require("i18n");

module.exports = class DevicesView extends ComponentView {

  constructor(toolbarView) {
    super();
    this.toolbarView = toolbarView;
    this.devices = [];
    this.initialize();
  }

  initialize() {
    // this.add(new Device('', "iPhone Pedro", Device.MODE_BLUETOOTH));
    // this.add(new Device('', "Android Marcelo", Device.MODE_WIFI));
    // this.add(new Device('', "Windows Phone Fernando :)", Device.MODE_WIFI));
    // this.add(new Device('', "Donatello", Device.MODE_BLUETOOTH));
  }

  add(device) {
    let $deviceView = $(`<tr><td class="mdl-data-table__cell--non-numeric">${device.name}</td><td class="mdl-data-table__cell--non-numeric">${Device.getModeString(device.mode)}</td></tr>`);
    this.devices.push(device);
    this.tableView.find('tbody').append($deviceView);
  }

  remove(device) {
      let index = -1;

      if(device instanceof Device) {
        index = this.devices.indexOf(device);
      }else if(device instanceof Number) {
        index = parseInt(device);
      }

      if(index >= 0 && index < this.devices.length) {
        this.tableView.find('tbody tr').get(index).remove();
        this.devices.splice(index, 1);
      }

  }

  show() {
    this.view.addClass('active');
  }

  hide() {
    this.view.removeClass('active');
  }

  get cssClass() {
    return 'devices-view';
  }

  get ui() {
    return {
      listPaired: '.paired-list',
      listAvailable: '.available-list'
    };
  }

  get templateObject() {
    return {
      name: 'devices-view',
      args: {
        "paired_devices": i18n.__('Paired devices'),
        "available_devices": i18n.__('Available devices')
      }
    };
  }

}

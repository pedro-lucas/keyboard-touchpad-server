'use strict';

const $ = require('jquery');
const ComponentView = require('./component-view');
const Device = require('../models/device');
const i18n = require("i18n");

module.exports = class DevicesView extends ComponentView {

  constructor(toolbatView) {
    super();
    this.toolbatView = toolbatView;
    this.devices = [];
    this.initialize();
  }

  initialize() {
    this.add(new Device('', "iPhone Pedro", Device.MODE_BLUETOOTH));
    this.add(new Device('', "Android Marcelo", Device.MODE_WIFI));
    this.add(new Device('', "Windows Phone Fernando :)", Device.MODE_WIFI));
    this.add(new Device('', "Donatello", Device.MODE_BLUETOOTH));
    // console.log('inputs', this.tableView.find('.mdl-data-table__select input'));
  }

  add(device) {
    this.tableView.find('tbody').append(`<tr><td class="mdl-data-table__cell--non-numeric">${device.name}</td><td class="mdl-data-table__cell--non-numeric">${Device.getModeString(device.mode)}</td></tr>`);
  }

  get cssClass() {
    return 'devices-view';
  }

  get ui() {
    return {tableView: 'table'};
  }

  get templateObject() {
    return {
      name: 'devices-view',
      args: {
        deviceName: i18n.__('Device Name'),
        mode: i18n.__('Mode')
      }
    };
  }

}

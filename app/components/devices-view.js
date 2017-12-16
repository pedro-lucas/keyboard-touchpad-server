const $ = require('jquery');
const ComponentView = require('./component-view');
const Device = require('../models/device');
const Devices = require('../services/devices');
const WifiService = require('../services/wifi-service');
const i18n = require("i18n");

module.exports = class DevicesView extends ComponentView {

  constructor(toolbarView) {
    super();
    this.toolbarView = toolbarView;
    this.initialize();
  }

  initialize() {
    Devices.on(Devices.EVENT_PAIR, this.addPairedDevice.bind(this));
    Devices.on(Devices.EVENT_CONNECT, this.deviceConnected.bind(this));
    WifiService.on(WifiService.EVENT_REQUEST_CONNECTION, this.validateRequest.bind(this));
    // this.add(new Device('', "iPhone Pedro", Device.MODE_BLUETOOTH));
    // this.add(new Device('', "Android Marcelo", Device.MODE_WIFI));
    // this.add(new Device('', "Windows Phone Fernando :)", Device.MODE_WIFI));
    // this.add(new Device('', "Donatello", Device.MODE_BLUETOOTH));

    Devices.paired.forEach(device => this.add(device));

  }

  addPairedDevice(device) {

  }

  deviceConnected(device) {

  }

  validateRequest(info) {
    console.log('validar', info);
  }

  add(device) {
    let $deviceView = $(`<tr><td id="device-id-td-${device.id}" class="mdl-data-table__cell--non-numeric">${device.name}</td><td class="mdl-data-table__cell--non-numeric">${device.mode}</td></tr>`);
    this.tableView.find('tbody').append($deviceView);
  }

  remove(device) {
    this.tableView.find("#device-id-td-"+device.id).remove();
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

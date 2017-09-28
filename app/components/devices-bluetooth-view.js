const $ = require('jquery');
const DevicesView = require('./devices-view');
const Device = require('../models/device');
const BluetoothService = require('../services/bluetooth-service');
const i18n = require("i18n");

module.exports = class DevicesBluetoothView extends DevicesView {

  constructor(args) {
    super(args);
    this.view.attr('id', 'tab-bluetooth');
  }

}

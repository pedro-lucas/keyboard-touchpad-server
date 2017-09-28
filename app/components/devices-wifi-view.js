const $ = require('jquery');
const DevicesView = require('./devices-view');
const Device = require('../models/device');
const WifiService = require('../services/wifi-service');
const i18n = require("i18n");

module.exports = class DevicesWifiView extends DevicesView {

  constructor(args) {
    super(args);
    this.view.attr('id', 'tab-wifi');
  }

}

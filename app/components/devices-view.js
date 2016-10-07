'use strict';

const $ = require('jquery');
const ComponentView = require('./component-view');

module.exports = class DevicesView extends ComponentView {

  constructor(toolbatView) {
    super('devices-view');
    this.toolbatView = toolbatView;
    this.initialize();
  }

  initialize() {

  }

  get cssClass() {
    return 'devices-view';
  }

  get ui() {
    return {

    };
  }

}

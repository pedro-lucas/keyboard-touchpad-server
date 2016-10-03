'use strict';

const $ = require('jquery');
const ComponentView = require('./component-view');
const NotificationView = require('../library/notification-view');

module.exports = class ToolbarView extends ComponentView {

  constructor() {
    super('toolbar');
    this.initialize();
  }

  initialize() {

  }

  get cssClass() {
    return 'toolbar-view';
  }

  get ui() {
    return {
      'btnMenu': '.menu'
    };
  }

}

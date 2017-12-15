const $ = require('jquery');
const ComponentView = require('./component-view');
const NotificationView = require('../library/notification-view');
const i18n = require("i18n");

module.exports = class ToolbarView extends ComponentView {

  constructor() {
    super();
    this.init();
  }

  init() {
    this.btnSettings.on('click', this.actionSettings.bind(this));
  }

  actionSettings(evt) {
    this.emit(ToolbarView.EVENT_ACTION_SETTINGS, {
      evt: evt
    });
  }

  get templateObject() {
    return {
      name: 'toolbar',
      args: {
      }
    };
  }

  get cssClass() {
    return 'toolbar-view';
  }

  get ui() {
    return {
      'btnSettings': '.settings'
    };
  }

  static get EVENT_ACTION_SETTINGS() {
    return 'event-action-settings';
  }

}

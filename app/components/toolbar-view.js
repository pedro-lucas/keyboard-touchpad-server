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
    this.tabs.on('click', this.actionChangeTabs.bind(this));
    this.btnSettings.on('click', this.actionSettings.bind(this));
  }

  actionChangeTabs(evt) {
    const $target = $(evt.currentTarget);
    if(!$target.hasClass('mdc-tab--active')) {
      this.tabs.removeClass('mdc-tab--active');
      $target.addClass('mdc-tab--active');
      this.emit(ToolbarView.EVENT_CHANGE_TAB, {
        evt: evt,
        target: $target,
        id: $target.attr('href')
      });
    }
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
      'tabs': '.mdc-tab-bar a',
      'btnSettings': '.settings'
    };
  }

  static get EVENT_CHANGE_TAB() {
    return 'event-change-tab';
  }

  static get EVENT_ACTION_SETTINGS() {
    return 'event-action-settings';
  }

}

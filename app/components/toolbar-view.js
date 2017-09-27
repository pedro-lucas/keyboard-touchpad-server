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
    this.btnAdd.on('click', this.actionAdd.bind(this));
  }

  actionAdd(evt) {
    NotificationView.info("Hello world!! NotificationView.info", {dismissable: true});
    NotificationView.error("Hello world!! NotificationView.error", {dismissable: true});
    NotificationView.success("Hello world!! NotificationView.success", {dismissable: true});
    NotificationView.warning("Hello world!! NotificationView.warning", {dismissable: true});
    let notify = NotificationView.retry("Hello world!! NotificationView.retry", "Try again", {dismissable: true, onRetry: () => {
      notify.dismiss();
      NotificationView.info('This message will dismiss!!');
    }});
  }

  actionDelete(evt) {
    this.actionAdd(evt);
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
      'btnAdd': '.add',
      'btnDelete': '.delete'
    };
  }

  static get EVENT_DELETE() {
    return 'event-delete';
  }

}

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
    this.btnMenu.on('click', this.showNotification.bind(this));
  }

  showNotification(evt) {
    NotificationView.info(i18n.__("Hello world!! %s", "NotificationView.info"), {dismissable: true});
    NotificationView.error(i18n.__("Hello world!! %s", "NotificationView.error"), {dismissable: true});
    NotificationView.success(i18n.__("Hello world!! %s", "NotificationView.success"), {dismissable: true});
    NotificationView.warning(i18n.__("Hello world!! %s", "NotificationView.warning"), {dismissable: true});
    let notify = NotificationView.retry(i18n.__("Hello world!! %s", "NotificationView.retry"), i18n.__("Try again"), {dismissable: true, onRetry: () => {
      notify.dismiss();
      NotificationView.info(i18n.__('This message will dismiss!!'));
    }});
  }

  get cssClass() {
    return 'toolbar-view';
  }

  get ui() {
    return {
      'btnMenu': '.menu'
    };
  }

  get templateObject() {
    return {
      name: 'toolbar',
      args: {
        action: i18n.__('Action')
      }
    }
  }

}

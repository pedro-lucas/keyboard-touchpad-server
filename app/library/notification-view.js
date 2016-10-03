'use strict';

const $ = require('jquery');

let notifications = [];

module.exports = class NotificationView {

  constructor(options) {
    let defaults = {
      type: 1,
      message: 'Title default',
      detail: null,
      dismissable: false,
      dismissTimeout: 2000,
      container: window.document.body,
      onDidDismiss: function() {},
      onDidDisplay: function() {}
    };
    let opt = $.extend(defaults, options);
    this.type = opt.type;
    this.message = opt.message;
    this.detail = opt.detail;
    this.dismissable = opt.dismissable;
    this.dismissTimeout = opt.dismissTimeout;
    this.container =  opt.container;
    this.onDidDismiss = opt.onDidDismiss;
    this.onDidDisplay = opt.onDidDisplay;
    this.show();
  }

  show() {

    this.notificationsView = $('notifications');

    if(!this.notificationsView.length) {
      $(this.container).append('<notifications></notifications>');
      this.notificationsView = $('notifications');
    }

    let that = this;
    let $view = $('<notification></notification>');
    let $content = $('<div class="content"></div>');
    let $contentMessage = $('<div class="content-message"></div>');
    let $contentDetail = $('<div class="content-detail"></div>');
    let $btnClose = $('<div class="btn-close octicon octicon-x"></div>');
    let $btnCloseAll = $('<div class="btn-close-all">Close All</div>');
    let resetScroll = null;

    $content.append($contentMessage);
    $content.append($contentDetail);

    $view.addClass(this._typeClass());
    $view.append($content);
    $view.append($btnClose);
    $view.append($btnCloseAll);

    this.notificationsView.append($view);

    $contentMessage.html(this.message);

    if(this.detail && this.detail.length) {
      $contentDetail.html(this.detail);
      $view.addClass('has-detail');
    }

    if(this.dismissable) {
      $view.addClass('has-close');
    }else{
      this.timeOut = setTimeout(this.dismiss.bind(this), this.dismissTimeout);
    }

    $btnClose.on('click', this.dismiss.bind(this));
    $btnCloseAll.on('click', this.dismissAll.bind(this));

    this.view = $view;
    this.content = $content;
    this.contentMessage = $contentMessage;
    this.contentDetail = $contentDetail;
    this.btnClose = $btnClose;
    this.btnCloseAll = $btnCloseAll;

    this.scrollAction = function() {
      clearTimeout(resetScroll);
      let className = 'enable-pointer-events';
      if(!that.notificationsView.hasClass(className)) {
        that.notificationsView.addClass(className)
      }
      resetScroll = setTimeout(function(){
        that.notificationsView.remove(className);
      }, 500);
    };

    this.view.on('mousewheel', this.scrollAction);

    notifications.push(this);

  }

  dismiss() {
    let index = notifications.indexOf(this);
    if(index > -1) {
      notifications.splice(index, 1);
      this._close();
    }
  }

  _close() {
    let that = this;
    this.view.addClass('remove');
    this.view.off('mousewheel', this.scrollAction);
    clearTimeout(this.timeOut);
    setTimeout(function() {
      that.view.remove();
    }, 1000);
  }

  dismissAll() {
    notifications.forEach(function(notification) {
      notification._close();
    });
    notifications = [];
  }

  _typeClass() {
    switch (this.type) {
      case NotificationView.TYPE_SUCCESS:
        return 'notify-success';
        break;
      case NotificationView.TYPE_INFO:
        return 'notify-info';
        break;
      case NotificationView.TYPE_WARNING:
        return 'notify-warning';
        break;
      default: //Error
      return 'notify-error';
    }
  }

  static error(error, options) {
    let defaults = {
      type: 4,
      message: error,
      detail: null,
      dismissable: true
    };
    if(error instanceof Error) {
      defaults.message = error.toString();
      defaults.detail = error.stack.toString();
    }
    new NotificationView($.extend(defaults, options));
  }

  static info(message, options) {
    let defaults = {
      type: 2,
      message: message
    };
    new NotificationView($.extend(defaults, options));
  }

  static success(message, options) {
    let defaults = {
      type: 1,
      message: message
    };
    new NotificationView($.extend(defaults, options));
  }

  static warning(message, options) {
    let defaults = {
      type: 3,
      message: message
    };
    new NotificationView($.extend(defaults, options));
  }

  static get TYPE_SUCCESS() {
      return 1;
  }

  static get TYPE_INFO() {
    return 2;
  }

  static get TYPE_WARNING() {
    return 3;
  }

  static get TYPE_ERROR() {
    return 4;
  }

}

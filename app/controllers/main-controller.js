'use strict';

const Controller = require('./controller');
const NotificationView = require('../library/notification-view');
const ToolbarView = require('../components/toolbar-view');
const util = require('../library/util');
const $ = require("jquery");

class MainController extends Controller {

  constructor() {
    super($('.main'));
    this.initialize();
  }

  initialize() {
    this.toolbarView = new ToolbarView();
    this.addComponent(this.toolbarView);
  }

}

window.rootController = new MainController();

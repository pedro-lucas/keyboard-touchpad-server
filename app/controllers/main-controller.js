'use strict';

const Controller = require('./controller');
const NotificationView = require('../library/notification-view');
const ToolbarView = require('../components/toolbar-view');
const DevicesView = require('../components/devices-view');
const util = require('../library/util');
const $ = require("jquery");

class MainController extends Controller {

  constructor() {
    super($('main .page-content'));
    this.initialize();
  }

  initialize() {
    this.toolbarView = new ToolbarView();
    this.devicesView = new DevicesView(this.toolbarView);
    process.nextTick(() => {
      this.addComponent(this.toolbarView);
      this.addComponent(this.devicesView);
    });
  }

}

window.rootController = new MainController();

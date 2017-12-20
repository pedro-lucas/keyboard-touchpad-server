const Controller = require('./controller');
const ToolbarView = require('../components/toolbar-view');
const DevicesView = require('../components/devices-view');
const NotificationView = require('../library/notification-view');
const $ = require("jquery");

class MainController extends Controller {

  constructor() {
    super();
    this.initialize();
  }

  initialize() {

    this.toolbarView = new ToolbarView();
    this.devicesView = new DevicesView(this.toolbarView);

    this.addComponent(this.toolbarView);
    this.addComponent(this.devicesView);

    this.devicesView.show();

    this.toolbarView.on(ToolbarView.EVENT_ACTION_SETTINGS, () => {
      NotificationView.error(new Error('meeeee'));
    });

  }

  get view() {
    if(!this._view) this._view = $('body');
    return this._view;
  }

}

window.rootController = new MainController();

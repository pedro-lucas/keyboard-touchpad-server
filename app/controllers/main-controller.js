const Controller = require('./controller');
const ToolbarView = require('../components/toolbar-view');
const DevicesBluetoothView = require('../components/devices-bluetooth-view');
const DevicesWifiView = require('../components/devices-wifi-view');
const $ = require("jquery");

class MainController extends Controller {

  constructor() {
    super();
    this.initialize();
  }

  initialize() {

    this.toolbarView = new ToolbarView();
    this.devicesBluetoothView = new DevicesBluetoothView(this.toolbarView);
    this.devicesWifiView = new DevicesWifiView(this.toolbarView);

    this.addComponent(this.toolbarView);
    this.addComponent(this.devicesBluetoothView);
    this.addComponent(this.devicesWifiView);

    this.devicesBluetoothView.show();
    this.toolbarView.selectTab('tab-bluetooth');

    this.toolbarView.on(ToolbarView.EVENT_CHANGE_TAB, this.eventChangeTab.bind(this));

  }

  eventChangeTab(data) {
    if(data.id == 'tab-wifi') {
      this.devicesBluetoothView.hide();
      this.devicesWifiView.show();
    }else{
      this.devicesWifiView.hide();
      this.devicesBluetoothView.show();
    }
  }

  get view() {
    if(!this._view) this._view = $('body');
    return this._view;
  }

}

window.rootController = new MainController();

'use strict';

const $ = require('jquery');
const ComponentView = require('./component-view');

module.exports = class DevicesView extends ComponentView {

  constructor(toolbatView) {
    super('devices-view');
    this.toolbatView = toolbatView;
    setTimeout(this.initialize.bind(this), 1);
  }

  initialize() {
    this.tableView.find('tbody').append('<tr><td class="mdl-data-table__cell--non-numeric">Teste</td></tr>');
    console.log('inputs', this.tableView.find('.mdl-data-table__select input'));
  }

  get cssClass() {
    return 'devices-view';
  }

  get ui() {
    return {
      tableView: 'table'
    };
  }

}

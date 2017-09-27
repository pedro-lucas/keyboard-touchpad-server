require("../locale");

const ComponentView = require('../components/component-view');
window.i18n = require("i18n");

module.exports = class Controller extends ComponentView {
  constructor(container, args) {
    super(container, args);
  }
}

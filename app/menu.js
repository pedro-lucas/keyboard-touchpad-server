const electron = require('electron');
const {MenuItem} = electron;

class MenuFluent {
  constructor() {
    this.menu = [];
    this.index = -1;
  }

  Menu(name){
    this.index++;
    this.menu[this.index] = new MenuItem({ label: name });
    return this;
  }

  Click(func){
    this.menu[this.index].click = func;
    return this;
  }

  Visible(visible) {
    this.menu[this.index].visible = visible;
    return this;
  }

  Build(){
    return this.menu;
  }
}

module.exports = {
  MenuFluent : new MenuFluent()
}

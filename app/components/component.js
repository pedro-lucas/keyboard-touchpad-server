'use strict';

const EventEmitter = require('events');
const _ = require('underscore');
const fs = require('fs');
const path = require('path');
const $ = require("jquery");

module.exports = class Component extends EventEmitter {

  constructor(obj, args) {
    super();
    this.view = this._toView(obj, args);
    this.superComponent = null;
  }

  addComponent(component) {
    if(this.components.indexOf(component) !== -1) {
      component.detach();
      this.view.append(component.view);
      return;
    }
    component.superComponent = this;
    this.components.push(component);
    this.view.append(component.view);
  }

  removeComponent(component) {
    let index = this.components.indexOf(component);
    if(index !== -1) {
      this.components.splice(index, 1);
      component.superComponent = null;
      component.view.remove();
      return true;
    }
    return false;
  }

  remove() {
    if(this.superComponent) {
      this.superComponent.removeComponent(this);
    }else{
      this.view.remove();
    }
  }

  render(template, args) {
    let content = fs.readFileSync(path.resolve(__dirname, '../views', template + (template.endsWith('.tpl') ? '' : '.tpl')));
    return $('<div class="component">'+_.template(content.toString())(args)+'</div>');
  }

  _toView(template, args) {
    if(template === undefined) {
      return template;
    }else if(typeof template === 'string') {
      return this.render(template, args);
    }else{
      return template;
    }
  }

  get components() {
    if(!this._components) {
      this._components = [];
    }
    return this._components;
  }

}

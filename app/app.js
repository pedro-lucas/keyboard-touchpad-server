'use strict';

const electron = require('electron');
const {app, Menu, Tray, BrowserWindow} = electron;
const path = require('path');

let winMonitor = null;
let tray = null;

app.on('ready', () => {

  tray = new Tray(path.resolve(__dirname, 'resources', 'keyboard.png'));
  winMonitor = new BrowserWindow({width: 800, height: 600, minWidth: 400, minHeight: 400, show: false});

  winMonitor.on('closed', () => {
    winMonitor = null
  });

  winMonitor.loadURL(`file://${__dirname}/static/index.html`);

  const contextMenu = Menu.buildFromTemplate([
    {label: 'Open Monitor', click() {winMonitor.isVisible() ? winMonitor.hide() : winMonitor.show();}},
    {label: 'Quit', click() {app.quit();}}
  ]);

  tray.setToolTip('This is my application.');
  tray.setContextMenu(contextMenu);

});

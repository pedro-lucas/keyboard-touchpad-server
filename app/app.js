'use strict';

const electron = require('electron');
const {app, Menu, Tray, BrowserWindow} = electron;
const path = require('path');
const KTServer = require('./services/server');

let winMonitor = null;
let tray = null;

const {MenuFluent} = require('./menu.js');



if(process.platform == 'darwin') {
  app.dock.hide();
}

app.on('ready', () => {

  const workArea = electron.screen.getPrimaryDisplay().workAreaSize;

  tray = new Tray(path.resolve(__dirname, 'resources', 'keyboard.png'));

  winMonitor = new BrowserWindow({
    width: 400,
    height: 400,
    frame: false,
    show: false
  });

 

  winMonitor.on('closed', () => {
    winMonitor = null;
  });

  winMonitor.on('blur', () => {
    winMonitor.hide();
  });

  winMonitor.loadURL(`file://${__dirname}/static/index.html`);

  let template = 
    MenuFluent
        .Menu('Open Monitor')
          .Click(showWindow)
        .Menu('Close Monitor')
          .Click(hideWindow)
          .Visible(false)
        .Menu('Quit')
          .Click(app.quit)
        .Build();

 function calcArea(){
    const bounds = tray.getBounds();
    let xBound = bounds.x;
    let yBound = bounds.y;

    if(xBound + winMonitor.width > workArea.width) {
      xBound = workArea.width - winMonitor.width;
    }

    if(yBound + winMonitor.height > workArea.height) {
      yBound = workArea.height - winMonitor.height;
    }

    return {
      x : xBound,
      y : yBound
    };
  }

  function showWindow(){
    const {x,y} = calcArea();
    winMonitor.setPosition(x, y);
    winMonitor.show();
  };

  function hideWindow(){
    winMonitor.hide();
  }

  const contextMenu = Menu.buildFromTemplate(template);

  tray.setToolTip('Keyboard Touchpad Server');
  tray.setContextMenu(contextMenu);

});

KTServer.start();

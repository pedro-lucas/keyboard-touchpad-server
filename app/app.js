'use strict';

const electron = require('electron');
const {app, Menu, Tray, BrowserWindow} = electron;
const path = require('path');
const KTServer = require('./services/server');

let winMonitor = null;
let tray = null;

if(process.platform == 'darwin') {
  // app.dock.hide();
}

app.on('ready', () => {

  const workArea = electron.screen.getPrimaryDisplay().workAreaSize;

  tray = new Tray(path.resolve(__dirname, 'resources', 'keyboard.png'));

  winMonitor = new BrowserWindow({
    width: 400,
    height: 400,
    frame: true,
    // frame: false,
    show: false
  });

  winMonitor.on('closed', () => {
    winMonitor = null;
  });

  // winMonitor.on('blur', () => {
  //   winMonitor.hide();
  // });

  winMonitor.loadURL(`file://${__dirname}/static/index.html`);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open Monitor',

      click() {

        const bounds = tray.getBounds();
        let x = bounds.x;
        let y = bounds.y;

        if(x + winMonitor.width > workArea.width) {
          x = workArea.width - winMonitor.width;
        }

        if(y + winMonitor.height > workArea.height) {
          y = workArea.height - winMonitor.height;
        }

        winMonitor.setPosition(x, y);
        winMonitor.isVisible() ? winMonitor.hide() : winMonitor.show();

      }

    },
    {
      label: 'Quit',

      click() {
        app.quit();
      }

    }

  ]);

  tray.setToolTip('Keyboard Touchpad Server');
  tray.setContextMenu(contextMenu);

  winMonitor.show();

});

KTServer.start();

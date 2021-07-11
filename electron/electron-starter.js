// Handle setupevents as quickly as possible
const setupEvents = require('../installer/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
  // Squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

const { SetBottomMost } = require("electron-bottom-most");

let mainWindow;

function createWindow() {
  app.userAgentFallback = "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko";

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    type: "desktop",
    webPreferences: { nodeIntegration: false, nativeWindowOpen: true }
  });

  mainWindow.setFullScreen(true);

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true,
  });
  mainWindow.loadURL(startUrl);
  mainWindow.setMenu(null);

  mainWindow.on('closed', function () {
    mainWindow = null
  });

  mainWindow.on("focus", () => {
    let handle = mainWindow.getNativeWindowHandle();
    SetBottomMost(handle);
  })

  let handle = mainWindow.getNativeWindowHandle();
  SetBottomMost(handle);
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
});
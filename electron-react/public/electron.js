// eslint-disable-next-line import/no-extraneous-dependencies
const { join } = require("path");
const isDev = require("electron-is-dev");
const { app, BrowserWindow } = require("electron");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 900, height: 680 });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${join(__dirname, "../build/index.html")}`
  );
  // eslint-disable-next-line no-return-assign
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

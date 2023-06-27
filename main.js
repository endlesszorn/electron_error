const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      sandbox: false,
    },
  });

  win.loadFile("index.html");

  win.webContents.openDevTools();
  // This is where the "system-context-menu" event is being monitored, and it will not take effect at all!!
  win.on("system-context-menu", (event) => event.preventDefault());
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

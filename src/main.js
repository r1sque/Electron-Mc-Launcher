const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1524,
    height: 824,
    minWidth: 800, 
    minHeight: 600, 
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile("public/index.html");

  const appRoot = path.resolve(__dirname, "..");

  ipcMain.on("load-page", (event, page) => {
    const filePath = path.join(appRoot, "public/others", page);
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.error("Failed to read file:", err);
        return;
      }
      event.sender.send("page-content", data);
    });
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

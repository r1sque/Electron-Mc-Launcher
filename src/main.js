const { app, BrowserWindow, ipcMain } = require("electron");
const { Client } = require("minecraft-launcher-core");
const { Auth } = require("msmc");
const path = require("path"); 
const fs = require("fs"); 
const os = require("os");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1524,
    height: 824,
    minWidth: 1100,
    minHeight: 700,
    frame: false,
    backgroundColor: "#00000000",
    icon: path.join(__dirname, "build/favicon.ico"), // Path to your icon file
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

// Launch Minecraft
async function launchMinecraft(version) {
  const launcher = new Client();
  const authManager = new Auth("select_account");

  try {
    const xboxManager = await authManager.launch("raw");
    const token = await xboxManager.getMinecraft();
    const minecraftDir = path.join(os.homedir(), 'AppData', 'Roaming', '.minecraft');

   
    const opts = {
      clientPackage: null,
      authorization: token.mclc(),
      root: minecraftDir,
      version: {
        number: version,
        type: "release",
      },
      memory: {
        max: "6G",
        min: "4G",
      },
      javaPath: "C:/Program Files/Java/jdk-21/bin/java.exe",
    };

    console.log(`Starting Minecraft ${version}...`);
    launcher.launch(opts);

    // Log Minecraft output
    launcher.on("debug", (e) => console.log("Debug:", e));
    launcher.on("data", (e) => console.log("Data:", e));
    launcher.on("close", (code) =>
      console.log(`Minecraft exited with code ${code}`)
    );
  } catch (error) {
    console.error("Failed to launch Minecraft:", error);
  }
}

// Handle the "launch-minecraft" event from the renderer process
ipcMain.on("launch-minecraft", (event, version) => {
  launchMinecraft(version); // Pass the selected version
});

// Start the app
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});



ipcMain.on('minimize-window', () => {
    const window = BrowserWindow.getFocusedWindow();
    if (window) {
        window.minimize();
    }
});


ipcMain.on('restore-window', () => {
    const window = BrowserWindow.getFocusedWindow();
    if (window) {
        if (window.isMaximized()) {
            window.unmaximize();
        } else {
            window.maximize();
        }
    }
});


ipcMain.on('close-window', () => {
    const window = BrowserWindow.getFocusedWindow();
    if (window) {
        window.close();
    }
});
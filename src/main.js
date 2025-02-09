const { app, BrowserWindow, ipcMain } = require("electron");
const { Client } = require("minecraft-launcher-core");
const { Auth } = require("msmc");
const minecraftData = require("minecraft-data");
const path = require("path");
const fs = require("fs");
const os = require("os");

let mainWindow;

/** @type {Array} */
let accounts;
/** @type {number} */
let fd;

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
    const minecraftDir = path.join(
      os.homedir(),
      "AppData",
      "Roaming",
      ".minecraft"
    );

    // console.log(`skin url`, token.profile.skins.url);

    addAccount({
      nickname: token.profile.name,
      token: token.mclc(),
    });

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
      javaPath:
        "C:/Users/Admin/AppData/Roaming/ModrinthApp/meta/java_versions/zulu21.36.17-ca-jre21.0.4-win_x64/bin/javaw.exe",
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

function addAccount(account) {
  accounts.push(account);
  fs.writeFileSync(fd, JSON.stringify(accounts));
}

function removeAccount(index) {
  accounts = accounts.filter((_, i) => i !== index);
  fs.writeFileSync(fd, JSON.stringify(accounts));
}

// Fetch Minecraft versions
function getMinecraftVersions() {
  const versions = minecraftData.versions.pc; // Access the versions property
  return versions.map((version) => ({
    id: version.minecraftVersion,
    type: version.releaseType,
  }));
}

// Handle the "launch-minecraft" event from the renderer process
ipcMain.on("launch-minecraft", (event, version) => {
  launchMinecraft(version); // Pass the selected version
});

// Send versions to the renderer process
ipcMain.handle("get-minecraft-versions", () => {
  return getMinecraftVersions();
});

// Start the app
app.whenReady().then(async () => {
  // preinit hook

  const slashLauncherJson = new URL(
    "file://" +
      path.join(
        os.homedir(),
        "AppData",
        "Roaming",
        ".minecraft",
        ".slash-launcher"
      )
  );

  if (!fs.existsSync(slashLauncherJson))
    fs.writeFileSync(slashLauncherJson, "[]", {
      flag: "w",
    });

  fd = fs.openSync(slashLauncherJson);

  accounts = JSON.parse(fs.readFileSync(fd));

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
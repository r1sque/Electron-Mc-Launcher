const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  loadPage: (page) => ipcRenderer.send("load-page", page),
  onPageContent: (callback) => ipcRenderer.on("page-content", (event, content) => callback(content)),
  send: (channel, data) => ipcRenderer.send(channel, data),
  authenticate: () => ipcRenderer.invoke("authenticate"),
  onProgress: (callback) => ipcRenderer.on("progress", (event, progress) => callback(progress)),
  getMinecraftVersions: () => ipcRenderer.invoke("get-minecraft-versions"), // Expose the getMinecraftVersions method
  saveAccount: (account) => ipcRenderer.send("save-account", account), // Expose the saveAccount method
  minimizeWindow: () => ipcRenderer.send("minimize-window"),
  restoreWindow: () => ipcRenderer.send("restore-window"),
  closeWindow: () => ipcRenderer.send("close-window"),
});

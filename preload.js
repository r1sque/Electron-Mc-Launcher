const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  loadPage: (page) => ipcRenderer.send("load-page", page),
  onPageContent: (callback) => ipcRenderer.on("page-content", (event, content) => callback(content))
});

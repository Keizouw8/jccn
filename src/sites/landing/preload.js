const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
	quit: () => ipcRenderer.send("quit"),
	openLink: (url) => ipcRenderer.send("openLink", url)
});
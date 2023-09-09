const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
	quit: () => ipcRenderer.send("quit"),
	location: (url) => ipcRenderer.send("location", url),
	openLink: (url) => ipcRenderer.send("openLink", url)
});
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
	quit: () => ipcRenderer.send("quit"),
	maximize: () => ipcRenderer.send("maximize"),
	minimize: () => ipcRenderer.send("minimize"),
	location: (url) => ipcRenderer.send("location", url),
	openLink: (url) => ipcRenderer.send("openLink", url)
});
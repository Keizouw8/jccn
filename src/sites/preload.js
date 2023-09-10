const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
	quit: () => ipcRenderer.send("quit"),
	maximize: () => ipcRenderer.send("maximize"),
	minimize: () => ipcRenderer.send("minimize"),
	location: (url) => ipcRenderer.send("location", url),
	openLink: (url) => ipcRenderer.send("openLink", url),
	onChangeAddress(cb){
		ipcRenderer.on("address", function(_, address, port){
			this.address = address;
			this.port = port;
			cb(address, port);
		});
	},
	getAddress: () => ipcRenderer.send("getAddress"),
	clipboard: (...args) => ipcRenderer.send("clipboard", ...args),
	address: false,
	port: false
});
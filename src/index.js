const { app, BrowserWindow, ipcMain, shell } = require("electron"); 
const express = require("express");
const io = require("socket.io");
const http = require("http");
const path = require("path");
const os = require("os");

var userDataPath = app.getPath('userData');
var interfaceCard = os.networkInterfaces();

var server = {};
(async function(){
	const getPort = await import("get-port");
	server.app = express();
	server.http = http.createServer(server.app);
	server.io = io(server.http);
	server.port = await getPort.default();
	server.http.listen(server.port);
	console.log(server.port);
})();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
	app.quit();
}

const createWindow = () => {
	const mainWindow = new BrowserWindow({
		width: 1000,
		height: 600,
		minWidth: 380,
		minHeight: 570,
		webPreferences: {
			preload: path.join(__dirname, "sites/preload.js"),
		},
		icon: path.join(__dirname, "assets/icons/icon.ico"),
		frame: false
	});

	mainWindow.setMenuBarVisibility(false);
	mainWindow.loadFile(path.join(__dirname, "sites/landing/index.html"));
};

app.on("ready", createWindow);

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

ipcMain.on("quit", () => {
	app.quit();
});

ipcMain.on("maximize", function(e){
	var window = BrowserWindow.fromWebContents(e.sender);
	window.setFullScreen(Boolean(1 - window.fullScreen));
});

ipcMain.on("minimize", function(e){
	var window = BrowserWindow.fromWebContents(e.sender);
	window.minimize();
});

ipcMain.on("openLink", (e, url) => {
	shell.openExternal(url);
});
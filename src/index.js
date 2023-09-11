const { app, BrowserWindow, ipcMain, shell, clipboard, protocol } = require("electron"); 
const express = require("express");
const io = require("socket.io");
const http = require("http");
const path = require("path");
const ejs = require("ejs");
const os = require("os");
const fs = require("fs");

var userDataPath = app.getPath("userData");
var srcPath = path.join(__dirname, "sites");
var thunderbolt = false;

var server = {};
(async function(){
	const getPort = await import("get-port");
	server.app = express();
	server.http = http.createServer(server.app);
	server.io = io(server.http);
	server.port = await getPort.default();
	server.http.listen(server.port);
})();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
	app.quit();
}

const createWindow = () => {
	var options = {
		width: 1000,
		height: 600,
		minWidth: 380,
		minHeight: 570,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			additionalArguments: [__dirname]
		},
		icon: path.join(__dirname, "assets/icons/icon.ico"),
		frame: false
	};

	const mainWindow = new BrowserWindow(options);

	mainWindow.setMenuBarVisibility(false);
	mainWindow.loadFile(path.join(srcPath, "landing/index.html"));

	ipcMain.on("getAddress", function(){
		mainWindow.webContents.send("address", thunderbolt, server.port);
	});

	function checkThunderbolt(){
		var address = false;
		var interfaceCard = os.networkInterfaces();
		var keys = Object.keys(interfaceCard);
		for(var i = 0; i < keys.length; i++){
			if(keys[i].includes("bridge")){
				for(var o = 0; o < interfaceCard[keys[i]].length; o++){
					if(interfaceCard[keys[i]][o]["family"] == "IPv4"){
						address = interfaceCard[keys[i]][o]["address"];
					}
				}
			}
		}
	
		if(address != thunderbolt){
			thunderbolt = address;
			mainWindow.webContents.send("address", address, server.port);
		}
	};
	
	var interval;
	setTimeout(() => interval = setInterval(checkThunderbolt, 100), 1000);

	ipcMain.on("reset", function(){
		clearInterval(interval);
		mainWindow.close();
		createWindow();
	});
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

ipcMain.on("clipboard", function(_, ...args){
	clipboard.writeText(...args);
});

ipcMain.on("openLink", (_, url) => {
	shell.openExternal(url);
});
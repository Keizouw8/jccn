const { app, BrowserWindow, ipcMain, shell } = require("electron"); 
const path = require("path");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
	app.quit();
}

const createWindow = () => {
	const mainWindow = new BrowserWindow({
		width: 1000,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "sites/landing/preload.js"),
		},
		icon: path.join(__dirname, "assets/icons/icon.ico")
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

ipcMain.on("openLink", (e, url) => {
	shell.openExternal(url);
});
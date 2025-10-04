// electron/main.js
import { app, BrowserWindow, ipcMain } from "electron";
import Store from "electron-store";

let win;
const store = new Store(); // electron-store instance

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // your current setup
    },
  });

  win.loadURL("http://localhost:5173");
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

/* ----------------- IPC handlers ----------------- */
// Get JWT from electron-store
ipcMain.handle("get-jwt", () => {
  return store.get("jwt") || null;
});

// Set JWT in electron-store
ipcMain.handle("set-jwt", (event, token) => {
  store.set("jwt", token);
  return true; // optional confirmation
});

// Optional: clear JWT (logout)
ipcMain.handle("clear-jwt", () => {
  store.delete("jwt");
  return true;
});

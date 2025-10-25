import { app, BrowserWindow, ipcMain, Menu } from "electron"; // added Menu import
import { fileURLToPath } from "url";
import path from "path";
import Store from "electron-store";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const store = new Store();

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadURL("http://localhost:5173");
  win.webContents.openDevTools();

  win.webContents.on("before-input-event", (event, input) => {
    if ((input.control || input.meta) && input.key.toLowerCase() === "r") {
      event.preventDefault(); 
    }
    if (input.key === "F5") {
      event.preventDefault();
    }
  });

  Menu.setApplicationMenu(null);
}

app.whenReady().then(createWindow);

ipcMain.handle("store:get", (_, key, defaultValue) => store.get(key, defaultValue));
ipcMain.handle("store:set", (_, key, value) => store.set(key, value));
ipcMain.handle("store:delete", (_, key) => store.delete(key));

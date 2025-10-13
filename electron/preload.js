const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("store", {
  get: (key, defaultValue) => ipcRenderer.invoke("store:get", key, defaultValue),
  set: (key, value) => ipcRenderer.invoke("store:set", key, value),
  delete: (key) => ipcRenderer.invoke("store:delete", key),
});

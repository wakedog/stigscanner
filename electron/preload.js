const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  scanSystem: () => ipcRenderer.invoke('scan-system'),
  getSystemInfo: () => ipcRenderer.invoke('get-system-info')
});
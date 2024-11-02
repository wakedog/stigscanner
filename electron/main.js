const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { scanSystem } = require('./scanners/systemScanner');
const os = require('os');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);
const isDev = process.env.NODE_ENV === 'development';

async function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// System scanning functionality
ipcMain.handle('scan-system', async () => {
  try {
    return await scanSystem();
  } catch (error) {
    console.error('Scan failed:', error);
    throw error;
  }
});

// System information
ipcMain.handle('get-system-info', async () => {
  try {
    const hostname = os.hostname();
    const { stdout: osRelease } = await execAsync('cat /etc/os-release');
    const osVersion = osRelease.match(/VERSION="([^"]+)"/)?.[1] || 'Unknown';
    const { stdout: kernel } = await execAsync('uname -r');

    return {
      hostname,
      osVersion: `Linux ${osVersion}`,
      kernelVersion: kernel.trim(),
      lastScanTime: new Date().toISOString(),
      architecture: os.arch(),
      cpuCores: os.cpus().length
    };
  } catch (error) {
    console.error('Failed to get system info:', error);
    throw error;
  }
});
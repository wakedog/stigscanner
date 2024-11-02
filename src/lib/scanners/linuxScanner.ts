import { STIGCheck } from '../../types';

declare global {
  interface Window {
    electronAPI: {
      scanSystem: () => Promise<STIGCheck[]>;
      getSystemInfo: () => Promise<{
        hostname: string;
        osVersion: string;
        lastScanTime: string;
      }>;
    };
  }
}

export async function scanSystem(): Promise<STIGCheck[]> {
  try {
    const results = await window.electronAPI.scanSystem();
    return results;
  } catch (error) {
    console.error('Scan failed:', error);
    throw error;
  }
}
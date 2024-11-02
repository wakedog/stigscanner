import { STIG, STIGCheck, Collection } from '../types';
import { scanSystem } from './scanners/linuxScanner';

// Previous mock data generators...
const mockStigs = generateMockStigs();
const mockChecks = generateMockChecks();
const mockCollections = [/* ... previous mock collections ... */];

export const api = {
  // ... previous methods ...

  scanLinuxSystem: async (): Promise<STIGCheck[]> => {
    try {
      const scanResults = await scanSystem();
      return scanResults;
    } catch (error) {
      console.error('Scan failed:', error);
      throw error;
    }
  },

  getAllChecks: async (): Promise<STIGCheck[]> => {
    try {
      // Combine mock checks with real system scan results
      const scanResults = await scanSystem();
      return [...mockChecks, ...scanResults];
    } catch (error) {
      console.error('Error getting checks:', error);
      return mockChecks; // Fallback to mock data if scan fails
    }
  },
};
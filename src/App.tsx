import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { performScan } from './lib/scanners/mockScanner';
import { ScanResult, SystemInfo } from './types';

const initialSystemInfo: SystemInfo = {
  hostname: 'Loading...',
  osVersion: 'Loading...',
  lastScanTime: new Date().toISOString(),
  totalChecks: 0,
  passedChecks: 0,
  failedChecks: 0,
};

function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<ScanResult[]>([]);
  const [systemInfo, setSystemInfo] = useState<SystemInfo>(initialSystemInfo);

  const handleScan = async () => {
    setIsScanning(true);
    try {
      const { results: newResults, systemInfo: newSystemInfo } = await performScan();
      setResults(newResults);
      setSystemInfo(newSystemInfo);
    } catch (error) {
      console.error('Scan failed:', error);
    } finally {
      setIsScanning(false);
    }
  };

  useEffect(() => {
    handleScan();
  }, []);

  return (
    <Dashboard
      systemInfo={systemInfo}
      results={results}
      isScanning={isScanning}
      onScanClick={handleScan}
    />
  );
}

export default App;
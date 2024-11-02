import { ScanResult, SystemInfo } from '../../types';

export async function performScan(): Promise<{
  results: ScanResult[];
  systemInfo: SystemInfo;
}> {
  // Simulate scan delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const results: ScanResult[] = [
    {
      id: 'V-230234',
      title: 'SSH Protocol Version',
      severity: 'high',
      status: 'pass',
      description: 'SSH Protocol version must be set to 2',
      timestamp: new Date().toISOString(),
      category: 'Security',
    },
    {
      id: 'V-230235',
      title: 'Password Complexity',
      severity: 'critical',
      status: 'fail',
      description: 'Password complexity requirements not met',
      timestamp: new Date().toISOString(),
      category: 'Authentication',
    },
    // Add more mock results as needed
  ];

  const systemInfo: SystemInfo = {
    hostname: 'demo-system',
    osVersion: 'Linux 5.15.0',
    lastScanTime: new Date().toISOString(),
    totalChecks: results.length,
    passedChecks: results.filter(r => r.status === 'pass').length,
    failedChecks: results.filter(r => r.status === 'fail').length,
  };

  return { results, systemInfo };
}
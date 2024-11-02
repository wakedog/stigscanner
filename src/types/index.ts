export interface ScanResult {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'pass' | 'fail' | 'not-applicable';
  description: string;
  timestamp: string;
  category: string;
}

export interface SystemInfo {
  hostname: string;
  osVersion: string;
  lastScanTime: string;
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
}
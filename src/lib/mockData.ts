import { STIG, STIGCheck, Severity, Status } from '../types';

const severities: Severity[] = ['low', 'medium', 'high', 'critical'];
const statuses: Status[] = ['pass', 'fail', 'not_reviewed', 'not_applicable'];

export const generateMockChecks = (): STIGCheck[] => [
  {
    id: 'V-230234',
    stigId: 'RHEL-8',
    title: 'System Password Complexity',
    severity: 'high',
    status: 'not_reviewed',
    description: 'Password complexity requirements must be enforced.',
    checkText: 'Verify password complexity requirements are configured.',
    fixText: 'Configure password complexity requirements.',
    lastChecked: new Date().toISOString(),
    findings: []
  },
  {
    id: 'V-230235',
    stigId: 'RHEL-8',
    title: 'SSH Protocol Configuration',
    severity: 'critical',
    status: 'not_reviewed',
    description: 'SSH must be configured with secure protocols.',
    checkText: 'Verify SSH protocol version and cipher configurations.',
    fixText: 'Update SSH configuration with secure settings.',
    lastChecked: new Date().toISOString(),
    findings: []
  },
  // Add more mock checks as needed
];

export const generateMockStigs = (): STIG[] => [
  {
    id: 'RHEL-8',
    title: 'Red Hat Enterprise Linux 8 Security Technical Implementation Guide',
    version: '1.0.0',
    releaseDate: '2023-01-01',
    description: 'Security requirements for Red Hat Enterprise Linux 8 systems',
    checks: generateMockChecks()
  },
  // Add more mock STIGs as needed
];
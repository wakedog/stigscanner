const fs = require('fs').promises;
const { exec } = require('child_process');
const { promisify } = require('util');
const os = require('os');
const path = require('path');

// ... (previous helper functions remain the same) ...

async function checkUFWStatus() {
  try {
    const { stdout: ufwStatus } = await execAsync('ufw status');
    const isActive = ufwStatus.toLowerCase().includes('active');
    const rules = ufwStatus
      .split('\n')
      .filter(line => line.includes('ALLOW') || line.includes('DENY'))
      .map(line => line.trim());
    
    return {
      active: isActive,
      rules
    };
  } catch (error) {
    console.error('Failed to check UFW status:', error);
    return { active: false, rules: [] };
  }
}

async function scanSystem() {
  const checks = [];
  const timestamp = new Date().toISOString();

  try {
    // ... (previous checks 1-10 remain the same) ...

    // 11. UFW Firewall Status
    try {
      const ufwStatus = await checkUFWStatus();
      const findings = [];
      
      if (!ufwStatus.active) {
        findings.push('UFW firewall is not active');
      }
      
      if (ufwStatus.rules.length === 0) {
        findings.push('No firewall rules configured');
      }

      // Check for common secure configurations
      const commonPorts = ['22/tcp', '80/tcp', '443/tcp'];
      const configuredPorts = ufwStatus.rules.join(' ');
      const missingPorts = commonPorts.filter(port => !configuredPorts.includes(port));
      
      if (missingPorts.length > 0) {
        findings.push(`Missing rules for common ports: ${missingPorts.join(', ')}`);
      }

      checks.push({
        id: 'UFW-STATUS',
        title: 'UFW Firewall Configuration',
        severity: 'critical',
        status: ufwStatus.active && findings.length === 0 ? 'pass' : 'fail',
        description: 'Check UFW firewall status and configuration',
        timestamp,
        category: 'Network Security',
        findings,
        details: {
          active: ufwStatus.active,
          configuredRules: ufwStatus.rules
        }
      });
    } catch (error) {
      console.error('Failed to check UFW status:', error);
    }

    return checks;
  } catch (error) {
    console.error('System scan failed:', error);
    throw error;
  }
}

module.exports = { scanSystem };
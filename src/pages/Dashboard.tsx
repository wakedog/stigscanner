import React from 'react';
import { Shield, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { scanSystem } from '../lib/scanners/linuxScanner';
import { generateMockStigs } from '../lib/mockData';
import { useStore } from '../lib/store';
import StatCard from '../components/StatCard';
import ActivityFeed from '../components/ActivityFeed';
import ComplianceChart from '../components/ComplianceChart';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Dashboard() {
  const { setStigs, setChecks, checks } = useStore();
  const [isScanning, setIsScanning] = React.useState(false);
  const [lastScanTime, setLastScanTime] = React.useState<string>(new Date().toISOString());

  const { isLoading: isLoadingStigs } = useQuery({
    queryKey: ['stigs'],
    queryFn: () => generateMockStigs(),
    onSuccess: setStigs,
  });

  const { isLoading: isLoadingChecks, refetch: refetchChecks } = useQuery({
    queryKey: ['checks'],
    queryFn: scanSystem,
    onSuccess: setChecks,
  });

  const handleScan = async () => {
    setIsScanning(true);
    try {
      const results = await scanSystem();
      setChecks(results);
      setLastScanTime(new Date().toISOString());
    } catch (error) {
      console.error('Scan failed:', error);
    } finally {
      setIsScanning(false);
    }
  };

  if (isLoadingStigs || isLoadingChecks) {
    return <LoadingSpinner />;
  }

  const stats = checks.reduce(
    (acc, check) => {
      acc[check.status]++;
      acc.total++;
      if (check.severity === 'critical' && check.status === 'fail') {
        acc.criticalFailures++;
      }
      return acc;
    },
    { pass: 0, fail: 0, not_reviewed: 0, not_applicable: 0, total: 0, criticalFailures: 0 }
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">STIG Manager Dashboard</h1>
        <button
          onClick={handleScan}
          disabled={isScanning}
          className={`px-4 py-2 rounded-lg transition-colors ${
            isScanning
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white flex items-center space-x-2`}
        >
          {isScanning ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              <span>Scanning...</span>
            </>
          ) : (
            <span>Run Scan</span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Checks"
          value={stats.total}
          icon={Shield}
          description="Total STIG checks in scope"
        />
        <StatCard
          title="Critical Failures"
          value={stats.criticalFailures}
          icon={AlertCircle}
          description="High-severity findings"
          trend={-5}
        />
        <StatCard
          title="Passing Checks"
          value={stats.pass}
          icon={CheckCircle}
          description="Compliant configurations"
          trend={8}
        />
        <StatCard
          title="Last Scan"
          value={new Date(lastScanTime).toLocaleTimeString()}
          icon={Clock}
          description="Most recent assessment"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ComplianceChart checks={checks} />
        </div>
        <div>
          <ActivityFeed checks={checks} />
        </div>
      </div>
    </div>
  );
}
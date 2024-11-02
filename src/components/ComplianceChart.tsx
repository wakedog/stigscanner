import React from 'react';
import { STIGCheck } from '../types';

interface ComplianceChartProps {
  checks: STIGCheck[];
}

export default function ComplianceChart({ checks }: ComplianceChartProps) {
  const stats = checks.reduce(
    (acc, check) => {
      acc[check.status]++;
      return acc;
    },
    { pass: 0, fail: 0, not_reviewed: 0, not_applicable: 0 }
  );

  const total = checks.length;
  const complianceRate = total > 0 ? Math.round((stats.pass / total) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Overview</h3>
      <div className="flex justify-between items-center mb-6">
        <div className="text-3xl font-bold text-blue-600">{complianceRate}%</div>
        <div className="text-sm text-gray-500">Total Checks: {total}</div>
      </div>
      <div className="space-y-4">
        {Object.entries(stats).map(([status, count]) => (
          <div key={status} className="relative">
            <div className="flex justify-between text-sm mb-1">
              <span className="capitalize">{status.replace('_', ' ')}</span>
              <span>{count}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded">
              <div
                className={`h-full rounded ${
                  status === 'pass'
                    ? 'bg-green-500'
                    : status === 'fail'
                    ? 'bg-red-500'
                    : status === 'not_reviewed'
                    ? 'bg-yellow-500'
                    : 'bg-gray-500'
                }`}
                style={{ width: `${(count / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
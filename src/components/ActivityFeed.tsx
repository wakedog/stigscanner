import React from 'react';
import { STIGCheck } from '../types';

interface ActivityFeedProps {
  checks: STIGCheck[];
}

export default function ActivityFeed({ checks }: ActivityFeedProps) {
  const sortedChecks = [...checks].sort(
    (a, b) => new Date(b.lastChecked || 0).getTime() - new Date(a.lastChecked || 0).getTime()
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {sortedChecks.slice(0, 5).map((check) => (
          <div key={check.id} className="flex items-start space-x-3">
            <div
              className={`w-2 h-2 mt-2 rounded-full ${
                check.status === 'pass'
                  ? 'bg-green-500'
                  : check.status === 'fail'
                  ? 'bg-red-500'
                  : 'bg-yellow-500'
              }`}
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{check.title}</p>
              <p className="text-sm text-gray-500">
                {check.lastChecked
                  ? new Date(check.lastChecked).toLocaleDateString()
                  : 'Not checked'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
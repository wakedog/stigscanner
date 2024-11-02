import React from 'react';
import { Outlet } from 'react-router-dom';
import { Shield, Menu, Bell, User } from 'lucide-react';
import Navigation from './Navigation';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 shadow-lg">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="ml-4 flex items-center">
                <Shield className="h-8 w-8 text-white" />
                <span className="ml-2 text-xl font-semibold text-white">STIG Manager</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-indigo-200 hover:text-white">
                <Bell className="h-6 w-6" />
              </button>
              <button className="text-indigo-200 hover:text-white">
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out bg-white shadow-lg`}>
          <Navigation collapsed={!sidebarOpen} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Shield, Users, FolderOpen, Settings } from 'lucide-react';

interface NavigationProps {
  collapsed: boolean;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
  { icon: Shield, label: 'STIGs', to: '/stigs' },
  { icon: FolderOpen, label: 'Collections', to: '/collections' },
  { icon: Users, label: 'Users', to: '/users' },
  { icon: Settings, label: 'Settings', to: '/settings' },
];

export default function Navigation({ collapsed }: NavigationProps) {
  return (
    <nav className="py-6">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center px-4 py-3 mb-1 transition-colors ${
              isActive
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`
          }
        >
          <item.icon className="h-5 w-5" />
          {!collapsed && <span className="ml-3">{item.label}</span>}
        </NavLink>
      ))}
    </nav>
  );
}
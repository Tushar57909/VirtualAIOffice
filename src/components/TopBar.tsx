import React, { useState } from 'react';
import { Search, Bell, ChevronDown, User, Activity } from 'lucide-react';

interface TopBarProps {
  currentSection: string;
  activeView: string;
  onSearchClick?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ currentSection, activeView, onSearchClick }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const viewLabels: Record<string, string> = {
    'overview': 'Command Center',
    'new-task': 'New Task',
    'agents': 'AI Agents Roster',
    'activity': 'Team Activity Log',
    'reports': 'Reports & Artifacts',
    'integrations': 'Integrations',
    'settings': 'Settings'
  };

  const label = viewLabels[activeView] || currentSection;

  return (
    <header className="h-16 px-6 border-b border-slate-200 bg-white/90 backdrop-blur-md flex items-center justify-between shrink-0 z-30 select-none font-sans">
      {/* Breadcrumb Left */}
      <div className="flex items-center gap-2.5 text-xs font-medium text-slate-500">
        <span className="hover:text-slate-800 transition-colors cursor-pointer">Workspace</span>
        <span>/</span>
        <span className="text-slate-900 font-semibold">{label}</span>
      </div>

      {/* Center & Right Controls */}
      <div className="flex items-center gap-4">
        {/* Quick Search Bar */}
        <div 
          onClick={onSearchClick}
          className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300 transition-all text-xs cursor-pointer w-52 lg:w-64"
        >
          <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="flex-1 truncate">Search tasks, agents...</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white text-[10px] font-sans font-medium text-slate-500 border border-slate-200 shadow-xs">⌘K</kbd>
        </div>

        {/* Telemetry Status */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-600">
          <Activity className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-semibold text-slate-800">n8n Connected</span>
        </div>

        {/* Notifications Icon */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all relative border border-transparent hover:border-slate-200"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 text-xs z-50 animate-in fade-in">
              <div className="flex items-center justify-between font-bold text-slate-900 border-b border-slate-100 pb-2 mb-2">
                <span>Notifications</span>
                <span className="text-[10px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200 font-semibold">1 New</span>
              </div>
              <div className="space-y-2 text-slate-600">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="font-semibold text-slate-900">AI Team Ready</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">6 agents active and available for dispatch.</div>
                  <div className="text-[10px] text-slate-400 mt-1">Just now</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-5 w-px bg-slate-200 hidden sm:block"></div>

        {/* Profile Menu */}
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-900 leading-none">Lead Engineer</span>
              <span className="text-[10px] text-slate-500 leading-tight mt-0.5">Workspace Operations</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl py-1 text-xs text-slate-700 z-50 animate-in fade-in">
              <div className="px-3.5 py-2 border-b border-slate-100">
                <p className="font-semibold text-slate-900">Engineering Workspace</p>
                <p className="text-[11px] text-slate-500 truncate">admin@virtualoffice.ai</p>
              </div>
              <div className="py-1">
                <button className="w-full text-left px-3.5 py-1.5 hover:bg-slate-50 text-slate-700">Access Roles</button>
                <button className="w-full text-left px-3.5 py-1.5 hover:bg-slate-50 text-slate-700">API Credentials</button>
                <button className="w-full text-left px-3.5 py-1.5 hover:bg-slate-50 text-slate-700">System Logs</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;

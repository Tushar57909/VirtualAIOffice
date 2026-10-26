import React from 'react';
import { 
  LayoutDashboard, PlusCircle, Users, Activity, 
  FileText, Network, Settings, Terminal, ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  return (
    <aside className="w-64 h-screen vibrant-glass-panel border-r border-white/80 flex flex-col hidden md:flex shrink-0 select-none z-40 shadow-xl font-sans">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-200/60 flex items-center gap-3">
        <div className="w-9 h-9 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/30 shrink-0">
          <Terminal className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-slate-900 text-sm tracking-tight leading-snug">
            Mini Virtual AI Office
          </span>
          <span className="text-[11px] text-indigo-600 font-semibold">
            AI Engineering Workspace
          </span>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto py-5 px-3 space-y-6 custom-scrollbar">
        {/* COMMAND CENTER */}
        <div>
          <div className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
            Command Center
          </div>
          <div className="space-y-1">
            <NavItem 
              icon={LayoutDashboard} 
              label="Overview" 
              active={activeView === 'overview'} 
              onClick={() => onViewChange('overview')} 
            />
            <NavItem 
              icon={PlusCircle} 
              label="New Task" 
              active={activeView === 'new-task'} 
              onClick={() => onViewChange('new-task')} 
            />
          </div>
        </div>

        {/* WORKSPACE */}
        <div>
          <div className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
            Workspace
          </div>
          <div className="space-y-1">
            <NavItem 
              icon={Users} 
              label="AI Agents Roster" 
              active={activeView === 'agents'} 
              onClick={() => onViewChange('agents')} 
            />
            <NavItem 
              icon={Activity} 
              label="Activity Log" 
              active={activeView === 'activity'} 
              onClick={() => onViewChange('activity')} 
            />
            <NavItem 
              icon={FileText} 
              label="Reports & Artifacts" 
              active={activeView === 'reports'} 
              onClick={() => onViewChange('reports')} 
            />
          </div>
        </div>

        {/* SYSTEM */}
        <div>
          <div className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
            System
          </div>
          <div className="space-y-1">
            <NavItem 
              icon={Network} 
              label="Integrations" 
              active={activeView === 'integrations'} 
              onClick={() => onViewChange('integrations')} 
            />
            <NavItem 
              icon={Settings} 
              label="Settings" 
              active={activeView === 'settings'} 
              onClick={() => onViewChange('settings')} 
            />
          </div>
        </div>
      </div>

      {/* Footer System Status Widget */}
      <div className="p-4 border-t border-slate-200/60 bg-white/40">
        <div className="p-3 rounded-2xl bg-white/90 border border-slate-200 flex flex-col gap-1.5 shadow-sm">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between font-mono">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Status</span>
            </span>
            <span className="text-emerald-600 font-extrabold">100%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-800">
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

interface NavItemProps {
  icon: any;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 group
        ${active 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' 
          : 'text-slate-700 hover:bg-white/80 hover:text-indigo-600 border border-transparent'
        }`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'}`} />
        <span>{label}</span>
      </div>

      {active && (
        <span className="w-2 h-2 rounded-full bg-white shadow-xs"></span>
      )}
    </button>
  );
};

export default Sidebar;

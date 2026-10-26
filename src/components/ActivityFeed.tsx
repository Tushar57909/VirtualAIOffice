import React from 'react';
import { initialAgents, type ActivityLog } from '../data/agents';
import { Activity, Clock, Terminal, Zap } from 'lucide-react';

interface ActivityFeedProps {
  logs: ActivityLog[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ logs }) => {
  const formatTime = (date: Date) => {
    try {
      const hours = date.getHours().toString().padStart(2, '0');
      const mins = date.getMinutes().toString().padStart(2, '0');
      const secs = date.getSeconds().toString().padStart(2, '0');
      return `${hours}:${mins}:${secs}`;
    } catch {
      return '14:32:00';
    }
  };

  return (
    <aside className="w-80 h-full vibrant-glass-panel border-l border-white/80 flex flex-col hidden xl:flex shrink-0 select-none z-30 font-sans shadow-xl">
      {/* Header */}
      <div className="p-4 border-b border-slate-200/60 flex items-center justify-between bg-white/40">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Activity className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
            LIVE TEAM ACTIVITY
          </h3>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-[10px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          LIVE
        </span>
      </div>

      {/* Feed Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {logs.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center p-4 text-slate-500">
            <div className="w-12 h-12 rounded-2xl bg-white/80 border border-slate-200 flex items-center justify-center mb-3 shadow-xs">
              <Clock className="w-6 h-6 text-slate-400 stroke-1" />
            </div>
            <p className="text-xs font-bold text-slate-800">Operations Feed Idle</p>
            <p className="text-[11px] text-slate-500 mt-1 max-w-xs leading-relaxed">
              Events will record automatically when a task is dispatched.
            </p>
          </div>
        ) : (
          <div className="relative pl-3">
            {/* Vertical timeline line */}
            <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-indigo-200"></div>

            <div className="space-y-4 relative z-10">
              {logs.map((log, index) => {
                const agent = initialAgents.find(a => a.id === log.agentId);
                const isLatest = index === logs.length - 1;
                const timeStr = formatTime(log.timestamp);

                return (
                  <div key={log.id} className="flex items-start gap-3 text-xs group">
                    {/* Agent Avatar Icon */}
                    <div className={`w-8 h-8 rounded-xl overflow-hidden border shrink-0 relative mt-0.5 shadow-sm transition-transform group-hover:scale-105
                      ${isLatest 
                        ? 'border-indigo-500 ring-2 ring-indigo-500/30' 
                        : 'border-slate-200 bg-white'
                      }
                    `}>
                      {agent?.avatar ? (
                        <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-600">
                          <Zap className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    {/* Message Box */}
                    <div className={`flex-1 p-3 rounded-2xl border transition-all
                      ${isLatest 
                        ? 'bg-white/95 border-indigo-300 text-slate-900 shadow-md' 
                        : 'bg-white/80 border-slate-200 text-slate-700'
                      }
                    `}>
                      <div className="flex items-center justify-between text-[11px] mb-1 font-extrabold">
                        <span className={agent?.textColor || 'text-indigo-600'}>
                          {agent?.name || 'Manager Agent'}
                        </span>
                        <span className="text-slate-400 font-mono text-[10px]">
                          {timeStr}
                        </span>
                      </div>
                      <p className={`text-[11px] leading-relaxed ${isLatest ? 'text-slate-900 font-bold' : 'text-slate-700'}`}>
                        {log.message}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer info */}
      <div className="p-3 border-t border-slate-200/60 bg-white/40 text-[11px] text-slate-600 flex items-center justify-between font-mono">
        <div className="flex items-center gap-1.5 font-bold">
          <Terminal className="w-3.5 h-3.5 text-indigo-600" />
          <span>n8n Stream Log</span>
        </div>
        <span className="text-emerald-600 font-extrabold text-[10px]">ACTIVE</span>
      </div>
    </aside>
  );
};

export default ActivityFeed;

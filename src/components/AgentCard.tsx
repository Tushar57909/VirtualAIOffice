import React from 'react';
import type { Agent } from '../data/agents';
import { Loader2, CheckCircle2, Activity } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const Icon = agent.icon;
  const isWorking = ['Thinking', 'Working', 'Coordinating', 'Delegating'].includes(agent.status);
  const isCompleted = agent.status === 'Completed';
  const isWaiting = agent.status === 'Waiting';

  return (
    <div 
      className={`group relative p-4 rounded-2xl border bg-white transition-all duration-200 flex flex-col justify-between h-full
        ${isWorking 
          ? `border-indigo-500 ring-2 ring-indigo-500/20 shadow-md` 
          : isCompleted
          ? 'border-emerald-300 bg-emerald-50/30 shadow-xs'
          : 'border-slate-200 hover:border-indigo-400 hover:shadow-lg hover:-translate-y-0.5'
        }`}
    >
      {/* Top Section: Avatar & Info */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          {/* Avatar Image */}
          <div className="relative shrink-0">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border border-slate-200 shadow-xs group-hover:scale-105 transition-transform duration-200">
              <img 
                src={agent.avatar} 
                alt={agent.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Online Status Dot */}
            <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${isWorking ? 'bg-indigo-600 animate-ping' : isCompleted ? 'bg-emerald-500' : 'bg-emerald-500'}`}></span>
            <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${isWorking ? 'bg-indigo-600' : isCompleted ? 'bg-emerald-500' : 'bg-emerald-500'}`}></span>
          </div>

          {/* Role Badge */}
          <div className="flex flex-col items-end">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${agent.badgeBg}`}>
              {agent.roleTitle}
            </span>
            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 font-medium">
              <Icon className={`w-3.5 h-3.5 ${agent.textColor}`} />
              <span>{agent.threadLoad} Load</span>
            </div>
          </div>
        </div>

        {/* Name & Title */}
        <h3 className="text-slate-900 font-bold text-sm tracking-tight group-hover:text-indigo-600 transition-colors">
          {agent.name}
        </h3>
        <p className={`text-xs font-semibold ${agent.textColor} mt-0.5`}>
          {agent.role}
        </p>

        {/* Description */}
        <p className="text-xs text-slate-500 leading-relaxed mt-1.5 line-clamp-2">
          {agent.description}
        </p>
      </div>

      {/* Footer Status Pill & Activity */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        {isWorking ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 font-semibold text-[11px]">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
            <span>Processing...</span>
          </span>
        ) : isCompleted ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Task Done</span>
          </span>
        ) : isWaiting ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-600 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            <span>Standby</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Available</span>
          </span>
        )}

        <span className="text-[11px] text-slate-400 flex items-center gap-1">
          <Activity className="w-3 h-3 text-slate-400" />
          <span>{agent.lastActivity || 'Ready'}</span>
        </span>
      </div>
    </div>
  );
};

export default AgentCard;

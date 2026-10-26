import React from 'react';
import type { Agent } from '../data/agents';
import AgentCard from './AgentCard';
import { Users } from 'lucide-react';

interface AgentGridProps {
  agents: Agent[];
  title?: string;
}

const AgentGrid: React.FC<AgentGridProps> = ({ 
  agents, 
  title = "ENGINEERING TEAM" 
}) => {
  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            {title}
          </span>
        </div>
        <span className="text-[11px] text-slate-500 font-mono">
          {agents.length} Active Agents
        </span>
      </div>

      {/* Grid Roster Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
};

export default AgentGrid;

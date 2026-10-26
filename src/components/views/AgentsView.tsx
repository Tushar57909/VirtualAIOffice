import React from 'react';
import type { Agent } from '../../data/agents';
import AgentCard from '../AgentCard';
import { Zap, Sparkles } from 'lucide-react';

interface AgentsViewProps {
  agents: Agent[];
}

const AgentsView: React.FC<AgentsViewProps> = ({ agents }) => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans">
      {/* Overview Banner Card */}
      <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 p-6 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Multi-Agent Swarm</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">AI Engineering Roster</h2>
          <p className="text-slate-600 text-sm mt-1 max-w-xl leading-relaxed">
            Meet your 6 cross-functional AI specialists. Each agent operates with specialized domain prompts and evaluates tasks autonomously.
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-lg font-bold text-slate-900">6</div>
            <div className="text-[11px] text-slate-500 font-medium">Specialists</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-lg font-bold text-emerald-600">100%</div>
            <div className="text-[11px] text-slate-500 font-medium">Uptime</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-lg font-bold text-indigo-600">n8n</div>
            <div className="text-[11px] text-slate-500 font-medium">Pipeline</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-lg font-bold text-purple-600">Sync</div>
            <div className="text-[11px] text-slate-500 font-medium">Dispatch</div>
          </div>
        </div>
      </div>

      {/* Roster Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>

      {/* Architecture Spec Table */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Agent Capabilities & Workflow Matrix
            </h3>
          </div>
          <span className="text-xs text-indigo-700 font-semibold bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
            Autonomous Dispatch
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="py-3 px-4">Agent Name</th>
                <th className="py-3 px-4">Domain Role</th>
                <th className="py-3 px-4">Core Responsibility</th>
                <th className="py-3 px-4">Output Artifact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-200 shrink-0">
                    <img src="/assets/agent_manager.jpg" alt="Manager" className="w-full h-full object-cover" />
                  </div>
                  <span>Manager Agent</span>
                </td>
                <td className="py-3.5 px-4 text-indigo-600 font-semibold">Orchestrator</td>
                <td className="py-3.5 px-4">Task decomposition, sub-agent routing, and executive report synthesis</td>
                <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">Executive Summary & Blueprint</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-200 shrink-0">
                    <img src="/assets/agent_research.jpg" alt="Research" className="w-full h-full object-cover" />
                  </div>
                  <span>Research Agent</span>
                </td>
                <td className="py-3.5 px-4 text-purple-600 font-semibold">Requirements & Scope</td>
                <td className="py-3.5 px-4">Requirements gathering, domain research, scope definition</td>
                <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">Functional Specs</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-200 shrink-0">
                    <img src="/assets/agent_developer.jpg" alt="Developer" className="w-full h-full object-cover" />
                  </div>
                  <span>Developer Agent</span>
                </td>
                <td className="py-3.5 px-4 text-blue-600 font-semibold">Architecture & Code</td>
                <td className="py-3.5 px-4">System design, database schemas, and API implementation blueprints</td>
                <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">Technical Architecture</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-200 shrink-0">
                    <img src="/assets/agent_debugger.jpg" alt="Debugger" className="w-full h-full object-cover" />
                  </div>
                  <span>Debugger Agent</span>
                </td>
                <td className="py-3.5 px-4 text-amber-600 font-semibold">Troubleshooting & Fixes</td>
                <td className="py-3.5 px-4">Runtime error analysis, bottleneck identification, root-cause resolution</td>
                <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">Diagnostic Fix Report</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-200 shrink-0">
                    <img src="/assets/agent_security.jpg" alt="Security" className="w-full h-full object-cover" />
                  </div>
                  <span>Security Agent</span>
                </td>
                <td className="py-3.5 px-4 text-rose-600 font-semibold">Security Audit</td>
                <td className="py-3.5 px-4">Vulnerability assessment, compliance, authentication & threat audit</td>
                <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">Security Vulnerability Matrix</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-200 shrink-0">
                    <img src="/assets/agent_qa.jpg" alt="QA" className="w-full h-full object-cover" />
                  </div>
                  <span>QA Agent</span>
                </td>
                <td className="py-3.5 px-4 text-emerald-600 font-semibold">Testing & QA</td>
                <td className="py-3.5 px-4">Test strategy, automated unit test suites, edge case validation</td>
                <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">QA Test Plan Matrix</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgentsView;

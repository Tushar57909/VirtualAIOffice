import React, { useState } from 'react';
import { 
  Search, Shield, Bug, CheckSquare, Layers, 
  Trash2, Sparkles, Zap, Cpu, ArrowRight
} from 'lucide-react';

interface TaskComposerProps {
  onSubmit: (task: string) => void;
  isProcessing: boolean;
}

const quickActions = [
  { 
    id: 'research', 
    label: 'Research', 
    icon: Search,
    style: 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200',
    prefix: 'Perform a comprehensive discovery research and requirements analysis for ' 
  },
  { 
    id: 'architecture', 
    label: 'Architecture', 
    icon: Layers,
    style: 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200',
    prefix: 'Design the full system architecture, database schema, and component flow for ' 
  },
  { 
    id: 'debug', 
    label: 'Debug', 
    icon: Bug,
    style: 'bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200',
    prefix: 'Diagnose potential performance bottlenecks, edge cases, and runtime errors in ' 
  },
  { 
    id: 'security', 
    label: 'Security Review', 
    icon: Shield,
    style: 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200',
    prefix: 'Conduct a thorough security audit, vulnerability review, and compliance check for ' 
  },
  { 
    id: 'qa', 
    label: 'QA Plan', 
    icon: CheckSquare,
    style: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200',
    prefix: 'Formulate an end-to-end testing matrix, unit test suite, and QA strategy for ' 
  },
];

const TaskComposer: React.FC<TaskComposerProps> = ({ onSubmit, isProcessing }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (task.trim() && !isProcessing) {
      onSubmit(task);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const applyQuickAction = (prefix: string) => {
    if (task.trim() && !task.startsWith(prefix)) {
      setTask(prefix + task);
    } else {
      setTask(prefix);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 font-sans">
      {/* 3D Visual Hero Workspace Card */}
      <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Background 3D Graphic Image Banner */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 opacity-25 md:opacity-40 pointer-events-none">
          <img 
            src="/assets/bg_3d_workspace.jpg" 
            alt="3D Virtual Office Workspace" 
            className="w-full h-full object-cover object-left"
          />
        </div>

        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Operations Workspace</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Good afternoon.
          </h1>
          <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
            What should your AI engineering team work on today? Delegate complex tasks to your coordinated team of specialized AI agents.
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="relative z-10 flex items-center gap-3 bg-slate-50/90 backdrop-blur-md border border-slate-200 p-3 rounded-2xl shrink-0 shadow-xs">
          <div className="text-center px-3 border-r border-slate-200">
            <div className="text-base font-bold text-slate-900">6 Agents</div>
            <div className="text-[11px] text-slate-500">Active Roster</div>
          </div>
          <div className="text-center px-3 border-r border-slate-200">
            <div className="text-base font-bold text-emerald-600">100%</div>
            <div className="text-[11px] text-slate-500">System Ready</div>
          </div>
          <div className="text-center px-3">
            <div className="text-base font-bold text-indigo-600">n8n</div>
            <div className="text-[11px] text-slate-500">Connected</div>
          </div>
        </div>
      </div>

      {/* Task Input Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
        {/* Input Bar Header */}
        <div className="px-5 py-3 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2 font-medium">
            <Cpu className="w-4 h-4 text-indigo-600" />
            <span className="text-slate-800 font-semibold">Task Prompt Input</span>
          </div>
          {task.trim() && (
            <button 
              onClick={() => setTask('')}
              className="text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1 text-xs"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-500" /> Clear
            </button>
          )}
        </div>

        {/* Text Area */}
        <textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe a task, project, application design, bug, or security concern for your AI team..."
          className="w-full h-36 bg-transparent text-slate-900 placeholder-slate-400 p-5 leading-relaxed outline-none text-base font-sans resize-none"
          disabled={isProcessing}
        />

        {/* Action Bar & Quick Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Quick Action Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {quickActions.map((action) => {
              const ActionIcon = action.icon;
              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => applyQuickAction(action.prefix)}
                  disabled={isProcessing}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all shadow-xs ${action.style}`}
                >
                  <ActionIcon className="w-3.5 h-3.5" />
                  <span>{action.label}</span>
                </button>
              );
            })}
          </div>

          {/* Primary CTA */}
          <div className="flex items-center gap-3 self-end lg:self-auto">
            <span className="text-xs text-slate-400 hidden xl:inline">Ctrl + Enter</span>
            <button
              onClick={handleSubmit}
              disabled={!task.trim() || isProcessing}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200
                ${task.trim() && !isProcessing
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25 active:scale-98'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-200'
                }
              `}
            >
              <Zap className="w-4 h-4 fill-current text-white" />
              <span>Run AI Team</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskComposer;

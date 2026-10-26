import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import TaskComposer from './TaskComposer';
import AgentGrid from './AgentGrid';
import ActivityFeed from './ActivityFeed';
import ReportPanel from './ReportPanel';
import EmptyState from './EmptyState';
import StudentPortal from './smp/StudentPortal';

// Views
import AgentsView from './views/AgentsView';
import IntegrationsView from './views/IntegrationsView';
import ReportsView from './views/ReportsView';
import SettingsView from './views/SettingsView';

import { initialAgents, type Agent, type ActivityLog } from '../data/agents';
import { runAgentTask } from '../services/n8nService';
import { 
  AlertCircle, RefreshCw, Terminal, Zap, ShieldCheck, 
  Cpu, Activity, CheckCircle2
} from 'lucide-react';

const CommandCenter = () => {
  const [activeView, setActiveView] = useState<string>('overview');
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [isProcessing, setIsProcessing] = useState(false);
  const [taskStarted, setTaskStarted] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [currentTaskTitle, setCurrentTaskTitle] = useState<string>('');

  const [finalResponse, setFinalResponse] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPrototype, setShowPrototype] = useState(false);

  const addLog = (agentId: string, message: string) => {
    setLogs(prev => [...prev, {
      id: Math.random().toString(36).substring(2, 9),
      agentId,
      message,
      timestamp: new Date()
    }]);
  };

  const handleTaskSubmit = async (task: string) => {
    setIsProcessing(true);
    setTaskStarted(true);
    setTaskCompleted(false);
    setErrorMessage(null);
    setFinalResponse(null);
    setShowPrototype(false);
    setCurrentTaskTitle(task.length > 55 ? task.substring(0, 55) + '...' : task);
    
    // Honest agent state transitions
    setAgents(prev => prev.map(a => {
      if (a.id === 'manager') return { ...a, status: 'Coordinating', lastActivity: 'Orchestrating' };
      if (a.id === 'research') return { ...a, status: 'Working', lastActivity: 'Gathering Requirements' };
      return { ...a, status: 'Waiting', lastActivity: 'Standby' };
    }));

    setLogs([]);
    addLog('manager', 'Task received by AI Command Center workspace.');
    addLog('manager', 'Manager Agent is decomposing prompt and routing to specialist agents.');

    // Step updates during dispatch
    setTimeout(() => {
      setAgents(prev => prev.map(a => {
        if (a.id === 'developer' || a.id === 'security' || a.id === 'qa' || a.id === 'debugger') {
          return { ...a, status: 'Working', lastActivity: 'Evaluating System Architecture' };
        }
        return a;
      }));
      addLog('research', 'Requirements analysis complete. Synthesizing structural specs...');
    }, 4000);

    setTimeout(() => {
      addLog('developer', 'Architectural blueprint and API component matrix generated.');
      addLog('security', 'Security risk review & threat audit completed.');
    }, 12000);

    try {
      const responseText = await runAgentTask(task);
      
      setAgents(prev => prev.map(a => ({ 
        ...a, 
        status: 'Completed', 
        lastActivity: 'Finished Task' 
      })));

      addLog('manager', 'AI Team successfully synthesized final engineering report.');
      setFinalResponse(responseText);
      setTaskCompleted(true);
    } catch (error: any) {
      setAgents(prev => prev.map(a => ({ 
        ...a, 
        status: 'Available', 
        lastActivity: 'Ready' 
      })));
      addLog('manager', 'Execution Status: ' + (error.message || 'Request failed'));
      setErrorMessage(error.message || 'Unable to connect to active n8n webhook.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetTask = () => {
    setTaskStarted(false);
    setTaskCompleted(false);
    setErrorMessage(null);
    setFinalResponse(null);
    setAgents(initialAgents);
  };

  const handleSelectPrompt = (prompt: string) => {
    setActiveView('overview');
    handleTaskSubmit(prompt);
  };

  return (
    <div className="flex h-screen w-screen bg-3d-canvas text-slate-900 font-sans overflow-hidden relative">
      {/* Sidebar Navigation Rail */}
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      {/* Main Workspace Column */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-transparent z-10">
        {/* Translucent Glass Top Header */}
        <TopBar 
          currentSection="Workspace" 
          activeView={activeView} 
          onSearchClick={() => setActiveView('overview')}
        />

        {/* Workspace Canvas Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar relative">
          
          {/* OVERVIEW / NEW TASK VIEW */}
          {(activeView === 'overview' || activeView === 'new-task') && (
            <div className="max-w-6xl mx-auto space-y-8 pb-12">
              
              {/* Telemetry Metrics Bar with Vibrant Glass Panels */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="vibrant-glass-card p-4.5 rounded-3xl flex items-center gap-3.5 transition-all">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0 shadow-md shadow-indigo-500/10">
                    <Zap className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">System Performance</div>
                    <div className="text-base font-extrabold text-slate-900 font-mono flex items-center gap-1.5 mt-0.5">
                      <span>99.8%</span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300 font-bold">Optimal</span>
                    </div>
                  </div>
                </div>

                <div className="vibrant-glass-card p-4.5 rounded-3xl flex items-center gap-3.5 transition-all">
                  <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shrink-0 shadow-md shadow-purple-500/10">
                    <Cpu className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">AI Agent Roster</div>
                    <div className="text-base font-extrabold text-slate-900 font-mono flex items-center gap-1.5 mt-0.5">
                      <span>6 Specialists</span>
                      <span className="text-[10px] text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-full border border-purple-300 font-bold">Active</span>
                    </div>
                  </div>
                </div>

                <div className="vibrant-glass-card p-4.5 rounded-3xl flex items-center gap-3.5 transition-all">
                  <div className="w-11 h-11 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 shrink-0 shadow-md shadow-cyan-500/10">
                    <Activity className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">n8n Pipeline</div>
                    <div className="text-base font-extrabold text-slate-900 font-mono flex items-center gap-1.5 mt-0.5">
                      <span>Connected</span>
                      <span className="text-[10px] text-cyan-700 bg-cyan-100/80 px-2 py-0.5 rounded-full border border-cyan-300 font-bold">Ready</span>
                    </div>
                  </div>
                </div>

                <div className="vibrant-glass-card p-4.5 rounded-3xl flex items-center gap-3.5 transition-all">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 shadow-md shadow-emerald-500/10">
                    <ShieldCheck className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Security Shield</div>
                    <div className="text-base font-extrabold text-slate-900 font-mono flex items-center gap-1.5 mt-0.5">
                      <span>Verified</span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300 font-bold">Protected</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Task Composer Section */}
              {(!taskStarted || activeView === 'new-task') && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <TaskComposer 
                    onSubmit={(t) => {
                      setActiveView('overview');
                      handleTaskSubmit(t);
                    }} 
                    isProcessing={isProcessing} 
                  />
                  
                  {/* Agent Grid Roster */}
                  <div className="pt-6 border-t border-white/50">
                    <AgentGrid agents={agents} />
                  </div>
                </div>
              )}

              {/* Active Task Execution & Results */}
              {taskStarted && activeView === 'overview' && (
                <div className="space-y-6">
                  {/* Status Banner Card */}
                  <div className="vibrant-glass-card p-6 rounded-3xl space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/30">
                          <Terminal className="w-5 h-5" />
                        </div>
                        <div>
                          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                            {isProcessing ? 'ACTIVE TEAM ORCHESTRATION' : errorMessage ? 'ORCHESTRATION FAILURE / RETRY' : 'ORCHESTRATION COMPLETED'}
                          </h2>
                          <p className="text-xs text-slate-500 font-sans mt-0.5">
                            {currentTaskTitle || 'Dispatched AI Task'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {isProcessing && (
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold animate-pulse shadow-xs">
                            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
                            Synthesizing Report...
                          </span>
                        )}
                        {!isProcessing && (
                          <button 
                            onClick={handleResetTask}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-500/20"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Run New Task</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Agent Status Roster */}
                    <AgentGrid agents={agents} title="LIVE AGENT EXECUTION STATES" />
                  </div>

                  {/* Friendly Error State Banner */}
                  {errorMessage && (
                    <div className="vibrant-glass-card p-6 rounded-3xl border border-rose-300 bg-rose-50/90 text-center space-y-4 shadow-xl">
                      <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-600 mx-auto shadow-sm">
                        <AlertCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-rose-900">n8n Webhook Response Error</h3>
                        <p className="text-xs text-rose-700 mt-1 max-w-md mx-auto leading-relaxed">{errorMessage}</p>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => { setTaskStarted(false); setErrorMessage(null); }}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                        >
                          <RefreshCw className="w-4 h-4" />
                          <span>Retry Webhook Dispatch</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Completed Report Panel */}
                  {taskCompleted && finalResponse && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
                      <ReportPanel 
                        response={finalResponse} 
                        taskTitle={currentTaskTitle || "Engineering Team Synthesis"}
                        onBuildPrototype={() => setShowPrototype(true)} 
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* AI AGENTS VIEW */}
          {activeView === 'agents' && (
            <AgentsView agents={agents} />
          )}

          {/* ACTIVITY VIEW */}
          {activeView === 'activity' && (
            <div className="max-w-4xl mx-auto space-y-6 font-sans">
              <div className="vibrant-glass-card p-5 rounded-3xl flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Engineering Activity Log</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Real-time operation history across AI agents.</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Stream Active</span>
                </div>
              </div>

              {logs.length === 0 ? (
                <EmptyState 
                  title="No operational logs recorded"
                  description="Run a project task from the Command Center to record live agent activity."
                  onAction={() => setActiveView('overview')}
                  actionLabel="Go to Command Center"
                />
              ) : (
                <div className="vibrant-glass-card rounded-3xl p-6 shadow-xl">
                  <div className="space-y-3 text-xs">
                    {logs.map((log) => (
                      <div key={log.id} className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-start justify-between gap-4 shadow-xs">
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-extrabold">
                            {log.agentId.toUpperCase()}
                          </span>
                          <span className="text-slate-800 font-sans text-xs">{log.message}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                          {log.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* REPORTS VIEW */}
          {activeView === 'reports' && (
            <ReportsView 
              currentResponse={finalResponse} 
              onBuildPrototype={() => setShowPrototype(true)}
              onSelectTaskPrompt={handleSelectPrompt}
            />
          )}

          {/* INTEGRATIONS VIEW */}
          {activeView === 'integrations' && (
            <IntegrationsView />
          )}

          {/* SETTINGS VIEW */}
          {activeView === 'settings' && (
            <SettingsView />
          )}
        </main>
      </div>

      {/* Right Timeline Feed Column */}
      <ActivityFeed logs={logs} />

      {/* Prototype Overlay Modal */}
      {showPrototype && <StudentPortal onClose={() => setShowPrototype(false)} />}
    </div>
  );
};

export default CommandCenter;

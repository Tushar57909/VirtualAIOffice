import React from 'react';
import { Network, CheckCircle2 } from 'lucide-react';

const IntegrationsView: React.FC = () => {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || 'Configured via .env';

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans">
      {/* Header */}
      <div className="flex items-center justify-between p-5 rounded-3xl bg-white border border-slate-200 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">n8n Webhook Integration</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Production AI agent pipeline & orchestration engine.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Active & Connected</span>
        </div>
      </div>

      {/* Connection Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Endpoints & Environment
        </h3>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-slate-500">Target Webhook URL</span>
            <div className="flex items-center justify-between gap-3 text-xs font-mono text-slate-800">
              <span className="truncate">{webhookUrl}</span>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold border border-indigo-200 text-[10px]">POST</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-[11px] font-semibold text-slate-500">Payload Format</div>
              <div className="text-xs font-bold text-slate-900 mt-1 font-mono">{`{ "task": string }`}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-[11px] font-semibold text-slate-500">Timeout Threshold</div>
              <div className="text-xs font-bold text-slate-900 mt-1">150 Seconds</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-[11px] font-semibold text-slate-500">Response Mode</div>
              <div className="text-xs font-bold text-slate-900 mt-1">Synchronous Synthesis</div>
            </div>
          </div>
        </div>
      </div>

      {/* Health Info */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-xl">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          System Health & Pipeline Execution
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          The frontend dispatches real user prompts to your n8n workflow. The Manager Agent coordinates sub-agent evaluation and returns formatted Markdown reports directly to the user interface.
        </p>
      </div>
    </div>
  );
};

export default IntegrationsView;

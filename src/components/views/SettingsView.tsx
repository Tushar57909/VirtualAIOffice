import React, { useState } from 'react';
import { Save, Check } from 'lucide-react';

const SettingsView: React.FC = () => {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans">
      <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">System & Workspace Settings</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure agent orchestration behavior, timeout thresholds, and UI parameters.
          </p>
        </div>

        <button 
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-indigo-500/20"
        >
          {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
          <span>{saved ? 'Saved' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Orchestration Parameters
        </h3>

        <div className="space-y-3 text-xs text-slate-700">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <div className="font-semibold text-slate-900">Execution Timeout</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Maximum seconds allowed for full agent pipeline synthesis.</div>
            </div>
            <select className="bg-white border border-slate-300 text-slate-800 text-xs rounded-xl px-3 py-1.5 outline-none font-medium">
              <option value="150">150 Seconds (Default)</option>
              <option value="300">300 Seconds</option>
              <option value="60">60 Seconds</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <div className="font-semibold text-slate-900">Agent Parallelization</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Allow specialist agents to evaluate tasks concurrently.</div>
            </div>
            <input type="checkbox" defaultChecked className="accent-indigo-600 w-4 h-4 rounded" />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <div className="font-semibold text-slate-900">Markdown Format Output</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Ensure Manager Agent renders GitHub Flavored Markdown.</div>
            </div>
            <input type="checkbox" defaultChecked className="accent-indigo-600 w-4 h-4 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;

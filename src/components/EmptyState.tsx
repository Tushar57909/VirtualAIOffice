import React from 'react';
import { Terminal, Plus } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onAction?: () => void;
  actionLabel?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No active tasks",
  description = "Create a task and let the AI engineering team analyze it.",
  onAction,
  actionLabel = "Create New Task"
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-slate-800 bg-[#0e1017]/60 my-6">
      <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 mb-3">
        <Terminal className="w-5 h-5 stroke-1" />
      </div>
      <h3 className="text-sm font-semibold text-slate-200 mb-1">
        {title}
      </h3>
      <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-4">
        {description}
      </p>
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium transition-all shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;

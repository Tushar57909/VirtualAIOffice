import React from 'react';
import { FileText, ArrowUpRight } from 'lucide-react';
import ReportPanel from '../ReportPanel';

interface ReportsViewProps {
  currentResponse: string | null;
  onBuildPrototype: () => void;
  onSelectTaskPrompt: (prompt: string) => void;
}

const ReportsView: React.FC<ReportsViewProps> = ({ 
  currentResponse, 
  onBuildPrototype,
  onSelectTaskPrompt
}) => {
  if (currentResponse) {
    return (
      <div className="max-w-5xl mx-auto space-y-4 font-sans">
        <ReportPanel 
          response={currentResponse} 
          onBuildPrototype={onBuildPrototype} 
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans">
      <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Engineering Reports & Artifacts</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            View generated technical specifications, security matrices, and architectural blueprints.
          </p>
        </div>
      </div>

      {/* Preset Report Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          onClick={() => onSelectTaskPrompt("Design a student management portal with complete attendance, grades, and course management modules.")}
          className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
              <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-indigo-600" /> Student Management Portal</span>
              <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md font-semibold text-[10px]">6 Agents</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
              Full Portal Architecture & Requirements Analysis
            </h3>
            <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
              Complete technical specification including student records schema, grading matrix, attendance API, and UI prototype layout.
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-600 font-semibold">
            <span>Run Task & Generate Report</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        <div 
          onClick={() => onSelectTaskPrompt("Perform a security audit and vulnerability assessment on our JWT authentication and API endpoints.")}
          className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
              <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-purple-600" /> API Security Review</span>
              <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md font-semibold text-[10px]">6 Agents</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
              JWT Authentication & API Security Audit
            </h3>
            <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
              Deep security review covering token expiration, CORS policies, SQL injection vectors, and enterprise auth recommendations.
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-purple-600 font-semibold">
            <span>Run Task & Generate Report</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsView;

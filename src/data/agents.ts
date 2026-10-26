import { FileSearch, Code2, Bug, ShieldAlert, CheckCircle2, UserCog } from 'lucide-react';

export type AgentStatus = 'Idle' | 'Available' | 'Thinking' | 'Working' | 'Coordinating' | 'Waiting' | 'Completed';

export interface Agent {
  id: string;
  name: string;
  roleTitle: string;
  role: string;
  description: string;
  icon: any;
  avatar: string;
  status: AgentStatus;
  lastActivity?: string;
  threadLoad: string;
  badgeBg: string;
  textColor: string;
  borderColor: string;
}

export const initialAgents: Agent[] = [
  {
    id: 'manager',
    name: 'Manager Agent',
    roleTitle: 'MANAGER',
    role: 'Team Coordinator & Synthesizer',
    description: 'Task orchestration, sub-agent routing & report synthesis',
    icon: UserCog,
    avatar: '/assets/agent_manager.jpg',
    status: 'Available',
    lastActivity: 'Ready',
    threadLoad: '14%',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    textColor: 'text-indigo-600',
    borderColor: 'border-indigo-200',
  },
  {
    id: 'research',
    name: 'Research Agent',
    roleTitle: 'RESEARCH',
    role: 'Requirements & Scope Analysis',
    description: 'Requirements gathering, domain research & technical scope',
    icon: FileSearch,
    avatar: '/assets/agent_research.jpg',
    status: 'Available',
    lastActivity: 'Ready',
    threadLoad: '8%',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    textColor: 'text-purple-600',
    borderColor: 'border-purple-200',
  },
  {
    id: 'developer',
    name: 'Developer Agent',
    roleTitle: 'DEVELOPER',
    role: 'Systems Architecture & Implementation',
    description: 'System design, database schemas & code implementation',
    icon: Code2,
    avatar: '/assets/agent_developer.jpg',
    status: 'Available',
    lastActivity: 'Ready',
    threadLoad: '18%',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-200',
  },
  {
    id: 'debugger',
    name: 'Debugger Agent',
    roleTitle: 'DEBUGGER',
    role: 'Troubleshooting & Diagnostics',
    description: 'Runtime error diagnostics, performance fixes & bottleneck resolution',
    icon: Bug,
    avatar: '/assets/agent_debugger.jpg',
    status: 'Available',
    lastActivity: 'Ready',
    threadLoad: '5%',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    textColor: 'text-amber-600',
    borderColor: 'border-amber-200',
  },
  {
    id: 'security',
    name: 'Security Agent',
    roleTitle: 'SECURITY',
    role: 'Security Audit & Compliance',
    description: 'Vulnerability assessment, compliance & authentication audit',
    icon: ShieldAlert,
    avatar: '/assets/agent_security.jpg',
    status: 'Available',
    lastActivity: 'Ready',
    threadLoad: '10%',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
    textColor: 'text-rose-600',
    borderColor: 'border-rose-200',
  },
  {
    id: 'qa',
    name: 'QA Agent',
    roleTitle: 'QA',
    role: 'Testing Suite & Automation Strategy',
    description: 'Automated test suite creation, coverage matrix & QA validation',
    icon: CheckCircle2,
    avatar: '/assets/agent_qa.jpg',
    status: 'Available',
    lastActivity: 'Ready',
    threadLoad: '12%',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    textColor: 'text-emerald-600',
    borderColor: 'border-emerald-200',
  }
];

export interface ActivityLog {
  id: string;
  agentId: string;
  message: string;
  timestamp: Date;
  statusType?: 'info' | 'working' | 'success' | 'error';
}

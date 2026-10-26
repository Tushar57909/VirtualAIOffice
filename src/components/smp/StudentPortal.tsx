import { useState } from 'react';
import { 
  LayoutDashboard, Users, BookOpen, UserCheck, Award, 
  FileText, Calendar as CalendarIcon, Bell, Search, Filter, Eye, ChevronLeft, Download
} from 'lucide-react';

const StudentPortal = ({ onClose }: { onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <div className="fixed inset-0 z-50 bg-[#0f111a] text-gray-200 flex font-sans overflow-hidden animate-in fade-in zoom-in duration-500">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-800 bg-[#161824] flex flex-col shrink-0">
        <div className="p-5 border-b border-gray-800 flex items-center justify-between">
          <div className="font-bold text-gray-100 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-lg font-bold">S</span>
            </div>
            <span>Student Portal</span>
          </div>
        </div>
        
        <div className="p-3">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
            Navigation
          </div>
          <nav className="space-y-1">
            <NavItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
            <NavItem icon={Users} label="Students" active={activeTab === 'Students'} onClick={() => setActiveTab('Students')} />
            <NavItem icon={BookOpen} label="Courses" active={activeTab === 'Courses'} onClick={() => setActiveTab('Courses')} />
            <NavItem icon={UserCheck} label="Attendance" active={activeTab === 'Attendance'} onClick={() => setActiveTab('Attendance')} />
            <NavItem icon={Award} label="Grades" active={activeTab === 'Grades'} onClick={() => setActiveTab('Grades')} />
            <NavItem icon={FileText} label="Assignments" active={activeTab === 'Assignments'} onClick={() => setActiveTab('Assignments')} />
            <NavItem icon={CalendarIcon} label="Calendar" active={activeTab === 'Calendar'} onClick={() => setActiveTab('Calendar')} />
            <NavItem icon={Bell} label="Notices" active={activeTab === 'Notices'} onClick={() => setActiveTab('Notices')} />
          </nav>
        </div>
        
        <div className="mt-auto p-4 border-t border-gray-800">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to AI Office
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#0b0c10] overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-8 bg-[#161824]">
          <div className="text-lg font-medium text-gray-100">{activeTab}</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-medium text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
              AI-Generated Prototype
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-700 border border-gray-600"></div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {activeTab === 'Dashboard' && <DashboardPage />}
          {activeTab === 'Students' && <StudentsPage />}
          {activeTab === 'Courses' && <CoursesPage />}
          {activeTab === 'Attendance' && <AttendancePage />}
          {activeTab === 'Grades' && <GradesPage />}
          {activeTab === 'Assignments' && <AssignmentsPage />}
          {activeTab === 'Calendar' && <CalendarPage />}
          {activeTab === 'Notices' && <NoticesPage />}
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
      ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'}
    `}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);

// --- Pages ---

const DashboardPage = () => (
  <div className="space-y-6 animate-in fade-in">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard title="Total Students" value="1,248" trend="+12" />
      <StatCard title="Active Courses" value="42" />
      <StatCard title="Overall Attendance" value="89%" trend="-2%" negative />
      <StatCard title="Pending Assignments" value="156" />
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-[#161824] rounded-xl border border-gray-800 p-6">
        <h3 className="text-lg font-medium mb-4">Weekly Attendance Overview</h3>
        <div className="h-64 flex items-end gap-4 justify-between px-4 pb-2 border-b border-gray-800">
          {[80, 85, 90, 82, 95].map((h, i) => (
            <div key={i} className="w-16 bg-blue-600/80 rounded-t-sm hover:bg-blue-500 transition-colors" style={{ height: `${h}%` }}></div>
          ))}
        </div>
        <div className="flex justify-between px-4 mt-3 text-sm text-gray-500 font-medium">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span>
        </div>
      </div>
      
      <div className="bg-[#161824] rounded-xl border border-gray-800 p-6">
        <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <ActivityItem title="New Grade Posted" desc="CS101 Final Exam" time="2h ago" />
          <ActivityItem title="Assignment Due" desc="Data Structures - Lab 3" time="5h ago" />
          <ActivityItem title="Notice Published" desc="Spring Break Schedule" time="1d ago" />
        </div>
      </div>
    </div>
  </div>
);

const StatCard = ({ title, value, trend, negative }: { title: string, value: string, trend?: string, negative?: boolean }) => (
  <div className="bg-[#161824] p-5 rounded-xl border border-gray-800 flex flex-col">
    <span className="text-sm text-gray-400 font-medium">{title}</span>
    <div className="mt-2 flex items-baseline gap-3">
      <span className="text-3xl font-bold text-gray-100">{value}</span>
      {trend && (
        <span className={`text-xs font-semibold ${negative ? 'text-red-400' : 'text-green-400'}`}>
          {trend}
        </span>
      )}
    </div>
  </div>
);

const ActivityItem = ({ title, desc, time }: any) => (
  <div className="flex gap-3">
    <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0"></div>
    <div>
      <p className="text-sm font-medium text-gray-200">{title}</p>
      <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
      <p className="text-xs text-gray-600 mt-1">{time}</p>
    </div>
  </div>
);

const StudentsPage = () => {
  const students = [
    { id: 'STU001', name: 'Alex Johnson', email: 'alex@example.edu', course: 'Computer Science', attendance: '92%', status: 'Active' },
    { id: 'STU002', name: 'Maria Garcia', email: 'maria@example.edu', course: 'Engineering', attendance: '88%', status: 'Active' },
    { id: 'STU003', name: 'James Smith', email: 'james@example.edu', course: 'Business', attendance: '75%', status: 'Warning' },
    { id: 'STU004', name: 'Sarah Lee', email: 'sarah@example.edu', course: 'Design', attendance: '96%', status: 'Active' },
  ];

  return (
    <div className="animate-in fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 bg-[#161824] px-4 py-2 rounded-lg border border-gray-800 w-96">
          <Search className="w-4 h-4 text-gray-500" />
          <input type="text" placeholder="Search students..." className="bg-transparent border-none outline-none text-sm w-full text-gray-200" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#161824] border border-gray-800 rounded-lg text-sm text-gray-300 hover:text-white transition-colors">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      <div className="bg-[#161824] rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#1e202e] border-b border-gray-800 text-gray-400 font-medium">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Course</th>
              <th className="px-6 py-4">Attendance</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {students.map(s => (
              <tr key={s.id} className="hover:bg-gray-800/30 transition-colors text-gray-300">
                <td className="px-6 py-4 font-mono text-xs">{s.id}</td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-200">{s.name}</div>
                  <div className="text-xs text-gray-500">{s.email}</div>
                </td>
                <td className="px-6 py-4">{s.course}</td>
                <td className="px-6 py-4">{s.attendance}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${s.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-orange-500/10 text-orange-400'}`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1.5 text-gray-500 hover:text-blue-400 transition-colors"><Eye className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CoursesPage = () => (
  <div className="animate-in fade-in grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {['CS101 - Introduction to Programming', 'MA201 - Advanced Calculus', 'PH102 - Physics II'].map((c, i) => (
      <div key={i} className="bg-[#161824] rounded-xl border border-gray-800 p-6">
        <h3 className="text-lg font-medium text-gray-200 mb-1">{c}</h3>
        <p className="text-sm text-gray-500 mb-4">Prof. Robert Chen</p>
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-400">Progress</span>
          <span className="text-gray-200 font-medium">65%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-1.5 mb-4">
          <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">42 Students</span>
          <button className="text-blue-400 font-medium hover:text-blue-300 transition-colors">Manage</button>
        </div>
      </div>
    ))}
  </div>
);

const AttendancePage = () => (
  <div className="animate-in fade-in space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="Overall Attendance" value="89%" />
      <StatCard title="Total Present" value="1,110" />
      <StatCard title="Total Absent" value="138" />
    </div>
    <div className="bg-[#161824] rounded-xl border border-gray-800 p-6">
      <h3 className="text-lg font-medium mb-6">Subject-wise Attendance</h3>
      <div className="space-y-6">
        {['Computer Science', 'Mathematics', 'Physics', 'Design'].map((sub, i) => {
          const val = [92, 85, 78, 96][i];
          return (
            <div key={sub}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300 font-medium">{sub}</span>
                <span className="text-gray-400">{val}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className={`h-2 rounded-full ${val > 90 ? 'bg-green-500' : val > 80 ? 'bg-blue-500' : 'bg-orange-500'}`} style={{ width: `${val}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

const GradesPage = () => (
  <div className="animate-in fade-in space-y-6">
    <div className="bg-[#161824] rounded-xl border border-gray-800 p-6 flex justify-between items-center">
      <div>
        <h3 className="text-xl font-bold text-gray-100">Semester Performance</h3>
        <p className="text-sm text-gray-400 mt-1">Current GPA: 3.8 / 4.0</p>
      </div>
      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm text-white font-medium transition-colors">
        <Download className="w-4 h-4" /> Download Transcript
      </button>
    </div>
    
    <div className="bg-[#161824] rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#1e202e] border-b border-gray-800 text-gray-400 font-medium">
            <tr>
              <th className="px-6 py-4">Subject</th>
              <th className="px-6 py-4">Internal Marks</th>
              <th className="px-6 py-4">External Marks</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {[
              { sub: 'Computer Science', int: '38/40', ext: '55/60', tot: '93/100', gr: 'A+' },
              { sub: 'Mathematics', int: '35/40', ext: '48/60', tot: '83/100', gr: 'A' },
              { sub: 'Physics', int: '30/40', ext: '45/60', tot: '75/100', gr: 'B+' },
            ].map((s, i) => (
              <tr key={i} className="hover:bg-gray-800/30 text-gray-300">
                <td className="px-6 py-4 font-medium text-gray-200">{s.sub}</td>
                <td className="px-6 py-4">{s.int}</td>
                <td className="px-6 py-4">{s.ext}</td>
                <td className="px-6 py-4">{s.tot}</td>
                <td className="px-6 py-4 font-bold text-blue-400">{s.gr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  </div>
);

const AssignmentsPage = () => (
  <div className="animate-in fade-in grid gap-4">
    {[
      { title: 'Project Phase 1', sub: 'Computer Science', date: 'Oct 15, 2026', status: 'Pending' },
      { title: 'Calculus Homework 4', sub: 'Mathematics', date: 'Oct 10, 2026', status: 'Submitted' },
      { title: 'Lab Report', sub: 'Physics', date: 'Sep 28, 2026', status: 'Graded' },
    ].map((a, i) => (
      <div key={i} className="bg-[#161824] rounded-xl border border-gray-800 p-5 flex items-center justify-between">
        <div>
          <h3 className="text-base font-medium text-gray-200">{a.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{a.sub} • Due: {a.date}</p>
        </div>
        <span className={`px-3 py-1 text-xs font-medium rounded-full 
          ${a.status === 'Pending' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 
            a.status === 'Submitted' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
            'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
          {a.status}
        </span>
      </div>
    ))}
  </div>
);

const CalendarPage = () => (
  <div className="animate-in fade-in bg-[#161824] rounded-xl border border-gray-800 p-6 h-full min-h-[400px] flex items-center justify-center">
    <div className="text-center">
      <CalendarIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-300">Academic Calendar</h3>
      <p className="text-sm text-gray-500 mt-2 max-w-sm">Interactive calendar component rendering placeholder. Upcoming classes and exams will be scheduled here.</p>
    </div>
  </div>
);

const NoticesPage = () => (
  <div className="animate-in fade-in space-y-4">
    {[
      { title: 'Mid-term Examination Schedule Released', date: 'Today', imp: true },
      { title: 'Campus Maintenance Notice', date: 'Yesterday', imp: false },
      { title: 'New Course Registration Deadline', date: 'Oct 1', imp: true },
    ].map((n, i) => (
      <div key={i} className={`p-5 rounded-xl border ${n.imp ? 'bg-blue-900/10 border-blue-500/30' : 'bg-[#161824] border-gray-800'}`}>
        <div className="flex items-center gap-3 mb-2">
          {n.imp && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
          <h3 className="text-base font-medium text-gray-200">{n.title}</h3>
        </div>
        <p className="text-sm text-gray-500 ml-5">{n.date}</p>
      </div>
    ))}
  </div>
);

export default StudentPortal;

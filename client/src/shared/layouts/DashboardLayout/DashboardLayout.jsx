import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Award, 
  Trophy, 
  User, 
  Building2, 
  Bell, 
  Search, 
  Upload, 
  HelpCircle, 
  LogOut, 
  ChevronDown,
  ShieldCheck,
  Briefcase,
  Users,
  MessageSquare,
  Menu,
  X
} from 'lucide-react';
import { MOCK_STUDENT_PROFILE } from '../../mockData/yashasData';

export default function DashboardLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const profile = MOCK_STUDENT_PROFILE;

  const navItems = [
    { path: '/dashboard/overview', label: 'Overview', icon: LayoutDashboard },
    { path: '/dashboard/portfolio', label: 'Professional Profile', icon: User },
    { path: '/dashboard/certificates', label: 'Certificate Vault', icon: Award },
    { path: '/dashboard/events', label: 'Events & Hackathons', icon: Trophy },
    { path: '/dashboard/jobs', label: 'Jobs & Placement', icon: Briefcase },
    { path: '/dashboard/community', label: 'Community & Network', icon: Users },
    { path: '/dashboard/messages', label: 'Messages', icon: MessageSquare, badge: '2' },
    { path: '/dashboard/notifications', label: 'Notifications', icon: Bell, badge: '3' },
    { path: '/dashboard/institutions', label: 'Institutions', icon: Building2 },
    { path: '/dashboard/verification', label: 'Verification Desk', icon: ShieldCheck }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans selection:bg-[#3525cd] selection:text-white">
      
      {/* Desktop Sidebar Navigation */}
      <nav className="fixed left-0 top-0 h-screen w-64 z-40 bg-white/70 backdrop-blur-xl border-r border-white/60 flex-col py-6 hidden lg:flex transition-all duration-300">
        
        {/* Brand Header */}
        <div className="px-6 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#3525cd] flex items-center justify-center text-white shadow-md shadow-[#3525cd]/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-[#3525cd] tracking-tight">Yashas</h1>
            <p className="text-[11px] font-bold text-gray-400">Student Portal</p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 space-y-1 overflow-y-auto px-2 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path === '/dashboard/overview' && location.pathname === '/dashboard');

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                  isActive
                    ? 'bg-[#3525cd] text-white shadow-md shadow-[#3525cd]/20'
                    : 'text-gray-600 hover:bg-[#3525cd]/5 hover:text-[#3525cd]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isActive ? 'bg-white text-[#3525cd]' : 'bg-[#3525cd]/10 text-[#3525cd]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Upload & Actions */}
        <div className="px-6 mt-auto pt-4 border-t border-gray-200/60 space-y-3">
          <button 
            onClick={() => window.location.href = '/dashboard/certificates'}
            className="w-full bg-[#3525cd] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#3525cd]/90 transition-colors shadow-md shadow-[#3525cd]/20"
          >
            <Upload className="w-4 h-4" /> Upload Certificate
          </button>

          <div className="space-y-1">
            <a href="#" className="flex items-center gap-3 text-gray-500 px-3 py-1.5 text-xs font-semibold hover:text-[#3525cd] transition-colors">
              <HelpCircle className="w-4 h-4" /> Help Center
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content & Top Header Wrapper */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        
        {/* Desktop & Mobile Top Header Bar */}
        <header className="sticky top-0 z-30 px-6 py-3.5 bg-white/70 backdrop-blur-md border-b border-white/60 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="relative w-48 sm:w-72 md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Search certificates, skills, competitions..."
                className="w-full bg-white/80 border border-gray-200/80 text-xs font-medium text-[#0b1c30] rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-[#3525cd]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <NavLink 
              to="/dashboard/notifications" 
              className="relative p-2 text-gray-500 hover:bg-[#3525cd]/5 rounded-full transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </NavLink>

            <NavLink 
              to="/dashboard/portfolio"
              className="flex items-center gap-2.5 glass-panel px-3 py-1.5 rounded-full cursor-pointer hover:bg-white transition-colors border border-gray-200"
            >
              <img 
                src={profile.avatar} 
                alt="Parth" 
                className="w-7 h-7 rounded-full object-cover border border-[#3525cd]/40"
              />
              <span className="text-xs font-bold text-[#0b1c30] hidden sm:inline">{profile.name.split(' ')[0]}</span>
            </NavLink>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-[#0b1c30]/40 backdrop-blur-sm flex">
            <div className="w-64 bg-white h-full p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-black text-[#3525cd]">Yashas Menu</h2>
                  <button onClick={() => setIsMobileMenuOpen(false)}><X className="w-5 h-5 text-gray-500" /></button>
                </div>
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-xs ${
                        location.pathname === item.path ? 'bg-[#3525cd] text-white' : 'text-gray-600'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="p-4 sm:p-6 md:p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

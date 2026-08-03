import React, { useState } from 'react';
import { 
  Bell, 
  ShieldCheck, 
  UserPlus, 
  Briefcase, 
  Check, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '../../shared/mockData/yashasData';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState('ALL');

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const filteredNotifs = notifications.filter(n => {
    if (filter === 'ALL') return true;
    return n.type === filter;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-white/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#3525cd]/10 text-[#3525cd] flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-[#0b1c30]">Notifications</h1>
            <p className="text-xs font-semibold text-gray-500">Real-time alerts for institutional verifications, connections, and applications.</p>
          </div>
        </div>

        <button 
          onClick={markAllAsRead}
          className="text-xs font-bold text-[#3525cd] hover:underline"
        >
          Mark all as read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {['ALL', 'VERIFICATION', 'CONNECTION', 'JOB'].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              filter === t 
                ? 'bg-[#3525cd] text-white shadow-md' 
                : 'bg-white/80 text-gray-600 border border-gray-200 hover:bg-white'
            }`}
          >
            {t === 'ALL' ? 'All Alerts' : t}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filteredNotifs.map((notif) => (
          <div 
            key={notif.id}
            className={`glass-panel p-4 rounded-2xl border transition-all flex items-start gap-4 ${
              notif.unread ? 'bg-white/95 border-[#3525cd]/30 shadow-sm' : 'bg-white/60 border-white/80'
            }`}
          >
            <img src={notif.avatar} alt={notif.actor} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
            
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-medium text-[#0b1c30]">
                <strong className="font-extrabold">{notif.actor}</strong> {notif.text}
              </p>
              <span className="text-[10px] font-semibold text-gray-400 mt-1 block">{notif.time}</span>

              {notif.actionable && (
                <div className="flex items-center gap-2 mt-3">
                  <button className="px-3.5 py-1.5 bg-[#3525cd] text-white text-xs font-bold rounded-lg shadow-sm">
                    Accept
                  </button>
                  <button className="px-3.5 py-1.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-200">
                    Decline
                  </button>
                </div>
              )}
            </div>

            {notif.unread && (
              <span className="w-2 h-2 rounded-full bg-[#3525cd] shrink-0 mt-2"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

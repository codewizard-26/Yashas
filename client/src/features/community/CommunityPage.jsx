import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  UserPlus, 
  CheckCircle2, 
  Building2, 
  MessageSquare 
} from 'lucide-react';
import { MOCK_CONNECTIONS } from '../../shared/mockData/yashasData';

export default function CommunityPage() {
  const [connections, setConnections] = useState(MOCK_CONNECTIONS);
  const [activeTab, setActiveTab] = useState('SUGGESTED');

  const filtered = connections.filter(c => {
    if (activeTab === 'ALL') return true;
    return c.status === activeTab;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#3525cd] font-bold text-xs tracking-wider uppercase mb-2">
              <Users className="w-5 h-5 text-[#3525cd]" /> Campus & Peer Network
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0b1c30] tracking-tight">
              Community & <span className="text-gradient">Connections</span>
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl text-sm font-medium leading-relaxed">
              Connect with verified students, hackathon teammates, alumni, and campus leaders across engineering institutions.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {[
          { id: 'SUGGESTED', label: 'People You May Know' },
          { id: 'CONNECTED', label: 'My Connections' },
          { id: 'PENDING_RECEIVED', label: 'Pending Requests' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === t.id
                ? 'bg-[#3525cd] text-white shadow-md'
                : 'bg-white/80 text-gray-600 border border-gray-200 hover:bg-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((conn) => (
          <div key={conn.id} className="glass-panel p-6 rounded-2xl border border-white/80 flex flex-col justify-between space-y-4">
            <div className="flex items-start gap-4">
              <img src={conn.avatar} alt={conn.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />
              <div>
                <h3 className="text-sm font-bold text-[#0b1c30] flex items-center gap-1">
                  {conn.name} <CheckCircle2 className="w-4 h-4 text-[#3525cd]" />
                </h3>
                <p className="text-xs text-gray-600 font-medium line-clamp-2 mt-0.5">{conn.headline}</p>
                <span className="text-[10px] font-bold text-[#00687a] mt-2 block">{conn.mutual} mutual connections</span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
              {conn.status === 'CONNECTED' ? (
                <button className="flex-1 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 hover:bg-gray-200">
                  <MessageSquare className="w-3.5 h-3.5" /> Message
                </button>
              ) : (
                <button className="flex-1 py-2 bg-[#3525cd] text-white text-xs font-bold rounded-xl shadow-sm hover:bg-[#3525cd]/90 flex items-center justify-center gap-1.5">
                  <UserPlus className="w-3.5 h-3.5" /> Connect
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

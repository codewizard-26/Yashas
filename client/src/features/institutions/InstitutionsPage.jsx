import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  Users, 
  MapPin, 
  Search 
} from 'lucide-react';
import { MOCK_INSTITUTIONS } from '../../shared/mockData/yashasData';

export default function InstitutionsPage() {
  const [institutions] = useState(MOCK_INSTITUTIONS);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#00687a] font-bold text-xs tracking-wider uppercase mb-2">
              <Building2 className="w-5 h-5 text-[#00687a]" /> Academic & Corporate Nodes
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0b1c30] tracking-tight">
              Verified <span className="text-gradient">Institutions</span>
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl text-sm font-medium leading-relaxed">
              Explore colleges, incubation centers, and partner organizations verified to issue cryptographic credential seals.
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {institutions.map((inst) => (
          <div key={inst.id} className="glass-panel p-6 rounded-2xl border border-white/80 space-y-4">
            <div className="flex items-start gap-4">
              <img src={inst.logo} alt={inst.name} className="w-14 h-14 rounded-2xl object-cover border border-gray-200" />
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-[#00687a]/10 text-[#00687a] border border-[#00687a]/20">
                  {inst.type}
                </span>
                <h3 className="text-base font-extrabold text-[#0b1c30] mt-1 flex items-center gap-1.5">
                  {inst.name}
                  {inst.verified && <CheckCircle2 className="w-4 h-4 text-[#00687a]" />}
                </h3>
                <span className="text-xs font-semibold text-gray-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5" /> {inst.location}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              {inst.description}
            </p>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#3525cd]">
              <span className="text-gray-500 font-semibold flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> {inst.membersCount} Verified Members
              </span>
              <button className="hover:underline">View Institution Node →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

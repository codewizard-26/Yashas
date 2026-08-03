import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Award, 
  Download, 
  Mail, 
  UserPlus, 
  ShieldCheck, 
  TrendingUp, 
  Pin, 
  Cloud, 
  School, 
  Trophy, 
  Code2, 
  FileText, 
  Badge, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { 
  MOCK_STUDENT_PROFILE, 
  MOCK_PINNED_ACHIEVEMENTS, 
  MOCK_CO_CURRICULAR_TIMELINE, 
  MOCK_VERIFIED_SKILLS, 
  MOCK_DOCUMENTS 
} from '../../shared/mockData/yashasData';

export default function StudentPortfolio() {
  const [profile] = useState(MOCK_STUDENT_PROFILE);
  const [pinned] = useState(MOCK_PINNED_ACHIEVEMENTS);
  const [timeline] = useState(MOCK_CO_CURRICULAR_TIMELINE);
  const [skills] = useState(MOCK_VERIFIED_SKILLS);
  const [docs] = useState(MOCK_DOCUMENTS);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Profile Header Glass Panel (Stitch Design) */}
      <div className="glass-panel rounded-2xl overflow-hidden shadow-sm border border-white/60">
        {/* Cover Banner */}
        <div 
          className="w-full h-48 md:h-64 bg-cover bg-center relative"
          style={{ backgroundImage: `url('${profile.banner}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>

        <div className="px-6 md:px-8 pb-8 relative">
          {/* Avatar & Action Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end -mt-16 md:-mt-20 gap-4 mb-6">
            <div className="flex items-end gap-4">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden bg-white shadow-md z-10">
                <img 
                  src={profile.avatar} 
                  alt={profile.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2.5 w-full md:w-auto z-10">
              <button className="flex-1 md:flex-none px-5 py-2.5 bg-[#3525cd] text-white font-semibold text-xs rounded-xl shadow-sm hover:bg-[#3525cd]/90 transition-all flex items-center justify-center gap-2">
                <UserPlus className="w-4 h-4" /> Connect
              </button>
              <button className="flex-1 md:flex-none px-5 py-2.5 border border-[#00687a] text-[#00687a] font-semibold text-xs rounded-xl hover:bg-[#00687a]/5 transition-all flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" /> Message
              </button>
              <button className="flex-1 md:flex-none px-4 py-2.5 border border-gray-300 text-gray-700 font-semibold text-xs rounded-xl hover:bg-white/80 transition-all flex items-center justify-center gap-2">
                <Download className="w-4 h-4 text-gray-500" /> Export PDF
              </button>
            </div>
          </div>

          {/* Student Info */}
          <div className="mb-5">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#0b1c30] flex items-center gap-2 tracking-tight">
              {profile.name}
              <CheckCircle2 className="w-6 h-6 text-[#3525cd] fill-[#3525cd]/20" />
            </h1>
            <p className="text-sm md:text-base font-medium text-gray-600 mt-1 max-w-3xl leading-relaxed">
              {profile.headline}
            </p>
          </div>

          {/* Badges Row */}
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#3525cd]/10 text-[#3525cd] font-bold text-xs border border-[#3525cd]/20">
              <Award className="w-4 h-4" /> {profile.verifiedCount} Verified Credentials
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#00687a]/10 text-[#00687a] font-bold text-xs border border-[#00687a]/20">
              <TrendingUp className="w-4 h-4" /> {profile.percentile}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Split: 70% Left / 30% Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8/12 = 70%) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Pinned Verified Achievements */}
          <section className="glass-panel p-6 rounded-2xl border border-white/60">
            <h2 className="text-lg font-bold text-[#0b1c30] mb-5 flex items-center gap-2">
              <Pin className="w-5 h-5 text-[#3525cd]" /> Pinned Verified Achievements
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pinned.map((item) => (
                <div 
                  key={item.id}
                  className="p-4 rounded-xl bg-white/80 border border-gray-200/80 hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 bg-[#3525cd]/10 rounded-full flex items-center justify-center mb-3 text-[#3525cd]">
                      {item.icon === 'emoji_events' && <Trophy className="w-5 h-5" />}
                      {item.icon === 'cloud' && <Cloud className="w-5 h-5 text-[#00687a]" />}
                      {item.icon === 'school' && <School className="w-5 h-5 text-purple-600" />}
                    </div>

                    <h3 className="font-bold text-sm text-[#0b1c30] mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#3525cd]" /> Verified by {item.issuer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Co-Curricular & Activity Timeline */}
          <section className="glass-panel p-6 rounded-2xl border border-white/60">
            <h2 className="text-lg font-bold text-[#0b1c30] mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#3525cd]" /> Co-Curricular & Activity Timeline
            </h2>

            <div className="relative border-l-2 border-indigo-100 ml-4 space-y-6 pb-2">
              {timeline.map((item, idx) => (
                <div key={idx} className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#3525cd] ring-4 ring-white"></div>
                  <h3 className="font-bold text-sm text-[#0b1c30]">{item.role}</h3>
                  <p className="text-xs font-semibold text-gray-400 mb-1">{item.period}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column (4/12 = 30%) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Verified Skills */}
          <section className="glass-panel p-6 rounded-2xl border border-white/60">
            <h2 className="text-lg font-bold text-[#0b1c30] mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[#3525cd]" /> Verified Skills
            </h2>

            <ul className="space-y-2.5">
              {skills.map((skill, idx) => (
                <li key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white/60 border border-gray-100">
                  <span className="text-xs font-bold text-[#0b1c30]">{skill.name}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#3525cd]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Academic Documents Vault */}
          <section className="glass-panel p-6 rounded-2xl border border-white/60">
            <h2 className="text-lg font-bold text-[#0b1c30] mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#3525cd]" /> Documents
            </h2>

            <div className="space-y-2.5">
              {docs.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-gray-200/70 rounded-xl bg-white/70">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-xs font-bold text-[#0b1c30]">{doc.name}</span>
                  </div>
                  <button className="text-xs font-bold text-[#3525cd] hover:underline">View</button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

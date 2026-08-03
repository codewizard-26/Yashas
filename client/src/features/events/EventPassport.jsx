import React, { useState } from 'react';
import { 
  Trophy, 
  Users, 
  Calendar, 
  ChevronRight, 
  UserPlus, 
  Layers, 
  Target, 
  MessageSquare,
  Check
} from 'lucide-react';
import { MOCK_EVENTS_PASSPORT } from '../../shared/mockData/yashasData';

export default function EventPassport() {
  const [events] = useState(MOCK_EVENTS_PASSPORT);
  const [selectedEvent, setSelectedEvent] = useState(MOCK_EVENTS_PASSPORT[0]);
  const [showTeamFinder, setShowTeamFinder] = useState(false);

  const peerCandidates = [
    { name: "Devansh Rao", role: "UI/UX Designer & Figma Pro", skillMatch: "98% Match", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120" },
    { name: "Sanya Malhotra", role: "Backend & Cloud Engineer", skillMatch: "94% Match", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120" },
    { name: "Rishabh Verma", role: "AI & PyTorch Specialist", skillMatch: "91% Match", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=120" }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Header - Light Stitch Design */}
      <div className="glass-panel p-6 md:p-8 rounded-2xl relative overflow-hidden border border-white/80">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#3525cd] font-bold text-xs tracking-wider uppercase mb-2">
              <Trophy className="w-5 h-5 text-[#3525cd]" /> Co-Curricular & Hackathon Passport
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0b1c30] tracking-tight">
              Event <span className="text-gradient">Multi-Stage Tracker</span>
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl text-sm leading-relaxed">
              Consolidated stage progression, team collaboration spaces, live hackathon timelines, and gamified achievement badges.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowTeamFinder(true)}
              className="flex items-center gap-2 bg-[#3525cd] hover:bg-[#3525cd]/90 text-white font-bold px-5 py-3 rounded-xl shadow-md shadow-[#3525cd]/20 transition-all active:scale-[0.98]"
            >
              <UserPlus className="w-4 h-4" /> Find Teammates
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Multi-stage Progress */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/80 space-y-6">
            
            {/* Event Header Card */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-gray-200/80">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-[#3525cd]/10 text-[#3525cd] border border-[#3525cd]/20">
                    {selectedEvent.category}
                  </span>
                  <span className="text-xs font-semibold text-gray-500">{selectedEvent.organizer}</span>
                </div>
                <h2 className="text-2xl font-extrabold text-[#0b1c30] mt-1">{selectedEvent.title}</h2>
                <div className="flex items-center gap-4 text-xs text-gray-600 mt-2 font-medium">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#3525cd]" /> {selectedEvent.date}</span>
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-[#00687a]" /> Team: <strong className="text-[#0b1c30]">{selectedEvent.teamName}</strong></span>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-3 py-1.5 rounded-xl text-xs font-extrabold bg-amber-500/10 text-amber-800 border border-amber-500/20">
                  {selectedEvent.badge}
                </span>
                <div className="text-xs text-gray-500 mt-1 font-semibold">{selectedEvent.position}</div>
              </div>
            </div>

            {/* Stage Timeline */}
            <div>
              <h3 className="text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-6 flex items-center gap-2">
                <Target className="w-4 h-4 text-[#3525cd]" /> Live Stage Timeline Tracker
              </h3>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gray-200">
                {selectedEvent.stages.map((stage, idx) => {
                  const isDone = stage.status === 'COMPLETED';
                  const isInProgress = stage.status === 'IN_PROGRESS';

                  return (
                    <div key={idx} className="relative flex items-start gap-4">
                      {/* Dot */}
                      <div className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isDone 
                          ? 'bg-[#00687a] text-white shadow-md' 
                          : isInProgress 
                          ? 'bg-amber-500 text-white shadow-md animate-pulse'
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
                      </div>

                      {/* Card */}
                      <div className={`flex-1 p-4 rounded-xl border transition-all ${
                        isInProgress
                          ? 'bg-amber-500/10 border-amber-500/30 shadow-sm'
                          : isDone
                          ? 'bg-white/80 border-gray-200/80'
                          : 'bg-white/40 border-gray-200/40 opacity-70'
                      }`}>
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-[#0b1c30] flex items-center gap-2">
                            {stage.name}
                            {isInProgress && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-800 border border-amber-500/40">
                                CURRENT ROUND
                              </span>
                            )}
                          </h4>
                          <span className="text-xs text-gray-500 font-semibold">{stage.date}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submission Detail Box */}
            <div className="bg-white/80 p-5 rounded-xl border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-500 font-bold block mb-1">Submitted Project</span>
                <span className="text-[#0b1c30] font-bold text-sm">{selectedEvent.projectSubmitted}</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selectedEvent.skills.map((sk, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[#3525cd]/5 text-[#3525cd] font-bold border border-[#3525cd]/15">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-gray-500 font-bold block mb-1">Team Roster</span>
                <div className="space-y-1">
                  {selectedEvent.members.map((m, i) => (
                    <div key={i} className="text-gray-700 font-semibold flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#3525cd]"></div> {m}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Passport List */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/80">
            <h3 className="text-base font-bold text-[#0b1c30] mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#3525cd]" /> My Hackathon Passport
            </h3>

            <div className="space-y-3">
              {events.map((evt) => {
                const isSelected = selectedEvent.id === evt.id;
                return (
                  <div
                    key={evt.id}
                    onClick={() => setSelectedEvent(evt)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-[#3525cd]/10 border-[#3525cd]/40 shadow-sm' 
                        : 'bg-white/80 border-gray-200/80 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase text-[#3525cd] tracking-wider">
                        {evt.category}
                      </span>
                      <span className="text-xs font-semibold text-gray-400">{evt.date.split(',')[0]}</span>
                    </div>

                    <h4 className="text-sm font-bold text-[#0b1c30] mt-1">{evt.title}</h4>

                    <div className="flex items-center justify-between mt-3 text-xs">
                      <span className="text-amber-700 font-bold">{evt.badge}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-[#3525cd] translate-x-1' : 'text-gray-400'}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-amber-500/30 bg-amber-500/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-800">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-[#0b1c30]">Leaderboard Standings</h4>
                <span className="text-xs text-amber-800 font-bold">Rank #4 Campus Innovator</span>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              Earned 2,450 YashasXP points from verified hackathons, coding contests, and peer endorsements.
            </p>
          </div>
        </div>
      </div>

      {/* TEAMMATE MATCHMAKER MODAL */}
      {showTeamFinder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1c30]/50 backdrop-blur-md">
          <div className="bg-white max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#3525cd]" />
                <h3 className="text-lg font-extrabold text-[#0b1c30]">Teammate Matchmaker</h3>
              </div>
              <button onClick={() => setShowTeamFinder(false)} className="text-gray-400 hover:text-gray-700">
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-gray-600 font-medium">
                Find verified campus peers with complementary skills for <strong className="text-[#0b1c30]">{selectedEvent.title}</strong>.
              </p>

              <div className="space-y-3">
                {peerCandidates.map((peer, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#f8f9ff] border border-gray-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={peer.avatar} alt={peer.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                      <div>
                        <h4 className="text-sm font-bold text-[#0b1c30]">{peer.name}</h4>
                        <span className="text-xs text-[#3525cd] font-semibold block">{peer.role}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#00687a]/10 text-[#00687a] border border-[#00687a]/20">
                        {peer.skillMatch}
                      </span>
                      <button className="mt-1.5 text-xs font-bold text-[#3525cd] hover:underline flex items-center gap-1 justify-end">
                        <MessageSquare className="w-3 h-3" /> Invite
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

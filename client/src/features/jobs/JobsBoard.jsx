import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Building2, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Bookmark, 
  ChevronRight,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { MOCK_JOBS } from '../../shared/mockData/yashasData';

export default function JobsBoard() {
  const [jobs] = useState(MOCK_JOBS);
  const [selectedJob, setSelectedJob] = useState(jobs[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredJobs = jobs.filter(j => {
    const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter = activeFilter === 'ALL' ? true : j.type === activeFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#3525cd] font-bold text-xs tracking-wider uppercase mb-2">
              <Briefcase className="w-5 h-5 text-[#3525cd]" /> Verified Campus Placement & Career Portal
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0b1c30] tracking-tight">
              Jobs & <span className="text-gradient">Internships</span>
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl text-sm font-medium leading-relaxed">
              Discover opportunities matching your verified academic credentials, skills, and hackathon accomplishments.
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search job title, company, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/90 border border-gray-200 text-[#0b1c30] rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium focus:outline-none focus:border-[#3525cd]"
          />
        </div>

        <div className="flex items-center gap-2">
          {['ALL', 'FULL_TIME', 'INTERNSHIP'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeFilter === f
                  ? 'bg-[#3525cd] text-white shadow-md'
                  : 'bg-white/80 text-gray-600 border border-gray-200 hover:bg-white'
              }`}
            >
              {f === 'ALL' ? 'All Roles' : f === 'FULL_TIME' ? 'Full Time' : 'Internships'}
            </button>
          ))}
        </div>
      </div>

      {/* Job List & Detail Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Job Cards List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {filteredJobs.map((job) => {
            const isSelected = selectedJob?.id === job.id;

            return (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={`glass-panel p-5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected 
                    ? 'border-[#3525cd] bg-[#3525cd]/5 shadow-md' 
                    : 'border-white/80 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={job.logo} alt={job.company} className="w-10 h-10 rounded-xl object-cover border border-gray-200" />
                    <div>
                      <h3 className="text-sm font-bold text-[#0b1c30]">{job.title}</h3>
                      <span className="text-xs font-bold text-gray-500">{job.company}</span>
                    </div>
                  </div>
                  <Bookmark className="w-4 h-4 text-gray-400 hover:text-[#3525cd]" />
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold text-gray-600">
                  <span className="flex items-center gap-1 bg-white/80 px-2.5 py-1 rounded-md border border-gray-200">
                    <MapPin className="w-3 h-3 text-[#3525cd]" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1 bg-white/80 px-2.5 py-1 rounded-md border border-gray-200 text-[#00687a]">
                    <DollarSign className="w-3 h-3" /> {job.salary}
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-gray-400">
                  <span>Deadline: {job.deadline}</span>
                  <span className="text-[#3525cd] font-bold flex items-center gap-0.5">
                    View Details <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Job Detail Panel (7 cols) */}
        {selectedJob && (
          <div className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-2xl border border-white/80 space-y-6">
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <img src={selectedJob.logo} alt={selectedJob.company} className="w-14 h-14 rounded-2xl object-cover border border-gray-200" />
                <div>
                  <h2 className="text-xl font-extrabold text-[#0b1c30]">{selectedJob.title}</h2>
                  <span className="text-sm font-bold text-[#3525cd]">{selectedJob.company}</span>
                  <div className="flex items-center gap-3 text-xs font-semibold text-gray-500 mt-1">
                    <span>{selectedJob.location}</span>
                    <span>•</span>
                    <span>{selectedJob.experience}</span>
                  </div>
                </div>
              </div>

              <button className="px-6 py-3 bg-[#3525cd] hover:bg-[#3525cd]/90 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-[0.98]">
                Apply Now
              </button>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Job Description</h4>
              <p className="text-xs md:text-sm text-gray-700 font-medium leading-relaxed">
                {selectedJob.description}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Required Skills & Match Score</h4>
              <div className="flex flex-wrap gap-2">
                {selectedJob.skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-[#3525cd]/10 text-[#3525cd] text-xs font-bold rounded-lg border border-[#3525cd]/20">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#f8f9ff] p-4 rounded-xl border border-gray-200 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#00687a] shrink-0" />
              <p className="text-xs text-gray-600 font-semibold">
                Your profile matches 3 out of 4 required verified credentials for this role.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

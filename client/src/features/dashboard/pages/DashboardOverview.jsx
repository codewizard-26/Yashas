import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Award, 
  Briefcase, 
  ArrowUpRight, 
  CheckCircle2, 
  Heart, 
  MessageSquare, 
  Share2, 
  Sparkles,
  Calendar,
  ChevronRight,
  PlusCircle
} from 'lucide-react';
import { 
  MOCK_STUDENT_PROFILE, 
  MOCK_DASHBOARD_STATS, 
  MOCK_FEED_POSTS,
  MOCK_EVENTS_PASSPORT,
  MOCK_CONNECTIONS 
} from '../../../shared/mockData/yashasData';

export default function DashboardOverview() {
  const profile = MOCK_STUDENT_PROFILE;
  const stats = MOCK_DASHBOARD_STATS;
  const posts = MOCK_FEED_POSTS;
  const events = MOCK_EVENTS_PASSPORT;
  const suggestions = MOCK_CONNECTIONS;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="glass-panel p-6 md:p-8 rounded-2xl relative overflow-hidden border border-white/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3525cd]/10 text-[#3525cd] font-bold text-xs border border-[#3525cd]/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Welcome Back
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#0b1c30] tracking-tight">
              Good morning, {profile.name.split(' ')[0]} 👋
            </h1>
            <p className="text-xs md:text-sm font-medium text-gray-600 mt-1 max-w-xl">
              Your profile is <strong className="text-[#3525cd]">{profile.completionScore}% complete</strong> with {profile.verifiedCount} verified institutional seals.
            </p>
          </div>

          {/* Profile Completion Bar */}
          <div className="w-full md:w-64 bg-white/90 p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center text-xs font-bold text-[#0b1c30] mb-2">
              <span>Profile Rank</span>
              <span className="text-[#3525cd]">{profile.percentile}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#3525cd] to-[#00687a] rounded-full"
                style={{ width: `${profile.completionScore}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-panel p-5 rounded-2xl border border-white/80 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-gray-500 uppercase">{stat.label}</span>
              <span className="p-2 rounded-xl bg-[#3525cd]/10 text-[#3525cd]">
                {idx === 0 && <TrendingUp className="w-4 h-4" />}
                {idx === 1 && <Users className="w-4 h-4" />}
                {idx === 2 && <Award className="w-4 h-4" />}
                {idx === 3 && <Briefcase className="w-4 h-4" />}
              </span>
            </div>

            <div className="mt-4">
              <div className="text-2xl font-extrabold text-[#0b1c30]">{stat.value}</div>
              <span className="text-[11px] font-bold text-[#00687a] mt-1 inline-block">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Layout: Feed (70%) + Right Sidebar (30%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Feed */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Post Composer Card */}
          <div className="glass-panel p-5 rounded-2xl border border-white/80">
            <div className="flex items-center gap-3">
              <img src={profile.avatar} alt={profile.name} className="w-10 h-10 rounded-full object-cover border border-[#3525cd]/30" />
              <input 
                type="text" 
                placeholder="Share a milestone, certificate, or project update..."
                className="flex-1 bg-white/90 border border-gray-200 text-[#0b1c30] rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-[#3525cd]"
              />
              <button className="bg-[#3525cd] text-white p-2.5 rounded-xl hover:bg-[#3525cd]/90 transition-colors">
                <PlusCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Activity Feed Posts */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="glass-panel p-6 rounded-2xl border border-white/80 space-y-4">
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                  <div>
                    <h3 className="text-sm font-bold text-[#0b1c30] flex items-center gap-1.5">
                      {post.author.name}
                      {post.author.verified && <CheckCircle2 className="w-4 h-4 text-[#3525cd]" />}
                    </h3>
                    <p className="text-[11px] font-semibold text-gray-500">{post.author.role} • {post.author.time}</p>
                  </div>
                </div>

                {/* Content */}
                <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-medium">
                  {post.content}
                </p>

                {post.image && (
                  <div className="rounded-xl overflow-hidden border border-gray-200 max-h-72">
                    <img src={post.image} alt="Post Attachment" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center gap-6 pt-3 border-t border-gray-100 text-xs font-bold text-gray-500">
                  <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" /> {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-[#3525cd] transition-colors">
                    <MessageSquare className="w-4 h-4" /> {post.comments}
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-[#00687a] transition-colors">
                    <Share2 className="w-4 h-4" /> {post.shares}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Upcoming Hackathons / Events */}
          <div className="glass-panel p-6 rounded-2xl border border-white/80">
            <h3 className="text-sm font-extrabold text-[#0b1c30] mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#3525cd]" /> Upcoming Hackathons
            </h3>

            <div className="space-y-3">
              {events.slice(0, 2).map((evt) => (
                <div key={evt.id} className="p-3.5 rounded-xl bg-white/80 border border-gray-200/80">
                  <span className="text-[10px] font-extrabold uppercase text-[#3525cd]">{evt.category}</span>
                  <h4 className="text-xs font-bold text-[#0b1c30] mt-0.5">{evt.title}</h4>
                  <span className="text-[11px] font-semibold text-gray-500 block mt-1">{evt.date.split(',')[0]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* People You May Know */}
          <div className="glass-panel p-6 rounded-2xl border border-white/80">
            <h3 className="text-sm font-extrabold text-[#0b1c30] mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#3525cd]" /> People You May Know
            </h3>

            <div className="space-y-3">
              {suggestions.map((conn) => (
                <div key={conn.id} className="flex items-center justify-between p-3 rounded-xl bg-white/80 border border-gray-200/80">
                  <div className="flex items-center gap-2.5">
                    <img src={conn.avatar} alt={conn.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-[#0b1c30]">{conn.name}</h4>
                      <span className="text-[10px] text-gray-500 font-semibold">{conn.mutual} mutuals</span>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-[#3525cd] text-white text-[11px] font-bold rounded-lg hover:bg-[#3525cd]/90">
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

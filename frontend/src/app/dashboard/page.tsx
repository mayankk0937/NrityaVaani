'use client';

import React from 'react';
import DashboardStats from '@/components/dashboard/DashboardStats';
import { History, Bookmark, Calendar, Settings, Trophy, ChevronRight, ArrowLeft } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { StatsService, PracticeSession } from '@/lib/services/StatsService';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [recentSessions, setRecentSessions] = React.useState<PracticeSession[]>([]);
  const [allSessions, setAllSessions] = React.useState<PracticeSession[]>([]);
  const [activeTab, setActiveTab] = React.useState<'Overview' | 'History' | 'Saved' | 'Settings'>('Overview');
  const [showAccountDetails, setShowAccountDetails] = React.useState(false);

  React.useEffect(() => {
    const sessions = StatsService.getSessions();
    setAllSessions(sessions);
    setRecentSessions(sessions.slice(0, 5));
  }, []);

  const firstName = session?.user?.name?.split(' ')[0] || 'Dancer';

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen relative overflow-hidden">
      <div className="bg-blob blob-gold top-0 -right-40" />
      
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <header className="flex flex-col md:row md:items-end justify-between space-y-6 md:space-y-0">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tighter italic">Welcome Back, <span className="text-primary not-italic">{firstName}</span></h1>
            <p className="text-white/40 font-medium">
              {recentSessions.length > 0 
                ? `You've completed ${recentSessions.length} sessions recently. Keep the momentum!` 
                : "Ready to start your classical dance journey?"}
            </p>
          </div>
          
          <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10">
            <TabLink 
              icon={<Calendar className="w-4 h-4" />} 
              label="Overview" 
              active={activeTab === 'Overview'} 
              onClick={() => { setActiveTab('Overview'); setShowAccountDetails(false); }} 
            />
            <TabLink 
              icon={<History className="w-4 h-4" />} 
              label="History" 
              active={activeTab === 'History'} 
              onClick={() => { setActiveTab('History'); setShowAccountDetails(false); }}
            />
            <TabLink 
              icon={<Bookmark className="w-4 h-4" />} 
              label="Saved" 
              active={activeTab === 'Saved'} 
              onClick={() => { setActiveTab('Saved'); setShowAccountDetails(false); }}
            />
            <TabLink 
              icon={<Settings className="w-4 h-4" />} 
              label="Settings" 
              active={activeTab === 'Settings'} 
              onClick={() => setActiveTab('Settings')}
            />
          </div>
        </header>

        {activeTab === 'Overview' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
            <DashboardStats />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <RecentActivity sessions={recentSessions} />
              <Suggestions />
            </div>
          </motion.div>
        )}

        {activeTab === 'History' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-10 border-white/5 bg-white/[0.01]">
            <h3 className="text-3xl font-black mb-10 italic">Complete Practice History</h3>
            <div className="space-y-4">
              {allSessions.length > 0 ? (
                allSessions.map((s) => <ActivityItem key={s.id} session={s} />)
              ) : (
                <EmptyState icon={<History className="w-12 h-12" />} text="No sessions recorded yet." />
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'Saved' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-10 border-white/5">
             <h3 className="text-3xl font-black mb-10 italic">Mastered Mudras</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allSessions.filter(s => s.accuracy >= 90).length > 0 ? (
                  allSessions.filter(s => s.accuracy >= 90).map(s => (
                    <div key={s.id} className="p-6 bg-primary/5 border border-primary/20 rounded-2xl flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                         <Trophy className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-black text-lg">{s.mudraName}</h4>
                        <p className="text-[10px] uppercase font-black text-primary/60 italic tracking-widest">Mastered at {s.accuracy}%</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center bg-white/[0.02] rounded-3xl border-2 border-dashed border-white/5">
                     <Bookmark className="w-12 h-12 text-white/5 mx-auto mb-4" />
                     <p className="text-white/30 italic">Get 90%+ accuracy in any mudra to save it here.</p>
                  </div>
                )}
             </div>
          </motion.div>
        )}

        {activeTab === 'Settings' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto glass-card p-10 border-white/5">
             {!showAccountDetails ? (
               <div className="flex flex-col items-center space-y-8">
                  <h3 className="text-3xl font-black italic text-center">Settings</h3>
                  <div className="w-24 h-24 rounded-full border-4 border-primary/20 p-1 relative">
                     <img src={session?.user?.image || ''} className="w-full h-full rounded-full object-cover" alt="Profile" />
                  </div>
                  <div className="text-center">
                     <h4 className="text-2xl font-black">{session?.user?.name}</h4>
                     <p className="text-white/40">{session?.user?.email}</p>
                  </div>
                  
                  <div className="w-full pt-8 border-t border-white/5 flex flex-col space-y-4">
                     <button 
                       onClick={() => setShowAccountDetails(true)}
                       className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold text-sm text-left flex items-center justify-between group"
                     >
                       <span>Account Details</span>
                       <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-primary transition-all" />
                     </button>
                     <button 
                       onClick={() => {
                          if(confirm('Are you sure? This will delete all your local practice history.')) {
                             StatsService.clearAll();
                             window.location.reload();
                        }
                     }}
                     className="w-full p-4 rounded-xl bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 transition-all font-bold text-sm text-red-400 text-left"
                   >
                     Reset All Practice Data
                   </button>
                </div>
             </div>
             ) : (
               <div className="space-y-10">
                  <header className="flex items-center space-x-6">
                    <button 
                      onClick={() => setShowAccountDetails(false)}
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <h3 className="text-3xl font-black italic">Account Details</h3>
                  </header>

                  <div className="space-y-6">
                    <DetailItem label="Full Name" value={session?.user?.name || 'Not Available'} />
                    <DetailItem label="Email Address" value={session?.user?.email || 'Not Available'} />
                    <DetailItem label="Auth Provider" value="Google OAuth" />
                    <DetailItem label="Account Status" value="Active (Student)" />
                  </div>
               </div>
             )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="p-5 bg-white/[0.03] rounded-2xl border border-white/5 flex justify-between items-center group">
       <span className="text-xs font-black uppercase tracking-widest text-white/40">{label}</span>
       <span className="text-lg font-bold group-hover:text-primary transition-colors">{value}</span>
    </div>
  );
}

function RecentActivity({ sessions }: { sessions: PracticeSession[] }) {
  return (
    <div className="lg:col-span-2 glass-card p-8 border-white/10 bg-white/[0.01]">
      <h3 className="text-xl font-black mb-8 flex items-center justify-between italic tracking-tight">
        <span>Recent Activity</span>
      </h3>
      <div className="space-y-4">
        {sessions.length > 0 ? (
          sessions.map((s) => <ActivityItem key={s.id} session={s} />)
        ) : (
          <EmptyState icon={<History className="w-12 h-12" />} text="No recent activity detected." />
        )}
      </div>
    </div>
  );
}

function ActivityItem({ session }: { session: PracticeSession }) {
  return (
    <div className="flex items-center justify-between p-5 bg-white/[0.03] rounded-2xl border border-white/5 hover:bg-white/5 hover:border-primary/20 transition-all cursor-pointer group">
      <div className="flex items-center space-x-5">
        <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
          <span className="text-xl font-black uppercase">{session.mudraName[0]}</span>
        </div>
        <div>
          <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{session.mudraName}</h4>
          <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black">
            {formatDistanceToNow(session.timestamp)} ago • {Math.floor(session.duration)}s session
          </p>
        </div>
      </div>
      <div className="text-right">
        <span className="text-2xl font-black text-white">{session.accuracy}%</span>
        <p className="text-[10px] text-primary font-black uppercase tracking-widest">Accuracy</p>
      </div>
    </div>
  );
}

function EmptyState({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="py-12 text-center">
       <div className="text-white/5 mx-auto mb-4">{icon}</div>
       <p className="text-white/30 text-sm italic font-medium">{text}</p>
    </div>
  );
}

function Suggestions() {
  return (
    <div className="glass-card p-6 border-accent-gold/20">
      <h3 className="text-lg font-bold mb-6 italic">Suggested for You</h3>
      <div className="space-y-6">
        <SuggestionItem title="Master the Mayura" desc="You're close to 90% accuracy. Almost there!" tag="Goal" />
        <SuggestionItem title="Daily Warmup" desc="Start your session with 5 minutes of basic Pataka." tag="Routine" />
        <SuggestionItem title="Learn Kartarimukha" desc="New mudra unlocked! Try the intro lesson." tag="New Skill" />
      </div>
    </div>
  );
}

function TabLink({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center space-x-2 px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all",
        active ? 'bg-primary text-black' : 'text-white/30 hover:text-white hover:bg-white/5'
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function SuggestionItem({ title, desc, tag }: { title: string, desc: string, tag: string }) {
  return (
    <div className="p-4 bg-accent-gold/5 rounded-xl border border-accent-gold/10 group cursor-pointer hover:bg-accent-gold/10 transition-all">
      <span className="text-[10px] font-bold text-accent-gold uppercase tracking-tighter bg-accent-gold/20 px-2 py-0.5 rounded-full mb-2 inline-block">
        {tag}
      </span>
      <h4 className="font-bold text-white group-hover:text-accent-gold transition-colors">{title}</h4>
      <p className="text-xs text-white/40 mt-1 leading-relaxed">{desc}</p>
    </div>
  );
}

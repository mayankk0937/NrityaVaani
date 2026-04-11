'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Sparkles, BookOpen, AlertCircle, 
  Info, Play, Target, CheckCircle2,
  ChevronRight, Bookmark
} from 'lucide-react';
import Link from 'next/link';
import { MUDRAS } from '@/lib/constants/mudras';
import { cn } from '@/lib/utils';
import TiltCard from '@/components/shared/TiltCard';

export default function MudraDetailPage() {
  const params = useParams();
  const router = useRouter();
  const mudraSlug = params.slug as string;
  const mudra = MUDRAS.find(m => m.slug === mudraSlug);

  if (!mudra) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
        <div className="text-center">
          <h1 className="text-2xl font-black mb-4 italic">Mudra Not Found</h1>
          <button onClick={() => router.back()} className="text-primary hover:underline font-bold flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 min-h-screen bg-[#050505] text-white px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="bg-blob blob-violet -top-40 -left-20 opacity-20" />
      <div className="bg-blob blob-saffron -bottom-40 -right-20 opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-4 mb-12">
           <button 
             onClick={() => router.back()}
             className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all group"
           >
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
           </button>
           <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-white/40">
             <Link href="/library" className="hover:text-primary transition-colors">Library</Link>
             <ChevronRight className="w-3 h-3" />
             <span className="text-white/60">{mudra.name}</span>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* LEFT: MASTER REFERENCE IMAGE */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <TiltCard className="aspect-[4/5] relative rounded-3xl overflow-hidden glass-card border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60" />
                <img 
                  src={mudra.image} 
                  alt={mudra.name} 
                  className="w-full h-full object-cover"
                />
                
                {/* Image Labels */}
                <div className="absolute bottom-8 left-8 z-20">
                   <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-[9px] font-black uppercase tracking-widest text-primary mb-3">
                      <Target className="w-3 h-3" />
                      <span>Reference Perspective</span>
                   </div>
                   <h2 className="text-4xl font-black tracking-tighter">{mudra.name}</h2>
                </div>
              </TiltCard>
            </motion.div>
          </div>

          {/* RIGHT: TECHNICAL BREAKDOWN */}
          <div className="lg:col-span-6 space-y-10">
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/40">{mudra.category}</span>
                  <div className={cn(
                    "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                    mudra.difficulty === 'Beginner' ? "bg-green-500/10 text-green-400 border-green-500/20" :
                    mudra.difficulty === 'Intermediate' ? "bg-primary/10 text-primary border-primary/20" :
                    "bg-red-500/10 text-red-400 border-red-500/20"
                  )}>
                    {mudra.difficulty} Level
                  </div>
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 italic">
                  {mudra.name} <span className="text-primary not-italic">/{mudra.meaning}/</span>
                </h1>
                <p className="text-white/50 text-xl font-medium leading-relaxed italic">
                  "{mudra.meaningLong}"
                </p>
              </motion.div>
            </div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
               className="space-y-6"
            >
              <div className="glass-card p-8 border-white/5 space-y-6">
                <div className="flex items-center space-x-3 text-primary">
                  <BookOpen className="w-5 h-5" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em]">Technical Instructions</h3>
                </div>
                <div className="space-y-4">
                  {mudra.instructions.split('. ').map((step, i) => (
                    <div key={i} className="flex items-start space-x-4 group">
                       <span className="w-6 h-6 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black group-hover:bg-primary group-hover:text-black transition-all">
                          {i + 1}
                       </span>
                       <p className="text-white/70 text-sm leading-relaxed pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-8 border-red-500/10 bg-red-500/[0.02] space-y-4">
                 <div className="flex items-center space-x-3 text-red-400">
                    <AlertCircle className="w-5 h-5" />
                    <h3 className="text-xs font-black uppercase tracking-[0.2em]">Common Mistakes</h3>
                 </div>
                 <p className="text-white/60 text-sm leading-relaxed">
                   {mudra.commonMistakes}
                 </p>
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6 }}
               className="pt-6 flex flex-col sm:row items-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Link href={`/practice/${mudra.slug}`} className="premium-button w-full sm:w-auto px-10 py-5 flex items-center justify-center space-x-3 group">
                 <Play className="w-5 h-5 fill-current" />
                 <span className="text-sm">Start Practice Session</span>
              </Link>
              
              <button className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-black uppercase tracking-widest flex items-center justify-center space-x-2 group">
                 <Bookmark className="w-4 h-4 group-hover:text-primary transition-colors" />
                 <span>Save to Favorites</span>
              </button>
            </motion.div>

          </div>

        </div>

        {/* USAGE SECTION (VINIYOGA) */}
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="mt-32 pt-32 border-t border-white/5"
        >
           <div className="flex items-center space-x-4 mb-12">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                 <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                 <h2 className="text-3xl font-black italic">Classical Significance</h2>
                 <p className="text-white/40 text-sm font-medium">Standard usages (Viniyogas) according to Abhinaya Darpana</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mudra.significance.split(', ').map((usage, index) => (
                <div key={index} className="glass-card p-6 border-white/5 hover:border-primary/20 transition-all group">
                   <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-primary group-hover:bg-primary/10 transition-all">
                         <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="text-xl font-medium group-hover:translate-x-1 transition-transform">{usage}</span>
                   </div>
                </div>
              ))}
           </div>
        </motion.div>

      </div>
    </div>
  );
}

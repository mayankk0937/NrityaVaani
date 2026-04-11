'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import TiltCard from '@/components/shared/TiltCard';

interface MudraCardProps {
  mudra: any;
}

export default function MudraCard({ mudra }: MudraCardProps) {
  return (
    <TiltCard className="h-full">
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="group relative glass-card p-5 h-full hover:bg-white/[0.05] transition-all duration-500 border-white/5 flex flex-col"
      >
        {/* Glow Effect behind image */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="aspect-square relative rounded-2xl overflow-hidden mb-6 bg-black/40 border border-white/5">
          <img 
            src={mudra.image} 
            alt={mudra.name} 
            className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
          />
          
          {/* Difficulty Badge */}
          <div className="absolute top-4 right-4 z-10">
            <span className={cn(
               "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.15em] backdrop-blur-xl border shadow-lg",
               mudra.difficulty === 'Beginner' ? "bg-green-500/10 text-green-400 border-green-500/20" :
               mudra.difficulty === 'Intermediate' ? "bg-primary/10 text-primary border-primary/20" :
               "bg-red-500/10 text-red-400 border-red-500/20"
            )}>
              {mudra.difficulty}
            </span>
          </div>

          {/* Practice Overlay Button */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
             <Link 
               href={`/practice/${mudra.slug}`}
               className="bg-white text-black px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl"
             >
               Practice Now
             </Link>
          </div>
        </div>

        <div className="space-y-4 flex-1 flex flex-col">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-1">{mudra.category}</p>
              <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-primary transition-colors">{mudra.name}</h3>
            </div>
            <Link href={`/library/${mudra.slug}`}>
              <div className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary transition-all border border-white/5 flex items-center space-x-2 px-3">
                <span className="text-[9px] font-black uppercase tracking-widest hidden sm:inline">Details</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
          
          <p className="text-white/40 text-xs leading-relaxed line-clamp-2">
            {mudra.meaningLong}
          </p>
          
          <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
            <div className="flex items-center space-x-2 text-[10px] text-white/30 uppercase font-black tracking-widest">
              <Layers className="w-3 h-3 text-primary/40" />
              <span>{mudra.meaning}</span>
            </div>
            
            <div className="flex items-center space-x-3">
               <Link 
                href={`/practice/${mudra.slug}`}
                className="text-[10px] font-black uppercase text-primary hover:text-white transition-colors bg-primary/10 hover:bg-primary px-3 py-1.5 rounded-lg border border-primary/20"
               >
                 Practice
               </Link>
               <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
            </div>
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
}

'use client';

import React, { useState } from 'react';
import { MUDRAS } from '@/lib/constants/mudras';
import MudraCard from '@/components/library/MudraCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(MUDRAS.map(m => m.category)))];

  const filteredMudras = MUDRAS.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.meaning.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'All' || m.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-32 pb-32 px-6 min-h-screen relative overflow-hidden bg-[#050505]">
      {/* Background Orbs */}
      <div className="bg-blob blob-violet -top-40 -left-20 opacity-20" />
      <div className="bg-blob blob-saffron -bottom-40 -right-20 opacity-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HERO SECTION */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-primary mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>Comprehensive Knowledge Base</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter italic">
              Explore the <span className="text-primary not-italic">Library</span>
            </h1>
            <p className="text-white/40 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
              A curated collection of classical Bharatanatyam mudras. Master the hand gestures that tell stories through movement.
            </p>
          </motion.div>
        </div>

        {/* FILTER BAR (GLASSMORHPIC) */}
        <div className="sticky top-28 z-40 mb-16 px-4">
          <div className="glass-card p-2 md:p-3 border-white/10 flex flex-col lg:row lg:items-center justify-between gap-4 shadow-2xl backdrop-blur-3xl">
            
            {/* Search Input */}
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
              <input 
                type="text"
                placeholder="Search by name or meaning..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:bg-white/[0.08] transition-all"
              />
            </div>

            <div className="h-8 w-[1px] bg-white/10 hidden lg:block" />

            {/* Category Tabs */}
            <div className="flex items-center space-x-1 bg-black/40 p-1 rounded-xl border border-white/5 overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                    selectedCategory === cat ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-white/40 hover:text-white'
                  }`}
                >
                  {cat === 'All' ? 'All Hand Types' : cat}
                </button>
              ))}
            </div>

            <div className="h-8 w-[1px] bg-white/10 hidden lg:block" />

            {/* Difficulty Filter */}
            <div className="flex items-center space-x-1 bg-black/40 p-1 rounded-xl border border-white/5">
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedDifficulty(level)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                    selectedDifficulty === level ? 'bg-primary/20 text-primary border border-primary/20' : 'text-white/40 hover:text-white border border-transparent'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MUDRA GRID */}
        {filteredMudras.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {filteredMudras.map((mudra) => (
              <motion.div key={mudra.id} variants={itemVariants}>
                <MudraCard mudra={mudra} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="py-40 text-center glass-card border-dashed border-white/10 max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 scale-110">
              <Search className="w-8 h-8 text-primary/40 animate-pulse" />
            </div>
            <h3 className="text-2xl font-black mb-3 italic">Mudra not found</h3>
            <p className="text-white/30 text-lg">Your search didn't return any matches in our classical database.</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedDifficulty('All'); setSelectedCategory('All');}}
              className="mt-8 px-8 py-3 bg-white/5 border border-white/10 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

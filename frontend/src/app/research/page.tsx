'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FileText, Camera, Sparkles, TrendingUp, ChevronRight, Activity, Cpu, Network } from 'lucide-react';
import TiltCard from '@/components/shared/TiltCard';
import Link from 'next/link';

export default function ResearchPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -300]);

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen relative overflow-hidden selection:bg-primary/30 selection:text-primary">
      {/* Dynamic Backgrounds */}
      <motion.div style={{ y: y1 }} className="bg-blob blob-saffron -top-40 -left-40 opacity-70" />
      <motion.div style={{ y: y2 }} className="bg-blob blob-violet top-1/2 -right-40 opacity-50" />
      
      <div className="max-w-5xl mx-auto space-y-32 relative z-10">
        
        {/* HERO SECTION */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-md">
              <FileText className="w-3 h-3" />
              <span>Technical Whitepaper</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">Technology & <span className="text-primary text-shadow-glow">Research</span></h1>
            <p className="text-white/60 text-xl leading-relaxed font-medium max-w-3xl mx-auto">
              Dive deep into the mathematics, neural networks, and architecture that power the world's most advanced classical dance AI tracking engine.
            </p>
          </motion.div>
        </section>

        {/* SECTION 1: TRACKING */}
        <section id="tracking" className="scroll-mt-40">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-full md:w-1/3 sticky top-40">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-6 shadow-[0_0_30px_rgba(255,153,51,0.2)]">
                <Camera className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-black mb-4">Hyper-Real Tracking</h2>
              <p className="text-white/40 font-medium">Sub-millimeter precision for exactly 21 finger mechanics per hand.</p>
            </div>
            
            <div className="w-full md:w-2/3 space-y-8">
              <TiltCard>
                <div className="glass-card p-10 border-white/5 hover:border-primary/30 transition-colors">
                  <h3 className="text-2xl font-bold mb-4 flex items-center"><Cpu className="w-5 h-5 mr-3 text-primary" /> Active Neural Engine Core</h3>
                  <p className="text-white/60 leading-relaxed mb-6 font-light">
                    The foundation of NrityaVaani is built upon the highly optimized Google MediaPipe Vision framework. Instead of processing full-body kinematics, our custom pipeline strictly isolates and projects a 3D boundary box over the hands. Inside this box, a specialized convolutional neural network (CNN) predicts 21 unique 3-dimensional landmarks (x, y, z coordinates).
                  </p>
                  <p className="text-white/60 leading-relaxed font-light">
                    By operating at sub-millimeter precision using WebAssembly (WASM), we achieve ultra-low latency inference directly on the edge device, hitting 60-120 frames per second without relying on cloud processing pipelines. 
                  </p>
                </div>
              </TiltCard>
              
              <div className="glass-card p-8 border-white/5 bg-primary/5">
                <h4 className="font-bold text-primary mb-2 text-sm uppercase tracking-widest">Key Metric</h4>
                <p className="text-3xl font-black">&lt; 3ms Interference Time</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: CORRECTION */}
        <section id="correction" className="scroll-mt-40">
           <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-full md:w-1/3 sticky top-40">
              <div className="w-16 h-16 rounded-2xl bg-accent-gold/20 flex items-center justify-center text-accent-gold mb-6 shadow-[0_0_30px_rgba(255,215,0,0.2)]">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-black mb-4">Neural Correction</h2>
              <p className="text-white/40 font-medium">Physics-based gesture correction & multi-hand synchronization.</p>
            </div>
            
            <div className="w-full md:w-2/3 space-y-8">
              <TiltCard>
                <div className="glass-card p-10 border-white/5 hover:border-accent-gold/30 transition-colors">
                  <h3 className="text-2xl font-bold mb-4 flex items-center"><Activity className="w-5 h-5 mr-3 text-accent-gold" /> Spatial Heuristics</h3>
                  <p className="text-white/60 leading-relaxed mb-6 font-light">
                    Identifying a Mudra isn't just about determining where fingers are, but rather the relative distance and depth vectors between them. Our Neural Correction engine compares the live user coordinates against a 'gold standard' geometric array generated from expert Bharatanatyam datasets.
                  </p>
                  <p className="text-white/60 leading-relaxed font-light">
                    If an index finger in the 'Tripataka' mudra deviates by more than 15 degrees from the palmar plane, our algorithm instantly flags it and triggers targeted feedback. This ensures that the aesthetic physics of the dance are preserved.
                  </p>
                </div>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* SECTION 3: ANALYTICS */}
        <section id="analytics" className="scroll-mt-40">
           <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-full md:w-1/3 sticky top-40">
              <div className="w-16 h-16 rounded-2xl bg-accent-cyan/20 flex items-center justify-center text-accent-cyan mb-6 shadow-[0_0_30px_rgba(0,255,255,0.2)]">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-black mb-4">Advanced Analytics</h2>
              <p className="text-white/40 font-medium">Long-term machine learning insights and dimensional mapping.</p>
            </div>
            
            <div className="w-full md:w-2/3 space-y-8">
              <TiltCard>
                <div className="glass-card p-10 border-white/5 hover:border-accent-cyan/30 transition-colors">
                  <h3 className="text-2xl font-bold mb-4 flex items-center"><Network className="w-5 h-5 mr-3 text-accent-cyan" /> Multi-Dimensional Models</h3>
                  <p className="text-white/60 leading-relaxed mb-6 font-light">
                    Every session is logged via our advanced analytics pipeline. By sampling the confidence scores historically, we use polynomial regression to map out the user's trajectory of mastery. 
                  </p>
                  <p className="text-white/60 leading-relaxed font-light">
                    This allows learners and Gurus to pinpoint exact moments of hesitation or finger fatigue over long durations, essentially creating a fitness tracker specifically designed for classical choreography data models.
                  </p>
                </div>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center pt-20">
          <h2 className="text-3xl font-bold mb-8">Ready to experience the technology?</h2>
          <Link href="/live" className="premium-button inline-flex py-4 px-10 items-center justify-center space-x-3 text-lg">
            <span>Launch Neural Engine</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </section>
        
      </div>
    </div>
  );
}

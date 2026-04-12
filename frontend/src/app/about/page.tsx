'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Trophy, Compass, Database, Cpu, Layout, Activity, Target, Zap, Quote, GraduationCap, Github, Linkedin, Code } from 'lucide-react';
import TiltCard from '@/components/shared/TiltCard';
import { cn } from '@/lib/utils';

export default function AboutPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -300]);

  const approaches = [
    { title: "Research Phase", desc: "Studied Bharatanatyam mudras, existing tools, and gaps in digital learning.", icon: <Compass /> },
    { title: "Data Collection", desc: "Collected and prepared datasets of mudras for training AI models.", icon: <Database /> },
    { title: "Model Development", desc: "Trained machine learning models to identify and classify hand gestures.", icon: <Cpu /> },
    { title: "App Development", desc: "Built an interactive interface for real-time usage and feedback.", icon: <Layout /> },
    { title: "Testing & Improv.", desc: "Continuously refined accuracy, usability, and performance.", icon: <Activity /> }
  ];

  const goals = [
    "Build a mobile app for wider accessibility",
    "Improve AI accuracy using advanced models",
    "Support multiple classical dance forms",
    "Provide guided learning modules",
    "Integrate real-time feedback system",
    "Collaborate with dance institutions"
  ];

  const innovations = [
    "Combines AI + Culture (rare domain)",
    "Solves a real learning problem",
    "Focus on accessibility and scalability",
    "Student-driven innovation",
    "Startup potential"
  ];

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen relative overflow-hidden selection:bg-primary/30 selection:text-primary">
      {/* Dynamic Backgrounds */}
      <motion.div style={{ y: y1 }} className="bg-blob blob-saffron -top-40 -left-40 opacity-70" />
      <motion.div style={{ y: y2 }} className="bg-blob blob-violet top-1/2 -right-40 opacity-50" />
      
      <div className="max-w-6xl mx-auto space-y-32 relative z-10">
        
        {/* HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-md">
              <Zap className="w-3 h-3" />
              <span>The Journey of DivyCoders</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">About <span className="text-primary text-shadow-glow">NrityaVaani</span></h1>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed font-medium">
              An innovative tech-driven initiative that blends Indian classical dance with Artificial Intelligence, 
              aiming to preserve, analyze, and promote traditional art forms like <span className="text-accent-gold italic">Bharatanatyam</span> in the digital era.
            </p>
          </motion.div>
        </section>

        {/* OUR STORY */}
        <section>
          <TiltCard className="max-w-5xl mx-auto">
            <div className="glass-card p-10 md:p-16 relative overflow-hidden border-white/10 group hover:border-primary/30 transition-colors duration-500">
              <div className="absolute top-0 right-0 opacity-5 scale-150 -rotate-12 group-hover:rotate-0 transition-transform duration-1000 p-10">
                <Quote className="w-64 h-64 text-primary" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight">Our Story</h2>
                </div>
                
                <div className="space-y-6 text-white/70 leading-relaxed text-lg md:text-xl font-medium max-w-3xl">
                  <p>
                    NrityaVaani started as an idea during our early college journey, where we explored how technology can solve real-world cultural challenges. We noticed that learning and understanding classical dance mudras is difficult without expert guidance, and there was no accessible smart system to assist learners.
                  </p>
                  <p>
                    With this problem in mind, we began building a solution from scratch—starting with research, dataset collection, and understanding how AI/ML models can interpret human gestures.
                  </p>
                  <p className="text-white">
                    What began as a concept soon turned into a working prototype through continuous experimentation, failures, and learning.
                  </p>
                </div>
              </div>
            </div>
          </TiltCard>
        </section>

        {/* HACKATHON PROUD */}
        <section>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card p-10 md:p-14 relative overflow-hidden border-accent-gold/30 bg-gradient-to-br from-accent-gold/10 via-black to-black shadow-[0_0_50px_rgba(255,215,0,0.15)] group">
              <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Trophy className="w-80 h-80 text-accent-gold" />
              </div>
              
              <div className="relative z-10 max-w-3xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-accent-gold/20 rounded-2xl flex items-center justify-center text-accent-gold border border-accent-gold/30 shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-200 tracking-tighter">
                    Hackathon Proud!
                  </h2>
                </div>
                
                <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-medium">
                  We proudly secured <strong className="text-accent-gold">3rd Prize</strong> in our first hackathon, which validated our idea and boosted our confidence to take NrityaVaani further. We also secured <strong className="text-accent-gold">3rd position</strong> at the Inter-College Dron Tech Fest 2026 (Innovative Startup Pitch). These achievements reflect our dedication, innovation, and ability to turn ideas into reality.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* OUR APPROACH */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Our <span className="text-primary">Approach</span></h2>
            <p className="text-white/40 text-lg">The engineering lifecycle behind NrityaVaani.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {approaches.map((step, i) => (
              <TiltCard key={step.title} className="h-full">
                <div className="glass-card p-6 h-full flex flex-col items-center text-center group hover:border-primary/50 transition-colors duration-300">
                   <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_rgba(255,153,51,0.3)] transition-all text-white/50 group-hover:text-primary">
                      {step.icon}
                   </div>
                   <h4 className="font-black text-lg mb-3 tracking-tight">{step.title}</h4>
                   <p className="text-sm text-white/50 leading-relaxed font-medium">{step.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* TEAM */}
        <section className="relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
              <Code className="w-3 h-3" />
              <span>Meet The Creators</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Team <span className="text-accent-cyan">DivyCoders</span></h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">
              We are a passionate team of developers and learners. As a team, this was our first hackathon experience, where we explored real-world problem solving, teamwork, and AI model development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <TeamMember 
              name="Divyanand Pandey" 
              role="Team Leader" 
              img="/divyanand1.jpg.jpeg" 
              linkedinUrl="https://www.linkedin.com/in/divyanand-pandey-5b2b152b9"
            />
            <TeamMember 
              name="Mayank" 
              role="Team Member" 
              img="/mayank.jpg.jpeg" 
              linkedinUrl="https://www.linkedin.com/in/mayank-850255381"
            />
            <TeamMember 
              name="Pranav Jithesh" 
              role="Team Member" 
              img="/pranav.jpg.jpeg" 
              linkedinUrl="https://www.linkedin.com/in/pranav-jithesh-5b7055367"
            />
          </div>
        </section>

        {/* GOALS & INNOVATION GRID */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TiltCard>
            <div className="glass-card p-10 h-full border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-125 transition-transform duration-700">
                <Target className="w-40 h-40" />
              </div>
              <h3 className="text-3xl font-black mb-8 flex items-center space-x-3">
                <Target className="w-8 h-8 text-accent-pink" />
                <span>Future Goals</span>
              </h3>
              <ul className="space-y-4 relative z-10">
                {goals.map((goal, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-accent-pink/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-accent-pink" />
                    </div>
                    <span className="text-white/70 font-medium text-lg leading-relaxed">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TiltCard>
          
          <TiltCard>
            <div className="glass-card p-10 h-full border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-125 transition-transform duration-700">
                <Zap className="w-40 h-40" />
              </div>
              <h3 className="text-3xl font-black mb-8 flex items-center space-x-3">
                <Zap className="w-8 h-8 text-accent-cyan" />
                <span>Why We're Innovative</span>
              </h3>
              <ul className="space-y-4 relative z-10">
                {innovations.map((inn, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-accent-cyan/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-accent-cyan" />
                    </div>
                    <span className="text-white/70 font-medium text-lg leading-relaxed">{inn}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TiltCard>
        </section>

        {/* VISION */}
        <section className="pb-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-12"
          >
            <div className="relative">
              <Quote className="w-20 h-20 text-primary/20 absolute -top-10 -left-10 rotate-180" />
              <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tighter relative z-10 text-white">
                "To create a bridge between tradition and technology, making Indian classical dance more accessible, interactive, and globally recognized through innovation."
              </h2>
              <Quote className="w-20 h-20 text-primary/20 absolute -bottom-10 -right-10" />
            </div>
            
            <p className="text-xl md:text-2xl text-primary font-medium italic">
              “NrityaVaani is not just a project — it's a step towards preserving tradition through technology and shaping the future of cultural learning.”
            </p>
          </motion.div>
        </section>

      </div>
    </div>
  );
}

function TeamMember({ name, role, img, linkedinUrl }: { name: string, role: string, img: string, linkedinUrl: string }) {
  return (
    <TiltCard>
      <div className="glass-card p-8 border-white/5 flex flex-col items-center text-center group hover:border-accent-cyan/30 transition-colors duration-500">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 ring-4 ring-white/5 ring-offset-8 ring-offset-black group-hover:ring-accent-cyan/50 transition-all duration-500 shadow-xl relative">
          <div className="absolute inset-0 bg-accent-cyan/20 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-500 z-10" />
          <img src={img} alt={name} className="w-full h-full object-cover grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
        </div>
        <h4 className="text-2xl font-black mb-2">{name}</h4>
        <div className="inline-block px-3 py-1 rounded-full bg-white/5 mb-6">
          <p className="text-xs text-accent-cyan uppercase font-bold tracking-widest">{role}</p>
        </div>
        <div className="flex items-center justify-center space-x-4 opacity-50 group-hover:opacity-100 transition-opacity">
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </TiltCard>
  );
}

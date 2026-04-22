'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Camera, Zap, BookOpen, ShieldCheck, Users, TrendingUp, Sparkles, Check, Crown, School } from 'lucide-react';
import Link from 'next/link';
import TiltCard from '@/components/shared/TiltCard';

export default function LandingPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 45]);

  return (
    <div className="relative overflow-hidden selection:bg-primary/30 selection:text-primary">
      {/* Background Atmosphere */}
      <motion.div style={{ y: y1 }} className="bg-blob blob-saffron" />
      <motion.div style={{ y: y2 }} className="bg-blob blob-violet" />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-40 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0, 0.71, 0.2, 1.01] }}
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-md"
            >
              <Sparkles className="w-3 h-3" />
              <span>State-of-the-Art Hand Landmarking</span>
            </motion.div>
            
            <h1 className="text-[12vw] sm:text-6xl md:text-8xl lg:text-9xl font-black mb-10 leading-[0.9] tracking-tighter break-words hyphens-auto">
              Real-Time <span className="text-primary text-shadow-glow">Mudra</span> <br />
              Expertise for <span className="text-accent-gold italic serif">Bharatanatyam</span>
            </h1>
            
            <p className="text-foreground/50 text-xl md:text-2xl max-w-3xl mx-auto mb-16 leading-relaxed font-medium">
              Elevate your practice with the world&apos;s most advanced AI gesture recognition platform.
              Precision at 60FPS, designed for the future of classical dance.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
              <Link href="/live" className="premium-button flex items-center space-x-3 group w-full sm:w-auto text-center justify-center py-5 px-10 text-lg">
                <span>Start Live Detection</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link href="/library" className="secondary-button w-full sm:w-auto text-center justify-center py-5 px-10 text-lg">
                Explore Library
              </Link>
            </div>
          </motion.div>
          
          {/* Main 3D Mockup Visual */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
            className="mt-32 relative perspective-1000 group"
          >
            <TiltCard className="max-w-5xl mx-auto">
              <div className="glass-card p-1 sm:p-2 bg-gradient-to-br from-foreground/10 to-transparent border-foreground/20 shadow-[0_50px_100px_-20px_rgba(255,153,51,0.2)]">
                <div className="aspect-video relative rounded-2xl overflow-hidden bg-background/60 border border-foreground/5">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                  >
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-indian-classical-dancer-performing-traditional-dance-moves-41718-large.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                  
                  {/* Fake Laser Scanner Effect */}
                  <motion.div 
                    animate={{ 
                      top: ["0%", "100%", "0%"]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-[2px] bg-primary/40 shadow-[0_0_15px_#FF9933] z-20"
                  />
                  
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(255,153,51,0.5)] group-hover:scale-110 transition-transform cursor-pointer">
                        <Zap className="text-black fill-current w-8 h-8" />
                      </div>
                      <p className="text-primary font-black uppercase tracking-[0.3em] text-xs">AI Active Neural Engine</p>
                    </div>
                  </div>

                  {/* Dynamic Landmarks decoration */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
                    {[1,2,3,4,5].map(i => (
                      <motion.div 
                        key={i}
                        animate={{ 
                          x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                          y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                        }}
                        transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                        className="absolute w-1.5 h-1.5 bg-primary rounded-full blur-[1px]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
            
            {/* Background floating rings */}
            <motion.div 
              style={{ rotate }}
              className="absolute -top-20 -left-20 w-64 h-64 border border-primary/10 rounded-full border-dashed animate-spin-slow pointer-events-none"
            />
            <motion.div 
              style={{ rotate: -rotate }}
              className="absolute -bottom-20 -right-20 w-80 h-80 border border-accent-gold/5 rounded-full border-dashed animate-spin-slow pointer-events-none"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section with 3D feel */}
      <section className="py-16 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: 'Latency', value: '< 2ms', icon: <Zap className="w-4 h-4 text-primary" /> },
              { label: 'Accuracy', value: '99.2%', icon: <ShieldCheck className="w-4 h-4 text-green-400" /> },
              { label: 'Data Points', value: '2.1M', icon: <TrendingUp className="w-4 h-4 text-accent-cyan" /> },
              { label: 'Cloud Uplink', value: 'Enabled', icon: <Users className="w-4 h-4 text-accent-violet" /> },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center space-x-2 text-foreground/30 mb-4 group-hover:text-primary transition-colors">
                  {stat.icon}
                  <span className="text-[10px] font-black uppercase tracking-widest">{stat.label}</span>
                </div>
                <h3 className="text-4xl sm:text-5xl font-black text-foreground">{stat.value}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section with TiltCards */}
      <section className="py-20 md:py-40 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <FeatureCard 
              icon={<Camera className="w-7 h-7 text-primary" />}
              title="Hyper-Real Tracking"
              description="Sub-millimeter precision for every finger bone. Built on the Google MediaPipe Neural Engine for unmatched stability."
              href="/research#tracking"
            />
            <FeatureCard 
              icon={<Sparkles className="w-7 h-7 text-accent-gold" />}
              title="Neural Correction"
              description="Next-generation feedback system that understands the physics of dance, providing deep corrective insights."
              href="/research#correction"
            />
            <FeatureCard 
              icon={<TrendingUp className="w-7 h-7 text-accent-cyan" />}
              title="Advanced Analytics"
              description="Visualize your mastery journey with multi-dimensional data models and long-term progress metrics."
              href="/research#analytics"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-40 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tighter break-words">Choose Your <span className="text-primary">Path</span></h2>
            <p className="text-foreground/40 text-xl max-w-2xl mx-auto">Professional plans designed for every stage of your dance journey.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <PriceCard 
              name="Sadhaka" 
              price="0" 
              description="Ideal for beginners exploring AI-assisted practice."
              features={["Real-time Mudra Tracking", "Access to Basic Library", "5-min Daily Practice", "Community Support"]}
              icon={<Sparkles className="w-6 h-6" />}
              buttonText="Start Free"
              planId="sadhaka"
            />
            <PriceCard 
              name="Yoddha" 
              price="1,499" 
              description="Advanced coaching for dedicated practitioners."
              features={["Unlimited AI Coaching", "Premium Mudra Library", "Deep Analytical Feedback", "Session Progress History", "Custom Practice Goals"]}
              icon={<Crown className="w-6 h-6 text-primary" />}
              buttonText="Go Pro Now"
              popular
              planId="yoddha"
            />
            <PriceCard 
              name="Guru" 
              price="6,999" 
              description="Institutional licenses for dance academies."
              features={["Academic Dashboard", "Multi-Student Tracking", "Custom Mudra Training", "Performance Analytics", "Priority Integration Support"]}
              icon={<School className="w-6 h-6" />}
              buttonText="Contact for Academy"
              planId="guru"
            />
          </div>
        </div>
      </section>

      {/* Immersive CTA */}
      <section className="py-20 md:py-40 px-6">
        <TiltCard className="max-w-5xl mx-auto">
          <div className="glass-card p-20 text-center relative group">
            <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
              <BookOpen className="w-64 h-64 text-primary" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-10 relative z-10 tracking-tighter leading-none break-words">
              Perfect Your <br /> Art with <span className="text-primary italic">NrityaVaani</span>
            </h2>
            <p className="text-foreground/40 text-xl mb-12 max-w-2xl mx-auto relative z-10 leading-relaxed font-medium">
              Join the elite circle of dancers and gurus leveraging the power of Artificial Intelligence to preserve and perfect classical heritage.
            </p>
            <Link href="/auth/signup" className="premium-button relative z-10 inline-flex items-center space-x-3 text-lg py-5 px-12">
              <span>Initialize Academy Profile</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </TiltCard>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, href }: { icon: React.ReactNode, title: string, description: string, href: string }) {
  return (
    <TiltCard>
      <div className="glass-card p-10 h-full border-foreground/5 group hover:border-primary/20 transition-all">
        <div className="w-16 h-16 rounded-2xl bg-foreground/5 flex items-center justify-center mb-8 border border-foreground/10 group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-500">
          {icon}
        </div>
        <h3 className="text-2xl font-black mb-6 tracking-tight">{title}</h3>
        <p className="text-foreground/40 text-base leading-relaxed font-medium">{description}</p>
        
        <Link href={href} className="mt-10 flex items-center text-[10px] font-black text-primary uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform cursor-pointer">
          <span>Read Research</span>
          <ArrowRight className="w-3 h-3 ml-2" />
        </Link>
      </div>
    </TiltCard>
  );
}
function PriceCard({ name, price, description, features, icon, buttonText, popular, planId }: any) {
  return (
    <TiltCard className={popular ? "md:scale-110 z-20" : "z-10"}>
      <div className={`glass-card p-10 flex flex-col h-full border-foreground/5 relative overflow-hidden ${popular ? 'ring-2 ring-primary/50 shadow-[0_0_50px_rgba(255,153,51,0.2)]' : ''}`}>
        {popular && (
          <div className="absolute top-0 right-0 bg-primary text-black font-black text-[10px] uppercase tracking-widest px-6 py-2 rounded-bl-2xl">
            Most Popular
          </div>
        )}
        
        <div className="flex items-center space-x-3 mb-8">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${popular ? 'bg-primary/20' : 'bg-foreground/5'}`}>
            {icon}
          </div>
          <span className="text-lg font-black uppercase tracking-widest text-foreground/50">{name}</span>
        </div>

        <div className="mb-8">
          <div className="flex items-baseline space-x-1">
            <span className="text-5xl font-black">₹</span>
            <span className="text-5xl sm:text-7xl font-black tracking-tighter">{price}</span>
            <span className="text-foreground/30 font-bold">/mo</span>
          </div>
          <p className="mt-4 text-foreground/40 text-sm leading-relaxed">{description}</p>
        </div>

        <div className="flex-1 space-y-4 mb-10">
          {features.map((feature: string) => (
            <div key={feature} className="flex items-center space-x-3">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-green-400" />
              </div>
              <span className="text-sm text-foreground/60 font-medium">{feature}</span>
            </div>
          ))}
        </div>

        <Link 
          href={`/checkout?plan=${planId}&price=${price.replace(',', '')}`}
          className={popular ? "premium-button w-full py-5 text-lg block text-center" : "secondary-button w-full py-5 text-lg block text-center"}
        >
          {buttonText}
        </Link>
      </div>
    </TiltCard>
  );
}

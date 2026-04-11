'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Camera, Sparkles, Volume2, VolumeX, 
  CheckCircle, AlertCircle, Info, Play, RotateCcw,
  Activity, Target, ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { MUDRAS } from '@/lib/constants/mudras';
import CameraFeed from '@/components/live/CameraFeed';
import { cn } from '@/lib/utils';
import TiltCard from '@/components/shared/TiltCard';
import { translateFeedback } from '@/lib/utils/translations';

export default function PracticeModePage() {
  const params = useParams();
  const router = useRouter();
  const mudraSlug = params.slug as string;
  const mudra = MUDRAS.find(m => m.slug === mudraSlug);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [confidence, setConfidence] = useState(0);
  const [bestDetection, setBestDetection] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>("Show your hand to the camera to begin.");
  const [landmarks, setLandmarks] = useState<any>(null);
  const [hasLanded, setHasLanded] = useState(false);

  // Voice Assistant Ref
  const lastSpokenRef = useRef<string>("");
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Speak feedback function
  const speak = useCallback((text: string) => {
    if (!isVoiceEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    
    // Don't repeat the same thing immediately
    if (text === lastSpokenRef.current) return;
    
    // Debounce speech
    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    
    speechTimeoutRef.current = setTimeout(() => {
      window.speechSynthesis.cancel(); // Stop current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
      lastSpokenRef.current = text;
    }, 400);
  }, [isVoiceEnabled, language]);

  // Handle detection updates
  const handleUpdate = useCallback((landmarkData: any, mudraData: any[]) => {
    // Freeze logic: If no hands are detected, don't update the state.
    if (!landmarkData || !landmarkData.landmarks || landmarkData.landmarks.length === 0) {
      return;
    }
    
    setLandmarks(landmarkData);
    
    if (!mudra) return;

    // Find the current target mudra in the detections
    const targetDetection = mudraData.find(m => m.name.toLowerCase() === mudra.name.toLowerCase());
    const primaryDetection = mudraData[0]; // The one with highest confidence

    if (targetDetection) {
      setConfidence(targetDetection.confidence);
      setBestDetection(targetDetection.name);
      
      const translatedMsg = translateFeedback(targetDetection.feedback, language);
      setFeedback(translatedMsg);
      
      // Voice feedback for high confidence
      if (targetDetection.confidence > 0.85) {
        speak(translateFeedback(`Perfect ${mudra.name} detected! Excellent form.`, language));
      } else if (targetDetection.confidence > 0.4) {
        // Only speak granular corrections if confidence is decent but not perfect
        speak(translatedMsg);
      }
    } else if (primaryDetection && primaryDetection.name !== "No Mudra Detected") {
      setConfidence(0.1); // Small confidence because it's the wrong mudra
      setBestDetection(primaryDetection.name);
      const wrongMsg = translateFeedback(`Detected ${primaryDetection.name} instead. Try to form ${mudra.name}.`, language);
      setFeedback(wrongMsg);
      speak(wrongMsg);
    } else {
      setConfidence(0);
      setBestDetection(null);
      const startMsg = translateFeedback("Adjust your hand position to match the reference image.", language);
      setFeedback(startMsg);
      // Optional: speak(startMsg); // Might be too repetitive
    }
  }, [mudra, speak, language]);

  if (!mudra) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Mudra not found</h1>
          <Link href="/library" className="text-primary hover:underline">Back to Library</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-[#050505] text-white px-6 pb-20 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="bg-blob blob-violet -top-40 -left-20 opacity-20" />
      <div className="bg-blob blob-saffron -bottom-40 -right-20 opacity-10" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => router.back()}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">Practice Mode</span>
                <span className="text-white/40 text-xs font-medium">{mudra.category}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">{mudra.name} <span className="text-primary italic font-serif opacity-50">/{mudra.meaning}/</span></h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
             {/* Language Toggle */}
             <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                <button 
                  onClick={() => setLanguage('en')}
                  className={cn(
                    "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                    language === 'en' ? "bg-primary text-black shadow-lg" : "text-white/40 hover:text-white"
                  )}
                >
                  English
                </button>
                <button 
                  onClick={() => setLanguage('hi')}
                  className={cn(
                    "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                    language === 'hi' ? "bg-primary text-black shadow-lg" : "text-white/40 hover:text-white"
                  )}
                >
                  हिंदी
                </button>
             </div>

             <button 
                onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                className={cn(
                  "flex items-center space-x-2 px-5 py-3 rounded-xl border transition-all font-bold text-sm",
                  isVoiceEnabled ? "bg-primary/20 border-primary/30 text-primary shadow-[0_0_20px_rgba(255,153,51,0.1)]" : "bg-white/5 border-white/10 text-white/40"
                )}
             >
               {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
               <span>AI Coach: {isVoiceEnabled ? 'ON' : 'OFF'}</span>
             </button>
             <button 
                onClick={() => setConfidence(0) /* Dummy reset for now */}
                className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold text-sm"
             >
               <RotateCcw className="w-4 h-4" />
               <span>Reset</span>
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          
          {/* LEFT: LIVE FEED */}
          <div className="xl:col-span-7 space-y-6">
            <div className="relative aspect-video glass-card overflow-hidden bg-black/60 border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]">
                <CameraFeed 
                  isActive={isCameraActive} 
                  onUpdate={handleUpdate}
                  targetMudra={mudra.name}
                />
               
               {/* Reference Image Overlay (Ghost) */}
               <AnimatePresence>
                 {isCameraActive && (
                   <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 0.15 }}
                     exit={{ opacity: 0 }}
                     className="absolute inset-0 pointer-events-none flex items-center justify-center p-20"
                   >
                     <img 
                        src={mudra.image} 
                        alt="Reference Overlay" 
                        className="h-full w-auto object-contain grayscale invert" 
                     />
                   </motion.div>
                 )}
               </AnimatePresence>

               {!isCameraActive && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-6 animate-pulse border border-primary/30">
                      <Camera className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Camera Ready</h3>
                    <p className="text-white/40 mb-8 max-w-xs text-center">Allow camera access to start practicing with the AI coach.</p>
                    <button 
                      onClick={() => setIsCameraActive(true)}
                      className="premium-button px-10 py-4"
                    >
                      Start Practicing
                    </button>
                 </div>
               )}

               {/* Landmarks Visualization Overlay can be added here if needed, but CameraFeed handles it */}
            </div>

            {/* QUICK TIPS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="glass-card p-6 border-white/5 space-y-4">
                  <div className="flex items-center space-x-2 text-primary">
                    <Info className="w-4 h-4" />
                    <span className="text-xs font-black uppercase tracking-widest">How to Perform</span>
                  </div>
                  <p className="text-white/70 leading-relaxed text-sm">
                    {mudra.instructions}
                  </p>
               </div>
               <div className="glass-card p-6 border-red-500/10 space-y-4 bg-red-500/[0.02]">
                  <div className="flex items-center space-x-2 text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-xs font-black uppercase tracking-widest">Common Mistakes</span>
                  </div>
                  <p className="text-white/70 leading-relaxed text-sm">
                    {mudra.commonMistakes}
                  </p>
               </div>
            </div>
          </div>

          {/* RIGHT: PRACTICE STATS */}
          <div className="xl:col-span-5 space-y-8">
            
            {/* TARGET MUDRA CARD */}
            <TiltCard>
               <div className="glass-card p-8 border-white/10 relative overflow-hidden group">
                  <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
                    <Target className="w-64 h-64 text-primary" />
                  </div>
                  
                  <div className="relative z-10 flex items-start space-x-6">
                     <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/10 bg-black shrink-0">
                        <img src={mudra.image} className="w-full h-full object-cover opacity-80" alt="Mudra Reference" />
                     </div>
                     <div>
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Target Proficiency</p>
                        <h2 className="text-3xl font-black mb-2">{mudra.name}</h2>
                        <div className="flex items-center space-x-4">
                           <div className="flex items-center space-x-1 text-accent-gold">
                              <Sparkles className="w-4 h-4" />
                              <span className="text-xs font-bold">{mudra.difficulty}</span>
                           </div>
                           <div className="w-1 h-1 rounded-full bg-white/20" />
                           <span className="text-white/40 text-xs">Standard Form</span>
                        </div>
                     </div>
                  </div>
               </div>
            </TiltCard>

            {/* CONFIDENCE METER (PREMIUM) */}
            <div className="glass-card p-10 border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
               
               <div className="relative w-48 h-48 mb-6">
                  {/* SVG Circular Progress */}
                  <svg className="w-full h-full -rotate-90">
                    <circle 
                      cx="96" cy="96" r="80" 
                      fill="none" stroke="currentColor" 
                      strokeWidth="8" className="text-white/5" 
                    />
                    <motion.circle 
                      cx="96" cy="96" r="80" 
                      fill="none" stroke="currentColor" 
                      strokeWidth="10" 
                      strokeDasharray="502.65"
                      animate={{ strokeDashoffset: 502.65 * (1 - confidence) }}
                      className="text-primary"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span 
                      key={Math.round(confidence * 100)}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-5xl font-black tracking-tighter"
                    >
                      {Math.round(confidence * 100)}%
                    </motion.span>
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Confidence</span>
                  </div>
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-full shadow-[0_0_60px_rgba(255,153,51,0.2)] pointer-events-none" />
               </div>

               <AnimatePresence mode="wait">
                 <motion.div 
                   key={feedback}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   className="space-y-4"
                 >
                    <div className={cn(
                      "inline-flex items-center space-x-2 px-4 py-2 rounded-full border text-xs font-bold transition-colors",
                      confidence > 0.8 ? "bg-green-500/10 border-green-500/20 text-green-400" :
                      confidence > 0.4 ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400" :
                      "bg-white/5 border-white/10 text-white/40"
                    )}>
                      {confidence > 0.8 ? <CheckCircle className="w-4 h-4" /> : <Activity className="w-4 h-4 animate-pulse" />}
                      <span>{confidence > 0.8 ? 'Excellent Form' : confidence > 0.4 ? 'Keep Adjusting' : 'Awaiting Match'}</span>
                    </div>
                    <p className="text-xl font-bold text-white/90 leading-relaxed max-w-sm">
                      {feedback}
                    </p>
                 </motion.div>
               </AnimatePresence>
            </div>

            {/* CURRENT DETECTION STATUS */}
            <div className="glass-card p-6 border-white/5 flex items-center justify-between">
               <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <Sparkles className="w-6 h-6 text-white/40" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-0.5">Live Detection</p>
                    <h4 className="font-bold text-lg">{bestDetection || 'None'}</h4>
                  </div>
               </div>
               <div className="flex items-center space-x-1 text-primary">
                  <span className="text-xs font-bold uppercase">Active</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function setMessages(arg0: never[]) {
  // Placeholder for history reset if added later
}

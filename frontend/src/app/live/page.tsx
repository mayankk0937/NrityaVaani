'use client';

import React, { useRef, useState, useEffect } from 'react';
import CameraFeed from '@/components/live/CameraFeed';
import PredictionPanel from '@/components/live/PredictionPanel';
import JointsGrid from '@/components/live/JointsGrid';
import ControlPanel from '@/components/live/ControlPanel';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Sparkles, BookOpen, AlertCircle, 
  Info, Play, Target, CheckCircle2,
  ChevronRight, Bookmark, Clock, Camera
} from 'lucide-react';
import { StatsService } from '@/lib/services/StatsService';
import { format } from 'date-fns';

export default function LiveDetectionPage() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [showLandmarks, setShowLandmarks] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [session, setSession] = useState<{
    landmarks: any,
    detectedMudra: any
  }>({
    landmarks: null,
    detectedMudra: null
  });

  // Timeline state
  const [timeline, setTimeline] = useState<any[]>([]);
  const masteryTimer = useRef<{ name: string, startTime: number } | null>(null);
  const sessionStartTime = useRef<number | null>(null);
  const sessionStats = useRef<{ totalAccuracy: number, count: number }>({ totalAccuracy: 0, count: 0 });

  // Handle Session End/Start
  useEffect(() => {
    if (isCameraActive) {
      sessionStartTime.current = Date.now();
      sessionStats.current = { totalAccuracy: 0, count: 0 };
      setTimeline([]);
    } else if (sessionStartTime.current) {
      const duration = (Date.now() - sessionStartTime.current) / 1000;
      if (duration > 5 && sessionStats.current.count > 0) {
        // Save session if it lasted more than 5 seconds
        const avgAccuracy = Math.round(sessionStats.current.totalAccuracy / sessionStats.current.count);
        
        // Find most frequent mudra in timeline for the session name
        const mostFrequent = timeline.length > 0 
          ? timeline.reduce((acc, curr) => {
              acc[curr.name] = (acc[curr.name] || 0) + 1;
              return acc;
            }, {} as any)
          : null;
        
        const topMudra = mostFrequent ? Object.keys(mostFrequent).reduce((a, b) => mostFrequent[a] > mostFrequent[b] ? a : b) : 'Free Practice';

        StatsService.saveSession({
          mudraId: topMudra.toLowerCase().replace(' ', '-'),
          mudraName: topMudra,
          accuracy: avgAccuracy,
          duration: duration
        });
      }
      sessionStartTime.current = null;
    }
  }, [isCameraActive]);

  const lastUpdateTime = React.useRef(0);
  
  // Voice Assistant logic
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const lastSpokenRef = useRef<string>("");
  const hasGreetedRef = useRef(false);

  useEffect(() => {
    const loadVoices = () => {
      if (typeof window === 'undefined' || !window.speechSynthesis) return;
      const voices = window.speechSynthesis.getVoices();
      const targetVoice = voices.find(v => v.lang === 'hi-IN') || 
                          voices.find(v => v.lang.includes('hi')) ||
                          voices.find(v => v.lang.includes('IN'));
      setVoice(targetVoice || null);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  const speak = React.useCallback((text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    if (text === lastSpokenRef.current) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) utterance.voice = voice;
    utterance.lang = 'hi-IN'; // Default to Hindi for that Guru feel
    utterance.rate = 0.9;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
    lastSpokenRef.current = text;
  }, [voice]);

  const handleUpdate = React.useCallback((landmarkData: any, mudraData: any[]) => {
    const now = performance.now();
    if (now - lastUpdateTime.current < 30) return;
    lastUpdateTime.current = now;

    // Freeze logic: If no hands are detected, don't update the state.
    // This allows the user to remove their hand to see the result without it disappearing.
    if (!landmarkData || !landmarkData.landmarks || landmarkData.landmarks.length === 0) {
      return;
    }
    
    // Greet if first time
    if (!hasGreetedRef.current) {
      speak("Pranaam! Chaliye mudra ka abhyas prarambh karte hain.");
      hasGreetedRef.current = true;
    }

    setSession(prev => {
      const bestMudra = mudraData && mudraData.length > 0 ? mudraData[0] : null;
      
      // Mastery Detection Logic
      if (bestMudra && bestMudra.confidence > 0.85) {
        if (!masteryTimer.current || masteryTimer.current.name !== bestMudra.name) {
          masteryTimer.current = { name: bestMudra.name, startTime: Date.now() };
        } else if (Date.now() - masteryTimer.current.startTime > 1500) {
          // Mastered! Add to timeline
          setTimeline(t => {
            if (t.length > 0 && t[0].name === bestMudra.name && Date.now() - t[0].time < 5000) return t;
            return [{
              name: bestMudra.name,
              confidence: Math.round(bestMudra.confidence * 100),
              time: Date.now(),
              id: Math.random()
            }, ...t].slice(0, 10);
          });
          masteryTimer.current = { name: bestMudra.name, startTime: Date.now() }; 
        }
        
        sessionStats.current.totalAccuracy += (bestMudra.confidence * 100);
        sessionStats.current.count += 1;
      } else {
        masteryTimer.current = null;
      }

      const prevMudrasStr = JSON.stringify(prev.detectedMudra?.map((m: any) => ({ n: m.name, c: Math.round(m.confidence * 10) })) || []);
      const newMudrasStr = JSON.stringify(mudraData?.map((m: any) => ({ n: m.name, c: Math.round(m.confidence * 10) })) || []);
      
      const mudraChanged = prevMudrasStr !== newMudrasStr;

      if (!mudraChanged && !landmarkData) return prev;

      return {
        landmarks: landmarkData,
        detectedMudra: mudraChanged ? mudraData : prev.detectedMudra
      };
    });
  }, [timeline]);

  return (
    <div className="pt-24 min-h-screen bg-background px-6 pb-12">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6 items-start">
        
        {/* Mobile Quick Actions */}
        <div className="lg:hidden col-span-full flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
             <div className="w-10 h-10 rounded-xl bg-accent-violet/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent-violet" />
             </div>
             <div>
                <h2 className="text-lg font-bold">Live AI Practice</h2>
                <p className="text-[10px] text-foreground/40 uppercase font-black tracking-widest">Real-time Landmark Tracking</p>
             </div>
          </div>
          <motion.a 
            href="/upload"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-xl hover:bg-foreground/10 transition-colors group"
          >
            <Camera className="w-4 h-4 text-primary group-hover:animate-pulse" />
            <span className="text-xs font-bold">Upload Photo</span>
          </motion.a>
        </div>

        {/* Camera View */}
        <div className="lg:col-span-8 lg:col-start-1">
          <div className="relative aspect-video glass-card overflow-hidden bg-background/40 border-foreground/5 shadow-2xl">
            <CameraFeed 
              isActive={isCameraActive} 
              onUpdate={handleUpdate}
              showLandmarks={showLandmarks}
              showSkeleton={showSkeleton}
            />
            
            {!isCameraActive && (
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                  <Camera className="w-10 h-10 text-primary" />
                </div>
                <p className="text-foreground/40 font-medium">Camera is inactive</p>
                <button 
                  onClick={() => setIsCameraActive(true)}
                  className="premium-button"
                >
                  Start Live Camera
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Control Panel */}
        <div className="lg:col-span-8 lg:col-start-1">
          <ControlPanel 
            isActive={isCameraActive}
            onToggleCamera={() => setIsCameraActive(!isCameraActive)}
            showLandmarks={showLandmarks}
            onToggleLandmarks={() => setShowLandmarks(!showLandmarks)}
            showSkeleton={showSkeleton}
            onToggleSkeleton={() => setShowSkeleton(!showSkeleton)}
          />
        </div>

        {/* Prediction Panel */}
        <div className="lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:row-span-3 space-y-6">
          <PredictionPanel 
            detectedMudras={session.detectedMudra || []} 
            landmarks={session.landmarks}
          />
        </div>

        {/* Statistics & Timeline */}
        <div className="lg:col-span-8 lg:col-start-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          <JointsGrid landmarks={session.landmarks} />
          
          <div className="glass-card p-6 min-h-[400px] flex flex-col">
            <h3 className="text-lg font-bold mb-6 flex items-center space-x-2">
              <span className="w-2 h-2 bg-accent-violet rounded-full" />
              <span>Session Timeline</span>
            </h3>
            
            <div className="flex-1 space-y-4 overflow-y-auto pr-2 no-scrollbar">
              {timeline.length > 0 ? (
                timeline.map((event) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={event.id} 
                    className="flex items-center justify-between p-4 bg-foreground/[0.03] rounded-xl border border-foreground/5"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold">{event.name}</h4>
                        <p className="text-[10px] text-foreground/30 uppercase font-black">{format(event.time, 'HH:mm:ss')}</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <span className="text-xs font-black text-green-400">PERFECT</span>
                       <p className="text-[10px] text-foreground/20 uppercase font-black">{event.confidence}% Match</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-foreground/10 flex items-center justify-center">
                     <Clock className="w-5 h-5 text-foreground/10" />
                  </div>
                  <p className="text-foreground/20 text-xs italic font-medium max-w-[200px]">
                    {isCameraActive ? "Perform a mudra with >85% confidence to log a mastery event." : "Start camera to track session timeline."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


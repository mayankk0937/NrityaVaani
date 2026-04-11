'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileImage, FileVideo, CheckCircle, Loader2, Sparkles, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';
import { classifyMudra } from '@/lib/mediapipe/classification';

export default function UploadAnalysisPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const handLandmarkerRef = useRef<HandLandmarker | null>(null);

  // Initialize MediaPipe for IMAGE mode
  useEffect(() => {
    const initDetector = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        
        handLandmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
            delegate: "GPU"
          },
          runningMode: "IMAGE",
          numHands: 2
        });
      } catch (err) {
        console.error("Failed to initialize AI model:", err);
      }
    };

    initDetector();
    
    return () => {
      if (handLandmarkerRef.current) {
        handLandmarkerRef.current.close();
      }
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setResults(null);
      setError(null);
    }
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setPreviewUrl(null);
    setResults(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const runAnalysis = async () => {
    if (!handLandmarkerRef.current || !imageRef.current) {
      setError("AI core is not ready yet. Please wait a moment.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Run detection on the static image
      const detectionResult = handLandmarkerRef.current.detect(imageRef.current);
      
      let detectedMudras: any[] = [];
      if (detectionResult.landmarks && detectionResult.landmarks.length > 0) {
        detectionResult.landmarks.forEach((hand: any, index: number) => {
          const handedness = detectionResult.handednesses?.[index]?.[0]?.categoryName || 'Unknown';
          const mudra = classifyMudra(hand, handedness);
          if (mudra) {
            detectedMudras.push({ handedness, ...mudra });
          }
        });
      }

      setResults(detectedMudras);
    } catch (err) {
      console.error("Detection failed:", err);
      setError("Failed to analyze image. Ensure the file is a valid image format.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen relative">
      <div className="bg-blob blob-violet -top-40 -left-40" />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Media <span className="text-accent-pink">Analysis</span></h1>
          <p className="text-white/40">Upload an image to get detailed AI feedback on your mudras.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Upload Area */}
          <div className="space-y-6">
            <div 
              onClick={() => !file && fileInputRef.current?.click()}
              className={`glass-card border-dashed border-2 p-4 relative flex flex-col items-center justify-center transition-all overflow-hidden ${
                file ? 'border-white/20' : 'border-white/10 cursor-pointer hover:bg-white/5 hover:border-primary/50 group min-h-[300px]'
              }`}
            >
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleFileChange}
                accept="image/*"
              />
              
              {file && previewUrl ? (
                <div className="w-full relative rounded-xl overflow-hidden group">
                  {/* Next.js Image component optimization is skipped for dynamic user uploads blobs */}
                  <img 
                    ref={imageRef} 
                    src={previewUrl} 
                    alt="Upload preview" 
                    className="w-full object-cover max-h-[400px]" 
                  />
                  <button 
                    onClick={clearFile}
                    className="absolute top-3 right-3 w-8 h-8 bg-black/60 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-red-500/80 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6 text-white/40" />
                  </div>
                  <p className="text-white font-bold mb-2">Click to upload media</p>
                  <p className="text-white/30 text-xs text-center">Supports JPG, PNG up to 10MB</p>
                </>
              )}
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center space-x-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <button
              onClick={runAnalysis}
              disabled={!file || isAnalyzing}
              className={`w-full premium-button flex items-center justify-center space-x-2 ${(!file || isAnalyzing) && 'opacity-50 cursor-not-allowed'}`}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run AI Analysis</span>
                </>
              )}
            </button>
          </div>

          {/* Results Area */}
          <div className="glass-card p-8 flex flex-col min-h-[400px]">
            <h3 className="text-lg font-bold mb-8 flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Analysis Results</span>
            </h3>

            <AnimatePresence mode="wait">
              {results ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {results.length > 0 ? results.map((result, index) => (
                    <div key={`${result.name}-${index}`} className="relative bg-white/5 rounded-2xl p-6 border border-white/10">
                      <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-1">{result.handedness} Hand</p>
                      <h2 className="text-3xl font-black text-white mb-6">{result.name}</h2>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                          <p className="text-[10px] text-white/30 font-bold uppercase mb-1">Confidence</p>
                          <div className="flex items-end space-x-2">
                            <h3 className="text-2xl font-bold text-primary leading-none">
                              {Math.round(result.confidence * 100)}%
                            </h3>
                          </div>
                        </div>
                        <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                          <p className="text-[10px] text-white/30 font-bold uppercase mb-1">AI Coach</p>
                          <p className="text-xs font-medium text-white/80 line-clamp-3 leading-relaxed">
                            {result.feedback}
                          </p>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-white/5 rounded-2xl border border-white/10">
                      <AlertCircle className="w-10 h-10 text-white/20 mb-4" />
                      <p className="text-white font-bold mb-2 text-lg">No Mudras Detected</p>
                      <p className="text-sm text-white/40">The AI could not confidently identify a hand in the image. Please upload a clear photo.</p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30">
                  <FileImage className="w-12 h-12 mb-4" />
                  <p className="text-sm">Upload media and run analysis to see insights.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

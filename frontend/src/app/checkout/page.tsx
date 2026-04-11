'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Zap, CreditCard, ShieldCheck, Smartphone, QrCode } from 'lucide-react';
import Link from 'next/link';
import TiltCard from '@/components/shared/TiltCard';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const planName = searchParams.get('plan') || 'Yoddha';
  const price = searchParams.get('price') || '1499';
  const upiId = "8766231150@ptyes";
  
  // Construct UPI URL: upi://pay?pa=VPA&pn=NAME&am=AMOUNT&cu=CURRENCY&tn=NOTE
  const upiUrl = `upi://pay?pa=${upiId}&pn=NrityaVaani&am=${price}&cu=INR&tn=Subscription%20for%20${planName}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiUrl)}`;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-white/50 hover:text-primary transition-colors mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold uppercase tracking-widest text-xs">Back to Plans</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl font-black mb-6 tracking-tighter">Complete Your <br /><span className="text-primary">Subscription</span></h1>
            <p className="text-white/40 text-lg mb-12">Set up your secure UPI payment to unlock full AI capabilities.</p>

            <TiltCard>
              <div className="glass-card p-8 border-primary/20 bg-primary/5">
                <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/10">
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white">{planName} Plan</h3>
                    <p className="text-white/40 text-sm">Monthly AI Neural Engine Access</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-primary">₹{price}</p>
                    <p className="text-white/30 text-xs">plus 0% platform fee</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-white/60">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>Instant activation after payment</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/60">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>Secure end-to-end encryption</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/60">
                    <ShieldCheck className="w-5 h-5 text-accent-cyan" />
                    <span>Startup Pitch Secure Gateway</span>
                  </div>
                </div>
              </div>
            </TiltCard>

            <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/5 flex items-start space-x-4">
              <Zap className="w-6 h-6 text-accent-gold shrink-0" />
              <p className="text-xs text-white/40 leading-relaxed">
                Note: This is a secure transaction page. Once the payment is verified, your Yoddha/Guru dashboard will be initialized automatically. 
              </p>
            </div>
          </motion.div>

          {/* Payment Method */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="glass-card p-10 relative overflow-hidden">
               <div className="text-center mb-10">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
                    <Smartphone className="w-3 h-3" />
                    <span>Instant UPI Redirect</span>
                  </div>
                  <h3 className="text-3xl font-black mb-2">Scan or Tap to Pay</h3>
                  <p className="text-white/40 text-sm uppercase font-bold tracking-widest">Merchant: NrityaVaani Labs</p>
               </div>

               <div className="flex flex-col items-center">
                  <div className="p-4 bg-white rounded-3xl mb-10 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                    <img src={qrUrl} alt="UPI QR Code" className="w-64 h-64" />
                  </div>

                  <p className="text-white/30 text-xs mb-8">UPI ID: <span className="text-white font-mono">{upiId}</span></p>

                  <a 
                    href={upiUrl}
                    className="premium-button w-full py-6 flex items-center justify-center space-x-4 text-xl group"
                  >
                    <Smartphone className="w-6 h-6" />
                    <span>Open Any UPI App</span>
                  </a>

                  <div className="mt-8 flex items-center justify-center space-x-6 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                    <span className="text-[10px] font-black uppercase">Powered by</span>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo.png/640px-UPI-Logo.png" alt="UPI" className="h-6" />
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-primary font-black uppercase tracking-widest animate-pulse">Initializing Neural Gateway...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

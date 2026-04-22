'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Github, Loader2 } from 'lucide-react';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError("Invalid email or password");
        setIsLoading(false);
      } else {
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="bg-blob blob-saffron -top-40 -left-40" />
      <div className="bg-blob blob-violet -bottom-40 -right-40" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-card p-10 relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
            <span className="text-black font-bold text-xl">N</span>
          </div>
          <h1 className="text-3xl font-black mb-2">Welcome Back</h1>
          <p className="text-foreground/40 text-sm">Sign in to continue your mudra journey.</p>
        </div>

        <form className="space-y-6" onSubmit={handleCredentialsLogin}>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input type="checkbox" className="w-3 h-3 rounded bg-foreground/5 border-foreground/10 text-primary focus:ring-primary" />
              <span className="text-foreground/40 group-hover:text-foreground transition-colors">Remember me</span>
            </label>
            <Link href="/auth/forgot" className="text-primary hover:underline font-bold">Forgot password?</Link>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full premium-button flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="my-8 flex items-center space-x-4">
          <div className="flex-1 h-[1px] bg-foreground/10" />
          <span className="text-[10px] text-foreground/30 uppercase font-bold tracking-widest">Or continue with</span>
          <div className="flex-1 h-[1px] bg-foreground/10" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            disabled={isLoading}
            className="flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 transition-colors text-sm font-medium disabled:opacity-50"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </button>
          <button 
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 transition-colors text-sm font-medium disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )}
            <span>Google</span>
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-foreground/40">
          Don't have an account? <Link href="/auth/signup" className="text-primary hover:underline font-bold">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
}

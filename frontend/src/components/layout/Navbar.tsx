'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Camera, LayoutDashboard, Library, Info, LogIn, LogOut, Home, CreditCard, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Live Detection', href: '/live', icon: Camera },
  { name: 'Upload', href: '/upload', icon: Upload },
  { name: 'Library', href: '/library', icon: Library },
  { name: 'Pricing', href: '/#pricing', icon: CreditCard },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'About', href: '/about', icon: Info },
];
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6 py-4',
        scrolled ? 'bg-black/80 backdrop-blur-2xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)] shadow-primary/5' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform shrink-0">
            <span className="text-black font-bold text-xl">N</span>
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tight text-white font-heading truncate">
            Nritya<span className="text-primary font-extrabold tracking-tight">Vaani</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-primary transition-colors flex items-center space-x-2"
            >
              {link.name}
            </Link>
          ))}
          
          {session ? (
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden bg-white/5">
                  <img src={session.user?.image || ''} alt="" className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-bold text-white/50">{session.user?.name}</span>
              </div>
              <button
                onClick={() => signOut()}
                className="text-white/40 hover:text-red-400 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="premium-button flex items-center space-x-2 !py-2 !px-5 text-sm"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 p-6 md:hidden"
          >
            <div className="flex flex-col space-y-6">
              {session && (
                 <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 mb-2">
                    <div className="w-12 h-12 rounded-full border border-white/10 overflow-hidden">
                      <img src={session.user?.image || ''} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{session.user?.name}</h4>
                      <p className="text-xs text-white/40">{session.user?.email}</p>
                    </div>
                 </div>
              )}
              
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-white/70 hover:text-primary flex items-center space-x-3"
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              ))}

              {session ? (
                <button
                  onClick={() => signOut()}
                  className="premium-button bg-red-500/10 border-red-500/20 text-red-400 text-center"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="premium-button text-center"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

import Link from 'next/link';
import { Github, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-foreground/10 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">N</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground font-heading">
              Nritya<span className="text-primary">Vaani</span>
            </span>
          </Link>
          <p className="text-foreground/50 max-w-sm text-sm leading-relaxed">
            The next generation of AI-powered classical dance education. 
            Preserving heritage through state-of-the-art hand tracking technology.
          </p>
          <div className="flex items-center space-x-4">
            <Github className="w-5 h-5 text-foreground/40 hover:text-foreground cursor-pointer transition-colors" />
            <Twitter className="w-5 h-5 text-foreground/40 hover:text-foreground cursor-pointer transition-colors" />
            <Instagram className="w-5 h-5 text-foreground/40 hover:text-foreground cursor-pointer transition-colors" />
          </div>
        </div>

        <div>
          <h4 className="text-foreground font-semibold mb-6">Platform</h4>
          <ul className="space-y-4 text-sm text-foreground/50">
            <li><Link href="/live" className="hover:text-primary transition-colors">Live Detection</Link></li>
            <li><Link href="/library" className="hover:text-primary transition-colors">Mudra Library</Link></li>
            <li><Link href="/upload" className="hover:text-primary transition-colors">Upload Analysis</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-foreground font-semibold mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-foreground/50">
            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><a href="mailto:support@nrityavaani.com" className="hover:text-primary transition-colors">Contact (support@nrityavaani.com)</a></li>
            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-foreground/5 flex flex-col md:row items-center justify-between text-[12px] text-foreground/30 space-y-4 md:space-y-0 text-center">
        <p>© 2026 NrityaVaani. All rights reserved.</p>
        <p>Built for the Future of Classical Arts.</p>
      </div>
    </footer>
  );
}

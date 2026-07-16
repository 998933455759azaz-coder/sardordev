import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectsGrid from './components/ProjectsGrid';
import TechConstellation from './components/TechConstellation';
import SystemTerminal from './components/SystemTerminal';
import AdminPanel from './components/AdminPanel';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 overflow-x-hidden selection:bg-[#00f0ff]/30 selection:text-white font-sans scroll-smooth">
      <Header />
      <main>
        <Hero />
        <ProjectsGrid />
        <TechConstellation />
        <SystemTerminal />
      </main>

      <AnimatePresence>
        {isAdminOpen && (
          <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
        )}
      </AnimatePresence>
      
      {/* Footer Section */}
      <footer className="py-12 border-t border-white/5 bg-[#01040a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <p className="font-display font-bold text-sm text-white tracking-wide">
              Sardor Tuyginov
            </p>
            <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
              SECURE PORTFOLIO GATEWAY • ALL RIGHTS RESERVED © 2026
            </p>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="font-mono text-[8px] text-gray-700 hover:text-orange-500/80 uppercase tracking-widest transition-colors duration-200 cursor-pointer block mx-auto md:mx-0 mt-2"
              id="discreet-admin-launcher"
            >
              [ secure gateway ]
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 font-mono text-[10px] text-gray-500 uppercase tracking-wider">
            <a href="#overview" className="hover:text-[#00f0ff] transition-colors duration-200">OVERVIEW</a>
            <a href="#services" className="hover:text-[#ff5e00] transition-colors duration-200">SERVICES</a>
            <a href="#projects" className="hover:text-[#00f0ff] transition-colors duration-200">PROJECTS</a>
            <a href="#constellation" className="hover:text-[#ff5e00] transition-colors duration-200">STACK</a>
            <a href="#terminal" className="hover:text-[#00f0ff] transition-colors duration-200">TERMINAL</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

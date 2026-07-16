import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Menu, X, Terminal, Cpu, Globe } from 'lucide-react';
import { navItems } from '../data';
import { useApp } from '../context/AppContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useApp();

  const getTranslationLabel = (href: string, fallback: string) => {
    switch (href) {
      case '#overview': return t('nav.overview');
      case '#services': return t('nav.services');
      case '#projects': return t('nav.projects');
      case '#constellation': return t('nav.stack');
      case '#terminal': return t('nav.terminal');
      default: return fallback;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#030712]/60 backdrop-blur-md border-b border-white/5 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Bio Tag */}
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-[#00f0ff] to-[#ff5e00] p-[1px] shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <div className="flex items-center justify-center w-full h-full rounded-lg bg-gray-950">
                <Cpu className="w-5 h-5 text-[#00f0ff] animate-pulse" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-wide bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Sardor Tuyginov
              </span>
              <span className="font-mono text-[10px] text-[#00f0ff] tracking-tight flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
                Web & AI Architect
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative px-3 py-1.5 rounded-md font-sans text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                {getTranslationLabel(item.href, item.label)}
              </a>
            ))}
          </nav>

          {/* Social Icons / Contacts / Language */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="flex items-center bg-black/40 border border-white/5 rounded-lg p-0.5 font-mono text-[10px]">
              {(['uz', 'en', 'ru'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 rounded-md transition-all duration-200 font-bold cursor-pointer ${
                    language === lang
                      ? 'bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/30 shadow-[0_0_8px_rgba(0,240,255,0.15)]'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            <a
              href="https://github.com/tuyginovsardor4-rgb"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-[#00f0ff] transition-colors duration-200"
              id="github-header-link"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/sardor-tuyginov-833134382"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-[#ff5e00] transition-colors duration-200"
              id="linkedin-header-link"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#terminal"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#00f0ff]/20 bg-[#00f0ff]/5 hover:bg-[#00f0ff]/10 hover:border-[#00f0ff]/40 text-[#00f0ff] font-mono text-[11px] transition-all duration-300 glow-blue"
              id="terminal-cta-header"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>ST_DEV_SHELL</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Compact Mobile Language Selector */}
            <div className="flex items-center bg-black/40 border border-white/5 rounded-lg p-0.5 font-mono text-[9px]">
              {(['uz', 'en', 'ru'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-1.5 py-0.5 rounded transition-all duration-200 font-bold ${
                    language === lang
                      ? 'bg-[#00f0ff]/15 text-[#00f0ff]'
                      : 'text-gray-500'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white p-2 focus:outline-none"
              aria-label="Toggle Menu"
              id="mobile-menu-toggle-btn"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/5 bg-[#030712]/95 backdrop-blur-lg"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  {getTranslationLabel(item.href, item.label)}
                </a>
              ))}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between px-3">
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/tuyginovsardor4-rgb"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 hover:text-[#00f0ff] transition-all"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sardor-tuyginov-833134382"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 hover:text-[#ff5e00] transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
                <a
                  href="#terminal"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] font-mono text-xs"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>ST_DEV_SHELL</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

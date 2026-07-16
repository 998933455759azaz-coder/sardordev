import { useState } from 'react';
import { motion } from 'motion/react';
import { Brain, Bot, Cpu, Sparkles, Terminal, ArrowUpRight, CheckCircle2, Zap } from 'lucide-react';
import { servicesList } from '../data';
import { useApp } from '../context/AppContext';

export default function Hero() {
  const [activeService, setActiveService] = useState<string>('ai-integration');
  const { language, t } = useApp();

  // Map icon names to components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="w-5 h-5 text-[#00f0ff]" />;
      case 'Bot': return <Bot className="w-5 h-5 text-[#ff5e00]" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#00f0ff]" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  // Localized service helpers
  const getServiceData = (id: string, fallbackTitle: string, fallbackDesc: string) => {
    switch (id) {
      case 'ai-integration':
        return { title: t('services.ai_title'), desc: t('services.ai_desc') };
      case 'telegram-bot':
        return { title: t('services.bot_title'), desc: t('services.bot_desc') };
      case 'fullstack-dev':
        return { title: t('services.fs_title'), desc: t('services.fs_desc') };
      default:
        return { title: fallbackTitle, desc: fallbackDesc };
    }
  };

  return (
    <section id="overview" className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-60 pointer-events-none" />

      {/* Cyberpunk Neon Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#00f0ff]/10 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#ff5e00]/10 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Core Bio & Mission */}
        <div className="lg:col-span-7 flex flex-col md:flex-row gap-8 items-start text-left">
          
          {/* Biometric Avatar Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full sm:w-64 flex-shrink-0 flex flex-col items-center gap-3 relative mx-auto md:mx-0"
          >
            <div className="relative w-56 h-72 rounded-2xl border-2 border-[#00f0ff]/40 bg-black/50 overflow-hidden glow-blue group">
              {/* Corner glowing tech targets */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#00f0ff]" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#00f0ff]" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#00f0ff]" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#00f0ff]" />

              {/* Scanning laser line overlay */}
              <div className="absolute left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent animate-scan z-20 shadow-[0_0_12px_#00f0ff]" />

              {/* Grid backdrop */}
              <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

              {/* User Photo */}
              <img 
                src="https://i.ibb.co/j912ymZv/Gemini-Generated-Image-wbxlzowbxlzowbxl-1.png" 
                alt="Sardor Tuyginov" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-95 group-hover:brightness-105 group-hover:scale-110 transition-all duration-500"
              />

              {/* Futuristic overlay data tag */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/85 to-transparent p-4 text-left font-mono">
                <span className="block text-[8px] text-[#00f0ff] uppercase tracking-widest">HOST_IDENTITY</span>
                <span className="block text-xs text-white font-bold tracking-wider truncate">SARDOR_TUYGINOV</span>
                <div className="flex items-center justify-between mt-1 text-[9px] text-gray-400">
                  <span>SEC_LEVEL_04</span>
                  <span className="flex items-center gap-1 text-[#00f0ff]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
                    SYNCED
                  </span>
                </div>
              </div>
            </div>

            {/* Sub-label telemetry information */}
            <div className="w-56 text-left font-mono text-[9px] text-gray-400 space-y-1">
              <div className="flex justify-between">
                <span>COORD:</span>
                <span className="text-[#00f0ff]">41.31° N, 69.24° E</span>
              </div>
              <div className="flex justify-between">
                <span>STATUS:</span>
                <span className="text-[#ff5e00] font-bold">HOST_AUTHORIZED</span>
              </div>
            </div>
          </motion.div>

          {/* Info Details Column */}
          <div className="flex-1 flex flex-col space-y-6">
            
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="self-start inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f0ff]"></span>
              </span>
              <span className="font-mono text-[11px] text-gray-300 uppercase tracking-widest">
                {t('hero.badge')}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                {t('hero.heading_part1')} <br />
                <span className="bg-gradient-to-r from-[#00f0ff] via-sky-400 to-[#ff5e00] bg-clip-text text-transparent">
                  {t('hero.heading_gradient')}
                </span> <br />
                {t('hero.heading_part2')}
              </h1>
            </motion.div>

            {/* Subtitle / Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-sans text-sm sm:text-base text-gray-400 max-w-xl leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* Core Visual Metrics (Mini dashboard style) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-3 gap-4 py-3 max-w-lg border-y border-white/5 font-mono"
            >
              <div>
                <span className="block text-[10px] text-gray-500 uppercase">{t('hero.ping')}</span>
                <span className="text-sm font-semibold text-[#00f0ff]">42 ms</span>
              </div>
              <div>
                <span className="block text-[10px] text-gray-500 uppercase">{t('hero.responsiveness')}</span>
                <span className="text-sm font-semibold text-[#ff5e00]">99.98%</span>
              </div>
              <div>
                <span className="block text-[10px] text-gray-500 uppercase">{t('hero.protocols')}</span>
                <span className="text-sm font-semibold text-white">03 {t('hero.active')}</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <a
                href="#projects"
                className="px-5 py-3 rounded-lg bg-gradient-to-r from-[#00f0ff]/20 to-sky-500/10 hover:from-[#00f0ff]/30 hover:to-sky-500/20 border border-[#00f0ff]/30 text-white font-mono text-xs font-semibold tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.1)] flex items-center gap-2"
                id="view-projects-btn"
              >
                <span>{t('hero.explore_btn')}</span>
                <ArrowUpRight className="w-4 h-4 text-[#00f0ff]" />
              </a>
              
              <a
                href="#terminal"
                className="px-5 py-3 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 text-gray-300 font-mono text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-2"
                id="boot-terminal-btn"
              >
                <Terminal className="w-4 h-4" />
                <span>{t('hero.terminal_btn')}</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Floating Holographic Glass Card (Key Services) */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full max-w-md bg-[#090d1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_0_50px_rgba(0,240,255,0.1)] glow-blue transition-all duration-300 hover:border-white/15 group"
          >
            {/* Gloss Header Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5e00] opacity-80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
                <div className="w-3 h-3 rounded-full bg-[#00f0ff] opacity-80" />
              </div>
              <span className="font-mono text-[9px] text-gray-500 tracking-wider">HOLO_INTERFACE_v4.7</span>
            </div>

            {/* Glowing floating hardware lines */}
            <div className="absolute top-0 right-10 w-20 h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent" />
            <div className="absolute bottom-0 left-10 w-20 h-[1px] bg-gradient-to-r from-transparent via-[#ff5e00] to-transparent" />

            <h2 className="font-display text-sm font-bold text-white mb-2 tracking-wide flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00f0ff] animate-spin" style={{ animationDuration: '4s' }} />
              <span>{t('services.section_title')}</span>
            </h2>

            {/* Floating Glass Tab Containers */}
            <div className="space-y-3 mt-4">
              {servicesList.map((service) => {
                const isActive = activeService === service.id;
                const isBlue = service.accentColor === 'blue';
                const localized = getServiceData(service.id, service.title, service.description);

                return (
                  <div
                    key={service.id}
                    onClick={() => setActiveService(service.id)}
                    className={`cursor-pointer text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                      isActive
                        ? isBlue
                          ? 'border-[#00f0ff]/40 bg-[#00f0ff]/5 shadow-[0_0_15px_rgba(0,240,255,0.08)]'
                          : 'border-[#ff5e00]/40 bg-[#ff5e00]/5 shadow-[0_0_15px_rgba(255,94,0,0.08)]'
                        : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/10'
                    }`}
                    id={`hero-service-card-${service.id}`}
                  >
                    {/* Selected Left Highlight line */}
                    {isActive && (
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-[3px] ${
                          isBlue ? 'bg-[#00f0ff]' : 'bg-[#ff5e00]'
                        }`}
                      />
                    )}

                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`p-2 rounded-lg bg-gray-950 border ${isActive ? (isBlue ? 'border-[#00f0ff]/30' : 'border-[#ff5e00]/30') : 'border-white/5'}`}>
                        {getIcon(service.icon)}
                      </div>
                      <h3 className="font-display font-semibold text-xs text-white">
                        {localized.title}
                      </h3>
                    </div>

                    <p className={`font-sans text-[11px] leading-relaxed transition-all duration-300 ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                      {localized.desc}
                    </p>

                    {isActive && (
                      <div className="mt-3 flex items-center justify-between font-mono text-[9px] text-[#00f0ff] pt-2 border-t border-white/5">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#00f0ff]" />
                          Ready for Production
                        </span>
                        <span className="flex items-center gap-1 text-[#ff5e00]">
                          <Zap className="w-3 h-3 text-[#ff5e00] animate-bounce" />
                          Sub-100ms Latency
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}

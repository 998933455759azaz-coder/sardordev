import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, Brain, ShieldCheck, ExternalLink, 
  Terminal, Cpu, ArrowUpRight, CheckCircle2, 
  Code, Sparkles, RefreshCcw 
} from 'lucide-react';
import { projectsList } from '../data';
import { ProjectItem } from '../types';
import { useApp } from '../context/AppContext';

export default function ProjectsGrid() {
  const { language, t } = useApp();
  const [selectedProject, setSelectedProject] = useState<string>('codeusta');
  const [compilingState, setCompilingState] = useState<Record<string, boolean>>({});
  const [terminalLogs, setTerminalLogs] = useState<Record<string, string[]>>({
    codeusta: [
      'SYSTEM: Booted Codeusta.uz server core...',
      'DB: Connected to PostgreSQL cluster.',
      'SANDBOX: Sandbox compiler pool initialized (0.0ms delay).',
      'MONITOR: Lobbies checking active connections: 4,820 online.'
    ],
    intelektai: [
      'SYSTEM: Booted IntelektAi.uz central LLM agent...',
      'MODEL: Local Gemini SDK active, caching layer active.',
      'RAG: Vector store online, indexing 124 internal documents.',
      'MONITOR: Webhook router primed for corporate Slack/Telegram sync.'
    ],
    makerpay: [
      'SYSTEM: Booted Makerpay.uz processing gateway...',
      'SECURITY: AES-256 integrity checkers: OK.',
      'GATEWAY: Active merchant tunnels opened with Humo/Uzcard APIs.',
      'MONITOR: Auto-settlement worker pool: Standby.'
    ]
  });

  // Localized project details based on translations.ts and user intent
  const getProjectTranslation = (id: string) => {
    switch (id) {
      case 'codeusta':
        return {
          desc: t('projects.codeusta_desc'),
          features: [
            language === 'uz' ? 'O\'zbekiston bo\'ylab 4,800+ faol talabalar hamjamiyati' :
            language === 'ru' ? 'Сообщество из 4,800+ активных студентов по Узбекистану' :
            'Community of 4,800+ active students across Uzbekistan',
            
            language === 'uz' ? 'Avtomatlashtirilgan kod tekshirish qumligi (Sandbox)' :
            language === 'ru' ? 'Автоматическая песочница проверки кода (Sandbox)' :
            'Automated code-testing compilation sandbox',
            
            language === 'uz' ? 'Mentorlar va guruhlar boshqaruvi uchun murakkab CRM' :
            language === 'ru' ? 'Сложная CRM для менторов и управления группами' :
            'Intricate CRM for mentors and group progress',
            
            language === 'uz' ? 'Jonli interaktiv dars xonalari va video darslar tizimi' :
            language === 'ru' ? 'Система интерактивных онлайн-классов и видеоуроков' :
            'Interactive live classrooms and video stream pools'
          ],
          statsLabel: t('projects.stat_learners'),
          statsValue: '4,820 online'
        };
      case 'intelektai':
        return {
          desc: t('projects.intelektai_desc'),
          features: [
            language === 'uz' ? 'LLM (Gemini, GPT) modellarini nozik sozlash (Fine-tuning)' :
            language === 'ru' ? 'Тонкая настройка (Fine-tuning) LLM моделей (Gemini, GPT)' :
            'Fine-tuned LLM (Gemini, GPT) enterprise nodes',
            
            language === 'uz' ? 'Katta korporativ ma\'lumotlar bazalari uchun RAG integratsiyasi' :
            language === 'ru' ? 'Интеграция RAG для массивных корпоративных баз данных' :
            'RAG search retrieval over massive enterprise document stores',
            
            language === 'uz' ? 'Telegram, Slack va CRM kanallarining avtomatlashtirilgan routerlari' :
            language === 'ru' ? 'Автоматизированные роутеры для Telegram, Slack и CRM' :
            'Automated multi-channel routers (Telegram, Slack, CRMs)',
            
            language === 'uz' ? 'Yuqori yuklamali neyron tarmoq API xizmati' :
            language === 'ru' ? 'Высоконагруженное API нейросети' :
            'High-throughput inference API server'
          ],
          statsLabel: language === 'uz' ? 'Kunlik So\'rovlar' : language === 'ru' ? 'Запросы/День' : t('projects.stat_api') || 'API Requests',
          statsValue: '185K req/day'
        };
      case 'makerpay':
        return {
          desc: t('projects.makerpay_desc'),
          features: [
            language === 'uz' ? 'Humo va Uzcard to\'lov shlyuzlarining to\'g\'ridan-to\'g\'ri API ulanishi' :
            language === 'ru' ? 'Прямое API подключение платежных шлюзов Humo и Uzcard' :
            'Direct core API tunnels for Humo & Uzcard billing nodes',
            
            language === 'uz' ? 'PCI-DSS xavfsizlik standarti talablariga mos keladigan kiber-shifrlash' :
            language === 'ru' ? 'Шифрование, соответствующее стандартам безопасности PCI-DSS' :
            'Cryptographic isolation complying with PCI-DSS guidelines',
            
            language === 'uz' ? 'Telegram botlar va do\'konlar uchun tayyor checkout vidjetlari' :
            language === 'ru' ? 'Готовые виджеты оплаты для Telegram ботов и сайтов' :
            'Ready-to-use drop-in checkout widgets for bots & SPAs',
            
            language === 'uz' ? 'Komissiyasiz lahzalik to\'lov hisob-kitobi (Instant Settlements)' :
            language === 'ru' ? 'Мгновенные выплаты без комиссии (Instant Settlements)' :
            'Instant, zero-friction merchant settlement pipelines'
          ],
          statsLabel: t('projects.stat_volume'),
          statsValue: '99.997%'
        };
      default:
        return null;
    }
  };

  const getStatusTranslation = (status: string) => {
    if (status === 'online') return t('projects.status_online') || 'ONLINE';
    if (status === 'active') return t('projects.status_active') || 'ACTIVE';
    return t('projects.status_optimizing') || 'OPTIMIZING';
  };

  // Handle a simulation of running diagnostic compile tests on these projects
  const runDiagnostics = (projectId: string) => {
    if (compilingState[projectId]) return;
    
    setCompilingState(prev => ({ ...prev, [projectId]: true }));
    
    const project = projectsList.find(p => p.id === projectId);
    const projectName = project ? project.name : 'System';

    // Add immediate compiling log
    setTerminalLogs(prev => ({
      ...prev,
      [projectId]: [
        ...prev[projectId],
        `[${new Date().toLocaleTimeString()}] COMPILING: Initiating test pipelines for ${projectName}...`,
        `[${new Date().toLocaleTimeString()}] SEC_AUDIT: Verifying dependencies integrity...`
      ]
    }));

    setTimeout(() => {
      setTerminalLogs(prev => ({
        ...prev,
        [projectId]: [
          ...prev[projectId],
          `[${new Date().toLocaleTimeString()}] TEST: Executing unit checkers... (14/14 passed)`,
          `[${new Date().toLocaleTimeString()}] BUILD: Build successful. Manifest bundle generated.`,
          `[${new Date().toLocaleTimeString()}] OK: System diagnostics return safe status (Green).`
        ]
      }));
      setCompilingState(prev => ({ ...prev, [projectId]: false }));
    }, 2000);
  };

  // Get project icon based on ID
  const getProjectIcon = (id: string, color: string) => {
    switch (id) {
      case 'codeusta':
        return (
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-blue-950/80 border border-[#00f0ff]/30 text-[#00f0ff]">
            {/* Pulsing ring inside */}
            <span className="absolute inset-0 rounded-xl bg-[#00f0ff]/5 animate-pulse" />
            <BookOpen className="w-6 h-6" />
          </div>
        );
      case 'intelektai':
        return (
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-orange-950/80 border border-[#ff5e00]/30 text-[#ff5e00]">
            <span className="absolute inset-0 rounded-xl bg-[#ff5e00]/5 animate-ping" style={{ animationDuration: '3s' }} />
            <Brain className="w-6 h-6" />
          </div>
        );
      case 'makerpay':
        return (
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-950/80 border border-yellow-500/30 text-yellow-500">
            <span className="absolute inset-0 rounded-xl bg-yellow-500/5 animate-pulse" style={{ animationDuration: '2.5s' }} />
            <ShieldCheck className="w-6 h-6" />
          </div>
        );
      default:
        return <Cpu className="w-6 h-6" />;
    }
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#030712]">
      {/* Decorative Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      {/* Decorative vertical/horizontal divider glow lines */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#00f0ff]/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#ff5e00]/20 bg-[#ff5e00]/5 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#ff5e00]" />
            <span className="font-mono text-[10px] text-gray-300 uppercase tracking-widest">MAJOR_PROJECT_ROSTER</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t('projects.section_title')}
          </h2>
          <p className="font-sans text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            {language === 'uz' ? 'Sardor tomonidan ishlab chiqilgan va optimallashtirilgan asosiy ishlab chiqarish platformalari. Aloqa va terminal orqali diagnostika qilish uchun loyihalardan birini bosing.' :
             language === 'ru' ? 'Основные производственные платформы, спроектированные и оптимизированные Сардором. Нажмите на проект для запуска диагностики.' :
             'These major applications represent production platforms designed, built, and optimized by Sardor. Click any system to boot interactive debug parameters.'}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Projects Selector Left List (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            {projectsList.map((project) => {
              const isSelected = selectedProject === project.id;
              const projectData = getProjectTranslation(project.id) || {
                desc: project.description,
                features: project.features,
                statsLabel: project.stats.label,
                statsValue: project.stats.value
              };
              
              // Pick correct glows
              let cardStyle = "border-white/5 bg-[#090d1a]/20";
              let labelColor = "text-[#00f0ff]";
              if (isSelected) {
                if (project.glowColor === 'blue') {
                  cardStyle = "border-[#00f0ff]/30 bg-[#00f0ff]/5 glow-blue";
                  labelColor = "text-[#00f0ff]";
                } else if (project.glowColor === 'orange') {
                  cardStyle = "border-[#ff5e00]/30 bg-[#ff5e00]/5 glow-orange";
                  labelColor = "text-[#ff5e00]";
                } else {
                  cardStyle = "border-yellow-500/30 bg-yellow-500/5 shadow-[0_0_20px_rgba(234,179,8,0.1)]";
                  labelColor = "text-yellow-500";
                }
              }

              return (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project.id)}
                  className={`p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 cursor-pointer relative overflow-hidden group ${cardStyle}`}
                  id={`project-card-${project.id}`}
                >
                  {/* Outer edge pulsing dot */}
                  <div className="absolute top-4 right-4 flex items-center space-x-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        project.status === 'online' ? 'bg-emerald-500' : project.status === 'active' ? 'bg-sky-500' : 'bg-yellow-500'
                      }`}></span>
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${
                        project.status === 'online' ? 'bg-emerald-500' : project.status === 'active' ? 'bg-sky-500' : 'bg-yellow-500'
                      }`}></span>
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-gray-500">
                      {getStatusTranslation(project.status)}
                    </span>
                  </div>

                  {/* Top-aligned absolute grid pattern inside hovered cards */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 relative z-10">
                    
                    {/* Visual Icon Module */}
                    <div className="flex-shrink-0">
                      {getProjectIcon(project.id, project.glowColor)}
                    </div>

                    {/* Descriptive Core Content */}
                    <div className="flex-1 text-left space-y-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-display font-bold text-lg text-white group-hover:text-white transition-colors">
                          {project.name}
                        </h3>
                        <span className="font-mono text-xs text-gray-500">
                          ({project.domain})
                        </span>
                      </div>

                      <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed">
                        {projectData.desc}
                      </p>

                      {/* Displaying tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded bg-gray-950 border border-white/5 text-gray-400 font-mono text-[10px]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Display features inside on selection */}
                      {isSelected && (
                        <div className="pt-4 border-t border-white/5 space-y-2">
                          <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">{t('projects.features_title') || 'INTELLIGENT MODULE PARAMETERS'}:</h4>
                          <ul className="space-y-1.5">
                            {projectData.features.map((feat, idx) => (
                              <li key={idx} className="flex items-center gap-2 font-sans text-xs text-gray-300">
                                <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${labelColor}`} />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Selection Glow strip */}
                  {isSelected && (
                    <div className={`absolute bottom-0 left-0 right-0 h-[2px] ${
                      project.glowColor === 'blue' ? 'bg-[#00f0ff]' : project.glowColor === 'orange' ? 'bg-[#ff5e00]' : 'bg-yellow-500'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Interactive Virtual Console Right Widget (5 Columns) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-2xl border border-white/10 bg-[#090d1a]/50 backdrop-blur-xl p-5 shadow-2xl relative overflow-hidden">
              
              {/* Header metadata bar */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">LIVE INTERACTIVE SHELL</span>
                </div>
                <div className="flex items-center space-x-1.5 font-mono text-[9px] text-gray-500">
                  <span>PING: 10ms</span>
                  <span>|</span>
                  <span>NODE: US-WEST</span>
                </div>
              </div>

              {/* Glowing decorative border line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent" />

              {/* Status Details Grid */}
              {projectsList.map((project) => {
                if (project.id !== selectedProject) return null;
                
                const isBlue = project.glowColor === 'blue';
                const isOrange = project.glowColor === 'orange';
                const projectData = getProjectTranslation(project.id) || {
                  desc: project.description,
                  features: project.features,
                  statsLabel: project.stats.label,
                  statsValue: project.stats.value
                };
                
                return (
                  <div key={project.id} className="space-y-4 text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">TARGET SYSTEM</span>
                        <span className="font-display font-bold text-base text-white">{project.name}</span>
                      </div>

                      <div className="text-right">
                        <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest">{projectData.statsLabel}</span>
                        <span className={`font-mono text-base font-semibold ${
                          isBlue ? 'text-[#00f0ff]' : isOrange ? 'text-[#ff5e00]' : 'text-yellow-500'
                        }`}>{projectData.statsValue}</span>
                      </div>
                    </div>

                    {/* Fake Live Code terminal log screen */}
                    <div className="bg-black/80 rounded-lg p-3 border border-white/5 font-mono text-[11px] text-gray-400 space-y-1.5 h-48 overflow-y-auto relative scrollbar">
                      <div className="absolute top-2 right-2 flex items-center space-x-1">
                        <div className="w-2 h-2 rounded-full bg-red-500/40" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                        <div className="w-2 h-2 rounded-full bg-green-500/40" />
                      </div>

                      {terminalLogs[project.id].map((log, index) => (
                        <div key={index} className="leading-relaxed break-all">
                          <span className="text-gray-600 font-bold">&gt;</span> {log}
                        </div>
                      ))}

                      {compilingState[project.id] && (
                        <div className="flex items-center gap-2 text-[#00f0ff] animate-pulse">
                          <span>⚙️ Executing system check modules...</span>
                        </div>
                      )}
                    </div>

                    {/* Interactive Action Control */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => runDiagnostics(project.id)}
                        disabled={compilingState[project.id]}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border font-mono text-xs font-semibold tracking-wide transition-all duration-300 ${
                          compilingState[project.id] 
                            ? 'bg-white/5 border-white/10 text-gray-500 cursor-not-allowed'
                            : isBlue
                              ? 'border-[#00f0ff]/30 bg-[#00f0ff]/10 text-[#00f0ff] hover:bg-[#00f0ff]/20 glow-blue'
                              : isOrange
                                ? 'border-[#ff5e00]/30 bg-[#ff5e00]/10 text-[#ff5e00] hover:bg-[#ff5e00]/20 glow-orange'
                                : 'border-yellow-500/30 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.1)]'
                        }`}
                        id={`diagnostic-btn-${project.id}`}
                      >
                        <RefreshCcw className={`w-3.5 h-3.5 ${compilingState[project.id] ? 'animate-spin' : ''}`} />
                        <span>RUN RE-COMPILATION TEST</span>
                      </button>
                    </div>

                    <div className="p-3.5 rounded-lg border border-white/5 bg-white/[0.01] flex items-center gap-3">
                      <div className="p-2 rounded bg-gray-950 border border-white/5 text-gray-500 flex-shrink-0">
                        <Code className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest">REPOSITORY PATH</span>
                        <span className="block font-sans text-xs text-gray-300 truncate font-medium">github.com/sardor-tuyginov/{project.id}</span>
                      </div>
                      <a
                        href={`https://github.com/sardor-tuyginov/${project.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                  </div>
                );
              })}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

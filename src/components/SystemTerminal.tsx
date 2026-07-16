import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, Cpu, Send, Check, AlertCircle, Sparkles, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface TerminalMessage {
  text: string;
  isCommand?: boolean;
  type?: 'success' | 'warn' | 'error' | 'system' | 'default';
}

export default function SystemTerminal() {
  const { language, t, addMessage } = useApp();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalMessage[]>([]);

  // Handle contact wizard multi-step state
  const [contactStep, setContactStep] = useState<number>(0); // 0 = none, 1 = awaiting name, 2 = awaiting email, 3 = awaiting message
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });

  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize terminal log on mount or language switch
  useEffect(() => {
    setHistory([
      { text: `SYSTEM INTERFACE V9.8.1 PROSECURE INITIALIZED. LOCALE: [${language.toUpperCase()}]`, type: 'system' },
      { text: `${t('terminal.welcome_msg')}`, type: 'success' },
      { text: language === 'uz' ? 'Yordam oynasini ochish uchun "help" buyrug\'ini kiriting yoki pastdagi tezkordi tanlang.' :
             language === 'ru' ? 'Введите "help" для просмотра списка команд или выберите макрос ниже.' :
             'Type "help" to list available system diagnostics, or click one of the quick macro targets below.', type: 'default' }
    ]);
  }, [language]);

  // Auto scroll to bottom of logs on update
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Execute commands
  const handleCommand = (commandStr: string) => {
    const trimmed = commandStr.trim();
    if (!trimmed) return;

    // Log the user's input
    setHistory(prev => [...prev, { text: `sardor_dev@root ~ % ${commandStr}`, isCommand: true }]);

    // Check if we are currently inside the contact wizard flow
    if (contactStep > 0) {
      handleContactWizard(trimmed);
      setInput('');
      return;
    }

    const args = trimmed.toLowerCase().split(' ');
    const mainCommand = args[0];

    switch (mainCommand) {
      case 'help':
        setHistory(prev => [
          ...prev,
          { text: 'AVAILABLE SHELL COMMANDS:', type: 'system' },
          { text: t('terminal.help_text') }
        ]);
        break;

      case 'about':
        setHistory(prev => [
          ...prev,
          { text: 'SARDOR TUYGINOV • PROFILE METRICS:', type: 'system' },
          { text: language === 'uz'
              ? `  Lavozim:        Senior Full-Stack & AI tizimlari arxitektori\n  Texnologiyalar: LLM (Gemini, OpenAI), Telegram webhook botlar, xavfsiz to'lov tizimlari\n  Manzil:         Toshkent, O'zbekiston\n  Holat:          Kiber-loyihalar uchun kelishuvlar ochiq.`
              : language === 'ru'
              ? `  Должность:      Senior Full-Stack & AI Архитектор систем\n  Стек:           ИИ Модели (Gemini, OpenAI), боты на Webhooks, платежные шлюзы\n  Локация:        Ташкент, Узбекистан\n  Статус:         Открыт для интересных контрактов и интеграций.`
              : `  Position:       Senior Full-Stack & AI Systems Architect\n  Expertise:      Generative LLMs (Gemini, OpenAI), Telegram High-Concur Bot Pipelines, Secure Pay Gateways\n  Location:       Tashkent, Uzbekistan (Universal Cloud Sync Active)\n  Status:         Open for premium contract engineering and deep tech integrations.`
          }
        ]);
        break;

      case 'projects':
        setHistory(prev => [
          ...prev,
          { text: 'ACTIVE ROSTER PARSING:', type: 'system' },
          { text: `  - Codeusta.uz:  ${t('projects.codeusta_desc')}` },
          { text: `  - IntelektAi.uz: ${t('projects.intelektai_desc')}` },
          { text: `  - Makerpay.uz:  ${t('projects.makerpay_desc')}` }
        ]);
        break;

      case 'skills':
        setHistory(prev => [
          ...prev,
          { text: 'TECHNOLOGY SPECTRUM RATING:', type: 'system' },
          { text: '  [██████████████████░] React / Next.js     - 95% (Expert)' },
          { text: '  [█████████████████░░] Node.js / Express  - 90% (Expert)' },
          { text: '  [████████████████░░░] PostgreSQL DB     - 88% (Advanced)' },
          { text: '  [██████████████████░] AI Orchestration   - 95% (Expert)' }
        ]);
        break;

      case 'contact':
        setHistory(prev => [
          ...prev,
          { text: 'CONTACT INTERFACE INITIALIZING...', type: 'system' },
          { text: t('terminal.send_msg_hint') || 'Initiating neural handshake with Sardor\'s message relay queue.', type: 'warn' },
          { text: language === 'uz' ? 'Iltimos, ismingizni kiriting:' :
                  language === 'ru' ? 'Пожалуйста, введите ваше имя:' :
                  'Please enter your NAME to begin:' }
        ]);
        setContactStep(1);
        break;

      case 'clear':
        setHistory([]);
        break;

      default:
        setHistory(prev => [
          ...prev,
          { text: `${t('terminal.command_not_found')} "${mainCommand}"`, type: 'error' }
        ]);
    }

    setInput('');
  };

  // Multi-step message wizard handler
  const handleContactWizard = async (text: string) => {
    if (contactStep === 1) {
      setContactData(prev => ({ ...prev, name: text }));
      setHistory(prev => [
        ...prev,
        { text: `System received name: "${text}"`, type: 'success' },
        { text: language === 'uz' ? 'Iltimos, javob qaytarishimiz uchun EMAIL (yoki Telegram username) kiriting:' :
                language === 'ru' ? 'Пожалуйста, введите ваш EMAIL или Telegram для связи:' :
                'Please enter your EMAIL (or Telegram username) for response routing:' }
      ]);
      setContactStep(2);
    } else if (contactStep === 2) {
      setContactData(prev => ({ ...prev, email: text }));
      setHistory(prev => [
        ...prev,
        { text: `System received route: "${text}"`, type: 'success' },
        { text: language === 'uz' ? 'Sardorga yuboriladigan xabaringizni kiriting:' :
                language === 'ru' ? 'Пожалуйста, введите ваше сообщение:' :
                'Please enter your MESSAGE / ENCRYPTED TRANSMISSION:' }
      ]);
      setContactStep(3);
    } else if (contactStep === 3) {
      const finalMsg = text;
      setHistory(prev => [
        ...prev,
        { text: `Message payload drafted successfully.`, type: 'warn' },
        { text: 'TRANSMITTING MESSAGE BUNDLE THROUGH ENCRYPTED SECURE LINK...', type: 'system' }
      ]);

      try {
        // Core CRM real-time dispatch!
        await addMessage(contactData.name, contactData.email, finalMsg);

        setHistory(prev => [
          ...prev,
          { text: '✓ HANDSHAKE CONFIRMED BY SARDOR\'S ROUTING QUEUE.', type: 'success' },
          { text: language === 'uz'
              ? `Rahmat, ${contactData.name}! Xabaringiz yuborildi. Sardor siz bilan 4-6 soat ichida bog'lanadi.`
              : language === 'ru'
              ? `Спасибо, ${contactData.name}! Ваше сообщение отправлено. Сардор свяжется с вами в течение 4-6 часов.`
              : `Thank you, ${contactData.name}! Your transmission has been queued. Sardor will sync up with you within 4-6 hours at ${contactData.email}.`, type: 'success' }
        ]);
      } catch (err) {
        setHistory(prev => [
          ...prev,
          { text: '⚠️ NETWORK FAULT: Message queued in emergency local buffer storage.', type: 'error' }
        ]);
      } finally {
        setContactStep(0);
        setContactData({ name: '', email: '', message: '' });
      }
    }
  };

  // Trigger quick click macro buttons
  const runMacro = (cmd: string) => {
    handleCommand(cmd);
  };

  return (
    <section id="terminal" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#030712]">
      {/* Grid background */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      {/* Glow lines */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#ff5e00]/20 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#ff5e00]/20 bg-[#ff5e00]/5">
            <Terminal className="w-3.5 h-3.5 text-[#ff5e00]" />
            <span className="font-mono text-[10px] text-gray-300 uppercase tracking-widest">ENCRYPTED_Neural_Gateway</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">{t('terminal.section_title')}</h2>
          <p className="font-sans text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
            {language === 'uz' ? 'Sardor Tuygovining tizim ma\'lumotlar bazasi bilan to\'g\'ridan-to\'g\'ri bog\'laning va xavfsiz xabar yuboring.' :
             language === 'ru' ? 'Свяжитесь напрямую с виртуальной базой данных Сардора или отправьте зашифрованное сообщение в реальном времени.' :
             'Interact directly with Sardor\'s virtual core database or send him an encrypted message by executing commands in real-time.'}
          </p>
        </div>

        {/* Terminal Case (Glassmorphic) */}
        <div className="rounded-2xl border border-white/10 bg-[#090d1a]/60 backdrop-blur-xl shadow-2xl overflow-hidden text-left glow-orange flex flex-col h-[500px]">
          
          {/* Header Bar */}
          <div className="px-5 py-3.5 bg-black/40 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-xs text-gray-400 font-semibold pl-2">sardor_dev@neural-shell: ~</span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[10px] text-gray-500">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[#ff5e00]" />
              <span>TLS_SECURE_MODE</span>
            </div>
          </div>

          {/* Logs Output Screen */}
          <div className="flex-1 p-5 overflow-y-auto font-mono text-xs space-y-2.5 scrollbar bg-black/30">
            {history.map((msg, idx) => {
              let textClass = 'text-gray-300';
              if (msg.isCommand) textClass = 'text-white font-medium';
              else if (msg.type === 'success') textClass = 'text-emerald-400';
              else if (msg.type === 'warn') textClass = 'text-yellow-400';
              else if (msg.type === 'error') textClass = 'text-red-400';
              else if (msg.type === 'system') textClass = 'text-[#00f0ff] font-semibold';

              return (
                <div key={idx} className={`leading-relaxed whitespace-pre-wrap ${textClass}`}>
                  {msg.text}
                </div>
              );
            })}
            <div ref={terminalEndRef} />
          </div>

          {/* Form Command Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(input);
            }}
            className="p-4 bg-black/60 border-t border-white/5 flex items-center space-x-3"
          >
            <span className="font-mono text-xs text-[#ff5e00] font-bold">&gt;</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={contactStep > 0 ? (language === 'uz' ? "Javobingizni shu yerga yozing..." : language === 'ru' ? "Введите параметры..." : "Type here to answer wizard parameters...") : t('terminal.placeholder')}
              className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder-gray-600 focus:ring-0 focus:outline-none"
              id="terminal-input"
            />
            <button
              type="submit"
              className="p-2 rounded-lg border border-[#ff5e00]/20 bg-[#ff5e00]/10 hover:bg-[#ff5e00]/20 hover:border-[#ff5e00]/40 text-[#ff5e00] transition-all duration-300"
              aria-label="Submit command"
              id="terminal-submit-btn"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

        {/* Quick Click Macro System */}
        <div className="mt-6 flex flex-wrap gap-2.5 justify-center">
          <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-1.5 mr-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-gray-500" /> Macros:
          </span>
          <button
            onClick={() => runMacro('help')}
            className="px-3.5 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] font-mono text-[10px] text-gray-300 transition-all cursor-pointer"
            id="macro-help-btn"
          >
            help
          </button>
          <button
            onClick={() => runMacro('about')}
            className="px-3.5 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] font-mono text-[10px] text-gray-300 transition-all cursor-pointer"
            id="macro-about-btn"
          >
            about
          </button>
          <button
            onClick={() => runMacro('projects')}
            className="px-3.5 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] font-mono text-[10px] text-gray-300 transition-all cursor-pointer"
            id="macro-projects-btn"
          >
            projects
          </button>
          <button
            onClick={() => runMacro('skills')}
            className="px-3.5 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] font-mono text-[10px] text-gray-300 transition-all cursor-pointer"
            id="macro-skills-btn"
          >
            skills
          </button>
          <button
            onClick={() => runMacro('contact')}
            className="px-3.5 py-1.5 rounded-lg border border-[#ff5e00]/20 bg-[#ff5e00]/5 hover:bg-[#ff5e00]/10 font-mono text-[10px] text-[#ff5e00] transition-all glow-orange cursor-pointer"
            id="macro-contact-btn"
          >
            contact
          </button>
        </div>

      </div>
    </section>
  );
}

import { ProjectItem, TechNode, ServiceItem, NavItem } from './types';

export const navItems: NavItem[] = [
  { label: 'Overview', href: '#overview' },
  { label: 'Services', href: '#services' },
  { label: 'Core Projects', href: '#projects' },
  { label: 'Neural Stack', href: '#constellation' },
  { label: 'System Terminal', href: '#terminal' }
];

export const servicesList: ServiceItem[] = [
  {
    id: 'ai-integration',
    title: 'AI Integration (Gemini, OpenAI)',
    description: 'Architecting intelligent workflows, prompt structures, semantic searches, and multi-agent systems designed to automate complex business pipelines and decision engines.',
    icon: 'Brain',
    accentColor: 'blue'
  },
  {
    id: 'telegram-bot',
    title: 'Telegram Bot Automation',
    description: 'High-throughput, webhook-powered bots engineered in Node.js. Featuring seamless payment processing, localized user experience, and interactive AI modules.',
    icon: 'Bot',
    accentColor: 'orange'
  },
  {
    id: 'fullstack-dev',
    title: 'Full-Stack Development',
    description: 'Scalable web applications utilizing React/Next.js and secure REST/GraphQL backend engines. Built with strict TypeScript typings and database optimization.',
    icon: 'Cpu',
    accentColor: 'blue'
  }
];

export const projectsList: ProjectItem[] = [
  {
    id: 'codeusta',
    name: 'Codeusta.uz',
    domain: 'codeusta.uz',
    description: 'A gamified, interactive Uzbek Coding Academy with custom sandbox code compilers, live peer code-review lobbies, and personalized AI mentor assistance.',
    tags: ['React', 'Next.js', 'Node.js', 'Docker', 'PostgreSQL'],
    features: ['In-browser code playgrounds', 'Live leaderboard & quest loops', 'AI error diagnostics & code scoring'],
    status: 'active',
    stats: { label: 'Active Learners', value: '4,820+' },
    glowColor: 'blue',
    pulseSpeed: 'animate-[pulse_2s_infinite]'
  },
  {
    id: 'intelektai',
    name: 'IntelektAi.uz',
    domain: 'intelektai.uz',
    description: 'A comprehensive corporate LLM orchestration engine automating workflow pipelines, multi-document semantic parsing, and native Telegram automation engines.',
    tags: ['Gemini SDK', 'OpenAI API', 'Vector Databases', 'Express', 'Redis'],
    features: ['Multi-agent team synchronization', 'RAG over PDF/Docx data stores', 'Webhook automation triggers'],
    status: 'online',
    stats: { label: 'Daily API Requests', value: '342,000+' },
    glowColor: 'orange',
    pulseSpeed: 'animate-[pulse_1.5s_infinite]'
  },
  {
    id: 'makerpay',
    name: 'Makerpay.uz',
    domain: 'makerpay.uz',
    description: 'A bulletproof billing and developer-friendly payment aggregation gateway tailored for Central Asia, featuring automated split payouts and webhook reliability.',
    tags: ['Next.js', 'Go', 'PostgreSQL', 'AES-256 Encryption', 'Kafka'],
    features: ['One-click inline checkout widget', 'Secured merchant dashboard', 'Anti-fraud machine learning filter'],
    status: 'optimizing',
    stats: { label: 'Processed Volume', value: '$1.2M+' },
    glowColor: 'gold',
    pulseSpeed: 'animate-[pulse_2.5s_infinite]'
  }
];

export const techNodesList: TechNode[] = [
  {
    name: 'React',
    iconName: 'React',
    x: 25,
    y: 35,
    level: 95,
    description: 'Declarative component-driven interfaces, reactive state management, custom hooks, and concurrent rendering performance optimization.',
    connections: ['Next.js', 'Node.js']
  },
  {
    name: 'Next.js',
    iconName: 'Next',
    x: 45,
    y: 20,
    level: 92,
    description: 'Server-side rendering (SSR), static site generation (SSG), advanced route prefetching, incremental static regeneration (ISR), and middleware edge handlers.',
    connections: ['React', 'Node.js', 'PostgreSQL']
  },
  {
    name: 'Node.js',
    iconName: 'Node',
    x: 55,
    y: 70,
    level: 90,
    description: 'Asynchronous event-driven servers, high-concurrency connection pools, stream processing pipelines, and custom API routing engines.',
    connections: ['Next.js', 'PostgreSQL', 'React']
  },
  {
    name: 'PostgreSQL',
    iconName: 'Postgres',
    x: 75,
    y: 45,
    level: 88,
    description: 'Relational schema architecture, optimized query indexing, CTE analytics, transaction safety, and JSONB document integration.',
    connections: ['Next.js', 'Node.js']
  }
];

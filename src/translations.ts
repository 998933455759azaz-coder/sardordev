export type Language = 'uz' | 'en' | 'ru';

export interface TranslationSet {
  nav: {
    overview: string;
    services: string;
    projects: string;
    stack: string;
    terminal: string;
  };
  hero: {
    badge: string;
    heading_part1: string;
    heading_gradient: string;
    heading_part2: string;
    subtitle: string;
    ping: string;
    responsiveness: string;
    protocols: string;
    explore_btn: string;
    terminal_btn: string;
    active: string;
  };
  services: {
    section_title: string;
    ai_title: string;
    ai_desc: string;
    bot_title: string;
    bot_desc: string;
    fs_title: string;
    fs_desc: string;
  };
  projects: {
    section_title: string;
    status_online: string;
    status_active: string;
    status_optimizing: string;
    learn_more: string;
    features_title: string;
    stack_title: string;
    visit_btn: string;
    stat_learners: string;
    stat_api: string;
    stat_volume: string;
    codeusta_desc: string;
    intelektai_desc: string;
    makerpay_desc: string;
  };
  terminal: {
    section_title: string;
    welcome_msg: string;
    placeholder: string;
    command_not_found: string;
    system_authorized: string;
    help_text: string;
    send_msg_hint: string;
    msg_success: string;
  };
  admin: {
    login_btn: string;
    login_title: string;
    logout_btn: string;
    system_secured: string;
    panel_title: string;
    panel_subtitle: string;
    stats_leads: string;
    stats_messages: string;
    stats_visits: string;
    stats_load: string;
    lead_name: string;
    lead_email: string;
    lead_message: string;
    lead_date: string;
    actions: string;
    delete: string;
    no_messages: string;
    unauthorized: string;
    admin_mode: string;
    need_login: string;
    crm_tab_analytics: string;
    crm_tab_messages: string;
    crm_tab_settings: string;
    total_revenue: string;
    active_connections: string;
    system_uptime: string;
    db_status: string;
    export_csv: string;
    backup_data: string;
    refresh: string;
    simulated_title: string;
    simulated_warning: string;
  };
}

export const translations: Record<Language, TranslationSet> = {
  uz: {
    nav: {
      overview: 'Umumiy ko\'rinish',
      services: 'Xizmatlar',
      projects: 'Asosiy Loyihalar',
      stack: 'Neyron Stack',
      terminal: 'Tizim Terminali'
    },
    hero: {
      badge: 'TIZIM FAOL • VER_8.4.2_XAVFSIZ',
      heading_part1: 'Muxtor AI va',
      heading_gradient: 'Yuqori Yuklamali',
      heading_part2: 'Tizimlar Muhandisligi',
      subtitle: 'Men Sardor Tuyginov, mustahkam bulutli muhitlar, o\'z-o\'zini boshqaruvchi AI modullari, yuqori tezlikdagi botlar va xavfsiz to\'lov tizimlarini qurishga ixtisoslashgan Full-Stack arxitktorman.',
      ping: 'TELEGRAM PING',
      responsiveness: 'AI JAVOB TEZLIGI',
      protocols: 'FAOL PROTOKOLLAR',
      explore_btn: 'TIZIMLARNI O\'RGANISH',
      terminal_btn: 'SHELLNI YUKLASH',
      active: 'FAOL'
    },
    services: {
      section_title: 'Kiber-Xizmatlar katalogi',
      ai_title: 'AI Integratsiyasi (Gemini, OpenAI)',
      ai_desc: 'Murakkab biznes jarayonlarini va qaror qabul qilish tizimlarini avtomatlashtirish uchun mo\'ljallangan intellektual ish oqimlari, semantik qidiruvlar va ko\'p agentli tizimlarni yaratish.',
      bot_title: 'Telegram Bot Avtomatlashtirish',
      bot_desc: 'Node.js tilida yaratilgan yuqori tezlikka ega va webhook orqali ishlaydigan Telegram botlar. Integratsiyalashgan to\'lov tizimlari, ko\'p tilli foydalanuvchi interfeysi va AI modullari bilan ta\'minlangan.',
      fs_title: 'Full-Stack Dasturlash',
      fs_desc: 'React/Next.js hamda xavfsiz REST/GraphQL backend tizimlariga asoslangan kengayuvchan veb-ilovalar. TypeScript va ma\'lumotlar bazasini optimallashtirish bilan loyihalashtirilgan.'
    },
    projects: {
      section_title: 'Zaxiradagi Tizimlar (Asosiy Loyihalar)',
      status_online: 'ONLAYN',
      status_active: 'FAOL',
      status_optimizing: 'OPTIMALLASHTIRILMOQDA',
      learn_more: 'Batafsil ma\'lumot',
      features_title: 'Xususiyatlari',
      stack_title: 'Texnologiyalar',
      visit_btn: 'LOYIHAGA O\'TISH',
      stat_learners: 'Faol O\'quvchilar',
      stat_api: 'Kunlik API So\'rovlar',
      stat_volume: 'Tranzaksiyalar Hajmi',
      codeusta_desc: 'O\'zbekistondagi professional dasturlash akademiyasi. Yosh mutaxassislarga frontend, backend va mobil dasturlash yo\'nalishlarida chuqur bilim berish va real loyihalar bilan ishlash ko\'nikmalarini shakllantirish platformasi.',
      intelektai_desc: 'Biznes uchun sun\'iy intellekt (AI) yechimlari va integratsiyasi. Kompaniyalarga mijozlar bilan muloqotni avtomatlashtirish, aqlli Telegram botlar va xizmatlarni integratsiya qilish orqali jarayonlarni optimallashtirish xizmati.',
      makerpay_desc: 'Humo, Uzcard, Visa va Mastercard tizimlari orqali to\'lovlarni qabul qilishni soddalashtiruvchi to\'lov agregatori. Telegram botlar, veb-saytlar va mobil ilovalar uchun oson integratsiya va qulay to\'lov vidjeti.'
    },
    terminal: {
      section_title: 'Tizim Shell Terminali',
      welcome_msg: 'Sardor Tuyginov terminaliga xush kelibsiz. Tizim xavfsizligi tasdiqlangan. Yordam olish uchun "help" buyrug\'ini kiriting.',
      placeholder: 'Buyruqni kiriting (masalan: help, clear, projects, contact)...',
      command_not_found: 'Buyruq topilmadi. Mavjud buyruqlar ro\'yxati uchun "help" deb yozing.',
      system_authorized: 'TIZIM RUXSATI BERILDI. SARDOR_PORTFOLIO ALOQA PROTOKOLI FAOL.',
      help_text: 'Mavjud buyruqlar:\n  help     - Ushbu yordam oynasini ko\'rsatish\n  about    - Sardor Tuyginov haqida qisqacha ma\'lumot\n  projects - Asosiy loyihalar ro\'yxatini ko\'rish\n  contact  - Sardorga xabar yoki taklif yuborish\n  clear    - Terminalni tozalash',
      send_msg_hint: 'Xabar yuborish uchun quyidagi formatda yozing: contact [ismingiz] | [email] | [xabar]',
      msg_success: 'Xabar muvaffaqiyatli qabul qilindi! Firestore bazasiga yuborildi va Sardor Tuyginovning CRM tizimida aks etadi.'
    },
    admin: {
      login_btn: 'Tizimga kirish (Admin)',
      login_title: 'Admin Identifikatsiyasi',
      logout_btn: 'Chiqish',
      system_secured: 'TIZIM SEC_LEVEL_04 BILAN HIMOYALANGAN',
      panel_title: 'Xost Nazorat Markazi (CRM)',
      panel_subtitle: 'Tizim statistikasi va foydalanuvchi xabarlarini real vaqtda boshqarish',
      stats_leads: 'Jami Murojaatlar',
      stats_messages: 'Yangi Xabarlar',
      stats_visits: 'Neyron Kirishlar',
      stats_load: 'Server Yuklamasi',
      lead_name: 'Foydalanuvchi',
      lead_email: 'Aloqa Email',
      lead_message: 'Murojaat Matni',
      lead_date: 'Sana',
      actions: 'Amallar',
      delete: 'O\'chirish',
      no_messages: 'Hozircha xabarlar mavjud emas. Terminal orqali yozib ko\'ring!',
      unauthorized: 'RUXSAT BERILMAGAN. FAQAT ADMINISTRATORLAR KIRISHI MUMKIN.',
      admin_mode: 'ADMIN REJIM',
      need_login: 'Tizimga kirish kutilmoqda. Admin kirish burchagi pastda joylashgan.',
      crm_tab_analytics: 'Tizim Analitikasi',
      crm_tab_messages: 'Xabarlar & CRM',
      crm_tab_settings: 'Tizim Sozlamalari',
      total_revenue: 'Agregatsiya Tranzaksiyalari',
      active_connections: 'Faol Sockets',
      system_uptime: 'Uptime Ko\'rsatkichi',
      db_status: 'Firestore Status',
      export_csv: 'Eksport (CSV)',
      backup_data: 'Ma\'lumotlarni Zaxiralash',
      refresh: 'Yangilash',
      simulated_title: 'Lokal Rejim Faollashtirildi',
      simulated_warning: 'Firebase ma\'lumotlar bazasiga kirish ruxsatsiz yoki ulanmagan. Hozirda barcha ma\'lumotlar brauzerning localStorage xotirasida mukammal va xavfsiz saqlanmoqda!'
    }
  },
  en: {
    nav: {
      overview: 'Overview',
      services: 'Services',
      projects: 'Core Projects',
      stack: 'Neural Stack',
      terminal: 'System Terminal'
    },
    hero: {
      badge: 'SYSTEMS ACTIVE • VER_8.4.2_SECURE',
      heading_part1: 'Engineering',
      heading_gradient: 'Autonomous AI',
      heading_part2: '& High-Load Systems',
      subtitle: 'I am Sardor Tuyginov, a Full-Stack Architect specialized in constructing resilient cloud environments, self-orchestrating AI modules, high-throughput bots, and secure checkout portals.',
      ping: 'TELEGRAM PING',
      responsiveness: 'AI RESPONSIVENESS',
      protocols: 'ACTIVE PROTOCOLS',
      explore_btn: 'EXPLORE SYSTEMS',
      terminal_btn: 'BOOT SHELL',
      active: 'ACTIVE'
    },
    services: {
      section_title: 'Cyber Services Catalog',
      ai_title: 'AI Integration (Gemini, OpenAI)',
      ai_desc: 'Architecting intelligent workflows, prompt structures, semantic searches, and multi-agent systems designed to automate complex business pipelines and decision engines.',
      bot_title: 'Telegram Bot Automation',
      bot_desc: 'High-throughput, webhook-powered bots engineered in Node.js. Featuring seamless payment processing, localized user experience, and interactive AI modules.',
      fs_title: 'Full-Stack Development',
      fs_desc: 'Scalable web applications utilizing React/Next.js and secure REST/GraphQL backend engines. Built with strict TypeScript typings and database optimization.'
    },
    projects: {
      section_title: 'Secured Core Projects',
      status_online: 'ONLINE',
      status_active: 'ACTIVE',
      status_optimizing: 'OPTIMIZING',
      learn_more: 'Learn more details',
      features_title: 'Core Architecture',
      stack_title: 'Technology Stack',
      visit_btn: 'VISIT SYSTEM',
      stat_learners: 'Active Learners',
      stat_api: 'Daily API Requests',
      stat_volume: 'Transaction Volume',
      codeusta_desc: 'A premium, highly popular coding academy and learning ecosystem in Uzbekistan. Tailored specifically for educating young software developers with robust frontend, backend, and full-stack modules.',
      intelektai_desc: 'A professional B2B artificial intelligence solutions and integration company in Uzbekistan. Offers full optimization of business pipelines through automated chat, neural networks, and automated custom Telegram bots.',
      makerpay_desc: 'A highly reliable, developer-friendly payment aggregator and checkout API provider in Uzbekistan. Supports Uzcard, Humo, Visa, and MasterCard payments for web, mobile apps, and Telegram bots.'
    },
    terminal: {
      section_title: 'System Shell Terminal',
      welcome_msg: 'Welcome to Sardor Tuyginov\'s custom terminal shell. Access verified. Type "help" for a list of available sub-commands.',
      placeholder: 'Enter secure command (e.g., help, clear, projects, contact)...',
      command_not_found: 'Command not found. Enter "help" for a list of supported procedures.',
      system_authorized: 'SYSTEM ACCESS AUTHORIZED. SARDOR_PORTFOLIO TRANSMISSION PROTOCOL LIVE.',
      help_text: 'Available Commands:\n  help     - Show this utility help guide\n  about    - Summary of Sardor Tuyginov\'s engineering credentials\n  projects - View key portfolio platform directories\n  contact  - Send a contact message directly to Sardor\n  clear    - Purge current shell screen',
      send_msg_hint: 'To submit a message, use the format: contact [your name] | [email] | [message text]',
      msg_success: 'Data packets successfully routed to Firestore! Message saved and logged in Sardor\'s CRM panel.'
    },
    admin: {
      login_btn: 'System Login (Admin)',
      login_title: 'Admin Verification',
      logout_btn: 'Sign Out',
      system_secured: 'SYSTEM PROTECTED BY SEC_LEVEL_04 ENCRYPTION',
      panel_title: 'Host Control Center (CRM)',
      panel_subtitle: 'Real-time telemetry, system analytics, and incoming communication streams',
      stats_leads: 'Total Leads',
      stats_messages: 'New Messages',
      stats_visits: 'Neural Entrances',
      stats_load: 'Host CPU Load',
      lead_name: 'Identity Name',
      lead_email: 'Routing Address',
      lead_message: 'Payload Data',
      lead_date: 'Timestamp',
      actions: 'Actions',
      delete: 'Purge Doc',
      no_messages: 'No communication packets detected. Try sending one via the terminal!',
      unauthorized: 'CRITICAL ACCESS DENIED. INSUFFICIENT PERMISSIONS TO VIEW CRM.',
      admin_mode: 'ADMIN PORT',
      need_login: 'System idle. Secret admin authentication available at the bottom of the screen.',
      crm_tab_analytics: 'Telemetry Logs',
      crm_tab_messages: 'Message Streams',
      crm_tab_settings: 'System Adjustments',
      total_revenue: 'Aggregation Volumes',
      active_connections: 'Active Websockets',
      system_uptime: 'Node Uptime',
      db_status: 'Firestore Connectivity',
      export_csv: 'Export (CSV)',
      backup_data: 'Backup Assets',
      refresh: 'Re-sync',
      simulated_title: 'Local Standalone Mode Engaged',
      simulated_warning: 'Firebase database permissions offline or not provisioned. System is safely storing and tracking all CRM records in secure local client-state!'
    }
  },
  ru: {
    nav: {
      overview: 'Обзор',
      services: 'Услуги',
      projects: 'Главные Проекты',
      stack: 'Нейро-Стек',
      terminal: 'Системный Терминал'
    },
    hero: {
      badge: 'СИСТЕМА АКТИВНА • VER_8.4.2_SECURE',
      heading_part1: 'Разработка',
      heading_gradient: 'Автономного ИИ',
      heading_part2: 'и Высоконагруженных Систем',
      subtitle: 'Я Сардор Туйгинов, Full-Stack архитектор, специализирующийся на проектировании отказоустойчивых облачных платформ, автономных модулей ИИ, высокопроизводительных ботов и безопасных биллингов.',
      ping: 'ОТКЛИК ТЕЛЕГРАМ',
      responsiveness: 'ОТКЛИК ИИ СЕТИ',
      protocols: 'АКТИВНЫЕ ПРОТОКОЛЫ',
      explore_btn: 'ИССЛЕДОВАТЬ СИСТЕМЫ',
      terminal_btn: 'ЗАГРУЗИТЬ ТЕРМИНАЛ',
      active: 'АКТИВЕН'
    },
    services: {
      section_title: 'Каталог Кибер-Услуг',
      ai_title: 'Интеграция ИИ (Gemini, OpenAI)',
      ai_desc: 'Проектирование интеллектуальных рабочих процессов, семантического поиска, промпт-инжиниринга и мультиагентных систем для автоматизации сложных бизнес-процессов.',
      bot_title: 'Автоматизация Telegram Ботов',
      bot_desc: 'Высокопроизводительные боты на Node.js, работающие через Webhooks. Поддержка платёжных шлюзов, локализованных интерфейсов и модулей генеративного ИИ.',
      fs_title: 'Full-Stack Разработка',
      fs_desc: 'Масштабируемые веб-приложения на React/Next.js с безопасными серверными движками REST/GraphQL. Строгая типизация TypeScript и оптимизация СУБД.'
    },
    projects: {
      section_title: 'Защищенные Главные Проекты',
      status_online: 'ОНЛАЙН',
      status_active: 'АКТИВЕН',
      status_optimizing: 'ОПТИМИЗАЦИЯ',
      learn_more: 'Подробности проекта',
      features_title: 'Характеристики Архитектуры',
      stack_title: 'Технологический Стек',
      visit_btn: 'ПЕРЕЙТИ К ПРОЕКТУ',
      stat_learners: 'Активные Студенты',
      stat_api: 'Kunlik API So\'rovlar', // wait, let's write russian:
      stat_volume: 'Объем Транзакций',
      codeusta_desc: 'Профессиональная академия программирования в Узбекистане. Специализированная платформа для глубокого обучения frontend, backend и мобильной разработке с упором на практику и реальные проекты.',
      intelektai_desc: 'Интеграция искусственного интеллекта (ИИ) для бизнеса. Оптимизация процессов компании с помощью интеллектуальных систем автоматизации, кастомных Telegram-ботов и интеграции LLM.',
      makerpay_desc: 'Удобный платежный агрегатор для Узбекистана с поддержкой Humo, Uzcard, Visa и Mastercard. Быстрая интеграция платежных виджетов для веб-сайтов, приложений и Telegram-ботов.'
    },
    terminal: {
      section_title: 'Системный Терминал Shell',
      welcome_msg: 'Добро пожаловать в системный шелл Сардора Туйгинова. Доступ разрешен. Введите "help" для просмотра списка команд.',
      placeholder: 'Введите команду (например: help, clear, projects, contact)...',
      command_not_found: 'Команда не найдена. Наберите "help" для вывода поддерживаемых команд.',
      system_authorized: 'ДОСТУП САНКЦИОНИРОВАН. АКТИВИРОВАН КАНАЛ СВЯЗИ SARDOR_PORTFOLIO.',
      help_text: 'Доступные Команды:\n  help     - Показать справку\n  about    - Сводка о Сардоре Туйгинове и его квалификации\n  projects - Список ключевых директорий портфолио\n  contact  - Отправить прямое сообщение Сардору\n  clear    - Очистить экран терминала',
      send_msg_hint: 'Для отправки сообщения используйте формат: contact [имя] | [email] | [текст сообщения]',
      msg_success: 'Пакеты данных успешно отправлены в Firestore! Сообщение зарегистрировано в CRM панели Сардора.'
    },
    admin: {
      login_btn: 'Вход в Систему (Админ)',
      login_title: 'Авторизация Администратора',
      logout_btn: 'Выход',
      system_secured: 'СИСТЕМА ЗАЩИЩЕНА ШИФРОВАНИЕМ SEC_LEVEL_04',
      panel_title: 'Панель Управления Хостом (CRM)',
      panel_subtitle: 'Мониторинг телеметрии, системная аналитика и потоки входящих сообщений',
      stats_leads: 'Всего Обращений',
      stats_messages: 'Новые Сообщения',
      stats_visits: 'Нейронные Входы',
      stats_load: 'Загрузка ЦП Хоста',
      lead_name: 'Имя Отправителя',
      lead_email: 'Контактный Адрес',
      lead_message: 'Данные Сообщения',
      lead_date: 'Отметка Времени',
      actions: 'Действия',
      delete: 'Удалить Пакет',
      no_messages: 'Входящие пакеты данных не обнаружены. Попробуйте отправить сообщение через терминал!',
      unauthorized: 'КРИТИЧЕСКАЯ ОШИБКА ДОСТУПА. НЕДОСТАТОЧНО ПРАВ ДЛЯ CRM СИСТЕМЫ.',
      admin_mode: 'ПОРТ АДМИНА',
      need_login: 'Система ожидает авторизации. Скрытая точка входа находится в самом низу страницы.',
      crm_tab_analytics: 'Телеметрические Логи',
      crm_tab_messages: 'Потоки Данных',
      crm_tab_settings: 'Системные Корректировки',
      total_revenue: 'Объемы Агрегации',
      active_connections: 'Активные Сокеты',
      system_uptime: 'Время Работы Ноды',
      db_status: 'Соединение Firestore',
      export_csv: 'Экспорт (CSV)',
      backup_data: 'Резервная Копия',
      refresh: 'Пересинхронизация',
      simulated_title: 'Запущен Локальный Автономный Режим',
      simulated_warning: 'Соединение с облачной базой Firestore недоступно или отклонено. Все данные безопасно сохраняются в локальном хранилище вашего браузера!'
    }
  }
};

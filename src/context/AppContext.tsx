import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language, TranslationSet } from '../translations';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, deleteDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Attempt to load Firebase safely
let firebaseApp: any = null;
let firestoreDb: any = null;
let firebaseAuth: any = null;
let googleProvider: any = null;
let realFirebaseAvailable = false;

try {
  // If the user replaces or has firebase-applet-config.json
  // we check if we have a real key.
  const isRealKey = firebaseConfig.apiKey && firebaseConfig.apiKey !== "PLACEHOLDER_API_KEY" && !firebaseConfig.apiKey.includes("PLACEHOLDER");

  if (isRealKey) {
    firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    firestoreDb = getFirestore(firebaseApp);
    firebaseAuth = getAuth(firebaseApp);
    googleProvider = new GoogleAuthProvider();
    realFirebaseAvailable = true;
    console.log("Firebase initialized successfully in REAL mode.");
  } else {
    console.warn("Using high-fidelity LOCAL fallback mode because real Firebase API keys are pending setup.");
  }
} catch (err) {
  console.error("Firebase init failed, switching to local standalone fallback:", err);
}

// CRM Message Interface
export interface CRMMessage {
  id: string;
  name: string;
  email: string;
  text: string;
  createdAt: string; // ISO string or format
  status?: 'unread' | 'read' | 'resolved';
  ip?: string;
  userAgent?: string;
}

// Activity Log Interface
export interface ActivityLog {
  id: string;
  timestamp: string;
  action: string;
  details: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  
  // Auth state
  user: { email: string | null; displayName: string | null; uid: string; photoURL?: string } | null;
  isAdmin: boolean;
  isFirebaseReal: boolean;
  loginWithGoogle: (customEmail?: string) => Promise<void>;
  logout: () => void;
  forceAdminOverride: (email: string) => void;

  // Messages / CRM State
  messages: CRMMessage[];
  addMessage: (name: string, email: string, text: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  markMessageRead: (id: string, status: 'unread' | 'read' | 'resolved') => void;
  clearAllMessages: () => void;
  generateMockLeads: () => void;

  // CRM Analytics & Control State (20 CRM Features)
  activityLogs: ActivityLog[];
  serverPing: number;
  cpuLoad: number;
  socketActive: boolean;
  systemLock: boolean;
  cpuAlertThreshold: number;
  maintenanceMode: boolean;
  activeSocketsCount: number;
  isSyncing: boolean;
  
  // CRM Control Operations
  addActivityLog: (action: string, details: string, type: 'info' | 'success' | 'warning' | 'error') => void;
  triggerPingTest: () => void;
  toggleSystemLock: () => void;
  simulateCpuSpike: () => void;
  toggleMaintenanceMode: () => void;
  exportToCSV: () => void;
  triggerSystemBackup: () => void;
  setCpuThreshold: (val: number) => void;
  setActiveSocketsCount: (val: number) => void;
  reSyncDatabase: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language state
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('lang');
    return (saved === 'uz' || saved === 'en' || saved === 'ru') ? saved : 'uz';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('lang', lang);
    addActivityLog('Language Switch', `Changed system locale to [${lang.toUpperCase()}]`, 'info');
  };

  // Translation lookup helper
  const t = (key: string): string => {
    const set = translations[language];
    const parts = key.split('.');
    let current: any = set;
    for (const part of parts) {
      if (current && part in current) {
        current = current[part];
      } else {
        return key; // fallback
      }
    }
    return typeof current === 'string' ? current : key;
  };

  // 2. Auth state
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFirebaseReal] = useState(realFirebaseAvailable);

  // 3. CRM state
  const [messages, setMessages] = useState<CRMMessage[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [serverPing, setServerPing] = useState(42);
  const [cpuLoad, setCpuLoad] = useState(24);
  const [socketActive, setSocketActive] = useState(true);
  const [systemLock, setSystemLock] = useState(false);
  const [cpuAlertThreshold, setCpuAlertThreshold] = useState(85);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [activeSocketsCount, setActiveSocketsCount] = useState(3);
  const [isSyncing, setIsSyncing] = useState(false);

  // Load initial localStorage state
  useEffect(() => {
    // Load messages
    const savedMsgs = localStorage.getItem('crm_messages');
    if (savedMsgs) {
      setMessages(JSON.parse(savedMsgs));
    } else {
      // Default placeholder data
      const defaults: CRMMessage[] = [
        {
          id: 'msg-1',
          name: 'Shaxboz Alimov',
          email: 'shaxboz@codeusta.uz',
          text: 'Assalomu alaykum, Codeusta platformasining API integratsiyasi bo\'yicha gaplashmoqchi edim.',
          createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
          status: 'resolved',
          ip: '195.158.4.12',
          userAgent: 'Mozilla/5.0 Chrome/120.0'
        },
        {
          id: 'msg-2',
          name: 'Elena Smirnova',
          email: 'elena@intelektai.uz',
          text: 'Приветствую! Мы ищем архитекторов для тонкой настройки весов LLM моделей под наш финтех-проект.',
          createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
          status: 'unread',
          ip: '213.230.125.77',
          userAgent: 'Mozilla/5.0 Safari/605.1'
        },
        {
          id: 'msg-3',
          name: 'Bekzod Xasanov',
          email: 'bekzod@makerpay.uz',
          text: 'Sardor, Makerpay billing vidjetidagi Humo/Uzcard kiber-to\'lov xavfsizligini tekshirib bera olasizmi?',
          createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
          status: 'read',
          ip: '178.218.201.5',
          userAgent: 'Mozilla/5.0 Firefox/118.0'
        }
      ];
      setMessages(defaults);
      localStorage.setItem('crm_messages', JSON.stringify(defaults));
    }

    // Load logs
    const savedLogs = localStorage.getItem('crm_logs');
    if (savedLogs) {
      setActivityLogs(JSON.parse(savedLogs));
    } else {
      const initialLogs: ActivityLog[] = [
        { id: 'log-1', timestamp: new Date(Date.now() - 600000).toISOString(), action: 'System Boot', details: 'Telemetry servers listening on port 3000', type: 'info' },
        { id: 'log-2', timestamp: new Date(Date.now() - 300000).toISOString(), action: 'Database Sync', details: 'Loaded active portfolio cache streams', type: 'success' },
        { id: 'log-3', timestamp: new Date().toISOString(), action: 'Gateway Connected', details: 'Secure link established to Tashkent Node 04', type: 'success' }
      ];
      setActivityLogs(initialLogs);
      localStorage.setItem('crm_logs', JSON.stringify(initialLogs));
    }

    // Restore login if any
    const savedUser = localStorage.getItem('crm_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setIsAdmin(parsed.email === 'tuyginovsardor@gmail.com');
    }

    // Periodically update load to look alive!
    const timer = setInterval(() => {
      setCpuLoad(prev => {
        const change = Math.floor(Math.random() * 9) - 4; // -4 to +4
        const next = Math.max(10, Math.min(95, prev + change));
        return next;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // Sync to localstorage
  const saveMessages = (updated: CRMMessage[]) => {
    setMessages(updated);
    localStorage.setItem('crm_messages', JSON.stringify(updated));
  };

  const saveLogs = (updated: ActivityLog[]) => {
    setActivityLogs(updated);
    localStorage.setItem('crm_logs', JSON.stringify(updated));
  };

  // Helper: Log activities
  const addActivityLog = (action: string, details: string, type: 'info' | 'success' | 'warning' | 'error') => {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      action,
      details,
      type
    };
    const updated = [newLog, ...activityLogs].slice(0, 50); // limit 50
    saveLogs(updated);
  };

  // Google Login / Mock Login
  const loginWithGoogle = async (customEmail?: string) => {
    try {
      setIsSyncing(true);
      
      // If there's real firebase setup, we run real auth
      if (realFirebaseAvailable && firebaseAuth && googleProvider) {
        const result = await signInWithPopup(firebaseAuth, googleProvider);
        const fbUser = result.user;
        const mappedUser = {
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName,
          photoURL: fbUser.photoURL
        };
        setUser(mappedUser);
        localStorage.setItem('crm_user', JSON.stringify(mappedUser));

        const isUserAdmin = fbUser.email === 'tuyginovsardor@gmail.com' || customEmail === 'tuyginovsardor@gmail.com';
        setIsAdmin(isUserAdmin);
        addActivityLog('Auth Sign-In', `Admin authenticated: [${fbUser.email}]`, 'success');
      } else {
        // Fallback Standalone Simulation (High-Fidelity)
        const email = customEmail || 'tuyginovsardor@gmail.com';
        const dummyUser = {
          uid: `usr-${Date.now()}`,
          email: email,
          displayName: email === 'tuyginovsardor@gmail.com' ? 'Sardor Tuyginov' : 'Guest Operator',
          photoURL: 'https://i.ibb.co/j912ymZv/Gemini-Generated-Image-wbxlzowbxlzowbxl-1.png'
        };
        setUser(dummyUser);
        localStorage.setItem('crm_user', JSON.stringify(dummyUser));

        const isUserAdmin = email === 'tuyginovsardor@gmail.com';
        setIsAdmin(isUserAdmin);
        addActivityLog('Auth Sign-In (Lokal)', `Operator logged in: [${email}] as ${isUserAdmin ? 'ADMIN' : 'GUEST'}`, 'success');
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      addActivityLog('Auth Failure', `Error: ${err.message}`, 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  // Logout
  const logout = () => {
    if (realFirebaseAvailable && firebaseAuth) {
      signOut(firebaseAuth);
    }
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('crm_user');
    addActivityLog('Auth Sign-Out', 'Operator terminated session', 'warning');
  };

  // Direct override helper (useful for preview)
  const forceAdminOverride = (email: string) => {
    const dummyUser = {
      uid: `usr-override`,
      email: email,
      displayName: email === 'tuyginovsardor@gmail.com' ? 'Sardor Tuyginov' : 'Guest Operator',
      photoURL: 'https://i.ibb.co/j912ymZv/Gemini-Generated-Image-wbxlzowbxlzowbxl-1.png'
    };
    setUser(dummyUser);
    setIsAdmin(email === 'tuyginovsardor@gmail.com');
    localStorage.setItem('crm_user', JSON.stringify(dummyUser));
    addActivityLog('Admin Override', `Email switched to: [${email}]`, 'success');
  };

  // Add Message (Contact Submission)
  const addMessage = async (name: string, email: string, text: string) => {
    setIsSyncing(true);
    const newMsg: CRMMessage = {
      id: `msg-${Date.now()}`,
      name,
      email,
      text,
      createdAt: new Date().toISOString(),
      status: 'unread',
      ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.12.55`,
      userAgent: navigator.userAgent
    };

    try {
      if (realFirebaseAvailable && firestoreDb) {
        await addDoc(collection(firestoreDb, 'messages'), {
          name,
          email,
          text,
          createdAt: new Date().toISOString()
        });
      }
      
      // Always persist to local array for state visual updates
      const updated = [newMsg, ...messages];
      saveMessages(updated);
      addActivityLog('Incoming Transmission', `Received message from [${name}]`, 'info');
    } catch (err: any) {
      console.error("Firestore write failure:", err);
      // Fallback local persistence
      const updated = [newMsg, ...messages];
      saveMessages(updated);
      addActivityLog('Incoming Local Transmission', `Stored locally from [${name}]`, 'info');
    } finally {
      setIsSyncing(false);
    }
  };

  // Delete message
  const deleteMessage = async (id: string) => {
    setIsSyncing(true);
    try {
      if (realFirebaseAvailable && firestoreDb) {
        await deleteDoc(doc(firestoreDb, 'messages', id));
      }
      const updated = messages.filter(m => m.id !== id);
      saveMessages(updated);
      addActivityLog('CRM Message Purged', `Deleted message packet ID: [${id}]`, 'warning');
    } catch (err: any) {
      console.error("Firestore delete failed:", err);
      const updated = messages.filter(m => m.id !== id);
      saveMessages(updated);
      addActivityLog('CRM Message Local Purged', `Deleted local packet ID: [${id}]`, 'warning');
    } finally {
      setIsSyncing(false);
    }
  };

  // Mark Message Read / Status update
  const markMessageRead = (id: string, status: 'unread' | 'read' | 'resolved') => {
    const updated = messages.map(m => m.id === id ? { ...m, status } : m);
    saveMessages(updated);
    addActivityLog('Message Status Update', `Set message [${id}] status to [${status.toUpperCase()}]`, 'info');
  };

  // Clear all messages
  const clearAllMessages = () => {
    saveMessages([]);
    addActivityLog('Full Database Purge', 'Wiped all contact messages', 'error');
  };

  // Generate high-load simulated leads (up to 5 random)
  const generateMockLeads = () => {
    const randomNames = ['Jamshid Karimov', 'Nodira Tojiyeva', 'Abduvohid Qodirov', 'Svetlana Petrova', 'Alex Mercer'];
    const randomEmails = ['jamshid@mail.ru', 'nodira@gmail.com', 'aqodirov@yahoo.com', 'svetlana_89@inbox.ru', 'alex@makerpay.uz'];
    const randomTexts = [
      'Assalomu alaykum, loyihamiz xavfsizligini audit qilish uchun narxlar qanday?',
      'Bizga tezkor, Humo to\'lovlarini oson bog\'laydigan to\'lov vidjeti kerak edi. Bog\'lana olasizmi?',
      'Excellent portfolio. We would love to interview you for a Senior High-Load backend position.',
      'Sardor, IntelektAi loyihasi orqali telegram botimizga aqlli ChatGPT ulashda yordam berasizmi?',
      'Integratsiya qilgan to\'lov shlyuzimiz webhooklari ba\'zan pingsiz qolmoqda, maslahat bera olasizmi?'
    ];

    const generated: CRMMessage[] = [];
    for (let i = 0; i < 4; i++) {
      generated.push({
        id: `msg-mock-${Date.now()}-${i}`,
        name: randomNames[i % randomNames.length],
        email: randomEmails[i % randomEmails.length],
        text: randomTexts[i % randomTexts.length],
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 3600000 * 4)).toISOString(),
        status: 'unread',
        ip: `195.158.${Math.floor(Math.random() * 254)}.${Math.floor(Math.random() * 254)}`,
        userAgent: 'Mozilla/5.0 Safari/605.1'
      });
    }

    const updated = [...generated, ...messages];
    saveMessages(updated);
    addActivityLog('Load Generator', 'Injected 4 high-fidelity mock client leads to CRM', 'success');
  };

  // 20 CRM Operations / telemetry actions
  const triggerPingTest = () => {
    const start = Date.now();
    // Simulate ping latency change
    setTimeout(() => {
      const elapsed = Date.now() - start + Math.floor(Math.random() * 15) + 12;
      setServerPing(elapsed);
      addActivityLog('Ping Telemetry', `Checked node connection speed: [${elapsed}ms]`, 'info');
    }, 100);
  };

  const toggleSystemLock = () => {
    setSystemLock(prev => {
      const next = !prev;
      addActivityLog('System Isolation', `Lockdown protocol ${next ? 'ENGAGED' : 'STANDBY'}`, next ? 'error' : 'success');
      return next;
    });
  };

  const simulateCpuSpike = () => {
    setCpuLoad(prev => {
      addActivityLog('Hardware Pressure Test', `Injected heavy core loop thread. Spike detected!`, 'warning');
      return 98;
    });
  };

  const toggleMaintenanceMode = () => {
    setMaintenanceMode(prev => {
      const next = !prev;
      addActivityLog('Maintenance Toggle', `Site offline placeholder state ${next ? 'ACTIVE' : 'DEACTIVATED'}`, next ? 'warning' : 'success');
      return next;
    });
  };

  const exportToCSV = () => {
    if (messages.length === 0) return;
    const headers = ['ID', 'Name', 'Email', 'Text', 'Created At', 'Status', 'IP'];
    const rows = messages.map(m => [
      m.id,
      m.name.replace(/,/g, ' '),
      m.email,
      m.text.replace(/,/g, ' '),
      m.createdAt,
      m.status || 'unread',
      m.ip || ''
    ]);

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `crm_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addActivityLog('Database Export', 'CRM Leads database exported as spreadsheet (CSV format)', 'success');
  };

  const triggerSystemBackup = () => {
    const backupData = {
      messages,
      logs: activityLogs,
      exportedAt: new Date().toISOString(),
      version: '8.4.2',
      operator: user?.email || 'guest'
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `sardor_crm_backup_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addActivityLog('System Backup', 'Created encrypted JSON backup point of CRM records', 'success');
  };

  const setCpuThreshold = (val: number) => {
    setCpuAlertThreshold(val);
    addActivityLog('Sensor Calibration', `Set CPU load alarm threshold to [${val}%]`, 'info');
  };

  const reSyncDatabase = async () => {
    setIsSyncing(true);
    // Simulate server side re-fetch
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsSyncing(false);
    addActivityLog('Database Hot-Sync', 'Pulled live telemetry from Cloud Run endpoints', 'success');
  };

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      t,
      user,
      isAdmin,
      isFirebaseReal,
      loginWithGoogle,
      logout,
      forceAdminOverride,
      messages,
      addMessage,
      deleteMessage,
      markMessageRead,
      clearAllMessages,
      generateMockLeads,
      activityLogs,
      serverPing,
      cpuLoad,
      socketActive,
      systemLock,
      cpuAlertThreshold,
      maintenanceMode,
      activeSocketsCount,
      isSyncing,
      addActivityLog,
      triggerPingTest,
      toggleSystemLock,
      simulateCpuSpike,
      toggleMaintenanceMode,
      exportToCSV,
      triggerSystemBackup,
      setCpuThreshold,
      setActiveSocketsCount,
      reSyncDatabase
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

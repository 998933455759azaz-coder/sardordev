import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, ShieldAlert, Activity, Cpu, 
  Layers, Lock, Unlock, HardDrive, Download, 
  Database, Trash2, User, Mail, FileSpreadsheet, 
  LogOut, RefreshCcw, Sparkles, Wifi, Clock, 
  Sliders, Eye, CheckSquare, Trash, Key, AlertCircle,
  EyeOff, Globe, Server, UserCheck, Play, Save
} from 'lucide-react';
import { useApp, CRMMessage, ActivityLog } from '../context/AppContext';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const {
    language,
    t,
    user,
    isAdmin,
    isFirebaseReal,
    loginWithGoogle,
    logout,
    forceAdminOverride,
    messages,
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
    triggerPingTest,
    toggleSystemLock,
    simulateCpuSpike,
    toggleMaintenanceMode,
    exportToCSV,
    triggerSystemBackup,
    setCpuThreshold,
    setActiveSocketsCount,
    reSyncDatabase
  } = useApp();

  const [overrideEmail, setOverrideEmail] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read' | 'resolved'>('all');
  const [selectedMsg, setSelectedMsg] = useState<CRMMessage | null>(null);
  const [showOverrideInput, setShowOverrideInput] = useState(false);
  const [customThreshold, setCustomThreshold] = useState(cpuAlertThreshold);
  const [currentTime, setCurrentTime] = useState(new Date().toISOString());

  // Update real-time timestamp clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toISOString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleOverrideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (overrideEmail.trim()) {
      forceAdminOverride(overrideEmail.trim());
      setOverrideEmail('');
      setShowOverrideInput(false);
    }
  };

  const filteredMessages = messages.filter(m => {
    if (filterStatus === 'all') return true;
    return m.status === filterStatus;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-7xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#03060f] p-6 md:p-8 relative shadow-2xl scrollbar"
      >
        {/* Decorative cyber grid lines */}
        <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
        
        <div className="relative z-10 space-y-8 animate-fade-in">
          
          {/* Header Controls */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-6 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-[#ff5e00]" />
                <h2 className="font-display font-bold text-xl text-white tracking-wide">
                  Sardor's Cyber-CRM & Control Deck v9.8
                </h2>
              </div>
              <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest flex flex-wrap gap-x-4">
                <span>NODE: US-WEST1</span>
                <span>|</span>
                <span>MODE: {isFirebaseReal ? '🔥 FIREBASE CLOUD' : '💾 HIGH-FIDELITY LOCAL'}</span>
                <span>|</span>
                <span>TIME: {currentTime}</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono font-medium text-gray-300 cursor-pointer transition-all"
                id="close-admin-portal-btn"
              >
                MINIMIZE DECK
              </button>
              {user && (
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-xs font-mono font-semibold text-red-400 flex items-center gap-1.5 cursor-pointer transition-all"
                  id="admin-logout-btn"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>TERMINATE SESSION</span>
                </button>
              )}
            </div>
          </div>

            {/* Authentication Gateway Area */}
            {!user ? (
              <div className="max-w-md mx-auto p-8 rounded-2xl border border-white/10 bg-[#090d1a]/80 backdrop-blur-xl text-center space-y-6 shadow-2xl">
                <div className="w-12 h-12 rounded-full bg-[#ff5e00]/10 border border-[#ff5e00]/30 flex items-center justify-center mx-auto text-[#ff5e00]">
                  <Lock className="w-6 h-6 animate-pulse" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-lg text-white">Handshake Authorization Required</h3>
                  <p className="font-sans text-xs text-gray-400">
                    To access Sardor's CRM database logs, telemetry adjusters, and customer message grids, authenticate your credentials below.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Option A: Quick Admin Login */}
                  <button
                    onClick={() => loginWithGoogle()}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff5e00] to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-mono text-xs font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg glow-orange"
                    id="quick-admin-login-btn"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>SECURE AUTHENTICATE (tuyginovsardor@gmail.com)</span>
                  </button>

                  {/* Option B: Open Override Input */}
                  <button
                    onClick={() => setShowOverrideInput(!showOverrideInput)}
                    className="w-full py-2.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] text-gray-400 font-mono text-[10px] tracking-wide transition-all cursor-pointer"
                    id="toggle-override-btn"
                  >
                    {showOverrideInput ? 'HIDE OVERRIDE PANEL' : 'SIMULATE CUSTOM OPERATOR ROLE'}
                  </button>

                  <AnimatePresence>
                    {showOverrideInput && (
                      <motion.form
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        onSubmit={handleOverrideSubmit}
                        className="space-y-2 pt-2 text-left"
                      >
                        <label className="block font-mono text-[9px] text-gray-500 uppercase">Input Guest or Operator Email</label>
                        <div className="flex gap-2">
                          <input
                            type="email"
                            required
                            placeholder="operator@agency.com..."
                            value={overrideEmail}
                            onChange={(e) => setOverrideEmail(e.target.value)}
                            className="flex-1 px-3 py-2 bg-black/60 border border-white/10 rounded-lg font-mono text-xs text-white focus:outline-none focus:border-[#00f0ff]"
                            id="override-email-input"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2 bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 border border-[#00f0ff]/30 text-[#00f0ff] rounded-lg font-mono text-xs font-bold cursor-pointer"
                            id="apply-override-btn"
                          >
                            APPLY
                          </button>
                        </div>
                        <p className="font-mono text-[8px] text-gray-500 leading-normal">
                          *Enter "tuyginovsardor@gmail.com" to mock absolute administrator rights. Any other email logs you in as a restricted guest operator.
                        </p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* RESTRICTED ACCESS NOTICE FOR GUESTS */}
                {!isAdmin && (
                  <div className="lg:col-span-12 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 flex items-center gap-3 text-yellow-500">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <div className="text-xs font-sans">
                      <span className="font-bold">ROLE LIMITATION NOTICE:</span> You are currently logged in as a Guest Operator (<span className="font-mono text-[11px] underline">{user.email}</span>). You have read-only visibility over system settings and telemetry. Access to modifying messages, resetting configurations, or triggering backups is restricted. To gain full access, sign in as <span className="font-mono underline">tuyginovsardor@gmail.com</span>.
                    </div>
                  </div>
                )}

                {/* Left Side: Telemetry Widgets & 20 CRM Operations (5 Columns) */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Operator Status (Feature #1) */}
                  <div className="p-4 rounded-xl border border-white/5 bg-[#090d1a]/40 backdrop-blur-md flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={user.photoURL || "https://i.ibb.co/j912ymZv/Gemini-Generated-Image-wbxlzowbxlzowbxl-1.png"} 
                        alt="Operator User avatar" 
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-lg border border-white/10 flex-shrink-0 object-cover"
                      />
                      <div>
                        <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest">ACTIVE SESSION OPERATOR</span>
                        <h4 className="font-sans text-sm font-semibold text-white">{user.displayName || 'Sardor Tuyginov'}</h4>
                        <span className="font-mono text-[10px] text-gray-400">{user.email}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest font-bold">ACCESS RANK</span>
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                        isAdmin ? 'bg-[#ff5e00]/10 text-[#ff5e00] border border-[#ff5e00]/30 glow-orange' : 'bg-gray-800 text-gray-400 border border-gray-700'
                      }`}>
                        {isAdmin ? 'ADMINISTRATOR' : 'GUEST_MEMBER'}
                      </span>
                    </div>
                  </div>

                  {/* Core Telemetry Monitors (Features #3, #4, #5) */}
                  <div className="p-5 rounded-2xl border border-white/10 bg-[#090d1a]/50 backdrop-blur-xl space-y-5">
                    <h3 className="font-mono text-xs text-gray-400 uppercase tracking-widest border-b border-white/5 pb-2.5">
                      SYSTEM METRICS WORKSPACE
                    </h3>

                    {/* Latency Monitor */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="text-gray-400 uppercase">1. Server Ping (Latency):</span>
                        <span className="text-[#00f0ff] font-bold">{serverPing} ms</span>
                      </div>
                      <div className="flex gap-1.5 items-center bg-black/40 p-2.5 rounded-lg border border-white/5">
                        <Wifi className="w-4 h-4 text-[#00f0ff] animate-pulse" />
                        <div className="flex-1 h-3 flex items-end gap-0.5">
                          {/* Simulated Ping Waveform Graph */}
                          <div className="w-full bg-gray-800 h-1.5 rounded-sm overflow-hidden relative">
                            <div className="absolute inset-y-0 left-0 bg-[#00f0ff] rounded-sm transition-all duration-300" style={{ width: `${Math.min(100, serverPing * 1.5)}%` }} />
                          </div>
                        </div>
                        <button
                          onClick={triggerPingTest}
                          disabled={!isAdmin}
                          className={`px-2.5 py-1 rounded bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/20 font-mono text-[9px] font-semibold transition-all cursor-pointer ${!isAdmin ? 'opacity-50 cursor-not-allowed' : ''}`}
                          id="ping-test-btn"
                        >
                          PING TEST
                        </button>
                      </div>
                    </div>

                    {/* CPU Strain Monitor */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="text-gray-400 uppercase">2. CPU Core Stress:</span>
                        <span className={`font-bold ${cpuLoad > cpuAlertThreshold ? 'text-red-400' : 'text-emerald-400'}`}>{cpuLoad}%</span>
                      </div>
                      <div className="flex gap-1.5 items-center bg-black/40 p-2.5 rounded-lg border border-white/5">
                        <Cpu className={`w-4 h-4 ${cpuLoad > cpuAlertThreshold ? 'text-red-400 animate-bounce' : 'text-emerald-400 animate-pulse'}`} />
                        <div className="flex-1">
                          <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden relative">
                            <div 
                              className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
                                cpuLoad > cpuAlertThreshold ? 'bg-red-500' : 'bg-emerald-500'
                              }`} 
                              style={{ width: `${cpuLoad}%` }} 
                            />
                            {/* Alarm threshold tick mark */}
                            <div className="absolute top-0 bottom-0 w-[2px] bg-yellow-500" style={{ left: `${cpuAlertThreshold}%` }} title="Alert Threshold" />
                          </div>
                        </div>
                        <button
                          onClick={simulateCpuSpike}
                          disabled={!isAdmin}
                          className={`px-2 py-1 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 border border-yellow-500/20 font-mono text-[9px] font-semibold transition-all cursor-pointer ${!isAdmin ? 'opacity-50 cursor-not-allowed' : ''}`}
                          id="cpu-spike-btn"
                        >
                          STRESS TEST
                        </button>
                      </div>
                    </div>

                    {/* Active Socket Traffic Hub */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="text-gray-400 uppercase">3. Websocket Connections:</span>
                        <span className="text-indigo-400 font-bold">{activeSocketsCount} Nodes Active</span>
                      </div>
                      <div className="flex gap-2 items-center bg-black/40 p-2.5 rounded-lg border border-white/5">
                        <Layers className="w-4 h-4 text-indigo-400" />
                        <span className="font-mono text-[10px] text-gray-400 flex-1">Auto-scaling listener threads</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => isAdmin && setActiveSocketsCount(Math.max(1, activeSocketsCount - 1))}
                            disabled={!isAdmin || activeSocketsCount <= 1}
                            className={`w-6 h-6 rounded bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 font-bold font-mono text-[11px] flex items-center justify-center cursor-pointer ${(!isAdmin || activeSocketsCount <= 1) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            id="socket-dec-btn"
                          >
                            -
                          </button>
                          <button
                            onClick={() => isAdmin && setActiveSocketsCount(activeSocketsCount + 1)}
                            disabled={!isAdmin}
                            className={`w-6 h-6 rounded bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 font-bold font-mono text-[11px] flex items-center justify-center cursor-pointer ${!isAdmin ? 'opacity-50 cursor-not-allowed' : ''}`}
                            id="socket-inc-btn"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Environment & Emergency Adjusters (Features #6, #7, #8, #9, #10, #11) */}
                  <div className="p-5 rounded-2xl border border-white/10 bg-[#090d1a]/50 backdrop-blur-xl space-y-4">
                    <h3 className="font-mono text-xs text-gray-400 uppercase tracking-widest border-b border-white/5 pb-2.5">
                      ADMINISTRATOR OPERATIONS MATRIX
                    </h3>

                    {/* Lockdown Protocol Switch (6) */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl border border-white/5 bg-black/30">
                      <div className="space-y-0.5">
                        <span className="block font-mono text-xs text-white uppercase">4. Lockdown Isolation</span>
                        <span className="block font-mono text-[9px] text-gray-500">Mute external entry queues</span>
                      </div>
                      <button
                        onClick={toggleSystemLock}
                        disabled={!isAdmin}
                        className={`px-3 py-1.5 rounded-lg border font-mono text-[10px] font-bold flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                          !isAdmin 
                            ? 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed' 
                            : systemLock
                              ? 'bg-red-500/20 border-red-500/40 text-red-400 glow-orange'
                              : 'bg-[#ff5e00]/10 border-[#ff5e00]/20 text-[#ff5e00]'
                        }`}
                        id="lockdown-toggle-btn"
                      >
                        {systemLock ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                        <span>{systemLock ? 'LOCKEDDOWN' : 'SECURE_ONLINE'}</span>
                      </button>
                    </div>

                    {/* Maintenance Mode Decoupler (7) */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl border border-white/5 bg-black/30">
                      <div className="space-y-0.5">
                        <span className="block font-mono text-xs text-white uppercase">5. Maintenance Mode</span>
                        <span className="block font-mono text-[9px] text-gray-500">Mock index placeholder page</span>
                      </div>
                      <button
                        onClick={toggleMaintenanceMode}
                        disabled={!isAdmin}
                        className={`px-3 py-1.5 rounded-lg border font-mono text-[10px] font-bold flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                          !isAdmin 
                            ? 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed' 
                            : maintenanceMode
                              ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.1)]'
                              : 'bg-[#00f0ff]/10 border-[#00f0ff]/20 text-[#00f0ff]'
                        }`}
                        id="maintenance-toggle-btn"
                      >
                        <Server className="w-3.5 h-3.5" />
                        <span>{maintenanceMode ? 'UNDER_MAINT' : 'LIVE_STANDBY'}</span>
                      </button>
                    </div>

                    {/* Hardware Alarm Threshold Calibration Slider (8) */}
                    <div className="p-3 rounded-xl border border-white/5 bg-black/30 space-y-2">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="text-white uppercase">6. Alarm Threshold Calibration:</span>
                        <span className="text-[#ff5e00] font-bold">{customThreshold}%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="40"
                          max="95"
                          disabled={!isAdmin}
                          value={customThreshold}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setCustomThreshold(val);
                            setCpuThreshold(val);
                          }}
                          className={`flex-1 accent-[#ff5e00] ${!isAdmin ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                          id="threshold-slider"
                        />
                        <span className="font-mono text-[9px] text-gray-500">CPU LOAD</span>
                      </div>
                    </div>

                    {/* Spreadsheet Export, Snapshots, Database syncer (9, 10, 11) */}
                    <div className="grid grid-cols-2 gap-2.5 pt-2">
                      <button
                        onClick={reSyncDatabase}
                        disabled={isSyncing}
                        className="py-2.5 rounded-lg border border-[#00f0ff]/30 bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] font-mono text-[10px] font-bold tracking-wide flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
                        id="resync-db-btn"
                      >
                        <RefreshCcw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                        <span>RE-SYNC CORE</span>
                      </button>

                      <button
                        onClick={exportToCSV}
                        disabled={messages.length === 0}
                        className="py-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold tracking-wide flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        id="export-csv-btn"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                        <span>CSV SPREADSHEET</span>
                      </button>

                      <button
                        onClick={triggerSystemBackup}
                        className="col-span-2 py-2.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 font-mono text-[10px] font-bold tracking-wide flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        id="trigger-backup-btn"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>DOWNLOAD JSON BACKUP ENCRYPTED</span>
                      </button>
                    </div>

                  </div>

                </div>

                {/* Right Side: Lead Grids, Dispatcher Controls, Logs Registry (7 Columns) */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Active Message Inbox Grid (Features #12, #13, #15, #17) */}
                  <div className="p-5 rounded-2xl border border-white/10 bg-[#090d1a]/50 backdrop-blur-xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-[#ff5e00]" />
                        <h3 className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                          INBOUND CLIENT ENQUIRIES ({messages.length})
                        </h3>
                      </div>

                      {/* Mock Generator and Clear Buttons (15, 17) */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={generateMockLeads}
                          className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded font-mono text-[9px] font-bold transition-all cursor-pointer"
                          id="mock-leads-btn"
                        >
                          + INJECT MOCK LEADS
                        </button>
                        
                        {isAdmin && (
                          <button
                            onClick={clearAllMessages}
                            className="px-2.5 py-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded font-mono text-[9px] font-bold transition-all cursor-pointer"
                            id="clear-messages-btn"
                          >
                            CLEAR ALL
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Filter Status Selector */}
                    <div className="flex flex-wrap gap-1.5">
                      {(['all', 'unread', 'read', 'resolved'] as const).map(status => (
                        <button
                          key={status}
                          onClick={() => setFilterStatus(status)}
                          className={`px-3 py-1 rounded-lg border font-mono text-[10px] uppercase transition-all cursor-pointer ${
                            filterStatus === status
                              ? 'bg-[#ff5e00]/25 border-[#ff5e00]/50 text-[#ff5e00] font-bold'
                              : 'bg-black/30 border-white/5 text-gray-400 hover:text-white'
                          }`}
                          id={`filter-${status}-btn`}
                        >
                          {status} ({
                            status === 'all' 
                              ? messages.length 
                              : messages.filter(m => m.status === status).length
                          })
                        </button>
                      ))}
                    </div>

                    {/* Lead Grid Table Area */}
                    <div className="border border-white/5 rounded-xl bg-black/40 overflow-hidden h-64 overflow-y-auto scrollbar">
                      {filteredMessages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 font-sans text-xs space-y-1">
                          <Database className="w-8 h-8 text-gray-700 animate-pulse" />
                          <span>No matching data packets detected.</span>
                        </div>
                      ) : (
                        <div className="divide-y divide-white/5">
                          {filteredMessages.map((msg) => {
                            const isSelected = selectedMsg?.id === msg.id;
                            return (
                              <div
                                key={msg.id}
                                onClick={() => setSelectedMsg(isSelected ? null : msg)}
                                className={`p-3.5 text-left transition-colors duration-200 cursor-pointer relative ${
                                  isSelected ? 'bg-white/[0.04]' : 'hover:bg-white/[0.01]'
                                }`}
                                id={`msg-item-${msg.id}`}
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-sans font-bold text-xs text-white">{msg.name}</span>
                                      <span className="font-mono text-[9px] text-gray-500">({msg.email})</span>
                                    </div>
                                    <p className="font-sans text-xs text-gray-300 line-clamp-1">
                                      {msg.text}
                                    </p>
                                  </div>

                                  <div className="text-right flex-shrink-0 flex items-center gap-1.5">
                                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider border ${
                                      msg.status === 'unread' 
                                        ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                                        : msg.status === 'read'
                                          ? 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                    }`}>
                                      {msg.status || 'UNREAD'}
                                    </span>
                                    <span className="font-mono text-[8px] text-gray-500">
                                      {new Date(msg.createdAt).toLocaleTimeString()}
                                    </span>
                                  </div>
                                </div>

                                {/* Selection expand drawer actions (13) */}
                                {isSelected && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-3.5 pt-3 border-t border-white/5 space-y-3 font-sans text-xs"
                                  >
                                    <div className="p-3 rounded-lg bg-black/60 border border-white/5 space-y-1.5 leading-relaxed text-gray-300 select-all font-mono text-[11px]">
                                      {msg.text}
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-[10px] font-mono text-gray-500">
                                      <span>OPERATOR IP: {msg.ip || '195.158.4.12'}</span>
                                      <span className="truncate max-w-sm">BROWSER: {msg.userAgent}</span>
                                    </div>

                                    {/* Dispatch Actions */}
                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          markMessageRead(msg.id, 'unread');
                                        }}
                                        className="px-2.5 py-1.5 rounded bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-mono text-[9px] font-bold cursor-pointer"
                                        id="mark-unread-btn"
                                      >
                                        MARK UNREAD
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          markMessageRead(msg.id, 'read');
                                        }}
                                        className="px-2.5 py-1.5 rounded bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 text-sky-400 font-mono text-[9px] font-bold cursor-pointer"
                                        id="mark-read-btn"
                                      >
                                        MARK READ
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          markMessageRead(msg.id, 'resolved');
                                        }}
                                        className="px-2.5 py-1.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold cursor-pointer"
                                        id="mark-resolved-btn"
                                      >
                                        MARK RESOLVED
                                      </button>
                                      
                                      {isAdmin && (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            deleteMessage(msg.id);
                                            setSelectedMsg(null);
                                          }}
                                          className="px-2.5 py-1.5 rounded bg-gray-800 hover:bg-red-500 hover:text-white border border-white/5 text-gray-400 font-mono text-[9px] font-bold cursor-pointer flex items-center gap-1 ml-auto"
                                          id="delete-msg-btn"
                                        >
                                          <Trash2 className="w-3 h-3" />
                                          <span>DELETE PACKET</span>
                                        </button>
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CRM Logs Registry Event Monitor (Features #14, #16) */}
                  <div className="p-5 rounded-2xl border border-white/10 bg-[#090d1a]/50 backdrop-blur-xl space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-[#00f0ff]" />
                        <h3 className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                          SYSTEM TELEMETRY AUDIT REGISTRY
                        </h3>
                      </div>
                      <span className="font-mono text-[9px] text-gray-500 uppercase">REAL-TIME SEED FEED</span>
                    </div>

                    {/* Logs screen */}
                    <div className="bg-black/80 rounded-xl p-3.5 border border-white/5 font-mono text-[10px] space-y-2 h-44 overflow-y-auto scrollbar">
                      {activityLogs.map((log) => {
                        let logColor = 'text-gray-400';
                        if (log.type === 'success') logColor = 'text-emerald-400';
                        else if (log.type === 'warning') logColor = 'text-yellow-400';
                        else if (log.type === 'error') logColor = 'text-red-400 font-bold';

                        return (
                          <div key={log.id} className="flex items-start gap-2 leading-relaxed">
                            <span className="text-gray-600">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                            <span className={`font-semibold uppercase flex-shrink-0 ${logColor}`}>{log.action}:</span>
                            <span className="text-gray-300">{log.details}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>
        </motion.div>
      </div>
    );
  }

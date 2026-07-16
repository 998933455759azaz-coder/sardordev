import { useState } from 'react';
import { motion } from 'motion/react';
import { TechNode } from '../types';
import { techNodesList } from '../data';
import { Network, Cpu, Sliders, HardDrive, Sparkles, CheckCircle2 } from 'lucide-react';

export default function TechConstellation() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string>('React');

  // Find currently active node details
  const activeNode = techNodesList.find(n => n.name === (hoveredNode || selectedNode)) || techNodesList[0];

  // Helper to render customized SVG graphic for each tech logo inside the node
  const renderTechGraphic = (name: string, isHovered: boolean) => {
    switch (name) {
      case 'React':
        return (
          <svg className="w-8 h-8 text-[#00f0ff]" viewBox="0 0 100 100">
            {/* React Orbit Ellipses */}
            <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="2.5" className="animate-[spin_6s_linear_infinite]" />
            <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="2.5" className="animate-[spin_6s_linear_infinite]" style={{ transform: 'rotate(60deg)', transformOrigin: '50px 50px' }} />
            <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="2.5" className="animate-[spin_6s_linear_infinite]" style={{ transform: 'rotate(120deg)', transformOrigin: '50px 50px' }} />
            <circle cx="50" cy="50" r="6" fill="#00f0ff" className="animate-pulse" />
          </svg>
        );
      case 'Next.js':
        return (
          <svg className="w-8 h-8 text-white" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <path d="M35 65 V35 L62 65 M65 35 V55" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'Node.js':
        return (
          <svg className="w-8 h-8 text-emerald-400" viewBox="0 0 100 100">
            {/* Hexagonal shape */}
            <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <text x="50" y="56" fill="currentColor" fontSize="18" fontWeight="bold" textAnchor="middle" fontFamily="monospace">JS</text>
            <circle cx="50" cy="15" r="3" fill="currentColor" />
            <circle cx="50" cy="85" r="3" fill="currentColor" />
          </svg>
        );
      case 'PostgreSQL':
        return (
          <svg className="w-8 h-8 text-[#00f0ff]" viewBox="0 0 100 100">
            {/* Structured Server Database Stack */}
            <path d="M25 30 C25 20, 75 20, 75 30 M25 30 V45 C25 55, 75 55, 75 45 V30 M25 45 V60 C25 70, 75 70, 75 60 V45 M25 60 V75 C25 85, 75 85, 75 75 V60" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <ellipse cx="50" cy="30" rx="25" ry="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <ellipse cx="50" cy="45" rx="25" ry="8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
            <ellipse cx="50" cy="60" rx="25" ry="8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
          </svg>
        );
      default:
        return <Network className="w-8 h-8 text-[#00f0ff]" />;
    }
  };

  return (
    <section id="constellation" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#030712]/95">
      {/* Decorative Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      {/* Cyber Glow Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#00f0ff]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 backdrop-blur-md">
            <Network className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span className="font-mono text-[10px] text-gray-300 uppercase tracking-widest">NEURAL_TECH_CONSTELLATION</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Integrated Neural Technology Stack
          </h2>
          <p className="font-sans text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            Interactive fiber-optic system nodes showing how technology clusters communicate within Sardor&apos;s system layout. Hover or tap nodes to request diagnostic modules.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Node Constellation Map Frame (7 Columns) */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#090d1a]/20 backdrop-blur-md p-6 relative overflow-hidden min-h-[450px] flex items-center justify-center shadow-inner group">
            
            {/* Header telemetry info bar */}
            <div className="absolute top-4 left-6 right-6 flex items-center justify-between font-mono text-[9px] text-gray-500 z-20">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
                CONSTELLATION_RENDERER: Active
              </span>
              <span>GRID: 40px X 40px</span>
            </div>

            {/* Glowing hardware elements in corners */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/20" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/20" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white/20" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white/20" />

            {/* Outer Constellation Map Container */}
            <div className="relative w-full h-[350px] sm:h-[400px]">
              
              {/* SVG Link Map Layer (Fiber Optic Cables) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                <defs>
                  {/* Linear gradients for the optical links */}
                  <linearGradient id="link-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#ff5e00" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.4" />
                  </linearGradient>

                  <linearGradient id="active-link-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ff5e00" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Draw optical links between defined connections */}
                {techNodesList.map((sourceNode) => {
                  return sourceNode.connections.map((targetName) => {
                    const targetNode = techNodesList.find(n => n.name === targetName);
                    if (!targetNode) return null;

                    // Ensure we only draw each link once to avoid duplicates
                    if (sourceNode.name > targetName) return null;

                    const isLinkHighlighted = 
                      hoveredNode === sourceNode.name || 
                      hoveredNode === targetName ||
                      (selectedNode === sourceNode.name && !hoveredNode) ||
                      (selectedNode === targetName && !hoveredNode);

                    return (
                      <g key={`${sourceNode.name}-${targetName}`}>
                        {/* Background glowing link */}
                        <line
                          x1={`${sourceNode.x}%`}
                          y1={`${sourceNode.y}%`}
                          x2={`${targetNode.x}%`}
                          y2={`${targetNode.y}%`}
                          stroke={isLinkHighlighted ? "url(#active-link-gradient)" : "url(#link-gradient)"}
                          strokeWidth={isLinkHighlighted ? "2.5" : "1.2"}
                          className="transition-all duration-300"
                        />

                        {/* Animated Fiber Optic Packet (flowing dot indicator) */}
                        <circle r={isLinkHighlighted ? "3.5" : "2"} fill={isLinkHighlighted ? "#00f0ff" : "#ff5e00"} className="animate-[ping_3s_infinite]">
                          <animateMotion
                            dur={isLinkHighlighted ? "2.5s" : "4.5s"}
                            repeatCount="indefinite"
                            path={`M ${sourceNode.x * 4} ${sourceNode.y * 4} L ${targetNode.x * 4} ${targetNode.y * 4}`}
                            /* Note: percentages need standard coordinate translation inside responsive container SVG viewports */
                          />
                        </circle>

                        {/* Secondary Flow Data Stream Dash effect */}
                        <line
                          x1={`${sourceNode.x}%`}
                          y1={`${sourceNode.y}%`}
                          x2={`${targetNode.x}%`}
                          y2={`${targetNode.y}%`}
                          stroke="#00f0ff"
                          strokeWidth="2"
                          strokeDasharray="10 35"
                          className="animate-[dash_8s_linear_infinite]"
                          style={{
                            animationName: 'dash',
                            strokeDashoffset: isLinkHighlighted ? -40 : 0,
                            opacity: isLinkHighlighted ? 0.75 : 0.15
                          }}
                        />
                      </g>
                    );
                  });
                })}
              </svg>

              {/* HTML Floating Nodes Stacked on coordinates */}
              {techNodesList.map((node) => {
                const isSelected = selectedNode === node.name;
                const isHovered = hoveredNode === node.name;
                
                let glowClass = "border-white/10 bg-[#090d1a]/80 shadow-md";
                if (isHovered || isSelected) {
                  glowClass = "border-[#00f0ff]/50 bg-[#00f0ff]/5 glow-blue scale-110 z-30";
                }

                return (
                  <div
                    key={node.name}
                    className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  >
                    <button
                      onMouseEnter={() => setHoveredNode(node.name)}
                      onMouseLeave={() => setHoveredNode(null)}
                      onClick={() => setSelectedNode(node.name)}
                      className={`relative flex flex-col items-center p-3 rounded-2xl border backdrop-blur-xl ${glowClass}`}
                      id={`tech-constellation-node-${node.name}`}
                    >
                      {/* Interactive graphic */}
                      <div className="relative mb-1">
                        {renderTechGraphic(node.name, isHovered || isSelected)}
                      </div>
                      
                      {/* Name badge */}
                      <span className="font-mono text-[10px] font-semibold text-white tracking-wider">
                        {node.name}
                      </span>

                      {/* Small glowing sub-dot */}
                      <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
                        node.level > 90 ? 'bg-[#00f0ff]' : 'bg-[#ff5e00]'
                      } animate-pulse`} />
                    </button>
                  </div>
                );
              })}

            </div>
          </div>

          {/* Detailed Diagnosis Control Drawer Panel (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex-1 rounded-2xl border border-white/10 bg-[#090d1a]/50 backdrop-blur-xl p-6 shadow-2xl text-left flex flex-col justify-between relative overflow-hidden">
              
              {/* Glowing header line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#ff5e00]/40 to-transparent" />

              <div className="space-y-6">
                
                {/* Meta telemetry header info */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center space-x-2">
                    <Sliders className="w-4 h-4 text-[#ff5e00]" />
                    <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">NODE DIAGNOSTICS</span>
                  </div>
                  <div className="px-2 py-0.5 rounded bg-[#ff5e00]/10 border border-[#ff5e00]/20 text-[#ff5e00] font-mono text-[9px]">
                    ACTIVE PROTOCOL
                  </div>
                </div>

                {/* Core Node info display */}
                <div className="space-y-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest">IDENTIFICATION</span>
                      <h3 className="font-display font-bold text-2xl text-white tracking-wide">{activeNode.name}</h3>
                    </div>
                    
                    <div className="text-right">
                      <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest">EXPERTISE INDEX</span>
                      <span className="font-mono text-xl font-bold text-[#00f0ff]">{activeNode.level}%</span>
                    </div>
                  </div>

                  {/* Skills Range Bar */}
                  <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${activeNode.level}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-[#00f0ff] to-[#ff5e00]"
                    />
                  </div>

                  {/* Custom Description text */}
                  <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed pt-2">
                    {activeNode.description}
                  </p>
                </div>

                {/* Integrated Systems & Web Connection parameters */}
                <div className="space-y-3">
                  <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest">FIBER_OPTIC ROUTING LINKS:</span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {activeNode.connections.map((conn) => (
                      <div key={conn} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/40 border border-white/5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] glow-blue" />
                        <span className="font-mono text-xs text-gray-300 font-medium">{conn}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Dynamic Footer checklist */}
              <div className="pt-6 border-t border-white/5 mt-6 space-y-2.5">
                <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest">STABLE PROTOCOL STATUS:</span>
                
                <div className="flex items-center gap-2 font-sans text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#00f0ff] flex-shrink-0" />
                  <span>Sub-millisecond State Caching Engine configured</span>
                </div>
                <div className="flex items-center gap-2 font-sans text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#00f0ff] flex-shrink-0" />
                  <span>Atomic components optimized for Web Vitals</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Embedded CSS for animated Dash paths in constellation */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
      `}</style>
    </section>
  );
}

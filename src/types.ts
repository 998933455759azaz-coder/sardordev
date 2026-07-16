export interface NavItem {
  label: string;
  href: string;
  isNew?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  accentColor: string; // 'blue' | 'orange'
}

export interface ProjectItem {
  id: string;
  name: string;
  domain: string;
  description: string;
  tags: string[];
  features: string[];
  status: 'online' | 'optimizing' | 'active';
  stats: {
    label: string;
    value: string;
  };
  glowColor: 'blue' | 'orange' | 'gold';
  pulseSpeed: string; // Tailwind duration animation class
}

export interface TechNode {
  name: string;
  iconName: string;
  x: number; // percentage coordinate on constellation canvas
  y: number; // percentage coordinate on constellation canvas
  level: number; // 1-100 expertise
  description: string;
  connections: string[]; // names of other TechNodes to draw lines to
}

export interface ConsoleLog {
  timestamp: string;
  type: 'info' | 'success' | 'warn' | 'system';
  message: string;
}

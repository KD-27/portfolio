import React from 'react';
import {
  FlaskConical, Brain, AlertTriangle, Users, Cpu, Blocks, Hand,
  Scale, MessageSquare, GitBranch, Shield, Trophy, type LucideIcon
} from 'lucide-react';

const THOUGHT_LAB_ICONS: Record<string, LucideIcon> = {
  Brain, AlertTriangle, Users, Cpu, Blocks, Hand,
  Scale, MessageSquare, GitBranch, Shield, Trophy
};

export const getThoughtLabIcon = (name: string, size: number): React.ReactNode => {
  const Icon = THOUGHT_LAB_ICONS[name] || FlaskConical;
  return <Icon size={size} />;
};

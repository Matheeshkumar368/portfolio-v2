import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { ReactNode } from 'react';

interface StaggerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Progressive text/content reveal with subtle depth, used inside app stages. */
export function Stagger({ children, className = '', delay = 0 }: StaggerProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** direction the item enters from */
  from?: 'bottom' | 'left' | 'right' | 'scale';
}

export function StaggerItem({ children, className = '', delay = 0, from = 'bottom' }: StaggerItemProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  const offset: Record<NonNullable<StaggerItemProps['from']>, { x: number; y: number; scale: number }> = {
    bottom: { x: 0, y: 24, scale: 1 },
    left: { x: -32, y: 0, scale: 1 },
    right: { x: 32, y: 0, scale: 1 },
    scale: { x: 0, y: 0, scale: 0.85 },
  };
  const o = offset[from];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: o.x, y: o.y, scale: o.scale }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

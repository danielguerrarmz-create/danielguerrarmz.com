import { motion } from 'motion/react';

export interface FadeTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function FadeTransition({ children, className }: FadeTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

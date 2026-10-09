import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

// Total time on screen before the site fades in. Kept short so visitors land on content fast.
const INTRO_DURATION_MS = 900;

export const INTRO_SEEN_KEY = 'kd-intro-seen';

const BootLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, '1');
    } catch {
      // Storage can be blocked (private mode); the intro just plays again next time.
    }
    const timer = setTimeout(onComplete, INTRO_DURATION_MS);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-mech-dark">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-neon-blue/10 blur-[120px]" />

      <div className="relative flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="font-mono font-bold text-4xl tracking-tight text-white"
        >
          KD<span className="text-neon-blue">.</span>
        </motion.span>

        <div className="mt-5 h-px w-28 bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-neon-blue"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: INTRO_DURATION_MS / 1000 - 0.1, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  );
};

export default BootLoader;

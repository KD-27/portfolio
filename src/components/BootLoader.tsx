
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, CheckCircle2 } from 'lucide-react';

const BootLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const bootSequence = [
    "INITIALIZING KERNEL...",
    "LOADING MEMORY MODULES...",
    "CALIBRATING SENSORS...",
    "CHECKING SYSTEM INTEGRITY...",
    "ESTABLISHING NEURAL LINK...",
    "RENDERING INTERFACE...",
    "ACCESS GRANTED."
  ];

  useEffect(() => {
    let currentLog = 0;
    
    // Log interval - SLOWED DOWN to 800ms per line
    const logInterval = setInterval(() => {
      if (currentLog < bootSequence.length) {
        setLogs(prev => [...prev, bootSequence[currentLog]]);
        currentLog++;
      }
    }, 800);

    // Progress interval - SLOWED DOWN
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(logInterval);
          // Hold at 100% for 1.5 seconds before entering site
          setTimeout(onComplete, 1500); 
          return 100;
        }
        // Increment by only 0.5% per tick for smoother, slower loading
        // Total time approx: (100 / 0.5) * 30ms = 6000ms (6 seconds)
        return prev + 0.5; 
      });
    }, 30);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center font-mono p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 text-neon-blue mb-6 animate-pulse">
           <Cpu size={32} />
           <h1 className="text-2xl font-bold tracking-widest">SYSTEM BOOT</h1>
        </div>

        {/* Terminal Window */}
        <div className="bg-mech-surface border border-white/10 rounded-lg p-4 h-48 overflow-hidden mb-6 shadow-[0_0_20px_rgba(0,243,255,0.1)] relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50"></div>
          <div className="flex flex-col justify-end h-full space-y-1">
            {logs.map((log, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-xs md:text-sm text-neon-green"
              >
                <span className="text-gray-600">[{new Date().toLocaleTimeString()}]</span>
                <span>{'>'} {log}</span>
                {index < logs.length - 1 && <CheckCircle2 size={12} className="ml-auto text-neon-blue" />}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-2 w-full bg-gray-900 rounded overflow-hidden border border-white/10">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-neon-blue shadow-[0_0_10px_#00f3ff]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500 font-bold">
          <span>LOADING_ASSETS</span>
          <span>{Math.floor(progress)}%</span>
        </div>

      </div>
    </div>
  );
};

export default BootLoader;

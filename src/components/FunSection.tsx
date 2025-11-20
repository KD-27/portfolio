
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MousePointer2, ShieldAlert, Zap, Crosshair } from 'lucide-react';

interface Bot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

const FunSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<'gather' | 'orbit' | 'scatter'>('gather');
  const [botCount, setBotCount] = useState(100);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let pulseStrength = 0; // Used for the shockwave effect

    // Initialize Bots
    const bots: Bot[] = [];
    const colors = ['#00f3ff', '#bc13fe', '#0aff0a'];

    const initBots = () => {
      bots.length = 0;
      for (let i = 0; i < botCount; i++) {
        bots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          size: Math.random() * 3 + 2,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      mouseX = canvas.width / 2;
      mouseY = canvas.height / 2;
      initBots();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    
    // Touch support
    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.touches[0].clientX - rect.left;
      mouseY = e.touches[0].clientY - rect.top;
    };

    // Handle Click/Tap Shockwave
    const handleTap = () => {
      pulseStrength = 30; // Set high initial pulse strength
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('mousedown', handleTap);
    canvas.addEventListener('touchstart', handleTap);
    
    handleResize();

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Decay pulse strength
      if (pulseStrength > 0.1) {
        pulseStrength *= 0.92;
      } else {
        pulseStrength = 0;
      }

      // Draw Shockwave Ring if active
      if (pulseStrength > 0.5) {
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, (30 - pulseStrength) * 5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${pulseStrength / 30})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      bots.forEach(bot => {
        // Physics Logic based on Mode
        const dx = mouseX - bot.x;
        const dy = mouseY - bot.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1; // Avoid div by zero
        
        let ax = 0;
        let ay = 0;

        if (mode === 'gather') {
          // Attract to mouse
          const force = Math.min(dist * 0.002, 0.5);
          ax = (dx / dist) * force;
          ay = (dy / dist) * force;
        } else if (mode === 'scatter') {
          // Repel from mouse
          const force = 1000 / (dist * dist + 100); // Stronger when close
          ax = -(dx / dist) * force;
          ay = -(dy / dist) * force;
        } else if (mode === 'orbit') {
           // Tangent force + weak attraction
           const force = 0.2;
           ax = -(dy / dist) * force + (dx / dist) * 0.05;
           ay = (dx / dist) * force + (dy / dist) * 0.05;
        }

        // Apply Pulse (Shockwave) Force - Always repulsive
        // This overrides current mode temporarily
        if (pulseStrength > 0) {
           const pulseForce = pulseStrength * 1.5; // Multiplier for effect
           ax -= (dx / dist) * pulseForce;
           ay -= (dy / dist) * pulseForce;
        }

        // Friction
        bot.vx *= 0.95;
        bot.vy *= 0.95;

        // Apply Acceleration
        bot.vx += ax;
        bot.vy += ay;

        // Random Brownian Motion (Jitter)
        bot.vx += (Math.random() - 0.5) * 0.2;
        bot.vy += (Math.random() - 0.5) * 0.2;

        // Update Position
        bot.x += bot.vx;
        bot.y += bot.vy;

        // Boundary Bounce
        if (bot.x < 0 || bot.x > canvas.width) {
            bot.vx *= -1;
            bot.x = Math.max(0, Math.min(canvas.width, bot.x));
        }
        if (bot.y < 0 || bot.y > canvas.height) {
            bot.vy *= -1;
            bot.y = Math.max(0, Math.min(canvas.height, bot.y));
        }

        // Draw Bot (Triangle rotated to velocity)
        const angle = Math.atan2(bot.vy, bot.vx);
        ctx.save();
        ctx.translate(bot.x, bot.y);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(bot.size * 2, 0);
        ctx.lineTo(-bot.size, -bot.size);
        ctx.lineTo(-bot.size, bot.size);
        ctx.closePath();
        ctx.fillStyle = bot.color;
        ctx.shadowColor = bot.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      });
      
      // Draw Cursor Target
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 10, 0, Math.PI * 2);
      ctx.strokeStyle = mode === 'scatter' ? '#ef4444' : '#00f3ff';
      ctx.lineWidth = 2;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('mousedown', handleTap);
      canvas.removeEventListener('touchstart', handleTap);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode, botCount]);

  return (
    <section id="fun" className="py-20 bg-black relative border-y border-gray-800 overflow-hidden">
       {/* Background Gradient */}
       <div className="absolute inset-0 bg-gradient-to-b from-mech-dark to-black pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 text-center relative z-10 h-full">
        <div className="mb-8">
          <h2 className="text-3xl font-mono font-bold text-white mb-2 flex items-center justify-center gap-3">
             <Zap className="text-neon-blue animate-pulse" />
             SWARM INTELLIGENCE DEMO
          </h2>
          <p className="text-gray-400 text-sm">
            Interact with the autonomous nano-bot fleet. Tap/Click to scatter.
          </p>
        </div>

        <div className="relative w-full h-[400px] md:h-[500px] bg-mech-surface rounded-xl border border-gray-700 shadow-2xl overflow-hidden group cursor-crosshair">
           <canvas 
             ref={canvasRef} 
             className="w-full h-full block touch-none"
           />
           
           {/* Overlay Controls */}
           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/70 backdrop-blur-md p-3 rounded-full border border-white/10 w-max max-w-[90%] overflow-x-auto">
              
              <button 
                onClick={() => setMode('gather')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono font-bold transition-all whitespace-nowrap ${mode === 'gather' ? 'bg-neon-blue text-black' : 'bg-transparent text-gray-400 hover:text-white'}`}
              >
                <MousePointer2 size={16} /> TARGET
              </button>

              <button 
                onClick={() => setMode('scatter')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono font-bold transition-all whitespace-nowrap ${mode === 'scatter' ? 'bg-red-500 text-white' : 'bg-transparent text-gray-400 hover:text-white'}`}
              >
                <ShieldAlert size={16} /> EVADE
              </button>

              <button 
                onClick={() => setMode('orbit')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono font-bold transition-all whitespace-nowrap ${mode === 'orbit' ? 'bg-neon-purple text-white' : 'bg-transparent text-gray-400 hover:text-white'}`}
              >
                <Crosshair size={16} /> ORBIT
              </button>

           </div>
           
           <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded font-mono text-xs text-gray-400 pointer-events-none">
             BOTS: {botCount} // FPS: 60
           </div>
        </div>
        
        <div className="mt-6 flex justify-center gap-6 text-xs font-mono text-gray-500">
           <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-neon-blue"></span>
             <span>NAVIGATION: ON</span>
           </div>
           <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-neon-green"></span>
             <span>COLLISION: OFF</span>
           </div>
           <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-neon-purple"></span>
             <span>AI CORE: ACTIVE</span>
           </div>
        </div>

      </div>
    </section>
  );
};

export default FunSection;

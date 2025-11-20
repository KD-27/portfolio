
import React, { useState, useEffect, useRef } from 'react';
import { MousePointer2, ShieldAlert, Zap, Crosshair, Activity, Wifi, Cpu, Users, Ghost } from 'lucide-react';

interface Bot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  originalColor: string;
  role: 'predator' | 'prey'; // New Role Property
  history: { x: number; y: number }[];
}

const FunSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<'gather' | 'orbit' | 'scatter' | 'flock' | 'predator'>('flock');
  const [botCount] = useState(60);
  const [networkDensity, setNetworkDensity] = useState(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let pulseStrength = 0;

    // Initialize Bots
    const bots: Bot[] = [];
    const colors = ['#00f3ff', '#bc13fe', '#0aff0a'];

    const initBots = () => {
      bots.length = 0;
      const isPredatorMode = mode === 'predator';
      // In predator mode, ~8% are predators
      const predatorCount = isPredatorMode ? Math.ceil(botCount * 0.08) : 0;

      for (let i = 0; i < botCount; i++) {
        // Determine Role
        const isPredator = i < predatorCount;
        const role = isPredator ? 'predator' : 'prey';
        
        // Visuals based on role
        const color = isPredator ? '#ef4444' : colors[Math.floor(Math.random() * colors.length)];
        const size = isPredator ? 8 : Math.random() * 3 + 2;

        bots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          size: size,
          color: color,
          originalColor: color,
          role: role,
          history: []
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
    
    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.touches[0].clientX - rect.left;
      mouseY = e.touches[0].clientY - rect.top;
    };

    const handleTap = () => {
      pulseStrength = 30;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('mousedown', handleTap);
    canvas.addEventListener('touchstart', handleTap);
    
    handleResize();

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 1. Background Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 50;
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

      // Decay pulse
      if (pulseStrength > 0.1) {
        pulseStrength *= 0.92;
      } else {
        pulseStrength = 0;
      }

      // Draw Shockwave
      if (pulseStrength > 0.5) {
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, (30 - pulseStrength) * 10, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${pulseStrength / 30})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      let activeConnections = 0;

      // Boids Constants
      const visualRange = 100;
      const protectedRange = 20; // Separation distance
      const centeringFactor = 0.005; // Cohesion
      const matchingFactor = 0.05; // Alignment
      const avoidFactor = 0.05; // Separation

      // 2. Physics & Logic
      bots.forEach((bot, i) => {
        let separationX = 0, separationY = 0;
        let alignmentX = 0, alignmentY = 0;
        let cohesionX = 0, cohesionY = 0;
        let neighborCount = 0;
        let predatorCount = 0;

        // --- BOIDS ALGORITHM Loop ---
        for (let j = 0; j < bots.length; j++) {
          if (i === j) continue;
          
          const otherBot = bots[j];
          const dx = bot.x - otherBot.x;
          const dy = bot.y - otherBot.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Interaction Range
          if (dist < visualRange) {
             
             // A. VISUALIZATION (Mesh Network)
             // Draw lines only between teammates (Prey-Prey or Predator-Predator)
             if (bot.role === otherBot.role && (mode === 'flock' || mode === 'predator') && j > i && dist < visualRange * 0.6) { 
               activeConnections++;
               ctx.beginPath();
               ctx.moveTo(bot.x, bot.y);
               ctx.lineTo(otherBot.x, otherBot.y);
               const alpha = 1 - (dist / (visualRange * 0.6));
               ctx.strokeStyle = bot.role === 'predator' ? `rgba(239, 68, 68, ${alpha * 0.3})` : `rgba(0, 243, 255, ${alpha * 0.15})`;
               ctx.stroke();
             }

             // B. PHYSICS (Behavior)
             if (bot.role === 'prey') {
                if (otherBot.role === 'prey') {
                    // Standard Flocking with other Prey
                    neighborCount++;
                    cohesionX += otherBot.x;
                    cohesionY += otherBot.y;
                    alignmentX += otherBot.vx;
                    alignmentY += otherBot.vy;
                    if (dist < protectedRange) {
                        separationX += dx;
                        separationY += dy;
                    }
                } else {
                    // PREDATOR DETECTED: FLEE!
                    // Apply stronger separation force from predator
                    if (dist < visualRange * 1.2) {
                        separationX += dx * 5; // Multiplier for panic
                        separationY += dy * 5;
                        // Turn red briefly to show panic? (Optional, keeping original colors for clarity)
                    }
                }
             } else {
                // I AM A PREDATOR
                if (otherBot.role === 'prey') {
                    // PREY DETECTED: CHASE!
                    // Treat prey position as a strong cohesion target
                    predatorCount++; // Reusing variable for prey count in sight
                    cohesionX += otherBot.x;
                    cohesionY += otherBot.y;
                    // Predators don't align with prey (they intercept), so skip alignment
                } else {
                    // ANOTHER PREDATOR: Separate (don't bunch up)
                    if (dist < protectedRange * 2) {
                        separationX += dx;
                        separationY += dy;
                    }
                }
             }
          }
        }

        // Apply Accumulated Forces
        if (bot.role === 'prey') {
            if (neighborCount > 0) {
                // Cohesion
                cohesionX = cohesionX / neighborCount;
                cohesionY = cohesionY / neighborCount;
                const cohesionStrength = (mode === 'flock' || mode === 'predator') ? 1.0 : 0.2;
                bot.vx += (cohesionX - bot.x) * centeringFactor * cohesionStrength;
                bot.vy += (cohesionY - bot.y) * centeringFactor * cohesionStrength;

                // Alignment
                alignmentX = alignmentX / neighborCount;
                alignmentY = alignmentY / neighborCount;
                bot.vx += (alignmentX - bot.vx) * matchingFactor;
                bot.vy += (alignmentY - bot.vy) * matchingFactor;
            }
            // Separation (Includes Fleeing from Predators)
            bot.vx += separationX * avoidFactor;
            bot.vy += separationY * avoidFactor;

        } else {
            // Predator Logic
            if (predatorCount > 0) {
                // Chase Prey (Cohesion towards prey centroid)
                cohesionX = cohesionX / predatorCount;
                cohesionY = cohesionY / predatorCount;
                // Aggressive seeking
                bot.vx += (cohesionX - bot.x) * 0.015; // Stronger than normal cohesion
                bot.vy += (cohesionY - bot.y) * 0.015;
            }
            // Separate from other predators
            bot.vx += separationX * 0.05;
            bot.vy += separationY * 0.05;
        }

        // --- MOUSE INTERACTION ---
        const dx = mouseX - bot.x;
        const dy = mouseY - bot.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        if (mode === 'gather') {
          const force = Math.min(dist * 0.002, 0.5);
          bot.vx += (dx / dist) * force;
          bot.vy += (dy / dist) * force;
        } else if (mode === 'scatter') {
          const force = 500 / (dist * dist + 100);
          bot.vx -= (dx / dist) * force;
          bot.vy -= (dy / dist) * force;
        } else if (mode === 'orbit') {
           const force = 0.2;
           bot.vx -= (dy / dist) * force;
           bot.vy += (dx / dist) * force;
           bot.vx += (dx / dist) * 0.02;
           bot.vy += (dy / dist) * 0.02;
        } else if (mode === 'flock') {
           // Gentle leader following
           const force = 0.03; 
           bot.vx += (dx / dist) * force;
           bot.vy += (dy / dist) * force;
        } else if (mode === 'predator') {
           // In Predator mode, Mouse acts as a "Sanctuary" / "Attractor" for Prey
           // This allows the user to try and save the prey
           if (bot.role === 'prey') {
              const force = 0.02;
              bot.vx += (dx / dist) * force;
              bot.vy += (dy / dist) * force;
           }
           // Predators ignore mouse
        }

        // Shockwave Pulse
        if (pulseStrength > 0) {
           const pulseForce = pulseStrength * 1.5;
           bot.vx -= (dx / dist) * pulseForce;
           bot.vy -= (dy / dist) * pulseForce;
        }

        // Speed Limits
        let speedLimit = 6;
        if (mode === 'scatter') speedLimit = 12;
        if (mode === 'predator') {
            speedLimit = bot.role === 'predator' ? 7 : 6.5; // Predators slightly faster
        }

        const speed = Math.sqrt(bot.vx * bot.vx + bot.vy * bot.vy);
        if (speed > speedLimit) {
          bot.vx = (bot.vx / speed) * speedLimit;
          bot.vy = (bot.vy / speed) * speedLimit;
        }

        // Friction (Damping)
        bot.vx *= 0.98;
        bot.vy *= 0.98;

        // Update Position
        bot.x += bot.vx;
        bot.y += bot.vy;

        // History / Trails
        bot.history.push({ x: bot.x, y: bot.y });
        if (bot.history.length > 8) bot.history.shift();

        // Bounce Bounds
        const margin = 20;
        if (bot.x < margin) bot.vx += 0.5;
        if (bot.x > canvas.width - margin) bot.vx -= 0.5;
        if (bot.y < margin) bot.vy += 0.5;
        if (bot.y > canvas.height - margin) bot.vy -= 0.5;

        // 3. Draw Trails
        if (bot.history.length > 1) {
          ctx.beginPath();
          ctx.moveTo(bot.history[0].x, bot.history[0].y);
          for (let k = 1; k < bot.history.length; k++) {
            ctx.lineTo(bot.history[k].x, bot.history[k].y);
          }
          ctx.strokeStyle = bot.color;
          ctx.globalAlpha = 0.3;
          ctx.stroke();
          ctx.globalAlpha = 1.0;
        }

        // 4. Draw Bot
        const angle = Math.atan2(bot.vy, bot.vx);
        ctx.save();
        ctx.translate(bot.x, bot.y);
        ctx.rotate(angle);
        ctx.beginPath();
        // Predators look sharper/larger
        const scale = bot.role === 'predator' ? 1.5 : 1;
        ctx.moveTo(bot.size * 2 * scale, 0);
        ctx.lineTo(-bot.size * scale, -bot.size * scale);
        ctx.lineTo(-bot.size * scale, bot.size * scale);
        ctx.closePath();
        ctx.fillStyle = bot.color;
        ctx.shadowColor = bot.color;
        ctx.shadowBlur = bot.role === 'predator' ? 15 : 10;
        ctx.fill();
        
        // Draw visual range for predators (faint ring)
        if (bot.role === 'predator' && mode === 'predator') {
           ctx.beginPath();
           ctx.arc(0, 0, visualRange, 0, Math.PI * 2);
           ctx.strokeStyle = 'rgba(239, 68, 68, 0.1)';
           ctx.stroke();
        }
        
        ctx.restore();
      });

      // Update Stats
      setNetworkDensity(Math.floor((activeConnections / (botCount * 2)) * 100));

      // Draw Cursor
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 10, 0, Math.PI * 2);
      ctx.strokeStyle = mode === 'predator' ? '#10b981' : '#00f3ff'; // Green cursor in predator mode (Safe Haven)
      ctx.lineWidth = 2;
      ctx.stroke();
      
      if (mode === 'predator') {
         // Draw "Sanctuary" ring
         ctx.beginPath();
         ctx.arc(mouseX, mouseY, 30, 0, Math.PI * 2);
         ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
         ctx.stroke();
         // Text label
         ctx.fillStyle = '#10b981';
         ctx.font = '10px monospace';
         ctx.fillText("SAFE_HAVEN", mouseX + 15, mouseY - 15);
      }

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
       <div className="absolute inset-0 bg-gradient-to-b from-mech-dark to-black pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 text-center relative z-10 h-full">
        <div className="mb-8">
          <h2 className="text-3xl font-mono font-bold text-white mb-2 flex items-center justify-center gap-3">
             <Zap className="text-neon-blue animate-pulse" />
             SWARM INTELLIGENCE DEMO
          </h2>
          <p className="text-gray-400 text-sm font-mono uppercase tracking-wide">
            // Autonomous Multi-Agent System Visualization
          </p>
        </div>

        <div className="relative w-full h-[400px] md:h-[500px] bg-mech-surface rounded-xl border border-gray-700 shadow-2xl overflow-hidden group cursor-crosshair">
           <canvas 
             ref={canvasRef} 
             className="w-full h-full block touch-none"
           />
           
           {/* HUD: Top Left */}
           <div className="absolute top-4 left-4 flex flex-col items-start gap-2 font-mono text-xs text-neon-blue pointer-events-none opacity-70">
              <div className="flex items-center gap-2">
                <Activity size={14} />
                <span>SYS_STATUS: ONLINE</span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi size={14} />
                <span>NET_DENSITY: {networkDensity}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu size={14} />
                <span>ACTIVE_NODES: {botCount}</span>
              </div>
           </div>

           {/* HUD: Top Right */}
           <div className="absolute top-4 right-4 font-mono text-xs text-neon-green pointer-events-none opacity-70 text-right">
              <div>FPS: 60</div>
              <div>LATENCY: 2ms</div>
              <div>MODE: {mode.toUpperCase()}</div>
              {mode === 'predator' && <div className="text-red-500 animate-pulse">THREAT_LEVEL: CRITICAL</div>}
           </div>

           {/* Controls */}
           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/70 backdrop-blur-md p-2 rounded-full border border-white/10 w-max max-w-[95%] overflow-x-auto shadow-lg z-20 custom-scrollbar">
              
              <button 
                onClick={() => setMode('flock')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono font-bold transition-all whitespace-nowrap ${mode === 'flock' ? 'bg-neon-green text-black shadow-[0_0_15px_rgba(10,255,10,0.5)]' : 'bg-transparent text-gray-400 hover:text-white'}`}
              >
                <Users size={16} /> FLOCK
              </button>

              <button 
                onClick={() => setMode('gather')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono font-bold transition-all whitespace-nowrap ${mode === 'gather' ? 'bg-neon-blue text-black shadow-[0_0_15px_rgba(0,243,255,0.5)]' : 'bg-transparent text-gray-400 hover:text-white'}`}
              >
                <MousePointer2 size={16} /> TARGET
              </button>

              <button 
                onClick={() => setMode('predator')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono font-bold transition-all whitespace-nowrap ${mode === 'predator' ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'bg-transparent text-gray-400 hover:text-white'}`}
              >
                <Ghost size={16} /> PREDATOR
              </button>

              <button 
                onClick={() => setMode('scatter')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono font-bold transition-all whitespace-nowrap ${mode === 'scatter' ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'bg-transparent text-gray-400 hover:text-white'}`}
              >
                <ShieldAlert size={16} /> EVADE
              </button>

              <button 
                onClick={() => setMode('orbit')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono font-bold transition-all whitespace-nowrap ${mode === 'orbit' ? 'bg-neon-purple text-white shadow-[0_0_15px_rgba(188,19,254,0.5)]' : 'bg-transparent text-gray-400 hover:text-white'}`}
              >
                <Crosshair size={16} /> ORBIT
              </button>

           </div>
        </div>
        
        {/* Bottom Status Bar */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-widest">
           <div className="border-t border-gray-800 pt-2">
             Global Pos: ENABLED
           </div>
           <div className="border-t border-gray-800 pt-2 text-neon-blue">
             Mesh Protocol: V.2.4
           </div>
           <div className="border-t border-gray-800 pt-2">
             Collision: OPTIMIZED
           </div>
        </div>

      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 0px; }
      `}</style>
    </section>
  );
};

export default FunSection;

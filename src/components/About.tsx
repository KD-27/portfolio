
import React from 'react';
import { Download, Github, Linkedin, Mail } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-mech-dark border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold font-mono text-white mb-8">ABOUT <span className="text-neon-blue">ME</span></h2>
        <div className="bg-mech-surface p-8 rounded-2xl shadow-xl border border-gray-800">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-neon-blue shadow-[0_0_20px_rgba(0,243,255,0.3)] flex-shrink-0">
              <img src="https://picsum.photos/300/300?grayscale" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                I am a multidisciplinary engineer obsessed with making things move. With a background in Mechatronic Engineering, I thrive in the "messy middle" where hardware meets software.
                <br/><br/>
                My goal is to build robust, intelligent robotic systems that solve real-world problems. Whether it's designing a custom PCB, machining a chassis, or writing ROS nodes, I love every step of the process.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href={SOCIAL_LINKS.resume} 
                  download 
                  className="flex items-center gap-2 px-6 py-2 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <Download size={18} /> RESUME
                </a>
                <div className="flex gap-4 ml-auto">
                  <a 
                    href={SOCIAL_LINKS.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 bg-gray-800 rounded-full text-white hover:bg-neon-blue hover:text-black transition-all"
                  >
                    <Github size={20} />
                  </a>
                  <a 
                    href={SOCIAL_LINKS.linkedin} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 bg-gray-800 rounded-full text-white hover:bg-neon-blue hover:text-black transition-all"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a 
                    href={`mailto:${SOCIAL_LINKS.email}`} 
                    className="p-2 bg-gray-800 rounded-full text-white hover:bg-neon-blue hover:text-black transition-all"
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

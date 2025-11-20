import React, { useState, useRef, useEffect } from 'react';
import {X, Send, Key, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { initializeGemini, sendMessageToGemini } from '../services/geminiService';
import type { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isKeySet, setIsKeySet] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am Kaveesha\'s digital twin. Ask me about his skills, projects, or experience.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSetKey = () => {
    if (apiKey.trim().length > 0) {
      initializeGemini(apiKey);
      setIsKeySet(true);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const response = await sendMessageToGemini(userMsg.text);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-neon-purple text-white rounded-full shadow-[0_0_20px_rgba(188,19,254,0.5)] hover:scale-110 transition-transform group"
      >
        <Bot size={24} />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-black text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold pointer-events-none">
          Ask AI Assistant
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] bg-mech-surface border border-neon-purple/30 rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-mech-dark p-4 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="text-neon-purple" size={20} />
                <h3 className="font-mono font-bold text-white text-sm">DIGITAL TWIN v2.5</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
              {!isKeySet ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <Key className="text-gray-500" size={40} />
                  <p className="text-sm text-gray-300">To chat with the AI, please enter a valid Gemini API Key.</p>
                  <p className="text-xs text-gray-500">The key is stored in memory only and is never saved to a server.</p>
                  <input 
                    type="password" 
                    placeholder="Paste API Key here" 
                    className="w-full bg-black/50 border border-gray-700 rounded p-2 text-white text-sm focus:border-neon-purple outline-none"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <button 
                    onClick={handleSetKey}
                    className="px-4 py-2 bg-neon-purple/20 text-neon-purple border border-neon-purple rounded hover:bg-neon-purple hover:text-white transition-colors text-sm font-bold"
                  >
                    INITIALIZE SYSTEM
                  </button>
                  <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-xs text-gray-500 underline hover:text-white">Get an API Key</a>
                </div>
              ) : (
                <>
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        msg.role === 'user' 
                          ? 'bg-neon-purple/20 text-white border border-neon-purple/30' 
                          : 'bg-gray-800 text-gray-200'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-800 p-3 rounded-lg">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input */}
            {isKeySet && (
              <div className="p-3 bg-mech-dark border-t border-white/10 flex gap-2">
                <input 
                  type="text" 
                  placeholder="Ask about my projects..."
                  className="flex-1 bg-black/50 border border-gray-700 rounded p-2 text-white text-sm focus:border-neon-purple outline-none"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="p-2 bg-neon-purple text-white rounded hover:bg-neon-purple/80 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;
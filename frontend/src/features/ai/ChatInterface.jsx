import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, Bot, Sparkles, AlertTriangle } from 'lucide-react';
import api from '../../api/axios';
import { ENDPOINTS } from '../../api/endpoints';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! I am your AI Career Advisor powered by Google Gemini. How can I help you map out your future today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiErrorPopup, setApiErrorPopup] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);
    setApiErrorPopup(false);

    try {
      const response = await api.post(ENDPOINTS.AI.CHAT, { message: userMessage }).catch(err => err.response);

      if (response && response.data?.success) {
        setMessages(prev => [...prev, { role: 'ai', text: response.data.reply }]);
      } else {
        // Show popup instead of mock fallback if API fails
        setApiErrorPopup(true);
        setTimeout(() => setApiErrorPopup(false), 5000);
        setMessages(prev => [...prev, { role: 'error', text: 'Failed to generate response. The API limit may have been reached.' }]);
      }
    } catch (error) {
      setApiErrorPopup(true);
      setTimeout(() => setApiErrorPopup(false), 5000);
      setMessages(prev => [...prev, { role: 'error', text: 'Network error. Make sure the backend is running.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full glass-card-vibrant border border-[var(--border-color)] overflow-hidden min-h-[500px]">
      <div className="p-4 border-b border-[var(--border-color)] flex items-center gap-3 bg-[var(--bg-secondary)]/50 backdrop-blur-md">
        <div className="bg-[var(--accent-light)] p-2.5 rounded-xl text-[var(--accent-blue)]">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[var(--text-primary)]">Gemini Career Coach</h2>
          <p className="text-xs text-[var(--text-secondary)]">Ask about universities, visas, or jobs</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--bg-primary)]/30 relative">
        
        {/* API limit popup */}
        <div className={`absolute top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${apiErrorPopup ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
           <div className="bg-red-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-bold border border-red-400">
             <AlertTriangle className="w-4 h-4" /> API Limit Reached
           </div>
        </div>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role !== 'user' && (
              <div className="w-8 h-8 rounded-full bg-[var(--accent-light)] text-[var(--accent-blue)] flex items-center justify-center mr-2 self-end mb-1 flex-shrink-0">
                <Bot className="w-5 h-5" />
              </div>
            )}
            <div 
              className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed prose prose-sm dark:prose-invert ${
                msg.role === 'user' 
                  ? 'bg-[var(--accent-blue)] text-white rounded-2xl rounded-br-sm shadow-sm prose-p:text-white prose-headings:text-white prose-strong:text-white' 
                  : msg.role === 'error'
                  ? 'bg-red-500/10 text-red-500 rounded-2xl rounded-bl-sm border border-red-500/20'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-2xl rounded-bl-sm border border-[var(--border-color)] shadow-sm'
              }`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="w-8 h-8 rounded-full bg-[var(--accent-light)] text-[var(--accent-blue)] flex items-center justify-center mr-2 self-end mb-1 flex-shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl rounded-bl-sm px-4 py-3 p-4 flex gap-1.5 items-center">
                <span className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-bounce delay-75"></span>
                <span className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-bounce delay-150"></span>
              </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 bg-[var(--bg-secondary)]/50 backdrop-blur-md border-t border-[var(--border-color)] flex gap-3 items-center">
        <input 
          type="text" 
          placeholder="Ask me anything..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          className="flex-1 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] px-5 py-3 text-sm focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-[var(--accent-blue)] outline-none transition-shadow"
        />
        <button 
          type="submit" 
          disabled={isLoading || !input.trim()} 
          className="w-12 h-12 rounded-full bg-[var(--accent-blue)] hover:bg-[#6292b6] text-white flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex-shrink-0"
        >
          <Send className="w-5 h-5 ml-0.5" />
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;

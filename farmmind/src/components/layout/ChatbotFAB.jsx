import React, { useState } from 'react';
import { Bot, X, Send, Leaf } from 'lucide-react';

const ChatbotFAB = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hello! I am FarmMind AI. How can I help you with your farming today?', sender: 'ai' }
  ]);
  const [input, setInput] = useState('');

  const quickPrompts = [
    "What should I do today?",
    "Disease symptoms",
    "Weather risk",
    "Bio-Khaat recommendation"
  ];

  const handleSend = (text) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { text, sender: 'user' }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      let reply = "I understand. Let me check the best agricultural practices for your request.";
      if (text.toLowerCase().includes('spot') || text.toLowerCase().includes('disease')) {
        reply = "Brown spots may indicate fungal infection. Please upload a clear image of the affected leaf in the 'Disease Detection' section for diagnosis.";
      }
      setMessages(prev => [...prev, { text: reply, sender: 'ai' }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-50">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-80 md:w-96 flex flex-col overflow-hidden border border-krishi-green-light">
          {/* Header */}
          <div className="bg-krishi-green text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={24} />
              <div>
                <h3 className="font-bold">FarmMind AI</h3>
                <p className="text-xs text-krishi-green-light">Your Farming Assistant</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-krishi-green-dark p-1 rounded-full">
              <X size={20} />
            </button>
          </div>
          
          {/* Chat Area */}
          <div className="h-80 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`max-w-[85%] p-3 rounded-2xl ${msg.sender === 'ai' ? 'bg-white border border-gray-100 text-gray-700 self-start rounded-tl-none' : 'bg-krishi-green text-white self-end rounded-tr-none'}`}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="px-4 py-2 bg-white flex overflow-x-auto gap-2 no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button 
                key={idx} 
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap text-xs bg-krishi-cream border border-krishi-green-light text-krishi-green-dark px-3 py-1.5 rounded-full hover:bg-krishi-green-light"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Ask anything..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-krishi-green"
            />
            <button 
              onClick={() => handleSend(input)}
              className="bg-krishi-green text-white p-2 rounded-full hover:bg-krishi-green-dark flex-shrink-0"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-krishi-green text-white p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center animate-bounce-subtle"
        >
          <Bot size={28} />
        </button>
      )}
    </div>
  );
};

export default ChatbotFAB;


import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIChatMessages from '@/components/AIChatMessages';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: 'Hello! I\'m your AI travel assistant. How can I help you plan your next trip?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Add user message
    const userMessage = { type: 'user', content: input };
    setMessages([...messages, userMessage]);
    
    // Clear input and set loading state
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response after delay
    setTimeout(() => {
      const aiMessage = { 
        type: 'ai', 
        content: `I can help you with that travel query about "${input}". What specific details would you like to know?`
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Travel Assistant</h1>
          <p className="text-gray-600">
            Ask our AI travel assistant anything about flights, destinations, or travel tips. 
            Try asking: "Find the cheapest flight from Chicago to Miami?"
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <AIChatMessages messages={messages} isLoading={isLoading} />
          </div>
          
          <div className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Textarea 
                placeholder="Type your travel question here..."
                className="min-h-[50px] flex-1 resize-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
              <Button type="submit" className="self-end" disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AIChat;

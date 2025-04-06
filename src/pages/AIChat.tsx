
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIChatMessages from '@/components/AIChatMessages';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Lightbulb } from "lucide-react";

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: 'Hello! I\'m your AI travel assistant. How can I help you plan your next flight?'
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
        content: `I can help you with that flight query about "${input}". What specific details would you like to know?`
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const suggestedQueries = [
    "Flights from New York to London",
    "Find me a flight to Paris next week",
    "One-way flight from San Francisco to Tokyo",
    "What's the cheapest flight from Chicago to Miami?"
  ];

  const handleSuggestedQuery = (query) => {
    setInput(query);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-10 max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">AI Travel Assistant</h1>
          <div className="text-blue-600 font-medium">Expert Flight Search</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {messages.length === 1 && (
            <div className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ask me about flights</h2>
              <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto">
                Your AI-powered travel assistant is ready to answer your questions and help you book flights
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {suggestedQueries.map((query, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestedQuery(query)}
                    className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-blue-500">
                      <Lightbulb className="h-5 w-5" />
                    </div>
                    <p>{query}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {messages.length > 1 && (
            <div className="p-6 min-h-[400px] max-h-[600px] overflow-y-auto">
              <AIChatMessages messages={messages} isLoading={isLoading} />
            </div>
          )}
          
          <div className="border-t p-4 bg-white sticky bottom-0">
            <form onSubmit={handleSendMessage} className="flex gap-2 items-end">
              <Textarea 
                placeholder="Ask about flights..."
                className="min-h-[60px] flex-1 resize-none border-gray-200 focus:border-blue-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 h-[60px] px-5 rounded-full" disabled={isLoading}>
                <Send className="h-5 w-5" />
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

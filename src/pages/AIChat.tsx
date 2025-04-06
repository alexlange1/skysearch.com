
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIChatMessages from '@/components/AIChatMessages';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Plane, MapPin, Calendar, Hotel, Car } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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

  const suggestedQueries = [
    {
      icon: <Plane className="h-5 w-5" />,
      text: "Find the cheapest flight from Chicago to Miami?",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      text: "Best time to visit Paris?",
    },
    {
      icon: <Hotel className="h-5 w-5" />,
      text: "Recommend pet-friendly hotels in Seattle",
    },
    {
      icon: <Car className="h-5 w-5" />,
      text: "Car rental options in Los Angeles",
    },
  ];

  const handleSuggestedQuery = (query) => {
    setInput(query);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-10 max-w-4xl">
        {messages.length === 1 && (
          <>
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold mb-4">Ask me about travel</h1>
              <p className="text-xl text-gray-600">
                Your AI-powered travel expert is ready to answer your questions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {suggestedQueries.map((query, index) => (
                <Card 
                  key={index} 
                  className="cursor-pointer hover:bg-gray-50 transition-colors border border-gray-200"
                  onClick={() => handleSuggestedQuery(query.text)}
                >
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                      {query.icon}
                    </div>
                    <p>{query.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="p-6 min-h-[300px] max-h-[600px] overflow-y-auto">
            <AIChatMessages messages={messages} isLoading={isLoading} />
          </div>
          
          <div className="border-t p-4 bg-white sticky bottom-0">
            <form onSubmit={handleSendMessage} className="flex gap-2 items-end">
              <Textarea 
                placeholder="Ask about flights, destinations, or travel tips..."
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
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 h-[60px] px-5" disabled={isLoading}>
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

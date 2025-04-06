
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIChatMessages from '@/components/AIChatMessages';

const AIChat = () => {
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
          <AIChatMessages />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AIChat;

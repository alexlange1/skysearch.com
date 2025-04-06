
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIChatMessages from '@/components/AIChatMessages';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Lightbulb } from "lucide-react";
import { mcpFlightSearch } from '@/services/mcpService';
import { useToast } from "@/hooks/use-toast";

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: 'Hello! I\'m your AI travel assistant. How can I help you find flights today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [flights, setFlights] = useState([]);
  const [currentBooking, setCurrentBooking] = useState(null);
  const { toast } = useToast();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Add user message
    const userMessage = { type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input and set loading state
    const userQuery = input;
    setInput('');
    setIsLoading(true);
    
    try {
      // Call MCP service to search for flights
      const result = await mcpFlightSearch(userQuery);
      
      // Save flights to state for potential booking
      setFlights(result.flights);
      
      // Create AI response with flight data
      const aiMessage = { 
        type: 'ai', 
        content: result.responseMessage,
        flights: result.flights
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error searching flights:', error);
      const errorMessage = { 
        type: 'ai', 
        content: "I'm sorry, I encountered an error while searching for flights. Please try again with a different query."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookFlight = async (flight) => {
    setIsLoading(true);
    
    try {
      // Begin the booking flow
      setCurrentBooking({
        flight,
        stage: 'passenger',
        data: {}
      });
      
      // Add an AI message to request passenger details
      const bookingStartMessage = { 
        type: 'ai', 
        content: `Great choice! I'll help you book your ${flight.airline} flight from ${flight.departureAirport} to ${flight.arrivalAirport} on ${flight.departureTime}. First, I need some information.`,
        booking: { stage: 'passenger', flight }
      };
      
      setMessages(prev => [...prev, bookingStartMessage]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error starting booking:', error);
      const errorMessage = { 
        type: 'ai', 
        content: "I'm sorry, I encountered an error while preparing your booking. Please try again."
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const handleBookingStageComplete = (stage, data) => {
    setIsLoading(true);
    
    // Add user input as a message
    const userMessage = { 
      type: 'user', 
      content: data 
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Update the current booking data
    setCurrentBooking(prev => ({
      ...prev,
      data: { ...prev.data, [stage]: data }
    }));
    
    // Process based on current stage
    setTimeout(() => {
      let nextStage = '';
      let aiMessage = { type: 'ai', content: '' };
      
      switch(stage) {
        case 'passenger':
          nextStage = 'contact';
          aiMessage = { 
            type: 'ai', 
            content: `Thank you, ${data}. Now I need your contact information. Please enter your email address.`,
            booking: { stage: nextStage, flight: currentBooking.flight }
          };
          break;
          
        case 'contact':
          nextStage = 'payment';
          aiMessage = { 
            type: 'ai', 
            content: `Thank you. Your booking is almost complete. Please enter your credit card information to finalize your booking.`,
            booking: { stage: nextStage, flight: currentBooking.flight }
          };
          break;
          
        case 'payment':
          // Final stage - booking complete
          aiMessage = { 
            type: 'ai', 
            content: `Great choice! I've booked your ${currentBooking.flight.airline} flight from ${currentBooking.flight.departureAirport} to ${currentBooking.flight.arrivalAirport} on ${currentBooking.flight.departureTime}. Your confirmation number is ${Math.random().toString(36).substring(2, 10).toUpperCase()}.`
          };
          
          // Reset the booking process
          setCurrentBooking(null);
          
          toast({
            title: "Booking Successful",
            description: "Check your email for confirmation details",
          });
          break;
      }
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const suggestedQueries = [
    "Find flights from New York to London for tomorrow",
    "I need a flight from Chicago to Miami next week",
    "Show me flights from San Francisco to Tokyo",
    "What's the cheapest flight from Seattle to Boston?"
  ];

  const handleSuggestedQuery = (query) => {
    setInput(query);
  };

  // Get a random placeholder from suggested queries
  const getRandomPlaceholder = () => {
    return suggestedQueries[Math.floor(Math.random() * suggestedQueries.length)];
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
                    className="flex items-center p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-blue-500 mr-3">
                      <Lightbulb className="h-5 w-5" />
                    </div>
                    <p className="text-center flex-1">{query}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {messages.length > 1 && (
            <div className="p-6 min-h-[400px] max-h-[600px] overflow-y-auto">
              <AIChatMessages 
                messages={messages} 
                isLoading={isLoading} 
                onBookFlight={handleBookFlight}
                onBookingStageComplete={handleBookingStageComplete}
              />
            </div>
          )}
          
          <div className="border-t p-4 bg-white sticky bottom-0">
            <form onSubmit={handleSendMessage} className="flex gap-2 items-end">
              <Textarea 
                placeholder={getRandomPlaceholder()}
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


import React, { useState, useRef, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, LightbulbIcon, Info, Sparkles } from "lucide-react";
import AIChatMessages from "@/components/AIChatMessages";
import FlightResults from "@/components/FlightResults";
import { Flight } from '@/services/flightService';
import { useToast } from "@/hooks/use-toast";
import { mcpFlightSearch } from "@/services/mcpService";

const AIChat: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Array<{type: string, content: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [showFlightResults, setShowFlightResults] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Sample suggested queries
  const suggestionQueries = [
    "Flights from New York to London",
    "Find me a flight to Paris next week",
    "One-way flight from San Francisco to Tokyo",
    "What's the cheapest flight from Chicago to Miami?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const processUserQuery = async (query: string) => {
    setIsLoading(true);
    setShowFlightResults(false);
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: query }]);
    
    try {
      // Extract flight search parameters from the query
      const { flights, responseMessage } = await mcpFlightSearch(query);
      
      if (flights && flights.length > 0) {
        setFlights(flights);
        setShowFlightResults(true);
      }

      // Add assistant response
      setMessages(prev => [...prev, { type: 'assistant', content: responseMessage }]);
    } catch (error) {
      console.error("Error processing query:", error);
      
      // Error message
      setMessages(prev => [...prev, { 
        type: 'assistant', 
        content: "I'm sorry, I couldn't process your request. Please try again with a clearer flight search query." 
      }]);
      
      toast({
        title: "Error",
        description: "Failed to process your flight search request",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
    setInputValue("");
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (inputValue.trim() && !isLoading) {
      processUserQuery(inputValue.trim());
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!isLoading) {
      setInputValue(suggestion);
      processUserQuery(suggestion);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">AI Travel Assistant</h1>
              <Button variant="ghost" size="icon" className="ml-1">
                <Info className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm text-blue-600 font-medium">Expert Flight Search</div>
          </div>
          
          <Card className="shadow-lg border-0 overflow-hidden bg-white rounded-2xl">
            <CardContent className="p-0">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <Sparkles className="h-8 w-8 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">
                    Ask me about flights
                  </h2>
                  <p className="text-gray-500 mb-10 max-w-xl">
                    Your AI-powered travel assistant is ready to answer your questions and help you book flights
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
                    {suggestionQueries.map((query, index) => (
                      <Button 
                        key={index} 
                        variant="outline" 
                        className="p-4 h-auto justify-start text-left flex items-start border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors" 
                        onClick={() => handleSuggestionClick(query)}
                      >
                        <LightbulbIcon className="mr-3 h-5 w-5 mt-0.5 text-blue-500 flex-shrink-0" />
                        <span>{query}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="px-4 py-6 overflow-auto max-h-[60vh] bg-gray-50 rounded-t-2xl">
                  <AIChatMessages messages={messages} isLoading={isLoading} />
                  <div ref={messagesEndRef} />
                  
                  {showFlightResults && flights.length > 0 && (
                    <div className="mt-6">
                      <FlightResults flights={flights} isLoading={false} />
                    </div>
                  )}
                </div>
              )}
              
              <div className="border-t p-4 bg-white">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                  <Textarea
                    placeholder="Ask about flights..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="min-h-[56px] resize-none rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="h-[56px] w-[56px] rounded-full bg-blue-600 hover:bg-blue-700 flex-shrink-0"
                    disabled={!inputValue.trim() || isLoading}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIChat;

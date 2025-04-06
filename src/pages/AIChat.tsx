
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plane, Send, Info, LightbulbIcon } from "lucide-react";
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
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <Card className="shadow-lg border-0 overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Plane className="mr-2" />
              <h1 className="text-xl font-bold">AI Travel Assistant</h1>
            </div>
            <Button variant="ghost" size="icon" className="text-white">
              <Info className="h-5 w-5" />
            </Button>
          </div>
          
          {messages.length === 0 ? (
            <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
              <h2 className="text-2xl font-bold mb-4 text-center">Ask me about flights</h2>
              <p className="text-gray-500 mb-8 text-center max-w-lg">
                Your AI-powered travel assistant is ready to search and book flights for you
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
                {suggestionQueries.map((query, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    className="p-4 h-auto justify-start text-left flex items-start" 
                    onClick={() => handleSuggestionClick(query)}
                  >
                    <LightbulbIcon className="mr-2 h-5 w-5 mt-0.5 text-blue-500" />
                    <span>{query}</span>
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 overflow-auto max-h-[500px]">
              <AIChatMessages messages={messages} isLoading={isLoading} />
              <div ref={messagesEndRef} />
              
              {showFlightResults && flights.length > 0 && (
                <div className="mt-4">
                  <FlightResults flights={flights} isLoading={false} />
                </div>
              )}
            </div>
          )}
          
          <div className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <Textarea
                placeholder="Ask about flights..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="min-h-[60px] resize-none"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="icon" 
                className="h-[60px] w-[60px] bg-blue-600 hover:bg-blue-700"
                disabled={!inputValue.trim() || isLoading}
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIChat;

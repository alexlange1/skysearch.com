import React from 'react';
import { Sparkles, User, Clock, Plane, CreditCard, Check, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  currency: string;
  departureAirport: string;
  arrivalAirport: string;
  departureAirportCode: string;
  arrivalAirportCode: string;
  stops: number;
  durationInMinutes: number;
}

interface Message {
  type: string;
  content: string;
  flights?: Flight[];
  booking?: {
    stage?: string;
    flight?: Flight;
    data?: any;
  };
}

interface AIChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  onBookFlight: (flight: Flight) => void;
  onBookingStageComplete: (stage: string, data: any) => void;
}

const AIChatMessages: React.FC<AIChatMessagesProps> = ({ 
  messages, 
  isLoading, 
  onBookFlight,
  onBookingStageComplete
}) => {
  // Create separate state for each input type
  const [passengerInput, setPassengerInput] = useState("");
  const [contactInput, setContactInput] = useState("");
  const [paymentInputs, setPaymentInputs] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });
  
  const handleBookingInput = (stage: string) => {
    let inputValue = "";
    
    // Use the appropriate input based on stage
    switch(stage) {
      case 'passenger':
        if (!passengerInput.trim()) return;
        inputValue = passengerInput;
        // Don't clear passenger input to keep it after submission
        break;
      case 'contact':
        if (!contactInput.trim()) return;
        inputValue = contactInput;
        // Don't clear contact input to keep it after submission
        break;
      case 'payment':
        // Check if all payment fields are filled
        if (!paymentInputs.cardNumber.trim() || 
            !paymentInputs.expiryDate.trim() || 
            !paymentInputs.cvv.trim()) return;
            
        // Combine payment information
        inputValue = JSON.stringify(paymentInputs);
        // Don't clear payment inputs to keep them after submission
        break;
    }
    
    onBookingStageComplete(stage, inputValue);
  };

  return (
    <div className="space-y-6">
      {messages.map((message, index) => (
        <div key={index} className={cn("flex", message.type === 'user' ? "justify-end" : "justify-start")}>
          {message.type === 'user' ? (
            <div className="flex flex-row-reverse max-w-[80%]">
              <Avatar className="h-8 w-8 ring-2 ring-blue-100 flex-shrink-0 ml-3">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-blue-500 text-white rounded-2xl rounded-tr-sm py-3 px-4">
                {message.content}
              </div>
            </div>
          ) : (
            <div className="flex flex-row max-w-[80%]">
              <Avatar className="h-8 w-8 ring-2 ring-blue-100 flex-shrink-0 mr-3">
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                  <Sparkles className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-4">
                <div className="bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-tl-sm py-3 px-4">
                  {message.content}
                </div>
                
                {/* Display flight results if available */}
                {message.flights && message.flights.length > 0 && (
                  <div className="space-y-3">
                    {message.flights.map((flight) => (
                      <div key={flight.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center">
                              <Badge variant="outline" className="mr-2 bg-blue-50">{flight.airline}</Badge>
                              <span className="text-xs text-gray-500">{flight.flightNumber}</span>
                            </div>
                            
                            <div className="flex items-center mt-2">
                              <div className="text-center mr-4">
                                <div className="text-lg font-bold">{flight.departureTime}</div>
                                <div className="text-xs text-gray-500">{flight.departureAirportCode}</div>
                              </div>
                              
                              <div className="flex flex-col items-center">
                                <div className="text-xs text-gray-500 mb-1">{flight.duration}</div>
                                <div className="relative flex flex-col items-center">
                                  <div className="w-16 md:w-24 h-0.5 bg-gray-300"></div>
                                  {flight.stops === 0 ? (
                                    <Plane size={14} className="absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-blue-500" />
                                  ) : (
                                    <div className="text-orange-500 text-xs font-semibold mt-1">
                                      {flight.stops} {flight.stops === 1 ? 'stop' : 'stops'}
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <div className="text-center ml-4">
                                <div className="text-lg font-bold">{flight.arrivalTime}</div>
                                <div className="text-xs text-gray-500">{flight.arrivalAirportCode}</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 self-end md:self-center">
                            <div className="text-lg font-bold text-blue-600">
                              ${flight.price}
                            </div>
                            <Button 
                              size="sm" 
                              className="bg-blue-500 hover:bg-blue-600"
                              onClick={() => onBookFlight(flight)}
                            >
                              Book
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Booking flow UI with separate input states */}
                {message.booking && (
                  <div className="mt-3">
                    {message.booking.stage === 'passenger' && (
                      <div className="bg-white border border-gray-200 rounded-xl p-4">
                        <h4 className="text-sm font-semibold mb-2">Please enter passenger names</h4>
                        <div className="flex gap-2">
                          <Input 
                            placeholder="First and Last Name" 
                            value={passengerInput} 
                            onChange={(e) => setPassengerInput(e.target.value)} 
                            className="flex-1"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleBookingInput('passenger');
                              }
                            }}
                          />
                          <Button onClick={() => handleBookingInput('passenger')}>
                            <Check className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {message.booking.stage === 'contact' && (
                      <div className="bg-white border border-gray-200 rounded-xl p-4">
                        <h4 className="text-sm font-semibold mb-2">Please enter your contact information</h4>
                        <div className="flex gap-2">
                          <Input 
                            placeholder="Email Address" 
                            type="email"
                            value={contactInput} 
                            onChange={(e) => setContactInput(e.target.value)} 
                            className="flex-1"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleBookingInput('contact');
                              }
                            }}
                          />
                          <Button onClick={() => handleBookingInput('contact')}>
                            <Check className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {message.booking.stage === 'payment' && (
                      <div className="bg-white border border-gray-200 rounded-xl p-4">
                        <h4 className="text-sm font-semibold mb-2">Enter your payment information</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-gray-500" />
                            <Input 
                              placeholder="Card Number" 
                              value={paymentInputs.cardNumber} 
                              onChange={(e) => setPaymentInputs({...paymentInputs, cardNumber: e.target.value})} 
                              className="flex-1"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <Input 
                              placeholder="MM/YY" 
                              value={paymentInputs.expiryDate}
                              onChange={(e) => setPaymentInputs({...paymentInputs, expiryDate: e.target.value})}
                              className="flex-1"
                            />
                            <Input 
                              placeholder="CVV" 
                              value={paymentInputs.cvv}
                              onChange={(e) => setPaymentInputs({...paymentInputs, cvv: e.target.value})}
                              className="flex-1"
                            />
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              className="flex-1" 
                              onClick={() => handleBookingInput('payment')}
                            >
                              Complete Payment
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
      
      {isLoading && (
        <div className="flex flex-row max-w-[80%]">
          <Avatar className="h-8 w-8 ring-2 ring-blue-100 flex-shrink-0 mr-3">
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
              <Sparkles className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="bg-white rounded-2xl rounded-tl-sm py-3 px-4 shadow-sm border border-gray-100">
            <div className="flex space-x-2">
              <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatMessages;

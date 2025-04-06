
import React from 'react';
import { Plane } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  type: string;
  content: string;
}

interface AIChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

const AIChatMessages: React.FC<AIChatMessagesProps> = ({ messages, isLoading }) => {
  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <div 
          key={index}
          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`flex ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-2 max-w-[80%]`}
          >
            {message.type === 'user' ? (
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-100 text-blue-800">U</AvatarFallback>
              </Avatar>
            ) : (
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-600 text-white">
                  <Plane className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}
            
            <div 
              className={`rounded-lg py-2 px-3 ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              {message.content}
            </div>
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="flex justify-start">
          <div className="flex flex-row gap-2 max-w-[80%]">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-blue-600 text-white">
                <Plane className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-gray-100 rounded-lg rounded-bl-none py-2 px-3">
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatMessages;

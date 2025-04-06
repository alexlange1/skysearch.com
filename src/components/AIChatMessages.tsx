
import React from 'react';
import { Sparkles, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

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
    <div className="space-y-8">
      {messages.map((message, index) => (
        <div 
          key={index}
          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`flex ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-3 max-w-[85%]`}
          >
            {message.type === 'user' ? (
              <Avatar className="h-8 w-8 ring-2 ring-blue-100">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            ) : (
              <Avatar className="h-8 w-8 ring-2 ring-blue-100">
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                  <Sparkles className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}
            
            <div 
              className={cn(
                "rounded-2xl py-3 px-4 shadow-sm", 
                message.type === 'user' 
                  ? "bg-blue-500 text-white rounded-tr-sm" 
                  : "bg-white text-gray-800 border border-gray-100 rounded-tl-sm"
              )}
            >
              {message.content}
            </div>
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="flex justify-start">
          <div className="flex flex-row gap-3 max-w-[85%]">
            <Avatar className="h-8 w-8 ring-2 ring-blue-100">
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                <Sparkles className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-white rounded-2xl py-3 px-4 shadow-sm border border-gray-100 rounded-tl-sm">
              <div className="flex space-x-2">
                <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatMessages;

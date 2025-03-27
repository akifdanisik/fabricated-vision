
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Search, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ModuleRenderer from './ModuleRenderer';
import WelcomeScreen from './WelcomeScreen';

// Define the Message type
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  moduleType?: string;
  moduleData?: Record<string, any>;
}

// Define the props for ChatInterface
interface ChatInterfaceProps {
  initialMessages?: Message[];
}

export function ChatInterface({ initialMessages = [] }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send a new message
  const sendMessage = () => {
    if (!input.trim()) return;

    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response with 1 second delay
    setTimeout(() => {
      const aiResponse = handleModuleRequest(input);
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Replace the existing handleModuleRequest function with the corrected version
  const handleModuleRequest = (userInput: string): Message => {
    const lowerCaseInput = userInput.toLowerCase();
    
    if (lowerCaseInput.includes('supplier') || lowerCaseInput.includes('vendor')) {
      return {
        id: Date.now().toString(),
        content: 'Here\'s the supplier information you requested.',
        sender: 'ai',
        timestamp: new Date(),
        moduleType: 'supplier',
        moduleData: {}
      };
    } else if (lowerCaseInput.includes('inventory') || lowerCaseInput.includes('stock')) {
      return {
        id: Date.now().toString(),
        content: 'Here\'s the inventory information you requested.',
        sender: 'ai',
        timestamp: new Date(),
        moduleType: 'inventory',
        moduleData: {}
      };
    }
    
    return {
      id: Date.now().toString(),
      content: 'I\'m not sure what information you\'re looking for. Could you be more specific?',
      sender: 'ai',
      timestamp: new Date()
    };
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden relative">
        {messages.length === 0 ? (
          <WelcomeScreen onSelectQuickStart={(value) => {
            setInput(value);
            sendMessage();
          }} />
        ) : (
          <ScrollArea className="h-full p-4">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.sender === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}
                  >
                    <p>{message.content}</p>
                    
                    {message.moduleType && (
                      <div className="mt-2">
                        <ModuleRenderer 
                          type={message.moduleType} 
                          data={message.moduleData || {}} 
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        )}
      </div>
      
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            onClick={sendMessage} 
            disabled={isLoading || !input.trim()}
            size="icon"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Export as default as well to maintain compatibility
export default ChatInterface;

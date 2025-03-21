
import { useState, useRef, useEffect } from 'react';
import { PaperclipIcon, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  actions?: {
    label: string;
    onClick: () => void;
  }[];
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'll help you build a new GPT. You can say something like, \"make a creative who helps generate visuals for new products\" or \"make a software engineer who helps format my code.\"\n\nWhat would you like to make?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (userInput: string): Message => {
    return {
      id: Date.now().toString(),
      content: 'I understand you\'re looking for assistance. Could you please be more specific about what you need help with? I can help with inventory management, supplier information, creating orders, and more.',
      sender: 'ai',
      timestamp: new Date()
    };
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto p-6">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={cn(
              "mb-6 max-w-3xl",
              message.sender === 'user' ? "ml-auto" : ""
            )}
          >
            <div className="flex items-start gap-4">
              {message.sender === 'ai' && (
                <Avatar className="mt-0.5 h-8 w-8 border bg-neutral-100">
                  <AvatarFallback className="text-neutral-600 text-xs">AI</AvatarFallback>
                </Avatar>
              )}
              
              <div className="flex-1">
                <div className={cn(
                  "prose prose-sm px-4 py-3 rounded-lg",
                  message.sender === 'user' 
                    ? "bg-neutral-800 text-white ml-auto"
                    : "bg-neutral-100 text-neutral-800"
                )}>
                  <div className="whitespace-pre-line">{message.content}</div>
                </div>
              </div>
              
              {message.sender === 'user' && (
                <Avatar className="mt-0.5 h-8 w-8 border bg-neutral-100">
                  <AvatarFallback className="text-neutral-600">JD</AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex items-center p-2 gap-2 bg-white border rounded-lg">
          <Button 
            type="button" 
            size="icon" 
            variant="ghost" 
            className="rounded-full text-neutral-500"
          >
            <PaperclipIcon className="h-5 w-5" />
          </Button>
          
          <Input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="I am a web designer, and I want to create a landing page for my client..." 
            className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-neutral-500"
          />
          
          <Button 
            type="submit" 
            size="icon" 
            variant="ghost"
            disabled={!input.trim()}
            className={cn(
              "rounded-full",
              input.trim() ? "bg-neutral-800 text-white" : "text-neutral-400"
            )}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}

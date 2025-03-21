
import { useState, useRef, useEffect } from 'react';
import { Send, Mic, ArrowRight, Plus, PaperclipIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

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
      content: 'Hello! I\'m your procurement assistant. How can I help you today?',
      sender: 'ai',
      timestamp: new Date(),
      actions: [
        { 
          label: 'Check inventory', 
          onClick: () => handleQuickPrompt('Check inventory status of critical items')
        },
        { 
          label: 'View suppliers', 
          onClick: () => handleQuickPrompt('Show me top suppliers')
        },
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
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

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} } as React.FormEvent);
    }, 100);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const generateAIResponse = (userInput: string): Message => {
    const lowercaseInput = userInput.toLowerCase();
    
    if (lowercaseInput.includes('inventory') || lowercaseInput.includes('stock')) {
      return {
        id: Date.now().toString(),
        content: 'Here\'s the current inventory status of your critical items:\n\n- Paracetamol API: 90kg (Below reorder point)\n- Microcrystalline Cellulose: 2500kg (Sufficient)\n- API-36B: 220kg (Critical low)',
        sender: 'ai',
        timestamp: new Date(),
        actions: [
          { 
            label: 'Create reorder', 
            onClick: () => handleQuickPrompt('Create a reorder for Paracetamol API')
          },
          { 
            label: 'View all inventory', 
            onClick: () => window.location.href = '/inventory'
          }
        ]
      };
    } else if (lowercaseInput.includes('supplier') || lowercaseInput.includes('vendor')) {
      return {
        id: Date.now().toString(),
        content: 'Here are your top suppliers:\n\n- PharmaCorp (Performance: 95%)\n- BioTech Materials (Performance: 92%)\n- MedSource Inc. (Performance: 88%)',
        sender: 'ai',
        timestamp: new Date(),
        actions: [
          { 
            label: 'Compare suppliers', 
            onClick: () => handleQuickPrompt('Compare PharmaCorp and BioTech Materials')
          },
          { 
            label: 'View all suppliers', 
            onClick: () => window.location.href = '/suppliers'
          }
        ]
      };
    } else if (lowercaseInput.includes('reorder') || lowercaseInput.includes('order')) {
      return {
        id: Date.now().toString(),
        content: 'I can help you create a reorder. For which product would you like to create a reorder?',
        sender: 'ai',
        timestamp: new Date(),
        actions: [
          { 
            label: 'Paracetamol API', 
            onClick: () => handleQuickPrompt('Create reorder for Paracetamol API, 200kg')
          },
          { 
            label: 'API-36B', 
            onClick: () => handleQuickPrompt('Create reorder for API-36B, 100kg')
          }
        ]
      };
    } else if (lowercaseInput.includes('compare')) {
      return {
        id: Date.now().toString(),
        content: 'Comparison between PharmaCorp and BioTech Materials:\n\n- Price: PharmaCorp ($500/kg) vs BioTech ($550/kg)\n- Lead time: PharmaCorp (10 weeks) vs BioTech (8 weeks)\n- Quality rating: PharmaCorp (4.8/5) vs BioTech (4.6/5)',
        sender: 'ai',
        timestamp: new Date(),
        actions: [
          { 
            label: 'Create RFQ', 
            onClick: () => handleQuickPrompt('Create RFQ with PharmaCorp')
          },
          { 
            label: 'View supplier details', 
            onClick: () => window.location.href = '/suppliers'
          }
        ]
      };
    } else {
      return {
        id: Date.now().toString(),
        content: 'I understand you\'re looking for assistance. Could you please be more specific about what you need help with? I can help with inventory management, supplier information, creating orders, and more.',
        sender: 'ai',
        timestamp: new Date(),
        actions: [
          { 
            label: 'Check inventory', 
            onClick: () => handleQuickPrompt('Check inventory status')
          },
          { 
            label: 'View suppliers', 
            onClick: () => handleQuickPrompt('Show me top suppliers')
          }
        ]
      };
    }
  };

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={75} className="h-full">
        <div className="flex flex-col h-full bg-white">
          <div className="flex-1 overflow-y-auto px-6 py-6">
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
                    <Avatar className="mt-0.5 h-8 w-8 border">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">AI</AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className="flex-1">
                    <div className={cn(
                      "prose prose-sm px-4 py-3 rounded-2xl",
                      message.sender === 'user' 
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-gray-100 text-gray-900"
                    )}>
                      <div className="whitespace-pre-line">{message.content}</div>
                    </div>
                    
                    {message.actions && message.actions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.actions.map((action, index) => (
                          <Button 
                            key={index} 
                            size="sm" 
                            variant="outline" 
                            className="text-xs rounded-full bg-white hover:bg-gray-50"
                            onClick={action.onClick}
                          >
                            {action.label}
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {message.sender === 'user' && (
                    <Avatar className="mt-0.5 h-8 w-8 border">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex items-center p-2 gap-2 bg-white border rounded-full">
              <Button 
                type="button" 
                size="icon" 
                variant="ghost" 
                className="rounded-full"
              >
                <Plus className="h-5 w-5" />
              </Button>
              
              <Button 
                type="button" 
                size="icon" 
                variant="ghost" 
                className="rounded-full"
              >
                <PaperclipIcon className="h-5 w-5" />
              </Button>
              
              <Input 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Tell us to..." 
                className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              
              <Button 
                type="button" 
                size="icon" 
                variant="ghost" 
                className={cn(
                  "rounded-full",
                  isRecording && "bg-red-100 text-red-500"
                )}
                onClick={toggleRecording}
              >
                <Mic className="h-5 w-5" />
              </Button>
              
              <Button 
                type="submit" 
                size="icon" 
                disabled={!input.trim()}
                className="rounded-full"
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      <ResizablePanel defaultSize={25} className="h-full">
        <div className="h-full bg-white border-l p-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-900">Identify any gaps</h3>
          </div>
          
          <div className="space-y-4 text-sm text-gray-600">
            <p>What specific methods can be used to gather information during the client briefing?</p>
            <p>How can I effectively manage client expectations throughout the design process?</p>
            <p>What should I do if the client's feedback doesn't align with my design vision?</p>
            <p>How can I speed up my procurement processes?</p>
            <p>What are best practices for supplier negotiations?</p>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

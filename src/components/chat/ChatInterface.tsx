
import { useState, useRef, useEffect } from 'react';
import { PaperclipIcon, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import ActionPreview, { ActionItem } from './ActionPreview';

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
      content: "Hi! I'll help you with procurement tasks. You can ask about inventory levels, supplier information, or creating orders.\n\nWhat would you like assistance with today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [previewActions, setPreviewActions] = useState<ActionItem[]>([]);
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
      const response = generateAIResponse(input);
      setMessages(prev => [...prev, response.message]);
      setPreviewActions(response.actions);
    }, 1000);
  };

  const generateAIResponse = (userInput: string): { message: Message, actions: ActionItem[] } => {
    let content = '';
    let actions: ActionItem[] = [];
    
    if (userInput.toLowerCase().includes('inventory') || userInput.toLowerCase().includes('stock')) {
      content = "I've checked our inventory levels. We have several items that are running low. Here are some actions you can take to address this.";
      actions = [
        {
          id: '1',
          title: 'View Low Stock Items',
          description: 'See all items that are below the reorder threshold',
          icon: 'chart',
          actionLabel: 'View Report',
          onClick: () => console.log('View low stock'),
          category: 'Inventory Actions'
        },
        {
          id: '2',
          title: 'Create Purchase Order',
          description: 'Create a new purchase order for low stock items',
          icon: 'list',
          actionLabel: 'Create PO',
          onClick: () => console.log('Create PO'),
          category: 'Inventory Actions'
        },
        {
          id: '3',
          title: 'Inventory Analysis',
          description: 'View detailed inventory trends and forecasts',
          icon: 'chart',
          actionLabel: 'View Analysis',
          onClick: () => console.log('Inventory analysis'),
          category: 'Reports'
        }
      ];
    } else if (userInput.toLowerCase().includes('supplier') || userInput.toLowerCase().includes('vendor')) {
      content = "Here's the supplier information you requested. I've prepared some actions related to supplier management.";
      actions = [
        {
          id: '1',
          title: 'View All Suppliers',
          description: 'See a list of all active suppliers',
          icon: 'list',
          actionLabel: 'View Suppliers',
          onClick: () => console.log('View suppliers'),
          category: 'Supplier Actions'
        },
        {
          id: '2',
          title: 'Add New Supplier',
          description: 'Create a new supplier record',
          icon: 'package',
          actionLabel: 'Add Supplier',
          onClick: () => console.log('Add supplier'),
          category: 'Supplier Actions'
        }
      ];
    } else if (userInput.toLowerCase().includes('order') || userInput.toLowerCase().includes('purchase')) {
      content = "I can help you with orders. Here are some actions you can take related to purchase orders.";
      actions = [
        {
          id: '1',
          title: 'Create New Order',
          description: 'Start a new purchase order',
          icon: 'box',
          actionLabel: 'Create Order',
          onClick: () => console.log('Create order'),
          category: 'Order Actions'
        },
        {
          id: '2',
          title: 'View Recent Orders',
          description: 'See orders from the last 30 days',
          icon: 'list',
          actionLabel: 'View Orders',
          onClick: () => console.log('View orders'),
          category: 'Order Actions'
        },
        {
          id: '3',
          title: 'Order Analytics',
          description: 'View spending trends and analysis',
          icon: 'chart',
          actionLabel: 'View Analytics',
          onClick: () => console.log('Order analytics'),
          category: 'Reports'
        }
      ];
    } else {
      content = "I understand you're looking for assistance. Could you please be more specific about what you need help with? I can help with inventory management, supplier information, creating orders, and more.";
      actions = [];
    }

    return {
      message: {
        id: Date.now().toString(),
        content,
        sender: 'ai',
        timestamp: new Date()
      },
      actions
    };
  };

  return (
    <div className="flex h-full">
      <div className="flex flex-col flex-1 bg-white">
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
                    <AvatarFallback className="text-neutral-700 text-xs">AI</AvatarFallback>
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
                    <AvatarFallback className="text-neutral-700">JD</AvatarFallback>
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
              placeholder="Ask about inventory, suppliers, or creating orders..." 
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

      <div className="w-full">
        <ActionPreview 
          title="Suggested Actions" 
          description={previewActions.length > 0 ? "Based on your conversation" : undefined}
          actions={previewActions}
        />
      </div>
    </div>
  );
}

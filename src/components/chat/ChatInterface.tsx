
import { useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import CategoryActions from './CategoryActions';
import { cn } from '@/lib/utils';

interface ChatInterfaceProps {
  actionsOpen?: boolean;
}

const ChatInterface = ({ actionsOpen = true }: ChatInterfaceProps) => {
  const [message, setMessage] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
      setShowWelcome(false);
    }
  };
  
  const handleQuickStartSelect = (prompt: string) => {
    console.log('Quick start selected:', prompt);
    setMessage(prompt);
    setShowWelcome(false);
  };

  return (
    <div className="flex h-full">
      <div className={cn(
        "flex-1 flex flex-col",
        actionsOpen ? "pr-0 md:pr-4" : "pr-0"
      )}>
        {showWelcome ? (
          <WelcomeScreen onSelectQuickStart={handleQuickStartSelect} userName="John" />
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 p-4 overflow-auto">
              {/* Chat messages would go here */}
              <div className="p-4 bg-white rounded-lg mb-4">
                <p>How can I help with your procurement today?</p>
              </div>
            </div>
            
            <div className="p-4 bg-white border-t">
              <form onSubmit={handleSendMessage}>
                <div className="relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full p-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-primary rounded-full hover:bg-primary-light/20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      
      {actionsOpen && (
        <div className="hidden md:block w-[350px] border-l animate-slide-in-right">
          <CategoryActions />
        </div>
      )}
    </div>
  );
};

export default ChatInterface;

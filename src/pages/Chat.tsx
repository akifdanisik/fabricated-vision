
import Layout from '@/components/layout/Layout';
import ChatInterface from '@/components/chat/ChatInterface';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Chat = () => {
  return (
    <Layout fullWidth>
      <div className="flex flex-col h-[calc(100vh-64px)]">
        <div className="flex justify-between items-center px-6 py-3 border-b bg-white">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4 text-neutral-600" />
            </Button>
            <div className="flex flex-col items-start">
              <h1 className="text-base font-medium text-neutral-800">AI Procurement Assistant</h1>
              <p className="text-xs text-neutral-500">Draft</p>
            </div>
          </div>
          
          <Button variant="outline" className="rounded-md text-sm font-medium">
            Create
          </Button>
        </div>
        
        <div className="flex flex-1 overflow-hidden border-t border-neutral-200">
          <div className="flex-1">
            <div className="flex items-center border-b border-neutral-200">
              <Button 
                variant="ghost" 
                className="rounded-none border-b-2 border-neutral-800 px-6 py-3 font-medium"
              >
                Chat
              </Button>
              <Button 
                variant="ghost" 
                className="rounded-none border-b-2 border-transparent px-6 py-3 text-neutral-500 font-medium"
              >
                Configure
              </Button>
            </div>
            <ChatInterface />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;


import Layout from '@/components/layout/Layout';
import ChatInterface from '@/components/chat/ChatInterface';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecentConversations from '@/components/chat/RecentConversations';
import WorkflowSuggestions from '@/components/workflow/WorkflowSuggestions';
import { Badge } from '@/components/ui/badge';
import { Check, Lightbulb, MessageSquare } from 'lucide-react';

const Chat = () => {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <Layout fullWidth>
      <div className="flex flex-col h-[calc(100vh-64px)]">
        <div className="flex justify-between items-center px-6 py-4 border-b bg-accent-light">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-medium text-gray-900">AI Procurement Assistant</h1>
            <Badge variant="secondary" className="bg-primary-light hover:bg-primary-light text-primary">100 Overall score</Badge>
          </div>
          
          <div className="flex">
            <Tabs defaultValue="chat" className="w-auto">
              <TabsList className="bg-white border rounded-full p-1 shadow-sm">
                <TabsTrigger 
                  value="chat" 
                  onClick={() => setActiveTab('chat')}
                  className="rounded-full px-4 text-sm data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat
                </TabsTrigger>
                <TabsTrigger 
                  value="suggestions" 
                  onClick={() => setActiveTab('suggestions')}
                  className="rounded-full px-4 text-sm data-[state=active]:bg-accent data-[state=active]:text-white"
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Suggestions
                </TabsTrigger>
                <TabsTrigger 
                  value="conversations" 
                  onClick={() => setActiveTab('conversations')}
                  className="rounded-full px-4 text-sm data-[state=active]:bg-primary-dark data-[state=active]:text-white"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Completed
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="chat" value={activeTab} className="h-full">
            <TabsContent value="chat" className="h-full m-0 p-0">
              <ChatInterface />
            </TabsContent>
            
            <TabsContent value="conversations" className="h-full m-0 p-0">
              <RecentConversations />
            </TabsContent>
            
            <TabsContent value="suggestions" className="h-full m-0 p-0">
              <WorkflowSuggestions />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;

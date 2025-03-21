
import Layout from '@/components/layout/Layout';
import ChatInterface from '@/components/chat/ChatInterface';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecentConversations from '@/components/chat/RecentConversations';
import WorkflowSuggestions from '@/components/workflow/WorkflowSuggestions';

const Chat = () => {
  const [activeTab, setActiveTab] = useState('chat');
  
  return (
    <Layout fullWidth hideNavbar>
      <div className="flex flex-col h-[calc(100vh-0px)]">
        <div className="flex-1 overflow-hidden">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="h-full flex flex-col"
          >
            <div className="border-b px-4">
              <TabsList className="my-2">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="conversations">Conversations</TabsTrigger>
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="chat" className="flex-1 h-[calc(100%-56px)] m-0 p-0">
              <ChatInterface />
            </TabsContent>
            
            <TabsContent value="conversations" className="flex-1 h-[calc(100%-56px)] m-0 p-0">
              <RecentConversations />
            </TabsContent>
            
            <TabsContent value="suggestions" className="flex-1 h-[calc(100%-56px)] m-0 p-0">
              <WorkflowSuggestions />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;

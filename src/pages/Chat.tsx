
import { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import Layout from '@/components/layout/Layout';
import ChatInterface from '@/components/chat/ChatInterface';
import RecentConversations from '@/components/chat/RecentConversations';
import WorkflowSuggestions from '@/components/workflow/WorkflowSuggestions';
import ChatSidebar from '@/components/chat/ChatSidebar';

const Chat = () => {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <Layout fullWidth hideNavbar>
      <div className="flex h-[calc(100vh-0px)] bg-white">
        <ChatSidebar />
        
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-hidden bg-white">
            <Tabs value={activeTab} className="h-full">
              <TabsContent value="chat" className="h-full m-0 p-0">
                <ChatInterface />
              </TabsContent>
              
              <TabsContent value="conversations" className="h-full m-0 p-0">
                <RecentConversations />
              </TabsContent>
              
              <TabsContent value="suggestions" className="h-full m-0 p-0 -mt-[48px]">
                <WorkflowSuggestions />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;

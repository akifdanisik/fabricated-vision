
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ChatInterface from '@/components/chat/ChatInterface';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecentConversations from '@/components/chat/RecentConversations';
import WorkflowSuggestions from '@/components/workflow/WorkflowSuggestions';

const Chat = () => {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-140px)]">
        <Tabs defaultValue="chat" className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList className="rounded-full p-1">
              <TabsTrigger 
                value="chat" 
                onClick={() => setActiveTab('chat')}
                className="rounded-full px-4"
              >
                Chat
              </TabsTrigger>
              <TabsTrigger 
                value="conversations" 
                onClick={() => setActiveTab('conversations')}
                className="rounded-full px-4"
              >
                Recent Conversations
              </TabsTrigger>
              <TabsTrigger 
                value="suggestions" 
                onClick={() => setActiveTab('suggestions')}
                className="rounded-full px-4"
              >
                Workflow Suggestions
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="chat" className="flex-1 h-full">
            <Card className="h-full overflow-hidden rounded-2xl shadow-sm border-opacity-50">
              <CardHeader className="p-4 border-b">
                <CardTitle className="text-xl">AI Procurement Assistant</CardTitle>
                <CardDescription>
                  Ask questions or give commands to manage your procurement processes
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 h-[calc(100%-80px)]">
                <ChatInterface />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="conversations" className="flex-1 h-full">
            <Card className="h-full overflow-hidden rounded-2xl shadow-sm border-opacity-50">
              <CardContent className="p-0 h-full">
                <RecentConversations />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="suggestions" className="flex-1 h-full">
            <Card className="h-full overflow-hidden rounded-2xl shadow-sm border-opacity-50">
              <CardContent className="p-0 h-full">
                <WorkflowSuggestions />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Chat;

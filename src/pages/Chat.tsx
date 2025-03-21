
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
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">AI Procurement Assistant</h1>
          <p className="text-gray-500 mt-1">Ask questions or give commands to manage your procurement processes</p>
        </div>
        
        <Tabs defaultValue="chat" className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList className="rounded-full p-1 bg-gray-100 border border-gray-200">
              <TabsTrigger 
                value="chat" 
                onClick={() => setActiveTab('chat')}
                className="rounded-full px-4 text-sm data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
              >
                Chat
              </TabsTrigger>
              <TabsTrigger 
                value="conversations" 
                onClick={() => setActiveTab('conversations')}
                className="rounded-full px-4 text-sm data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
              >
                Recent Conversations
              </TabsTrigger>
              <TabsTrigger 
                value="suggestions" 
                onClick={() => setActiveTab('suggestions')}
                className="rounded-full px-4 text-sm data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
              >
                Workflow Suggestions
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="chat" className="flex-1 h-full">
            <Card className="h-full overflow-hidden rounded-2xl shadow-sm border-gray-200">
              <CardContent className="p-0 h-full">
                <ChatInterface />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="conversations" className="flex-1 h-full">
            <Card className="h-full overflow-hidden rounded-2xl shadow-sm border-gray-200">
              <CardContent className="p-0 h-full">
                <RecentConversations />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="suggestions" className="flex-1 h-full">
            <Card className="h-full overflow-hidden rounded-2xl shadow-sm border-gray-200">
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

import Layout from '@/components/layout/Layout';
import ChatInterface from '@/components/chat/ChatInterface';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecentConversations from '@/components/chat/RecentConversations';
import WorkflowSuggestions from '@/components/workflow/WorkflowSuggestions';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
const Chat = () => {
  const [activeTab, setActiveTab] = useState('chat');
  return <Layout fullWidth>
      <div className="flex flex-col h-[calc(100vh-64px)]">
        
        
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} className="h-full">
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
    </Layout>;
};
export default Chat;
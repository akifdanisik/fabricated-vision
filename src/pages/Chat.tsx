
import Layout from '@/components/layout/Layout';
import ChatInterface from '@/components/chat/ChatInterface';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecentConversations from '@/components/chat/RecentConversations';
import WorkflowSuggestions from '@/components/workflow/WorkflowSuggestions';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, Lightbulb, MessageSquare, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Chat = () => {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <Layout fullWidth hideNavbar>
      <div className="flex flex-col h-[calc(100vh-0px)] bg-white">
        <div className="flex justify-end items-center px-6 py-3 border-b bg-white">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900">
              <Bell className="h-5 w-5" />
              <Badge 
                className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs"
                variant="destructive"
              >
                3
              </Badge>
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900">
              <Settings className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100">
                  <Avatar className="h-8 w-8 border border-gray-200">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className="text-sm bg-gray-100 text-gray-700">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-md border-gray-100">
                <DropdownMenuLabel className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className="bg-gray-100 text-gray-700">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-gray-500">john.doe@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-100" />
                <DropdownMenuItem className="cursor-pointer focus:bg-gray-100 rounded-lg my-1 focus:text-gray-900">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer focus:bg-gray-100 rounded-lg my-1 focus:text-gray-900">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-100" />
                <DropdownMenuItem className="cursor-pointer focus:bg-gray-100 rounded-lg my-1 focus:text-gray-900">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="hidden">
            <Tabs defaultValue="chat" value={activeTab} className="w-auto">
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
    </Layout>
  );
};

export default Chat;

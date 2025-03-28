
import Layout from '@/components/layout/Layout';
import ChatInterface from '@/components/chat/ChatInterface';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Settings, User, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Toaster } from '@/components/ui/toaster';

const Chat = () => {
  const location = useLocation();
  const [chatId, setChatId] = useState<string | null>(null);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    setChatId(id);
  }, [location]);

  return (
    <Layout fullWidth hideNavbar>
      <div className="flex flex-col h-[calc(100vh-0px)] bg-[#f3f3f3]">
        <div className="flex justify-between items-center px-6 py-3 border-b bg-white">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full mr-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-emerald-600 text-white">J</AvatarFallback>
              </Avatar>
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-gray-600 hover:bg-gray-100">
              <Edit className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative rounded-full h-10 w-10 text-gray-600 hover:bg-gray-100">
              <Bell className="h-5 w-5" />
              <Badge 
                className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs"
                variant="destructive"
              >
                3
              </Badge>
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-gray-600 hover:bg-gray-100">
              <Settings className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100">
                  <Avatar className="h-8 w-8 border border-gray-200">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className="text-sm bg-blue-100 text-blue-800">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-md border-gray-100">
                <DropdownMenuLabel className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className="bg-blue-100 text-blue-800">JD</AvatarFallback>
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
        </div>
        
        <div className="flex-1 overflow-hidden bg-[#f3f3f3]">
          <ChatInterface />
        </div>
      </div>
      
      <Toaster />
    </Layout>
  );
};

export default Chat;

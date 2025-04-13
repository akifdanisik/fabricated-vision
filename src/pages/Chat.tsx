
import Layout from '@/components/layout/Layout';
import ChatInterface from '@/components/chat/ChatInterface';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Settings, User, Calendar, Clock, Plus, Link, Globe, Mic, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

const Chat = () => {
  const location = useLocation();
  const [chatId, setChatId] = useState<string | null>(null);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    setChatId(id);
  }, [location]);
  return <Layout fullWidth hideNavbar>
      <div className="flex flex-col h-[calc(100vh-0px)] bg-[#f8f8f8] rounded-2xl overflow-hidden">
        <div className="flex justify-between items-center px-6 py-3 border-b bg-white rounded-t-2xl">
          <div className="flex items-center gap-2 ml-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                    <Globe className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Language</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                    <Upload className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Upload Document</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                    <Link className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Connection Onboarding</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                    <Plus className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add New</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs rounded-full" variant="destructive">
                3
              </Badge>
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900">
              <Settings className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100">
                  <Avatar className="h-8 w-8 border border-gray-200 rounded-full">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className="text-sm bg-gray-100 text-gray-700 rounded-full">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[280px] rounded-xl shadow-md border-gray-100">
                <DropdownMenuLabel className="flex items-center gap-2 rounded-t-xl">
                  <Avatar className="h-8 w-8 rounded-full">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className="bg-gray-100 text-gray-700 rounded-full">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-gray-500">john.doe@example.com</p>
                  </div>
                </DropdownMenuLabel>
                
                <div className="px-4 py-3 border-y border-gray-100 space-y-3 bg-white/[0.31]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-gray-600" />
                      <span className="text-sm font-semibold text-gray-800">Monthly Credits</span>
                    </div>
                    <span className="text-sm font-normal text-gray-700">119/250</span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-800">Daily Limit</span>
                    </div>
                    <span className="text-sm font-normal text-gray-600">5/5</span>
                  </div>
                </div>
                
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
        
        <div className="flex-1 overflow-hidden bg-[#f8f8f8] rounded-b-2xl">
          <ChatInterface />
        </div>
      </div>
      
      <Toaster />
    </Layout>;
};
export default Chat;

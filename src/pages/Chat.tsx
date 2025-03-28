
import Layout from '@/components/layout/Layout';
import ChatInterface from '@/components/chat/ChatInterface';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Settings, User } from 'lucide-react';
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
import { toast } from '@/hooks/use-toast';

interface ChatData {
  title: string;
  messages: {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
  }[];
}

// Mock chat data based on IDs
const mockChatData: Record<string, ChatData> = {
  '1': {
    title: 'FDA Compliance for API Suppliers',
    messages: [
      {
        id: '1-1',
        content: 'Show me all suppliers for Paracetamol API with zero FDA 483s in the last 3 years.',
        sender: 'user',
        timestamp: new Date(Date.now() - 7200000) // 2 hours ago
      },
      {
        id: '1-2',
        content: 'I found 5 suppliers for Paracetamol API with perfect FDA compliance records in the last 3 years:\n\n1. PharmaCorp (Boston, USA)\n2. BioTech Materials (Barcelona, Spain)\n3. PharmaQuality Group (Toronto, Canada)\n4. MedSource Inc. (San Francisco, USA)\n5. GlobalPharma Suppliers (London, UK)\n\nAll have maintained zero FDA 483 observations since 2021. Would you like detailed compliance reports for any of these suppliers?',
        sender: 'ai',
        timestamp: new Date(Date.now() - 7180000)
      }
    ]
  },
  '2': {
    title: 'Market Price Trends: MCC',
    messages: [
      {
        id: '2-1',
        content: "What's the current market price range for Microcrystalline Cellulose in Southeast Asia? Include 6-month trends.",
        sender: 'user',
        timestamp: new Date(Date.now() - 86400000) // 1 day ago
      },
      {
        id: '2-2',
        content: "Current market price for Microcrystalline Cellulose in Southeast Asia ranges from $3.50-4.20/kg for pharmaceutical grade.\n\n6-month trend analysis:\n- Prices increased by 12% in March due to supply chain disruptions\n- Slight stabilization in April-May at $4.00/kg average\n- Current downward trend of 5% since June due to new manufacturing capacity\n- Chinese suppliers offering 8-10% lower prices than Western counterparts\n- Forecasted to stabilize around $3.80/kg by Q4",
        sender: 'ai',
        timestamp: new Date(Date.now() - 86380000)
      }
    ]
  },
  '3': {
    title: 'Urgent Backup Suppliers',
    messages: [
      {
        id: '3-1',
        content: "Find backup suppliers for PharmaCorp who can deliver Povidone within 2 weeks.",
        sender: 'user',
        timestamp: new Date(Date.now() - 259200000) // 3 days ago
      },
      {
        id: '3-2',
        content: "I've found 5 alternative suppliers who can deliver Povidone within 2 weeks:\n\n1. BioTech Materials (Barcelona): 1.5 week lead time, FDA approved\n2. ChemSource Inc. (Singapore): 1 week lead time, FDA/EMA approved\n3. GlobalPharma (London): 10 day lead time, all major approvals\n4. MedSource Inc. (San Francisco): 2 week lead time, USP grade\n5. AsiaPharma (Tokyo): 12 day lead time, JP/USP/EP grade\n\nAll suppliers have confirmed immediate availability. Would you like me to initiate contact with any of these suppliers?",
        sender: 'ai',
        timestamp: new Date(Date.now() - 259180000)
      }
    ]
  },
  // More mock chat data would go here for IDs 4-10
};

const Chat = () => {
  const location = useLocation();
  const [chatId, setChatId] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<ChatData | null>(null);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    setChatId(id);
    
    if (id && mockChatData[id]) {
      setSelectedChat(mockChatData[id]);
      // Optional: You could load the chat into the ChatInterface component here
      // For example, by storing the selected chat in localStorage or context
    } else if (id) {
      toast({
        title: "Chat not found",
        description: `Unable to find chat with ID ${id}`,
        variant: "destructive"
      });
    } else {
      setSelectedChat(null);
    }
  }, [location]);

  return (
    <Layout fullWidth hideNavbar>
      <div className="flex flex-col h-[calc(100vh-0px)] bg-[#f3f3f3]">
        <div className="flex justify-between items-center px-6 py-3 border-b bg-white">
          {chatId && selectedChat && (
            <div className="font-medium text-lg">{selectedChat.title}</div>
          )}
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
                    <AvatarFallback className="text-sm bg-gray-100 text-gray-700">AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-md border-gray-100">
                <DropdownMenuLabel className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className="bg-gray-100 text-gray-700">AD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Ayşa Doe</p>
                    <p className="text-xs text-gray-500">aysa.doe@example.com</p>
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
          <ChatInterface chatId={chatId} selectedChat={selectedChat} />
        </div>
      </div>
      
      <Toaster />
    </Layout>
  );
};

export default Chat;

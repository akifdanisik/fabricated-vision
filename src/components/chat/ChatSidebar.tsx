
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  Search, 
  Plus, 
  File, 
  FolderOpen,
  ChevronDown,
  ChevronRight 
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ChatItem {
  id: string;
  title: string;
  date?: string;
  isProject?: boolean;
  children?: ChatItem[];
}

const ChatSidebar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for the sidebar
  const todayChats: ChatItem[] = [
    { id: '1', title: 'Paracetamol API Inventory', date: '2 hours ago' },
    { id: '2', title: 'Supplier Evaluation Process', date: '4 hours ago' },
  ];
  
  const yesterdayChats: ChatItem[] = [
    { id: '3', title: 'GMP Certificate Review', date: 'Yesterday' },
    { id: '4', title: 'Contract Renewal Discussion', date: 'Yesterday' },
    { id: '5', title: 'Compliance Documentation', date: 'Yesterday' },
    { id: '6', title: 'Quality Assurance Meeting', date: 'Yesterday' },
  ];
  
  const projects: ChatItem[] = [
    { 
      id: 'p1', 
      title: 'Strategic Sourcing', 
      isProject: true,
      children: [
        { id: 'p1-1', title: 'Market Analysis Results' },
        { id: 'p1-2', title: 'Supplier Shortlist' }
      ]
    },
    { 
      id: 'p2', 
      title: 'Compliance Tracking', 
      isProject: true,
      children: [
        { id: 'p2-1', title: 'FDA Documentation' },
        { id: 'p2-2', title: 'EMA Requirements' }
      ]
    },
    { id: 'p3', title: 'Category Management', isProject: true },
    { id: 'p4', title: 'Risk Assessment', isProject: true },
  ];
  
  const startNewChat = () => {
    // Create a new chat and redirect to it
    navigate('/chat');
    // Reset the UI to start a new conversation
    window.location.reload();
  };
  
  const renderChatItem = (item: ChatItem) => {
    const Icon = item.isProject ? FolderOpen : File;
    
    if (item.children?.length) {
      return (
        <Collapsible key={item.id} className="w-full">
          <CollapsibleTrigger className="flex items-center w-full group/item text-left">
            <div className="flex items-center w-full py-1 px-2 hover:bg-gray-100 rounded-md cursor-pointer">
              <Icon className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm text-gray-700 flex-1">{item.title}</span>
              {item.children?.length > 0 && (
                <div className="invisible group-hover/item:visible">
                  {open ? (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  )}
                </div>
              )}
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="ml-4 pl-2 border-l border-gray-200">
            {item.children.map(child => (
              <div 
                key={child.id}
                className="flex items-center py-1 px-2 hover:bg-gray-100 rounded-md cursor-pointer"
              >
                <File className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm text-gray-700">{child.title}</span>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      );
    }
    
    return (
      <div 
        key={item.id}
        className="flex items-center py-1 px-2 hover:bg-gray-100 rounded-md cursor-pointer"
      >
        <Icon className="h-4 w-4 mr-2 text-gray-500" />
        <span className="text-sm text-gray-700">{item.title}</span>
      </div>
    );
  };
  
  return (
    <div className="h-full w-64 border-r bg-white flex flex-col">
      <div className="p-4 flex items-center justify-between border-b">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/42466f5f-6d74-466e-af4c-1fc0de255379.png" 
            alt="Fabricated Logo" 
            className="h-6 w-auto" 
          />
        </Link>
      </div>
      
      <div className="p-2">
        <Button 
          onClick={startNewChat}
          className="w-full justify-start gap-2 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
        >
          <Plus className="h-4 w-4" />
          New conversation
        </Button>
      </div>
      
      <div className="p-2">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search conversations..."
            className="pl-8 bg-gray-50 border-gray-100"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-2">
        {/* Today's conversations */}
        <div className="mb-4">
          <h3 className="text-xs font-medium text-gray-500 mb-1 px-2">Today</h3>
          <div className="space-y-1">
            {todayChats.map(renderChatItem)}
          </div>
        </div>
        
        {/* Yesterday's conversations */}
        <div className="mb-4">
          <h3 className="text-xs font-medium text-gray-500 mb-1 px-2">Yesterday</h3>
          <div className="space-y-1">
            {yesterdayChats.map(renderChatItem)}
          </div>
        </div>
        
        {/* Projects */}
        <div className="mb-4">
          <h3 className="text-xs font-medium text-gray-500 mb-1 px-2">Projects</h3>
          <div className="space-y-1">
            {projects.map(renderChatItem)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;

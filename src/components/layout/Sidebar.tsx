
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageSquare, ChevronRight, ChevronLeft, Search, Folder, ChevronDown, Square, Menu, AlignLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SidebarProps {
  isOpen: boolean;
  isCompleteClosed?: boolean;
  onToggle: () => void;
}

interface ChatItem {
  id: string;
  title: string;
  date: Date;
  type: 'chat' | 'project';
  parentId?: string;
}

const mockChats: ChatItem[] = [{
  id: '1',
  title: 'First Screen Project Alpha',
  date: new Date(),
  type: 'chat'
}, {
  id: '2',
  title: 'Q324 Portfolio Review',
  date: new Date(),
  type: 'chat'
}, {
  id: '3',
  title: 'Hannibal Revenue',
  date: new Date(Date.now() - 86400000),
  type: 'chat'
}, {
  id: '4',
  title: 'Commercial Contracts',
  date: new Date(Date.now() - 86400000),
  type: 'chat'
}, {
  id: '5',
  title: 'Patent Prior Act',
  date: new Date(Date.now() - 86400000),
  type: 'chat'
}, {
  id: '6',
  title: 'Deal Terms',
  date: new Date(Date.now() - 86400000),
  type: 'chat'
}];

interface Project {
  id: string;
  title: string;
  chats: ChatItem[];
}

const mockProjects: Project[] = [{
  id: 'p1',
  title: 'Project Alpha',
  chats: []
}, {
  id: 'p2',
  title: 'Co',
  chats: []
}, {
  id: 'p3',
  title: 'Acme Corp',
  chats: [{
    id: 'p3c1',
    title: 'Acme Revenue',
    date: new Date(Date.now() - 3 * 86400000),
    type: 'chat',
    parentId: 'p3'
  }, {
    id: 'p3c2',
    title: 'Acme Investment Risks',
    date: new Date(Date.now() - 4 * 86400000),
    type: 'chat',
    parentId: 'p3'
  }]
}, {
  id: 'p4',
  title: 'Nordic Telecoms',
  chats: []
}, {
  id: 'p5',
  title: 'Lease Agreements',
  chats: []
}];

const Sidebar = ({
  isOpen,
  isCompleteClosed = false,
  onToggle
}: SidebarProps) => {
  const location = useLocation();
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({
    'p3': true
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const todayChats = mockChats.filter(chat => {
    const chatDate = new Date(chat.date);
    chatDate.setHours(0, 0, 0, 0);
    return chatDate.getTime() === today.getTime();
  });

  const yesterdayChats = mockChats.filter(chat => {
    const chatDate = new Date(chat.date);
    chatDate.setHours(0, 0, 0, 0);
    return chatDate.getTime() === yesterday.getTime();
  });

  const toggleProject = (projectId: string) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  if (isCompleteClosed) {
    return (
      <div className="fixed inset-y-0 left-0 z-50 w-14 transition-all duration-300 ease-in-out-expo flex flex-col items-center bg-white border-r border-gray-200 shadow-sm">
        <Link to="/" className="flex items-center justify-center h-16 w-full border-b border-gray-200">
          <img src="/lovable-uploads/8909c790-d73e-4ca4-99fb-106aa9109740.png" alt="Fabricated Logo" className="h-10 w-auto max-w-[40px] object-contain" />
        </Link>
        
        <div className="mt-4">
          <Button variant="ghost" size="icon" onClick={onToggle} className="h-10 w-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900">
            <AlignLeft className="h-5 w-5" />
          </Button>
        </div>
      </div>
    );
  }

  return <div className={cn("fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-white text-slate-800 transition-all duration-300 ease-in-out-expo shadow-sm", isOpen ? "w-64" : "w-[70px]", isMounted ? "translate-x-0" : "-translate-x-full")}>
      <div className={cn("flex h-16 items-center border-b border-gray-200", isOpen ? "justify-between px-6" : "justify-center px-2")}>
        <Link to="/" className="flex items-center justify-center py-4">
          {isOpen ? <div className="flex items-center justify-center w-full">
              <img src="/lovable-uploads/42466f5f-6d74-466e-af4c-1fc0de255379.png" alt="Fabricated Logo" className="h-14 w-auto mx-auto" />
            </div> : <div className="flex items-center justify-center">
              <img src="/lovable-uploads/8909c790-d73e-4ca4-99fb-106aa9109740.png" alt="Fabricated Logo" className="h-12 w-auto max-w-[55px] object-contain" />
            </div>}
        </Link>
        
        {isOpen && <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            <Menu className="h-5 w-5" />
          </Button>}
      </div>
      
      {isOpen && <div className="px-3 pt-3">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input placeholder="Search chats" className="pl-8 h-9 text-sm" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
        </div>}
      
      <ScrollArea className="flex-1 pt-3">
        {!isOpen ? <nav className="grid gap-1 px-3 py-2">
            <Link to="/chat" className={cn("group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all justify-center py-2.5", location.pathname === "/chat" ? "bg-primary text-white" : "text-slate-700 hover:bg-gray-100 hover:text-slate-900")}>
              <MessageSquare className={cn("h-5 w-5 shrink-0", location.pathname === "/chat" && "text-white")} />
            </Link>
          </nav> : <div className="px-3 py-1">
            {todayChats.length > 0 && <>
                <h3 className="text-xs font-medium text-slate-500 py-2">Today</h3>
                <nav className="grid gap-1">
                  {todayChats.map(chat => <Link key={chat.id} to={`/chat?id=${chat.id}`} className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm hover:bg-gray-100">
                      <Square className="h-4 w-4 text-slate-400" />
                      <span className="truncate">{chat.title}</span>
                    </Link>)}
                </nav>
              </>}
            
            {yesterdayChats.length > 0 && <>
                <h3 className="text-xs font-medium text-slate-500 py-2 mt-1">Yesterday</h3>
                <nav className="grid gap-1">
                  {yesterdayChats.map(chat => <Link key={chat.id} to={`/chat?id=${chat.id}`} className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm hover:bg-gray-100">
                      <Square className="h-4 w-4 text-slate-400" />
                      <span className="truncate">{chat.title}</span>
                    </Link>)}
                </nav>
              </>}
            
            <h3 className="text-xs font-medium text-slate-500 py-2 mt-1">Projects</h3>
            <nav className="grid gap-1">
              {mockProjects.map(project => <div key={project.id}>
                  <Collapsible open={expandedProjects[project.id]} onOpenChange={() => toggleProject(project.id)}>
                    <CollapsibleTrigger asChild>
                      <button className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-sm hover:bg-gray-100 text-left">
                        <Folder className="h-4 w-4 text-slate-400" />
                        <span className="truncate">{project.title}</span>
                        <ChevronDown className={cn("ml-auto h-4 w-4 text-slate-400 transition-transform", expandedProjects[project.id] ? "transform rotate-180" : "")} />
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="pl-4 border-l border-slate-200 ml-3 mt-1">
                        {project.chats.map(chat => <Link key={chat.id} to={`/chat?id=${chat.id}`} className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm hover:bg-gray-100">
                            <Square className="h-4 w-4 text-slate-400" />
                            <span className="truncate">{chat.title}</span>
                          </Link>)}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>)}
            </nav>
          </div>}
      </ScrollArea>
      
      <Button variant="ghost" size="icon" onClick={onToggle} className={cn("absolute top-1/2 -right-3 h-6 w-6 transform -translate-y-1/2 rounded-full bg-white shadow-md border border-gray-200", "flex items-center justify-center")}>
        {isOpen ? <ChevronLeft className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
      </Button>
    </div>;
};

export default Sidebar;

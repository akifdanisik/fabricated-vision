
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Box, 
  Users, 
  FileText, 
  ShieldCheck, 
  BarChart3, 
  Settings, 
  ChevronRight, 
  ChevronLeft,
  MessageSquare,
  Workflow,
  Brain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface NavItem {
  title: string;
  icon: any;
  path: string;
  priority?: boolean;
}

const navItems: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "Chat", icon: MessageSquare, path: "/chat", priority: true },
  { title: "Workflows", icon: Workflow, path: "/workflows", priority: true },
  { title: "Inventory", icon: Box, path: "/inventory" },
  { title: "Suppliers", icon: Users, path: "/suppliers" },
  { title: "Contracts", icon: FileText, path: "/contracts" },
  { title: "Compliance", icon: ShieldCheck, path: "/compliance" },
  { title: "Reports", icon: BarChart3, path: "/reports" },
];

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const location = useLocation();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const priorityItems = navItems.filter(item => item.priority);
  const standardItems = navItems.filter(item => !item.priority);

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-white transition-all duration-300 ease-in-out-expo shadow-sm",
        isOpen ? "w-64" : "w-[70px]",
        isMounted ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className={cn(
        "flex h-16 items-center justify-between border-b border-gray-100 px-4",
        isOpen ? "px-6" : "px-2"
      )}>
        <Link to="/" className="flex items-center gap-2 py-4">
          {isOpen ? (
            <img 
              src="/lovable-uploads/0f378f40-c5be-494e-a251-1513b467af1d.png" 
              alt="Fabricated Logo" 
              className="h-13 w-auto" 
            />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center">
              <span className="text-2xl font-serif font-bold">F</span>
            </div>
          )}
        </Link>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggle}
          className={cn("transition-opacity rounded-full", isOpen ? "opacity-100" : "opacity-0 md:opacity-100")}
        >
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
      
      <ScrollArea className="flex-1 pt-3">
        <nav className="grid gap-1 px-3 py-2">
          {priorityItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
                  !isOpen && "justify-center py-2.5"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary")} />
                <span
                  className={cn(
                    "text-sm font-medium transition-all",
                    isOpen ? "opacity-100" : "w-0 opacity-0"
                  )}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
        
        <Separator className={cn("my-2 bg-gray-100", !isOpen && "mx-2")} />
        
        <nav className="grid gap-1 px-3 py-2">
          {standardItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
                  !isOpen && "justify-center py-2.5"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary")} />
                <span
                  className={cn(
                    "text-sm font-medium transition-all",
                    isOpen ? "opacity-100" : "w-0 opacity-0"
                  )}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
        
        <Separator className={cn("my-2 bg-gray-100", !isOpen && "mx-2")} />
        
        <div className="px-3 py-2">
          <Link
            to="/settings"
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900",
              !isOpen && "justify-center py-2.5",
              location.pathname === "/settings" && "bg-primary/10 text-primary"
            )}
          >
            <Settings className={cn("h-5 w-5 shrink-0", location.pathname === "/settings" && "text-primary")} />
            <span
              className={cn(
                "text-sm font-medium transition-all",
                isOpen ? "opacity-100" : "w-0 opacity-0"
              )}
            >
              Settings
            </span>
          </Link>
        </div>
      </ScrollArea>
      
      <div className={cn(
        "border-t border-gray-100 p-4",
        !isOpen && "p-2"
      )}>
        <div
          className={cn(
            "flex items-center gap-3 rounded-xl bg-gray-50 p-2.5 text-xs text-gray-600",
            !isOpen && "justify-center"
          )}
        >
          {isOpen ? (
            <div className="text-center w-full flex items-center justify-center gap-2">
              <Brain className="h-4 w-4 text-primary" />
              <p className="text-xs font-medium">Fabricated AI</p>
            </div>
          ) : (
            <Brain className="h-4 w-4 text-primary" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

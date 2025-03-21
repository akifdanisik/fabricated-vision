
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
  
  // For animation purposes
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Separate priority nav items
  const priorityItems = navItems.filter(item => item.priority);
  const standardItems = navItems.filter(item => !item.priority);

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-card transition-all duration-300 ease-in-out-expo",
        isOpen ? "w-64" : "w-[70px]",
        isMounted ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className={cn(
        "flex h-16 items-center justify-between border-b px-4",
        isOpen ? "px-6" : "px-2"
      )}>
        <Link to="/" className="flex items-center gap-2 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="text-lg font-bold text-primary-foreground">F</span>
          </div>
          <span 
            className={cn(
              "text-xl font-semibold transition-opacity", 
              isOpen ? "opacity-100" : "opacity-0"
            )}
          >
            Fabricated
          </span>
        </Link>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggle}
          className={cn("transition-opacity", isOpen ? "opacity-100" : "opacity-0 md:opacity-100")}
        >
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
      
      <ScrollArea className="flex-1 pt-1">
        {/* Priority nav items */}
        <nav className="grid gap-1 px-2 py-4">
          {priorityItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "group flex items-center gap-3 rounded-md px-3 py-2.5 transition-all",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground/70 hover:bg-accent hover:text-accent-foreground",
                  !isOpen && "justify-center py-2.5"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", isOpen && isActive && "animate-pulse-subtle")} />
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
        
        <Separator className={cn("my-2", !isOpen && "mx-2")} />
        
        {/* Standard nav items */}
        <nav className="grid gap-1 px-2 py-2">
          {standardItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "group flex items-center gap-3 rounded-md px-3 py-2.5 transition-all",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground/70 hover:bg-accent hover:text-accent-foreground",
                  !isOpen && "justify-center py-2.5"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", isOpen && isActive && "animate-pulse-subtle")} />
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
        
        <Separator className={cn("my-2", !isOpen && "mx-2")} />
        
        <div className="px-2 py-2">
          <Link
            to="/settings"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-foreground/70 transition-all hover:bg-accent hover:text-accent-foreground",
              !isOpen && "justify-center py-2.5",
              location.pathname === "/settings" && "bg-primary text-primary-foreground"
            )}
          >
            <Settings className="h-5 w-5 shrink-0" />
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
        "border-t p-4",
        !isOpen && "p-2"
      )}>
        <div
          className={cn(
            "flex items-center gap-3 rounded-md bg-accent p-2.5 text-xs text-accent-foreground",
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

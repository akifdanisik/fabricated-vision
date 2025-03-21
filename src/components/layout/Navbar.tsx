
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Bell, ChevronDown, Menu, Settings, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar = ({
  toggleSidebar,
  isSidebarOpen
}: NavbarProps) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [pageTitle, setPageTitle] = useState('Dashboard');

  // Update page title based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setPageTitle('Dashboard');
    } else {
      // Convert path to title (e.g., '/inventory' to 'Inventory')
      setPageTitle(path.substring(1).charAt(0).toUpperCase() + path.substring(2));
    }
  }, [location]);

  // Add shadow to navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={cn(
      "sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4 transition-all",
      scrolled ? "shadow-sm" : ""
    )}>
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <h1 className="text-xl font-semibold">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 relative">
          <Bell className="h-5 w-5" />
          <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">3</Badge>
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
              <span className="hidden md:block text-sm font-medium">John Doe</span>
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
    </div>
  );
};

export default Navbar;

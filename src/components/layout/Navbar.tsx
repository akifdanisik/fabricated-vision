
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, ChevronDown, Menu, Search, Settings, User, CreditCard, BarChart2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setPageTitle('Dashboard');
    } else {
      setPageTitle(path.substring(1).charAt(0).toUpperCase() + path.substring(2).replace(/-/g, ' '));
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn("sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-gray-100 bg-white/95 px-4 backdrop-blur transition-all duration-200", scrolled ? "shadow-sm" : "")}>
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="mr-2 md:hidden rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <h1 className="text-xl font-semibold">{pageTitle}</h1>
      </div>
      
      <div className="flex items-center gap-4 md:gap-6">
        <div className="relative hidden md:flex w-full max-w-[24rem] items-center">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input type="search" placeholder="Search..." className="pl-10 w-[280px] bg-gray-50 border-gray-100 rounded-xl focus:bg-white" />
        </div>
        
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs" variant="destructive">
                    3
                  </Badge>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                  <Settings className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100">
                <Avatar className="h-8 w-8 border border-gray-200">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="text-sm bg-gray-100 text-gray-700">JD</AvatarFallback>
                </Avatar>
                <span className="hidden md:block text-sm font-medium">John Doe</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-[280px] rounded-xl shadow-lg border border-gray-200 bg-white z-50" 
              sideOffset={15}
              forceMount
            >
              <DropdownMenuLabel className="flex items-center gap-2 px-4 py-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-gray-100 text-gray-700">JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-gray-500">john.doe@example.com</p>
                </div>
              </DropdownMenuLabel>
              
              {/* Credit Section - Visibly highlighted in the dropdown */}
              <div className="px-4 py-3 bg-purple-100 border-y border-purple-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-semibold text-purple-800">Monthly Credits</span>
                  </div>
                  <span className="text-sm font-bold text-purple-700">119/250</span>
                </div>
                <Progress 
                  value={(119/250)*100} 
                  className="h-4 bg-purple-200" 
                  indicatorClassName="bg-purple-600"
                />
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <BarChart2 className="h-5 w-5 text-orange-500" />
                    <span className="text-sm font-semibold text-orange-800">Daily Limit</span>
                  </div>
                  <span className="text-sm font-bold text-orange-600">5/5</span>
                </div>
                <Progress 
                  value={(5/5)*100} 
                  className="h-4 bg-orange-100" 
                  indicatorClassName="bg-orange-500"
                />
              </div>
              
              <div className="p-2">
                <DropdownMenuItem className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded-lg">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded-lg">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1 bg-gray-200" />
                <DropdownMenuItem className="p-2 cursor-pointer hover:bg-gray-100 rounded-lg">
                  Log out
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

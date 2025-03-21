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
  return;
};
export default Navbar;
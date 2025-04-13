
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import PageTitle from './navbar/PageTitle';
import SearchBar from './navbar/SearchBar';
import NotificationsSection from './navbar/NotificationsSection';
import UserProfileDropdown from './navbar/UserProfileDropdown';

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
      <PageTitle title={pageTitle} toggleSidebar={toggleSidebar} />
      
      <div className="flex items-center gap-4 md:gap-6">
        <SearchBar />
        
        <div className="flex items-center gap-2">
          <NotificationsSection />
          <UserProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

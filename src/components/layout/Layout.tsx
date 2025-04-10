
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  hideNavbar?: boolean;
}

const Layout = ({ children, fullWidth = false, hideNavbar = false }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const location = useLocation();
  
  // Toggle sidebar
  const toggleSidebar = () => {
    if (isSidebarClosed) {
      setIsSidebarClosed(false);
      setIsSidebarOpen(true);
    } else if (isSidebarOpen) {
      setIsSidebarClosed(true);
    } else {
      setIsSidebarOpen(true);
      setIsSidebarClosed(false);
    }
  };
  
  // For animation purposes
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // For page transitions
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  // Close sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
        setIsSidebarClosed(false);
      } else {
        setIsSidebarOpen(true);
        setIsSidebarClosed(false);
      }
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar isOpen={isSidebarOpen} isCompleteClosed={isSidebarClosed} onToggle={toggleSidebar} />
      
      <div 
        className={cn(
          "flex flex-1 flex-col transition-all duration-300 ease-in-out-expo",
          isSidebarOpen ? (isSidebarClosed ? "md:ml-14" : "md:ml-64") : "md:ml-[70px]",
          isMounted ? "opacity-100" : "opacity-0"
        )}
      >
        {!hideNavbar && (
          <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        )}
        
        <main className={cn(
          "flex-1 animate-fade-in",
          fullWidth ? "p-0" : "p-0", // Changed from "p-5 md:p-8" to "p-0"
          "w-full mx-auto" // Added to ensure content is centered
        )}>
          <div className={cn(
            fullWidth ? "w-full h-full" : "w-full h-full" // Simplified to always take full width and height
          )}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;


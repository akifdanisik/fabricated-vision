
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const location = useLocation();
  
  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-[#f8fafc]">
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      
      <div 
        className={cn(
          "flex flex-1 flex-col transition-all duration-300 ease-in-out-expo",
          isSidebarOpen ? "md:ml-64" : "md:ml-[70px]",
          isMounted ? "opacity-100" : "opacity-0"
        )}
      >
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        
        <main className="flex-1 p-5 md:p-8 animate-fade-in">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

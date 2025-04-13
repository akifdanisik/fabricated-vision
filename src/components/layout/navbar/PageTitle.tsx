
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface PageTitleProps {
  title: string;
  toggleSidebar: () => void;
}

const PageTitle = ({ title, toggleSidebar }: PageTitleProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleSidebar} 
        className="mr-2 md:hidden rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"
      >
        <Menu className="h-5 w-5" />
      </Button>
      
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  );
};

export default PageTitle;

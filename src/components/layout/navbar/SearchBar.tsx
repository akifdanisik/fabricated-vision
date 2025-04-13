
import { Search, Globe, Upload, Link, Plus, Mic } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const SearchBar = () => {
  return (
    <div className="relative flex w-full max-w-[24rem] items-center space-x-2">
      {/* Search input section */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <Input 
          type="search" 
          placeholder="Search..." 
          className="pl-10 w-full bg-gray-50 border-gray-100 rounded-xl focus:bg-white" 
        />
      </div>
      
      {/* Icons section */}
      <div className="flex items-center gap-2">
        {/* Globe icon */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                <Globe className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Language</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* Upload icon */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                <Upload className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Upload Document</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* Link icon */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                <Link className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Connection Onboarding</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* Plus icon */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add New</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* Mic icon */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="accent" 
                size="icon" 
                className="rounded-full text-white hover:bg-accent/90"
              >
                <Mic className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Voice Search</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default SearchBar;

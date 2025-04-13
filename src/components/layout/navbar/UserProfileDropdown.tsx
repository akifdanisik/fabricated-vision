
import { ChevronDown, User, Settings, Calendar, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

const UserProfileDropdown = () => {
  return (
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
        
        <div className="px-4 py-3 bg-purple-50 border-y border-purple-100 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
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
              <Clock className="h-5 w-5 text-orange-500" />
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
  );
};

export default UserProfileDropdown;

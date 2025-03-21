
import { Avatar } from "@/components/ui/avatar";
import { CountUp } from "@/components/ui/count-up";
import { Badge } from "@/components/ui/badge";
import { BriefcaseIcon, CalendarIcon, TrendingUpIcon, UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PersonalCardProps {
  name: string;
  title: string;
  avatarUrl?: string;
  bio: string;
  className?: string;
}

export default function PersonalCard({ 
  name, 
  title, 
  avatarUrl, 
  bio,
  className 
}: PersonalCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden", 
      className
    )}>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary-light/30 to-accent-light/30 rounded-full blur-3xl -mr-20 -mt-20 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-3xl -ml-20 -mb-20 opacity-60"></div>
      
      <div className="flex flex-col items-center text-center relative z-10">
        <Avatar className="h-32 w-32 border-4 border-white shadow-lg mb-4">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={name} 
              className="object-cover"
            />
          ) : (
            <div className="bg-primary/10 h-full w-full flex items-center justify-center">
              <UserIcon className="h-12 w-12 text-primary" />
            </div>
          )}
        </Avatar>
        
        <h2 className="text-3xl font-semibold text-gray-900 mb-1">{name}</h2>
        <Badge variant="outline" className="px-3 py-1 text-sm bg-primary/5 border-primary/10 text-primary mb-4">
          {title}
        </Badge>
        
        <p className="text-sm text-gray-500 max-w-md mb-6 leading-relaxed">
          {bio}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <BriefcaseIcon className="h-4 w-4" />
            <span>Procurement</span>
          </div>
          <div className="h-4 w-px bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            <span>Since 2020</span>
          </div>
          <div className="h-4 w-px bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <TrendingUpIcon className="h-4 w-4 text-green-500" />
            <span className="text-green-500">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}

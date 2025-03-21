
import { Activity, ChevronRight, Clock, Package, FileCheck, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ActivityItem {
  id: string;
  type: 'order' | 'approval' | 'supplier' | 'inventory';
  title: string;
  description: string;
  time: string;
  user?: {
    name: string;
    avatar?: string;
    initials: string;
  };
}

interface ActivitySectionProps {
  activities: ActivityItem[];
  className?: string;
}

export default function ActivitySection({ activities, className }: ActivitySectionProps) {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'order':
        return <Package className="h-4 w-4 text-blue-500" />;
      case 'approval':
        return <FileCheck className="h-4 w-4 text-green-500" />;
      case 'supplier':
        return <Users className="h-4 w-4 text-purple-500" />;
      case 'inventory':
        return <TrendingUp className="h-4 w-4 text-amber-500" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="flex flex-row items-center justify-between bg-muted/50 p-4">
        <CardTitle className="text-md flex items-center gap-2">
          <Activity className="h-5 w-5 text-muted-foreground" />
          <span>Recent Activity</span>
        </CardTitle>
        <Button variant="ghost" size="sm" className="gap-1 text-xs">
          View all <ChevronRight className="h-3 w-3" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-start gap-3 p-4 transition-colors hover:bg-muted/20"
            >
              <div className="pt-1">{getActivityIcon(activity.type)}</div>
              <div className="space-y-1 flex-grow">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{activity.title}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{activity.time}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </div>
              {activity.user && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.initials}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

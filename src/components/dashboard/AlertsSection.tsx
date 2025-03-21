
import { Bell, ChevronRight, ShieldAlert, TrendingDown, AlertTriangle, CircleAlert } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  time: string;
}

interface AlertsSectionProps {
  alerts: Alert[];
  className?: string;
}

export default function AlertsSection({ alerts, className }: AlertsSectionProps) {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return <CircleAlert className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'info':
        return <Bell className="h-4 w-4 text-blue-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="flex flex-row items-center justify-between bg-muted/50 p-4">
        <CardTitle className="text-md flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-muted-foreground" />
          <span>Alerts</span>
          <Badge variant="outline" className="ml-2 text-xs font-normal">
            {alerts.length}
          </Badge>
        </CardTitle>
        <Button variant="ghost" size="sm" className="gap-1 text-xs">
          View all <ChevronRight className="h-3 w-3" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className="flex items-start gap-3 p-4 transition-colors hover:bg-muted/20"
            >
              <div className="pt-1">{getAlertIcon(alert.type)}</div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{alert.title}</p>
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}


import { CountUp } from "@/components/ui/count-up";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCircleProps {
  title: string;
  value: number;
  suffix?: string;
  trend?: number;
  trendDirection?: 'up' | 'down' | 'neutral';
  icon?: LucideIcon;
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'left' | 'right' | 'top' | 'bottom';
}

export default function MetricCircle({
  title,
  value,
  suffix = "",
  trend,
  trendDirection = 'neutral',
  icon: Icon,
  className,
  position = 'top-left'
}: MetricCircleProps) {
  
  // Position styles
  const positionStyles = {
    'top-left': 'left-8 top-20',
    'top-right': 'right-8 top-20',
    'bottom-left': 'left-8 bottom-20',
    'bottom-right': 'right-8 bottom-20',
    'left': 'left-0 top-1/2 -translate-y-1/2 -translate-x-1/4',
    'right': 'right-0 top-1/2 -translate-y-1/2 translate-x-1/4',
    'top': 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/4',
    'bottom': 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4',
  };
  
  return (
    <div className={cn(
      "absolute bg-white rounded-full shadow-md border border-gray-100 h-40 w-40 flex flex-col items-center justify-center text-center p-4 transition-all duration-300 hover:shadow-lg",
      positionStyles[position],
      className
    )}>
      <p className="text-xs font-medium text-gray-500 uppercase mb-1">{title}</p>
      <div className="text-4xl font-bold text-gray-900">
        <CountUp end={value} duration={2} />
        {suffix}
      </div>
      
      {trend !== undefined && (
        <div className={cn(
          "flex items-center text-xs font-medium mt-1",
          trendDirection === 'up' && 'text-green-600',
          trendDirection === 'down' && 'text-red-600',
          trendDirection === 'neutral' && 'text-gray-500'
        )}>
          <span>
            {trendDirection === 'up' && '↑'}
            {trendDirection === 'down' && '↓'}
            {trend > 0 ? '+' : ''}{trend}%
          </span>
          <span className="ml-1 text-gray-500">this month</span>
        </div>
      )}
      
      {Icon && (
        <div className="mt-2 text-primary">
          <Icon className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}


import { CountUp } from '@/components/ui/count-up';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: LucideIcon;
  description?: string;
  trend?: number;
  trendLabel?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  className?: string;
  valueFormatted?: string;
  loading?: boolean;
  decimals?: number;
}

export default function MetricsCard({
  title,
  value,
  prefix = '',
  suffix = '',
  icon: Icon,
  description,
  trend,
  trendLabel,
  trendDirection = 'neutral',
  className,
  valueFormatted,
  loading = false,
  decimals = 0,
}: MetricsCardProps) {
  return (
    <div className={cn(
      'glass-card flex flex-col p-6 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md',
      className
    )}>
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="flex items-end gap-2">
            <div className={cn(
              'text-2xl font-semibold tracking-tight',
              loading && 'animate-pulse bg-muted h-8 w-24 rounded'
            )}>
              {!loading && (
                <span>
                  {prefix}
                  {valueFormatted || <CountUp end={value} duration={2} decimals={decimals} />}
                  {suffix}
                </span>
              )}
            </div>
            
            {trend !== undefined && !loading && (
              <div className={cn(
                "flex items-center text-xs font-medium",
                trendDirection === 'up' && 'text-green-600',
                trendDirection === 'down' && 'text-red-600',
                trendDirection === 'neutral' && 'text-muted-foreground'
              )}>
                {trend > 0 ? '+' : ''}
                {trend}%
                {trendLabel && <span className="ml-1 text-muted-foreground">{trendLabel}</span>}
              </div>
            )}
          </div>
          
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        
        <div className={cn(
          "h-10 w-10 rounded-full flex items-center justify-center bg-primary/10",
          loading && 'animate-pulse'
        )}>
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </div>
  );
}

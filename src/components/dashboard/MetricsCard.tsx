
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
      'rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg p-5',
      className
    )}>
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-primary-dark">{title}</h3>
          <div className="flex items-end gap-2">
            <div className={cn(
              'text-2xl font-bold tracking-tight text-primary-dark',
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
                trendDirection === 'neutral' && 'text-primary-dark/70'
              )}>
                {trend > 0 ? '+' : ''}
                {trend}%
                {trendLabel && <span className="ml-1 text-primary-dark/70">{trendLabel}</span>}
              </div>
            )}
          </div>
          
          {description && (
            <p className="text-xs text-primary-dark/70">{description}</p>
          )}
        </div>
        
        <div className={cn(
          "h-12 w-12 rounded-full flex items-center justify-center bg-primary/20 shadow-inner",
          loading && 'animate-pulse'
        )}>
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </div>
  );
}

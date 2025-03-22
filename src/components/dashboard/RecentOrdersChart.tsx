
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { cn } from '@/lib/utils';

interface ChartData {
  name: string;
  value: number;
}

interface RecentOrdersChartProps {
  data: ChartData[];
  className?: string;
}

export default function RecentOrdersChart({ data, className }: RecentOrdersChartProps) {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  
  // Animation effect
  useEffect(() => {
    setChartData([]);
    
    const timer = setTimeout(() => {
      setChartData(data);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [data]);

  return (
    <Card className={cn('overflow-hidden shadow-md bg-gradient-to-br from-white to-primary-light/30 border-primary-light', className)}>
      <CardHeader className="flex flex-row items-center justify-between p-4 bg-primary-light/50 border-b border-primary-light">
        <CardTitle className="text-md text-primary-dark">Recent Orders</CardTitle>
        <Badge variant="soft" className="text-xs font-normal">
          Last 7 days
        </Badge>
      </CardHeader>
      <CardContent className="p-0 pl-2">
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'var(--primary-dark)' }}
                dy={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'var(--primary-dark)' }}
                dx={-10}
              />
              <Tooltip 
                cursor={{ fill: 'var(--accent-pale)', opacity: 0.3 }}
                contentStyle={{ 
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--primary-light)',
                  borderRadius: 'var(--radius)',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                }}
                labelStyle={{ color: 'var(--primary-dark)', fontWeight: 'bold', marginBottom: 4 }}
                itemStyle={{ color: 'var(--primary)' }}
              />
              <Bar 
                dataKey="value" 
                fill="var(--primary)" 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

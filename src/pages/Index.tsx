
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import MetricsCard from '@/components/dashboard/MetricsCard';
import AlertsSection from '@/components/dashboard/AlertsSection';
import ActivitySection from '@/components/dashboard/ActivitySection';
import RecentOrdersChart from '@/components/dashboard/RecentOrdersChart';
import { CircleAlert, DollarSign, Package, TrendingDown, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Mock data for recent orders chart
  const recentOrdersData = [
    { name: 'Mon', value: 14000 },
    { name: 'Tue', value: 18000 },
    { name: 'Wed', value: 16000 },
    { name: 'Thu', value: 22000 },
    { name: 'Fri', value: 30000 },
    { name: 'Sat', value: 22000 },
    { name: 'Sun', value: 24000 },
  ];
  
  // Mock data for alerts
  const alerts = [
    {
      id: '1',
      type: 'critical' as const,
      title: 'Low stock alert',
      description: 'API-24X is below the critical threshold.',
      time: '10 minutes ago',
    },
    {
      id: '2',
      type: 'warning' as const,
      title: 'Supplier risk increased',
      description: 'MedSource Inc. risk level changed to medium.',
      time: '2 hours ago',
    },
    {
      id: '3',
      type: 'info' as const,
      title: 'GMP certification expiring',
      description: 'PharmaCorp GMP certification expires in 30 days.',
      time: '1 day ago',
    },
  ];
  
  // Mock data for activities
  const activities = [
    {
      id: '1',
      type: 'order' as const,
      title: 'New order placed',
      description: 'Order #12345 for API-24X was placed.',
      time: '15 minutes ago',
      user: {
        name: 'John Doe',
        initials: 'JD',
      },
    },
    {
      id: '2',
      type: 'approval' as const,
      title: 'RFQ approved',
      description: 'RFQ for excipient supplies was approved.',
      time: '3 hours ago',
      user: {
        name: 'Sarah Smith',
        initials: 'SS',
      },
    },
    {
      id: '3',
      type: 'supplier' as const,
      title: 'New supplier added',
      description: 'BioTech Materials was added as a supplier.',
      time: '1 day ago',
      user: {
        name: 'Mark Johnson',
        initials: 'MJ',
      },
    },
    {
      id: '4',
      type: 'inventory' as const,
      title: 'Inventory updated',
      description: 'Received 1000 units of packaging materials.',
      time: '2 days ago',
      user: {
        name: 'Lisa Chen',
        initials: 'LC',
      },
    },
  ];

  return (
    <Layout>
      <div className="space-y-6 pb-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricsCard
            title="Total Spend"
            value={1250000}
            prefix="$"
            icon={DollarSign}
            description="Monthly Expenditure"
            trend={5.7}
            trendDirection="up"
            trendLabel="vs last month"
            loading={loading}
          />
          
          <MetricsCard
            title="Cost Savings"
            value={325000}
            prefix="$"
            suffix=" YTD"
            icon={TrendingDown}
            trend={12.5}
            trendDirection="up"
            loading={loading}
          />
          
          <MetricsCard
            title="Active Suppliers"
            value={48}
            icon={Users}
            trend={2}
            trendDirection="up"
            trendLabel="new this month"
            loading={loading}
          />
          
          <MetricsCard
            title="Inventory Items"
            value={246}
            icon={Package}
            trend={-3}
            trendDirection="down"
            trendLabel="low stock items"
            loading={loading}
          />
        </div>
        
        <div className="grid gap-4 md:grid-cols-7">
          <RecentOrdersChart data={recentOrdersData} className="md:col-span-4" />
          
          <Card className="md:col-span-3 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between bg-muted/50 p-4">
              <CardTitle className="text-md">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <Button className="w-full justify-start gap-2 text-left">
                <Package className="h-4 w-4" />
                <span>Create new RFQ</span>
              </Button>
              
              <Button className="w-full justify-start gap-2 text-left">
                <Users className="h-4 w-4" />
                <span>Add new supplier</span>
              </Button>
              
              <Button className="w-full justify-start gap-2 text-left">
                <CircleAlert className="h-4 w-4" />
                <span>View all alerts</span>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <AlertsSection alerts={alerts} />
          <ActivitySection activities={activities} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;


import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AlertsSection from '@/components/dashboard/AlertsSection';
import WorkflowPreview from '@/components/workflow/WorkflowPreview';
import MetricsCard from '@/components/dashboard/MetricsCard';
import RecentOrdersChart from '@/components/dashboard/RecentOrdersChart';
import ActivitySection from '@/components/dashboard/ActivitySection';
import { CircleAlert, Brain, Link, AlertTriangle, Workflow, Calendar, FileCheck, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const navigate = useNavigate();

  // Get current date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Mock data for alerts
  const alerts = [{
    id: '1',
    type: 'critical' as const,
    title: 'Low stock alert',
    description: 'API-24X is below the critical threshold.',
    time: '10 minutes ago'
  }, {
    id: '2',
    type: 'warning' as const,
    title: 'Supplier risk increased',
    description: 'MedSource Inc. risk level changed to medium.',
    time: '2 hours ago'
  }, {
    id: '3',
    type: 'info' as const,
    title: 'GMP certification expiring',
    description: 'PharmaCorp GMP certification expires in 30 days.',
    time: '1 day ago'
  }];

  // Mock data for chart
  const chartData = [
    { name: 'Mon', value: 4000 },
    { name: 'Tue', value: 3000 },
    { name: 'Wed', value: 5000 },
    { name: 'Thu', value: 2780 },
    { name: 'Fri', value: 1890 },
    { name: 'Sat', value: 2390 },
    { name: 'Sun', value: 3490 },
  ];

  // Mock data for activity
  const activities = [
    {
      id: '1',
      type: 'order' as const,
      title: 'New Order Placed',
      description: 'Order #12345 for API-24X has been placed',
      time: '30 min ago',
      user: {
        name: 'Jane Smith',
        initials: 'JS',
      },
    },
    {
      id: '2',
      type: 'approval' as const,
      title: 'Order Approved',
      description: 'Order #12340 was approved by management',
      time: '2 hours ago',
      user: {
        name: 'Mike Johnson',
        initials: 'MJ',
      },
    },
    {
      id: '3',
      type: 'inventory' as const,
      title: 'Inventory Updated',
      description: 'Received 500 units of ZYP-100',
      time: '4 hours ago',
      user: {
        name: 'Sarah Lee',
        initials: 'SL',
      },
    },
  ];

  return <Layout>
      <div className="space-y-8 pb-6">
        {/* Welcome header with gradient background */}
        <div className="bg-gradient-to-r from-primary-light to-accent-pale rounded-xl p-6 shadow-md">
          <div>
            <p className="text-primary-dark text-sm">{formattedDate}</p>
            <h1 className="text-3xl font-semibold text-primary-dark">Welcome back, John!</h1>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="overflow-hidden border border-accent-pale hover:shadow-md transition-all duration-200 hover:bg-accent-pale/30">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary-light flex items-center justify-center text-primary mt-2">
                  <Brain className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-primary-dark">New Chat</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border border-accent-pale hover:shadow-md transition-all duration-200 hover:bg-accent-pale/30">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                <div className="h-10 w-10 rounded-full bg-accent-light flex items-center justify-center text-accent mt-2">
                  <Workflow className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-primary-dark">New Workflow</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border border-accent-pale hover:shadow-md transition-all duration-200 hover:bg-accent-pale/30">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                <div className="h-10 w-10 rounded-full bg-accent-soft flex items-center justify-center text-accent-medium mt-2">
                  <Link className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-primary-dark">Add Connection</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border border-accent-pale hover:shadow-md transition-all duration-200 hover:bg-accent-pale/30">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary-light flex items-center justify-center text-primary mt-2">
                  <Calendar className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-primary-dark">Schedule</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Critical Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricsCard
              title="Low Stock Items"
              value={3}
              icon={AlertTriangle}
              className="bg-gradient-to-br from-white to-accent-pale shadow-md border-accent-pale"
              trend={2}
              trendLabel="from yesterday"
              trendDirection="up"
            />
            
            <MetricsCard
              title="Pending Approvals"
              value={5}
              icon={CircleAlert}
              className="bg-gradient-to-br from-white to-primary-light shadow-md border-primary-light"
              trend={-1}
              trendLabel="from yesterday"
              trendDirection="down"
            />
            
            <MetricsCard
              title="Active Workflows"
              value={2}
              icon={Workflow}
              className="bg-gradient-to-br from-white to-accent-soft shadow-md border-accent-soft"
              trend={0}
              trendLabel="no change"
              trendDirection="neutral"
            />
          </div>
          
          {/* Charts and Recent Activities Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecentOrdersChart data={chartData} />
            <ActivitySection activities={activities} />
          </div>
          
          {/* Active Workflow */}
          <Card className="border border-accent-pale shadow-md bg-gradient-to-br from-white to-accent-pale/20">
            <CardHeader className="p-5 pb-0">
              <CardTitle className="text-lg text-primary-dark">Active Workflow</CardTitle>
              <CardDescription>Your current procurement workflow</CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <WorkflowPreview compact={true} />
            </CardContent>
          </Card>
          
          {/* Alerts Section */}
          <Card className="border border-primary-light shadow-md bg-gradient-to-br from-white to-primary-light/20">
            <CardHeader className="p-5 pb-0 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg text-primary-dark">Recent Alerts</CardTitle>
                <CardDescription>Important notifications that require attention</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <FileCheck className="h-4 w-4" />
                Mark all as read
              </Button>
            </CardHeader>
            <CardContent className="p-5">
              <AlertsSection alerts={alerts} />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>;
};

export default Dashboard;

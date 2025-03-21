
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AlertsSection from '@/components/dashboard/AlertsSection';
import { CircleAlert, Brain, Link, AlertTriangle, Workflow, Calendar, FileCheck, Eye, MousePointer, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PersonalCard from '@/components/dashboard/PersonalCard';
import MetricCircle from '@/components/dashboard/MetricCircle';
import MetricsCard from '@/components/dashboard/MetricsCard';

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

  return (
    <Layout>
      <div className="space-y-8 pb-10">
        {/* Header */}
        <div className="space-y-1">
          <p className="text-gray-500 text-sm">{formattedDate}</p>
          <h1 className="text-3xl font-semibold text-gray-900">Your Dashboard</h1>
        </div>
        
        {/* Personal Profile Section */}
        <div className="relative py-20">
          <div className="flex justify-center">
            <PersonalCard
              name="John Doe"
              title="Senior Procurement Specialist"
              bio="Empowering the procurement process through data-driven decisions and innovative supplier management strategies. Focused on optimizing supply chain efficiency and reducing costs."
              className="w-full max-w-xl z-10"
            />
          </div>
          
          {/* Metric Circles */}
          <MetricCircle
            title="Views"
            value={12}
            trend={100}
            trendDirection="up"
            position="left"
            icon={Eye}
          />
          
          <MetricCircle
            title="Clicks"
            value={18}
            trend={100}
            trendDirection="up"
            position="right"
            icon={MousePointer}
          />
          
          <MetricCircle
            title="CTR"
            value={150}
            suffix="%"
            position="bottom"
            icon={Target}
          />
        </div>
        
        <div className="space-y-6">
          {/* Quick Actions */}
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-200">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mt-2">
                  <Brain className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium">New Chat</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-200">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 mt-2">
                  <Workflow className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium">New Workflow</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-200">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center text-green-500 mt-2">
                  <Link className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium">Add Connection</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-200">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mt-2">
                  <Calendar className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium">Schedule</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Performance Indicators */}
          <h2 className="text-xl font-semibold text-gray-900">Performance Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricsCard
              title="Tasks Completed"
              value={28}
              suffix="/35"
              icon={FileCheck}
              trend={12}
              trendDirection="up"
              description="80% completion rate"
            />
            
            <MetricsCard
              title="Pending Approvals"
              value={5}
              icon={CircleAlert}
              trend={-2}
              trendDirection="down"
              description="Decreased from last week"
            />
            
            <MetricsCard
              title="Active Workflows"
              value={2}
              icon={Workflow}
              description="In progress"
            />
          </div>
          
          {/* Alerts Section */}
          <h2 className="text-xl font-semibold text-gray-900">Recent Alerts</h2>
          <Card className="border border-gray-200">
            <CardHeader className="p-5 pb-0 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Important Notifications</CardTitle>
                <CardDescription>Items that require your attention</CardDescription>
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
    </Layout>
  );
};

export default Dashboard;

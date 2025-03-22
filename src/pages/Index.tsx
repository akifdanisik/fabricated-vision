
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AlertsSection from '@/components/dashboard/AlertsSection';
import WorkflowPreview from '@/components/workflow/WorkflowPreview';
import { CircleAlert, Brain, Link, AlertTriangle, Workflow, Calendar, FileCheck, ShieldCheck, FileText, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

  // Mock data for alerts - added compliance-related alerts
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
  }, {
    id: '4',
    type: 'warning' as const,
    title: 'Contract renewal needed',
    description: 'BioTech Materials contract expires in 15 days.',
    time: '3 hours ago'
  }, {
    id: '5',
    type: 'critical' as const,
    title: 'Compliance document expired',
    description: 'Material Safety Data Sheet for API-36B has expired.',
    time: '1 day ago'
  }];

  // Navigate to specific pages
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return <Layout>
      <div className="space-y-8 pb-6">
        {/* Welcome header with logo */}
        <div className="flex flex-col items-start space-y-4">
          <div>
            <p className="text-gray-500 text-sm">{formattedDate}</p>
            <h1 className="text-3xl font-semibold text-gray-900">Welcome back, John!</h1>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => handleNavigate('/chat')}>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mt-2">
                  <Brain className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium">New Chat</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => handleNavigate('/workflows')}>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 mt-2">
                  <Workflow className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium">New Workflow</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => handleNavigate('/suppliers')}>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center text-green-500 mt-2">
                  <Link className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium">Add Supplier</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => handleNavigate('/contracts')}>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mt-2">
                  <FileText className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium">Contracts</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => handleNavigate('/compliance')}>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 mt-2">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium">Compliance</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Critical Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MetricsCard 
              title="Low Stock Items"
              value={3}
              icon={AlertTriangle}
              className="bg-white border border-gray-200"
              description="Items below reorder point"
              trend={2}
              trendDirection="up"
              trendLabel="vs last week"
            />
            
            <MetricsCard 
              title="Pending Approvals"
              value={5}
              icon={CircleAlert}
              className="bg-white border border-gray-200"
              description="Awaiting your approval"
              trend={-1}
              trendDirection="down"
              trendLabel="vs last week"
            />
            
            <MetricsCard 
              title="Active Workflows"
              value={2}
              icon={Workflow}
              className="bg-white border border-gray-200"
              description="Currently in progress"
            />
            
            <MetricsCard 
              title="Compliance Issues"
              value={4}
              icon={ShieldCheck}
              className="bg-white border border-gray-200"
              description="Requiring attention"
              trend={1}
              trendDirection="up"
              trendLabel="vs last week"
            />
          </div>

          {/* Second row of metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MetricsCard 
              title="Expiring Contracts"
              value={3}
              icon={FileText}
              className="bg-white border border-gray-200"
              description="Within next 30 days"
              trend={0}
              trendDirection="neutral"
              trendLabel="no change"
            />
            
            <MetricsCard 
              title="Upcoming Audits"
              value={1}
              icon={ClipboardCheck}
              className="bg-white border border-gray-200"
              description="Scheduled in next 60 days"
            />
          </div>
          
          {/* Active Workflow */}
          <Card className="border border-gray-200">
            <CardHeader className="p-5 pb-0">
              <div className="flex justify-between items-center w-full">
                <div>
                  <CardTitle className="text-lg">Active Workflow</CardTitle>
                  <CardDescription>Your current procurement workflow</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleNavigate('/workflows')}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              <WorkflowPreview compact={true} />
            </CardContent>
          </Card>
          
          {/* Alerts Section */}
          <Card className="border border-gray-200">
            <CardHeader className="p-5 pb-0 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent Alerts</CardTitle>
                <CardDescription>Important notifications that require attention</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <FileCheck className="h-4 w-4" />
                  Mark all as read
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleNavigate('/compliance')}>
                  View All
                </Button>
              </div>
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


import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AlertsSection from '@/components/dashboard/AlertsSection';
import ActivitySection from '@/components/dashboard/ActivitySection';
import WorkflowPreview from '@/components/workflow/WorkflowPreview';
import { CircleAlert, Brain, Link, AlertTriangle, Workflow, Calendar, FileCheck } from 'lucide-react';
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

  // Mock data for activities
  const activities = [{
    id: '1',
    type: 'order' as const,
    title: 'New Order Created',
    description: 'Order #38293 for API-24X was created.',
    time: '5 minutes ago',
    user: {
      name: 'Lisa Monroe',
      initials: 'LM'
    }
  }, {
    id: '2',
    type: 'approval' as const,
    title: 'Quality Check Approved',
    description: 'Batch #A2984 passed final inspection.',
    time: '1 hour ago',
    user: {
      name: 'David Chen',
      initials: 'DC'
    }
  }, {
    id: '3',
    type: 'supplier' as const,
    title: 'Supplier Added',
    description: 'BioGen Labs was added to preferred suppliers.',
    time: '3 hours ago',
    user: {
      name: 'Sarah Johnson',
      initials: 'SJ'
    }
  }];

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
          
          {/* Critical Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border border-gray-200">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Low Stock Items</p>
                  <h3 className="text-2xl font-bold text-gray-900">3</h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                  <AlertTriangle className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Pending Approvals</p>
                  <h3 className="text-2xl font-bold text-gray-900">5</h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                  <CircleAlert className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Active Workflows</p>
                  <h3 className="text-2xl font-bold text-gray-900">2</h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <Workflow className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Active Workflow */}
          <Card className="border border-gray-200">
            <CardHeader className="p-5 pb-0">
              <CardTitle className="text-lg">Active Workflow</CardTitle>
              <CardDescription>Your current procurement workflow</CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <WorkflowPreview compact={true} />
            </CardContent>
          </Card>
          
          {/* Activity and Alerts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Activity Section */}
            <ActivitySection activities={activities} />
            
            {/* Alerts Section */}
            <AlertsSection alerts={alerts} />
          </div>
        </div>
      </div>
    </Layout>;
};

export default Dashboard;

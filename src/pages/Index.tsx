
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import MetricsCard from '@/components/dashboard/MetricsCard';
import AlertsSection from '@/components/dashboard/AlertsSection';
import ChatInterface from '@/components/chat/ChatInterface';
import WorkflowPreview from '@/components/workflow/WorkflowPreview';
import { CircleAlert, Brain, Package, AlertTriangle, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const navigate = useNavigate();
  
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
      <div className="space-y-6 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Critical Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800/30">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-red-800 dark:text-red-300">Low Stock Items</p>
                    <h3 className="text-2xl font-bold text-red-900 dark:text-red-200">3</h3>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </CardContent>
              </Card>
              
              <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800/30">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-amber-800 dark:text-amber-300">Pending Approvals</p>
                    <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-200">5</h3>
                  </div>
                  <CircleAlert className="h-8 w-8 text-amber-500" />
                </CardContent>
              </Card>
              
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/30">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-blue-800 dark:text-blue-300">Active Workflows</p>
                    <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-200">2</h3>
                  </div>
                  <Workflow className="h-8 w-8 text-blue-500" />
                </CardContent>
              </Card>
            </div>
            
            {/* Active Workflow */}
            <WorkflowPreview compact={true} />
            
            {/* Alerts Section */}
            <AlertsSection alerts={alerts} />
          </div>
          
          {/* Chat Interface Column */}
          <Card className="h-[calc(100vh-160px)]">
            <CardHeader className="p-4 border-b flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <div>
                <CardTitle className="text-lg">AI Assistant</CardTitle>
                <CardDescription>Ask anything about your procurement</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-80px)]">
              <ChatInterface />
            </CardContent>
          </Card>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            className="h-auto py-4 flex flex-col items-center justify-center gap-2" 
            onClick={() => navigate('/chat')}
          >
            <Brain className="h-6 w-6" />
            <span>Open Full Chat</span>
          </Button>
          
          <Button 
            className="h-auto py-4 flex flex-col items-center justify-center gap-2" 
            onClick={() => navigate('/workflows')}
          >
            <Workflow className="h-6 w-6" />
            <span>Manage Workflows</span>
          </Button>
          
          <Button 
            className="h-auto py-4 flex flex-col items-center justify-center gap-2" 
            variant="outline"
            onClick={() => navigate('/inventory')}
          >
            <Package className="h-6 w-6" />
            <span>View Inventory</span>
          </Button>
          
          <Button 
            className="h-auto py-4 flex flex-col items-center justify-center gap-2" 
            variant="outline"
            onClick={() => navigate('/suppliers')}
          >
            <CircleAlert className="h-6 w-6" />
            <span>Address Alerts</span>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

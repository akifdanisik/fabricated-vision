
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import WorkflowPreview from '@/components/workflow/WorkflowPreview';
import { Button } from '@/components/ui/button';
import { Plus, Play, Pause, FileIcon, Copy } from 'lucide-react';

const Workflows = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Workflow Orchestrator</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Workflow
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Workflow Templates</CardTitle>
              <CardDescription>Pre-built workflows to get started quickly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileIcon className="mr-2 h-4 w-4" />
                Supplier Onboarding
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileIcon className="mr-2 h-4 w-4" />
                Inventory Replenishment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileIcon className="mr-2 h-4 w-4" />
                RFQ Approval Process
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileIcon className="mr-2 h-4 w-4" />
                Quality Check Process
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Active Workflows</CardTitle>
              <CardDescription>Currently running workflows</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">API-24X Replenishment</p>
                  <p className="text-sm text-muted-foreground">Started 2 hours ago</p>
                </div>
                <Button size="icon" variant="ghost">
                  <Pause className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">MedSource Inc. Onboarding</p>
                  <p className="text-sm text-muted-foreground">Started 1 day ago</p>
                </div>
                <Button size="icon" variant="ghost">
                  <Pause className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Workflows</CardTitle>
              <CardDescription>Previously completed workflows</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Excipient QC Process</p>
                  <p className="text-sm text-muted-foreground">Completed yesterday</p>
                </div>
                <Button size="icon" variant="ghost">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Packaging Material Order</p>
                  <p className="text-sm text-muted-foreground">Completed 3 days ago</p>
                </div>
                <Button size="icon" variant="ghost">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Workflow Visualization</h2>
          <WorkflowPreview />
          
          <Card>
            <CardHeader>
              <CardTitle>Advanced Workflow Builder</CardTitle>
              <CardDescription>
                The full workflow builder is coming soon. Design complex procurement workflows with a visual, drag-and-drop interface.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-12">
              <p className="text-center text-muted-foreground mb-4">
                The full node-based workflow builder is under development and will be available soon.
              </p>
              <Button disabled>
                <Play className="mr-2 h-4 w-4" />
                Preview Workflow Builder
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Workflows;

import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import WorkflowPreview from '@/components/workflow/WorkflowPreview';
import WorkflowEditor from '@/components/workflow/WorkflowEditor';
import { Button } from '@/components/ui/button';
import { Plus, Play, Pause, FileIcon, Copy } from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Workflows = () => {
  const [activeTab, setActiveTab] = useState('templates');

  return (
    <Layout fullWidth={activeTab === 'editor'}>
      <div className={`${activeTab === 'editor' ? '' : 'space-y-6'}`}>
        <div className={`flex items-center justify-between ${activeTab === 'editor' ? 'bg-background px-6 py-4 border-b' : ''}`}>
          <h1 className="text-2xl font-semibold">Workflow Orchestrator</h1>
          <div className="flex gap-4">
            {activeTab === 'editor' && (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="hidden sm:block">
                <TabsList>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                  <TabsTrigger value="active">Active Workflows</TabsTrigger>
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                </TabsList>
              </Tabs>
            )}
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Workflow
            </Button>
          </div>
        </div>
        
        {activeTab !== 'editor' && (
          <Tabs defaultValue="templates" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="active">Active Workflows</TabsTrigger>
              <TabsTrigger value="editor">Workflow Editor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="templates" className="space-y-4">
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
                    <CardTitle className="text-lg">Popular Workflows</CardTitle>
                    <CardDescription>Most frequently used by your team</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">API Reorder Process</p>
                        <p className="text-sm text-muted-foreground">Last used 2 days ago</p>
                      </div>
                      <Button size="icon" variant="ghost">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Supplier Qualification</p>
                        <p className="text-sm text-muted-foreground">Last used 5 days ago</p>
                      </div>
                      <Button size="icon" variant="ghost">
                        <Copy className="h-4 w-4" />
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
            </TabsContent>
            
            <TabsContent value="active" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
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
                
                <WorkflowPreview />
              </div>
            </TabsContent>
          </Tabs>
        )}
        
        {activeTab === 'editor' && (
          <div className="h-[calc(100vh-110px)]">
            <WorkflowEditor />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Workflows;

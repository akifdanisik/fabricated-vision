
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import WorkflowPreview from '@/components/workflow/WorkflowPreview';
import WorkflowEditor from '@/components/workflow/WorkflowEditor';
import WorkflowSuggestions from '@/components/workflow/WorkflowSuggestions';
import { Button } from '@/components/ui/button';
import { Plus, Play, Pause, FileIcon, Copy, Settings, AlarmClock, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const Workflows = () => {
  const [activeTab, setActiveTab] = useState('editor');

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
                
                <WorkflowSuggestions />
                
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
                    <div className="border rounded-lg overflow-hidden">
                      <div className="p-3 flex items-center justify-between bg-blue-50 border-b">
                        <div className="flex items-center gap-2">
                          <Play className="h-4 w-4 text-blue-600" />
                          <p className="font-medium">API-24X Replenishment</p>
                        </div>
                        <Badge variant="outline" className="bg-blue-100 text-blue-700">Running</Badge>
                      </div>
                      <div className="p-3">
                        <div className="flex justify-between mb-2">
                          <span className="text-xs text-muted-foreground">Started 2 hours ago</span>
                          <span className="text-xs font-medium text-blue-600">Step 2 of 4</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '50%' }}></div>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <Button size="sm" variant="outline">
                            <Pause className="h-3 w-3 mr-1" /> Pause
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-3 w-3 mr-1" /> Manage
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <div className="p-3 flex items-center justify-between bg-amber-50 border-b">
                        <div className="flex items-center gap-2">
                          <AlarmClock className="h-4 w-4 text-amber-600" />
                          <p className="font-medium">MedSource Inc. Onboarding</p>
                        </div>
                        <Badge variant="outline" className="bg-amber-100 text-amber-700">Waiting</Badge>
                      </div>
                      <div className="p-3">
                        <div className="flex justify-between mb-2">
                          <span className="text-xs text-muted-foreground">Started 1 day ago</span>
                          <span className="text-xs font-medium text-amber-600">Step 3 of 5</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: '60%' }}></div>
                          </div>
                        </div>
                        <div className="mb-2 flex items-start gap-2 text-sm">
                          <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                          <span className="text-muted-foreground">Waiting for approval from Compliance team</span>
                        </div>
                        <div className="flex justify-between">
                          <Button size="sm" variant="outline">
                            <Pause className="h-3 w-3 mr-1" /> Pause
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-3 w-3 mr-1" /> Manage
                          </Button>
                        </div>
                      </div>
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

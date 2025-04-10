
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Calendar, CheckCircle, BarChart } from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const Workflows = () => {
  const [activeTab, setActiveTab] = useState('active');

  return (
    <Layout fullWidth>
      <div className="h-full bg-white">
        <div className="flex flex-col h-full">
          <div className="border-b p-4 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Workflows</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manage and automate document processing workflows
                </p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Workflow
              </Button>
            </div>
          </div>

          <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="border-b bg-white px-4">
              <TabsList className="bg-transparent h-auto p-0">
                <TabsTrigger value="active" className="py-2.5 px-4 text-sm">Active Workflows</TabsTrigger>
                <TabsTrigger value="templates" className="py-2.5 px-4 text-sm">Templates</TabsTrigger>
                <TabsTrigger value="completed" className="py-2.5 px-4 text-sm">Completed</TabsTrigger>
                <TabsTrigger value="drafts" className="py-2.5 px-4 text-sm">Drafts</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="active" className="flex-1 p-4 overflow-auto">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Supplier Approval</CardTitle>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">In Progress</Badge>
                    </div>
                    <CardDescription>Started 2 days ago</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">60%</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>4 Documents</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>Due Apr 15</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Quality Control</CardTitle>
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Awaiting Review</Badge>
                    </div>
                    <CardDescription>Started 5 days ago</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">80%</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>7 Documents</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>Due Apr 20</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">FDA Compliance</CardTitle>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">On Track</Badge>
                    </div>
                    <CardDescription>Started yesterday</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">25%</span>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>12 Documents</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>Due May 10</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="templates" className="flex-1 p-4 overflow-auto">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Supplier Onboarding</CardTitle>
                    <CardDescription>Standard process for new suppliers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        <span>Document collection</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        <span>Risk assessment</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        <span>Quality verification</span>
                      </div>
                      <Button variant="outline" className="w-full">Use Template</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Compliance Audit</CardTitle>
                    <CardDescription>Prepare regulatory documentation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        <span>Document audit trail</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        <span>Gap analysis</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        <span>Corrective actions</span>
                      </div>
                      <Button variant="outline" className="w-full">Use Template</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Quality Control</CardTitle>
                    <CardDescription>Materials quality inspection</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        <span>Specification review</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        <span>Sample testing</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        <span>Certificate generation</span>
                      </div>
                      <Button variant="outline" className="w-full">Use Template</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="flex-1 p-4 overflow-auto">
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Annual Supplier Review</CardTitle>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>
                    </div>
                    <CardDescription>Completed March 30, 2024</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <BarChart className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">All requirements met</span>
                      </div>
                      <Button variant="outline" size="sm">View Report</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Raw Material Documentation</CardTitle>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>
                    </div>
                    <CardDescription>Completed March 15, 2024</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <BarChart className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">15 documents processed</span>
                      </div>
                      <Button variant="outline" size="sm">View Report</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="drafts" className="flex-1 p-4 overflow-auto">
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">New Vendor Assessment</CardTitle>
                    <CardDescription>Last edited April 5, 2024</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">4 steps configured</span>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button size="sm">Activate</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">API Qualification Process</CardTitle>
                    <CardDescription>Last edited April 2, 2024</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">2 steps configured</span>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button size="sm">Activate</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Workflows;

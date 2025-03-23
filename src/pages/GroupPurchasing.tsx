
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Users, Building, FileCheck } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const GroupPurchasing = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Group Purchasing</h1>
            <p className="text-muted-foreground">
              Support group purchasing to reduce costs and improve efficiency
            </p>
          </div>
          <Button>Create New Group</Button>
        </div>

        <Tabs defaultValue="groups" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="groups">
              <Building className="mr-2 h-4 w-4" />
              Groups
            </TabsTrigger>
            <TabsTrigger value="rfqs">
              <Users className="mr-2 h-4 w-4" />
              Group RFQs
            </TabsTrigger>
            <TabsTrigger value="contracts">
              <FileCheck className="mr-2 h-4 w-4" />
              Group Contracts
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="groups" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Purchasing Groups</CardTitle>
                <CardDescription>
                  Groups you've created or joined for pooled procurement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">Regional Health Consortium</CardTitle>
                        <Badge>Active</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        A group of 5 regional health facilities pooling procurement for common pharmaceuticals.
                      </p>
                      <div className="flex -space-x-2 mb-4">
                        <Avatar className="border-2 border-background">
                          <AvatarFallback>HC</AvatarFallback>
                        </Avatar>
                        <Avatar className="border-2 border-background">
                          <AvatarFallback>RH</AvatarFallback>
                        </Avatar>
                        <Avatar className="border-2 border-background">
                          <AvatarFallback>MC</AvatarFallback>
                        </Avatar>
                        <Avatar className="border-2 border-background">
                          <AvatarFallback>GH</AvatarFallback>
                        </Avatar>
                        <Avatar className="border-2 border-background">
                          <AvatarFallback>PC</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <p>Created: Jan 15, 2024</p>
                        <p>Active RFQs: 2</p>
                        <p>Active Contracts: 3</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">Manage Group</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">Pharma Alliance Network</CardTitle>
                        <Badge variant="outline">Pending</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        A nationwide network of pharmaceutical manufacturers pooling for API procurement.
                      </p>
                      <div className="flex -space-x-2 mb-4">
                        <Avatar className="border-2 border-background">
                          <AvatarFallback>PA</AvatarFallback>
                        </Avatar>
                        <Avatar className="border-2 border-background">
                          <AvatarFallback>BH</AvatarFallback>
                        </Avatar>
                        <Avatar className="border-2 border-background">
                          <AvatarFallback>MP</AvatarFallback>
                        </Avatar>
                        <Avatar className="border-2 border-background">
                          <AvatarFallback>+2</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <p>Created: Mar 10, 2024</p>
                        <p>Active RFQs: 0</p>
                        <p>Active Contracts: 0</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">Join Group</Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rfqs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Group RFQ Management</CardTitle>
                <CardDescription>
                  Generate and manage RFQs for your purchasing groups
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Button>Create Group RFQ</Button>
                </div>
                <ScrollArea className="h-[350px] w-full pr-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>RFQ ID</TableHead>
                        <TableHead>Group</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>RFQ-G001</TableCell>
                        <TableCell>Regional Health Consortium</TableCell>
                        <TableCell>Paracetamol API</TableCell>
                        <TableCell>2,500 kg</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>RFQ-G002</TableCell>
                        <TableCell>Regional Health Consortium</TableCell>
                        <TableCell>Amoxicillin</TableCell>
                        <TableCell>1,200 kg</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>RFQ-G003</TableCell>
                        <TableCell>Regional Health Consortium</TableCell>
                        <TableCell>Ibuprofen</TableCell>
                        <TableCell>800 kg</TableCell>
                        <TableCell><Badge className="bg-gray-500">Closed</Badge></TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contracts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Group Contract Management</CardTitle>
                <CardDescription>
                  Manage contracts and orders for your purchasing groups
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[350px] w-full pr-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Contract ID</TableHead>
                        <TableHead>Group</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>GC-001</TableCell>
                        <TableCell>Regional Health Consortium</TableCell>
                        <TableCell>PharmaCorp</TableCell>
                        <TableCell>$1,250,000</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Manage</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>GC-002</TableCell>
                        <TableCell>Regional Health Consortium</TableCell>
                        <TableCell>BioTech Materials</TableCell>
                        <TableCell>$780,000</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Manage</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>GC-003</TableCell>
                        <TableCell>Regional Health Consortium</TableCell>
                        <TableCell>MedSource Inc</TableCell>
                        <TableCell>$420,000</TableCell>
                        <TableCell><Badge className="bg-green-500">Active</Badge></TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Manage</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default GroupPurchasing;

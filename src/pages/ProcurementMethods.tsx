
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShieldCheck, Users, FileText, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const ProcurementMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState('open-tender');

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Procurement Methods</h1>
            <p className="text-muted-foreground">
              Manage different procurement methods for your pharmaceutical supplies
            </p>
          </div>
        </div>

        <Tabs defaultValue="method-selection" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="method-selection">Method Selection</TabsTrigger>
            <TabsTrigger value="supplier-engagement">Supplier Engagement</TabsTrigger>
            <TabsTrigger value="contract-management">Contract Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="method-selection" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Select Procurement Method</CardTitle>
                <CardDescription>
                  Choose the most appropriate procurement method for your needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="procurement-method">Procurement Method</Label>
                  <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a procurement method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open-tender">Open Tender</SelectItem>
                      <SelectItem value="restricted-tender">Restricted Tender</SelectItem>
                      <SelectItem value="negotiated">Negotiated Procurement</SelectItem>
                      <SelectItem value="direct-purchase">Direct Purchase</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedMethod === 'open-tender' && (
                  <div className="space-y-4 pt-2">
                    <h3 className="text-lg font-medium">Open Tender</h3>
                    <p className="text-muted-foreground">
                      Open to all qualified bidders. Offers the highest level of competition and transparency.
                    </p>
                    <div className="space-y-2">
                      <Label htmlFor="product">Product</Label>
                      <Input id="product" placeholder="e.g., Paracetamol API" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input id="quantity" placeholder="e.g., 500kg" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget</Label>
                      <Input id="budget" placeholder="e.g., $50,000" />
                    </div>
                    <Button>Create Open Tender</Button>
                  </div>
                )}

                {selectedMethod === 'restricted-tender' && (
                  <div className="space-y-4 pt-2">
                    <h3 className="text-lg font-medium">Restricted Tender</h3>
                    <p className="text-muted-foreground">
                      Limited to pre-qualified suppliers. Balances competition with quality assurance.
                    </p>
                    <div className="space-y-2">
                      <Label htmlFor="product">Product</Label>
                      <Input id="product" placeholder="e.g., Paracetamol API" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input id="quantity" placeholder="e.g., 500kg" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="qualifications">Supplier Qualifications</Label>
                      <Input id="qualifications" placeholder="e.g., GMP Certified, FDA Approved" />
                    </div>
                    <Button>Create Restricted Tender</Button>
                  </div>
                )}

                {/* Similar sections for other procurement methods */}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="supplier-engagement" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Supplier Engagement</CardTitle>
                <CardDescription>
                  Engage with suppliers through various mechanisms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Call for Bids</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Automatically invite suppliers to submit bids for your procurement needs
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">Create Call for Bids</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Risk Qualification</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Evaluate suppliers based on various risk factors before inviting bids
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">Start Risk Assessment</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Locate Suppliers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Find potential suppliers based on your procurement requirements
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">Find Suppliers</Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contract-management" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contract Management</CardTitle>
                <CardDescription>
                  Create and manage contracts with your suppliers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Contract Creation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Generate AI-powered contract templates with pre-filled terms
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">Create Contract</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Contract Tracking</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Monitor contract performance, compliance, and important dates
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">Track Contracts</Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProcurementMethods;

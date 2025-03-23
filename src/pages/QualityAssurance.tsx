
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, FileText, Flask } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';

const QualityAssurance = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Quality Assurance</h1>
            <p className="text-muted-foreground">
              Ensure drug quality and compliance with regulatory standards
            </p>
          </div>
        </div>

        <Tabs defaultValue="document-verification" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="document-verification">
              <FileText className="mr-2 h-4 w-4" />
              Document Verification
            </TabsTrigger>
            <TabsTrigger value="quality-testing">
              <CheckCircle className="mr-2 h-4 w-4" />
              Quality Testing
            </TabsTrigger>
            <TabsTrigger value="bioequivalence">
              <Flask className="mr-2 h-4 w-4" />
              Bioequivalence
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="document-verification" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Document Verification</CardTitle>
                <CardDescription>
                  Automate verification of compliance documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <Input type="file" className="w-full" />
                    <Button>Verify Document</Button>
                  </div>
                  
                  <div className="space-y-6 my-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>GMP Certificate Verification</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Certificate of Analysis (CoA)</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>FDA Approval</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                  </div>
                </div>

                <ScrollArea className="h-[250px] w-full pr-4 mt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Verified</TableHead>
                        <TableHead>Expiry</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>GMP Certificate</TableCell>
                        <TableCell>PharmaCorp</TableCell>
                        <TableCell>Yes</TableCell>
                        <TableCell>Dec 15, 2024</TableCell>
                        <TableCell><Badge className="bg-green-500">Valid</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>ISO 9001</TableCell>
                        <TableCell>PharmaCorp</TableCell>
                        <TableCell>Yes</TableCell>
                        <TableCell>Aug 22, 2025</TableCell>
                        <TableCell><Badge className="bg-green-500">Valid</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>GMP Certificate</TableCell>
                        <TableCell>BioTech Materials</TableCell>
                        <TableCell>Yes</TableCell>
                        <TableCell>Feb 10, 2024</TableCell>
                        <TableCell><Badge className="bg-amber-500">Expiring Soon</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>FDA Approval</TableCell>
                        <TableCell>ChemSource</TableCell>
                        <TableCell>No</TableCell>
                        <TableCell>N/A</TableCell>
                        <TableCell><Badge className="bg-red-500">Pending</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Certificate of Analysis</TableCell>
                        <TableCell>MedSource Inc</TableCell>
                        <TableCell>Yes</TableCell>
                        <TableCell>N/A</TableCell>
                        <TableCell><Badge className="bg-green-500">Valid</Badge></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="quality-testing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quality Testing</CardTitle>
                <CardDescription>
                  Implement formal quality assurance programs for testing drug quality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Chemical Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Verify chemical composition and purity of pharmaceutical ingredients
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">Request Test</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Microbial Testing</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Test for bacterial and fungal contamination in pharmaceuticals
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">Request Test</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Stability Testing</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Evaluate shelf life and stability of pharmaceutical products
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">Request Test</Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <ScrollArea className="h-[250px] w-full pr-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Test ID</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Test Type</TableHead>
                        <TableHead>Requested</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>QT-001</TableCell>
                        <TableCell>Paracetamol API</TableCell>
                        <TableCell>Chemical Analysis</TableCell>
                        <TableCell>Mar 12, 2024</TableCell>
                        <TableCell><Badge className="bg-green-500">Completed</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>QT-002</TableCell>
                        <TableCell>Amoxicillin</TableCell>
                        <TableCell>Microbial Testing</TableCell>
                        <TableCell>Mar 15,.2024</TableCell>
                        <TableCell><Badge className="bg-blue-500">In Progress</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>QT-003</TableCell>
                        <TableCell>Ibuprofen</TableCell>
                        <TableCell>Stability Testing</TableCell>
                        <TableCell>Mar 20, 2024</TableCell>
                        <TableCell><Badge className="bg-amber-500">Scheduled</Badge></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bioequivalence" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bioequivalence Testing</CardTitle>
                <CardDescription>
                  Ensure bioequivalence for new supplier products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="reference-product">Reference Product</Label>
                    <Input id="reference-product" placeholder="e.g., Paracetamol API (Current Supplier)" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="test-product">Test Product</Label>
                    <Input id="test-product" placeholder="e.g., Paracetamol API (New Supplier)" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bioequivalence-parameters">Parameters to Test</Label>
                    <Input id="bioequivalence-parameters" placeholder="e.g., Cmax, AUC, Tmax" />
                  </div>
                  
                  <Button>Request Bioequivalence Study</Button>
                </div>
                
                <ScrollArea className="h-[250px] w-full pr-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Study ID</TableHead>
                        <TableHead>Products</TableHead>
                        <TableHead>Requested</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Result</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>BE-001</TableCell>
                        <TableCell>Paracetamol API (PharmaCorp vs. ChemSource)</TableCell>
                        <TableCell>Feb 05, 2024</TableCell>
                        <TableCell><Badge className="bg-green-500">Completed</Badge></TableCell>
                        <TableCell>Bioequivalent</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>BE-002</TableCell>
                        <TableCell>Amoxicillin (BioTech vs. NewChem)</TableCell>
                        <TableCell>Mar 01, 2024</TableCell>
                        <TableCell><Badge className="bg-blue-500">In Progress</Badge></TableCell>
                        <TableCell>Pending</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>BE-003</TableCell>
                        <TableCell>Ibuprofen (MedSource vs. GlobalAPI)</TableCell>
                        <TableCell>Mar 18, 2024</TableCell>
                        <TableCell><Badge className="bg-amber-500">Scheduled</Badge></TableCell>
                        <TableCell>Pending</TableCell>
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

export default QualityAssurance;

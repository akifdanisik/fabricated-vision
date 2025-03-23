
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { CircleDollarSign, BarChart, PieChart } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Reconciliation = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reconciling Needs and Funds</h1>
            <p className="text-muted-foreground">
              Tools to help reconcile drug needs with available funds
            </p>
          </div>
        </div>

        <Tabs defaultValue="ven" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="ven">
              <CircleDollarSign className="mr-2 h-4 w-4" />
              VEN Analysis
            </TabsTrigger>
            <TabsTrigger value="abc">
              <BarChart className="mr-2 h-4 w-4" />
              ABC Analysis
            </TabsTrigger>
            <TabsTrigger value="therapeutic">
              <PieChart className="mr-2 h-4 w-4" />
              Therapeutic Category
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ven" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>VEN Analysis</CardTitle>
                <CardDescription>
                  Classify drugs as Vital, Essential, or Non-essential for prioritization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] w-full pr-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Drug</TableHead>
                        <TableHead>Current Classification</TableHead>
                        <TableHead>Annual Spend</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Paracetamol API</TableCell>
                        <TableCell>
                          <Badge className="bg-red-500">Vital</Badge>
                        </TableCell>
                        <TableCell>$52,000</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Reclassify</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Amoxicillin</TableCell>
                        <TableCell>
                          <Badge className="bg-amber-500">Essential</Badge>
                        </TableCell>
                        <TableCell>$38,200</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Reclassify</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Ibuprofen</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-500">Non-essential</Badge>
                        </TableCell>
                        <TableCell>$12,500</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Reclassify</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Acetylsalicylic Acid</TableCell>
                        <TableCell>
                          <Badge className="bg-amber-500">Essential</Badge>
                        </TableCell>
                        <TableCell>$8,700</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Reclassify</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Azithromycin</TableCell>
                        <TableCell>
                          <Badge className="bg-red-500">Vital</Badge>
                        </TableCell>
                        <TableCell>$49,800</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Reclassify</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </ScrollArea>

                <div className="flex justify-between items-center mt-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Budget: $250,000</p>
                    <p className="text-sm text-muted-foreground">Current Allocation: $182,500</p>
                  </div>
                  <Button>Generate VEN Report</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="abc" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>ABC Analysis</CardTitle>
                <CardDescription>
                  Categorize drugs based on their annual consumption value
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="pb-4 space-y-2">
                  <Label htmlFor="threshold-a">Class A Threshold (% of items)</Label>
                  <Input id="threshold-a" placeholder="e.g., 20" defaultValue="20" />
                </div>
                
                <div className="pb-4 space-y-2">
                  <Label htmlFor="threshold-b">Class B Threshold (% of items)</Label>
                  <Input id="threshold-b" placeholder="e.g., 30" defaultValue="30" />
                </div>
                
                <Button className="mb-6">Calculate ABC Classification</Button>
                
                <ScrollArea className="h-[300px] w-full pr-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Drug</TableHead>
                        <TableHead>Annual Spend</TableHead>
                        <TableHead>% of Total</TableHead>
                        <TableHead>Class</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Paracetamol API</TableCell>
                        <TableCell>$52,000</TableCell>
                        <TableCell>28.5%</TableCell>
                        <TableCell>
                          <Badge className="bg-red-500">Class A</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Azithromycin</TableCell>
                        <TableCell>$49,800</TableCell>
                        <TableCell>27.3%</TableCell>
                        <TableCell>
                          <Badge className="bg-red-500">Class A</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Amoxicillin</TableCell>
                        <TableCell>$38,200</TableCell>
                        <TableCell>20.9%</TableCell>
                        <TableCell>
                          <Badge className="bg-amber-500">Class B</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Ibuprofen</TableCell>
                        <TableCell>$12,500</TableCell>
                        <TableCell>6.8%</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">Class C</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Acetylsalicylic Acid</TableCell>
                        <TableCell>$8,700</TableCell>
                        <TableCell>4.8%</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">Class C</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="therapeutic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Therapeutic Category Analysis</CardTitle>
                <CardDescription>
                  Focus on cost-effective drugs within therapeutic groups
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="pb-4 space-y-2">
                  <Label htmlFor="category">Therapeutic Category</Label>
                  <Input id="category" placeholder="e.g., Analgesics" />
                </div>
                
                <Button className="mb-6">Analyze Category</Button>
                
                <ScrollArea className="h-[300px] w-full pr-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Drug</TableHead>
                        <TableHead>Annual Spend</TableHead>
                        <TableHead>Cost per Treatment</TableHead>
                        <TableHead>Efficiency Ratio</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Paracetamol</TableCell>
                        <TableCell>$52,000</TableCell>
                        <TableCell>$0.32</TableCell>
                        <TableCell>1.0 (Best)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Ibuprofen</TableCell>
                        <TableCell>$12,500</TableCell>
                        <TableCell>$0.45</TableCell>
                        <TableCell>1.4</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Acetylsalicylic Acid</TableCell>
                        <TableCell>$8,700</TableCell>
                        <TableCell>$0.38</TableCell>
                        <TableCell>1.2</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Naproxen</TableCell>
                        <TableCell>$22,400</TableCell>
                        <TableCell>$0.72</TableCell>
                        <TableCell>2.3</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Diclofenac</TableCell>
                        <TableCell>$18,600</TableCell>
                        <TableCell>$0.85</TableCell>
                        <TableCell>2.7</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </ScrollArea>
                
                <div className="mt-6">
                  <Button>Generate Cost Optimization Recommendations</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Reconciliation;

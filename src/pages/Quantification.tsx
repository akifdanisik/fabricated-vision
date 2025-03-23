
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, TrendingUp, History } from 'lucide-react';

const Quantification = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Quantification of Drugs</h1>
            <p className="text-muted-foreground">
              Calculate drug requirements based on different methodologies
            </p>
          </div>
        </div>

        <Tabs defaultValue="morbidity" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="morbidity">
              <TrendingUp className="mr-2 h-4 w-4" />
              Morbidity Method
            </TabsTrigger>
            <TabsTrigger value="consumption">
              <History className="mr-2 h-4 w-4" />
              Consumption Method
            </TabsTrigger>
            <TabsTrigger value="adjusted">
              <Calculator className="mr-2 h-4 w-4" />
              Adjusted Consumption
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="morbidity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Morbidity Method</CardTitle>
                <CardDescription>
                  Quantify drug needs based on disease prevalence, treatment guidelines, and episodes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="drug">Drug</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a drug" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paracetamol">Paracetamol API</SelectItem>
                      <SelectItem value="amoxicillin">Amoxicillin</SelectItem>
                      <SelectItem value="ibuprofen">Ibuprofen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="disease">Disease/Condition</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a disease or condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flu">Influenza</SelectItem>
                      <SelectItem value="pneumonia">Pneumonia</SelectItem>
                      <SelectItem value="malaria">Malaria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="population">Target Population</Label>
                  <Input id="population" placeholder="e.g., 100,000" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="incidence">Disease Incidence (%)</Label>
                  <Input id="incidence" placeholder="e.g., 5.2" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dosage">Standard Treatment Dose</Label>
                  <Input id="dosage" placeholder="e.g., 500mg 3x daily for 5 days" />
                </div>
                
                <Button className="w-full">Calculate Quantities</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="consumption" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Consumption Method</CardTitle>
                <CardDescription>
                  Quantify drug needs based on historical consumption data and stock levels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="drug">Drug</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a drug" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paracetamol">Paracetamol API</SelectItem>
                      <SelectItem value="amoxicillin">Amoxicillin</SelectItem>
                      <SelectItem value="ibuprofen">Ibuprofen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="period">Consumption Period</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-year">Last Year</SelectItem>
                      <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                      <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="current-stock">Current Stock Level</Label>
                  <Input id="current-stock" placeholder="e.g., 200kg" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lead-time">Lead Time (days)</Label>
                  <Input id="lead-time" placeholder="e.g., 45" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="buffer">Buffer Stock (%)</Label>
                  <Input id="buffer" placeholder="e.g., 25" />
                </div>
                
                <Button className="w-full">Calculate Quantities</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="adjusted" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Adjusted Consumption Method</CardTitle>
                <CardDescription>
                  Quantify drug needs based on population or service-based estimates with adjustments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="drug">Drug</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a drug" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paracetamol">Paracetamol API</SelectItem>
                      <SelectItem value="amoxicillin">Amoxicillin</SelectItem>
                      <SelectItem value="ibuprofen">Ibuprofen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="baseline">Baseline Consumption</Label>
                  <Input id="baseline" placeholder="e.g., 1,000kg per year" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="population-growth">Population Growth (%)</Label>
                  <Input id="population-growth" placeholder="e.g., 2.5" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="service-expansion">Service Expansion (%)</Label>
                  <Input id="service-expansion" placeholder="e.g., 15" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="seasonal-factor">Seasonal Adjustment Factor</Label>
                  <Input id="seasonal-factor" placeholder="e.g., 1.2 for high season" />
                </div>
                
                <Button className="w-full">Calculate Adjusted Quantities</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Quantification;

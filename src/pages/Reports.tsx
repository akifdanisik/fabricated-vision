
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('spend');

  // Mock data for reports
  const spendData = [
    { name: 'Jan', value: 142000 },
    { name: 'Feb', value: 165000 },
    { name: 'Mar', value: 121000 },
    { name: 'Apr', value: 178000 },
    { name: 'May', value: 156000 },
    { name: 'Jun', value: 138000 },
  ];

  const savingsData = [
    { name: 'Jan', value: 22000 },
    { name: 'Feb', value: 35000 },
    { name: 'Mar', value: 49000 },
    { name: 'Apr', value: 61000 },
    { name: 'May', value: 85000 },
    { name: 'Jun', value: 108000 },
  ];

  const categoryData = [
    { name: 'APIs', value: 45 },
    { name: 'Excipients', value: 25 },
    { name: 'Packaging', value: 15 },
    { name: 'Equipment', value: 10 },
    { name: 'Services', value: 5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9966FF'];

  const config = {
    spend: { label: 'Total Spend ($)' },
    savings: { label: 'Cost Savings ($)' },
    apis: { color: '#0088FE' },
    excipients: { color: '#00C49F' },
    packaging: { color: '#FFBB28' },
    equipment: { color: '#FF8042' },
    services: { color: '#9966FF' },
  };

  return (
    <Layout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Spend Analytics</CardTitle>
            <CardDescription>
              Analyze spending patterns and identify cost-saving opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="spend" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-3 mb-6">
                <TabsTrigger value="spend">Monthly Spend</TabsTrigger>
                <TabsTrigger value="savings">Cost Savings</TabsTrigger>
                <TabsTrigger value="categories">Spend by Category</TabsTrigger>
              </TabsList>
              
              <TabsContent value="spend" className="mt-0">
                <ChartContainer config={config} className="h-[350px]">
                  <BarChart data={spendData}>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" name="spend" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </TabsContent>
              
              <TabsContent value="savings" className="mt-0">
                <ChartContainer config={config} className="h-[350px]">
                  <LineChart data={savingsData}>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      name="savings"
                      stroke="var(--primary)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ChartContainer>
              </TabsContent>
              
              <TabsContent value="categories" className="mt-0">
                <div className="grid md:grid-cols-2 gap-6">
                  <ChartContainer config={config} className="h-[350px]">
                    <PieChart>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ChartContainer>
                  
                  <div className="space-y-6 flex flex-col justify-center">
                    {categoryData.map((category, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{category.name}</span>
                          <span className="text-sm text-muted-foreground">{category.value}%</span>
                        </div>
                        <Progress value={category.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;

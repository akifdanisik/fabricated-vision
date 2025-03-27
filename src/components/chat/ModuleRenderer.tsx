import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import CategoryFilter from '@/components/categories/CategoryFilter';
import { Category } from '@/components/categories/CategoryBadge';
import { useState } from 'react';
import { ShieldCheck, FileText, ClipboardCheck } from 'lucide-react';
import ComplianceOverview from '@/components/compliance/ComplianceOverview';
import DocumentManagement from '@/components/compliance/DocumentManagement';
import AuditReadiness from '@/components/compliance/AuditReadiness';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import InventoryTable from '@/components/inventory/InventoryTable';
import SuppliersTable, { Supplier } from '@/components/suppliers/SuppliersTable';
import CategoryManager from '@/components/categories/CategoryManager';

interface ModuleRendererProps {
  type: string;
  data: Record<string, any>;
}

// Mock supplier data for the suppliers module
const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'PharmaCorp',
    category: 'Active Ingredients',
    performance: 85,
    riskLevel: 'low',
    items: 12,
    contact: {
      name: 'Alex Johnson',
      email: 'alex.johnson@pharmaco.com',
    },
    location: 'Boston, USA',
    initials: 'PC',
  },
  {
    id: '2',
    name: 'BioTech Materials',
    category: 'Excipients',
    performance: 78,
    riskLevel: 'low',
    items: 24,
    contact: {
      name: 'Maria Garcia',
      email: 'mgarcia@biotechmat.com',
    },
    location: 'Barcelona, Spain',
    initials: 'BM',
  },
  {
    id: '3',
    name: 'ChemSource Inc.',
    category: 'Chemicals',
    performance: 92,
    riskLevel: 'low',
    items: 18,
    contact: {
      name: 'David Lee',
      email: 'd.lee@chemsource.com',
    },
    location: 'Singapore',
    initials: 'CS',
  },
];

// Add dummy props to prevent TS errors. The actual components will use their props internally.
const EnhancedComplianceOverview = (props: any) => <ComplianceOverview {...props} />;
const EnhancedDocumentManagement = (props: any) => <DocumentManagement {...props} />;
const EnhancedAuditReadiness = (props: any) => <AuditReadiness {...props} />;
const EnhancedInventoryTable = (props: any) => <InventoryTable {...props} />;
const EnhancedSuppliersTable = (props: any) => <SuppliersTable suppliers={mockSuppliers} {...props} />;
const EnhancedCategoryManager = (props: any) => <CategoryManager {...props} />;

const ModuleRenderer: React.FC<ModuleRendererProps> = ({ type, data }) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  
  const handleCategoryFilterChange = (categories: Category[]) => {
    setSelectedCategories(categories);
  };

  // Reports module mock data
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

  switch (type) {
    case 'compliance':
      return (
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
            <CardTitle className="text-base">Compliance and Audit</CardTitle>
            {data.categoryFilter && (
              <CategoryFilter 
                onFilterChange={handleCategoryFilterChange} 
                showLabel={false}
                className="flex-shrink-0" 
              />
            )}
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="overview" className="p-4">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="overview">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="documents">
                  <FileText className="mr-2 h-4 w-4" />
                  Documents
                </TabsTrigger>
                <TabsTrigger value="audit">
                  <ClipboardCheck className="mr-2 h-4 w-4" />
                  Audit
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-0">
                <EnhancedComplianceOverview selectedCategories={selectedCategories} />
              </TabsContent>
              
              <TabsContent value="documents" className="mt-0">
                <EnhancedDocumentManagement selectedCategories={selectedCategories} />
              </TabsContent>
              
              <TabsContent value="audit" className="mt-0">
                <EnhancedAuditReadiness selectedCategories={selectedCategories} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      );
      
    case 'reports':
      return (
        <Card className="border-0 shadow-none">
          <CardHeader className="p-4">
            <CardTitle className="text-base">Spend Analytics</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <Tabs defaultValue={data.tab || 'spend'} className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-4">
                <TabsTrigger value="spend">Monthly Spend</TabsTrigger>
                <TabsTrigger value="savings">Cost Savings</TabsTrigger>
                <TabsTrigger value="categories">By Category</TabsTrigger>
              </TabsList>
              
              <TabsContent value="spend" className="mt-0">
                <div className="h-[250px]">
                  <ChartContainer config={config}>
                    <BarChart data={spendData}>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" name="spend" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="savings" className="mt-0">
                <div className="h-[250px]">
                  <ChartContainer config={config}>
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
                </div>
              </TabsContent>
              
              <TabsContent value="categories" className="mt-0">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="h-[250px]">
                    <ChartContainer config={config}>
                      <PieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ChartContainer>
                  </div>
                  
                  <div className="space-y-4 flex flex-col justify-center">
                    {categoryData.map((category, index) => (
                      <div key={index} className="space-y-1">
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
      );

    case 'inventory':
      return (
        <Card className="border-0 shadow-none">
          <CardHeader className="p-4">
            <CardTitle className="text-base">Inventory Management</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <div className="max-h-[400px] overflow-auto">
              <EnhancedInventoryTable compact={true} />
            </div>
          </CardContent>
        </Card>
      );

    case 'suppliers':
      return (
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
            <CardTitle className="text-base">Supplier Management</CardTitle>
            {data.categoryFilter && (
              <CategoryFilter 
                onFilterChange={handleCategoryFilterChange} 
                showLabel={false}
                className="flex-shrink-0" 
              />
            )}
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <div className="max-h-[400px] overflow-auto">
              <EnhancedSuppliersTable 
                compact={true}
                filterByGMP={data.filteredByGMP} 
                filterByCategories={selectedCategories}
              />
            </div>
          </CardContent>
        </Card>
      );

    case 'categories':
      return (
        <Card className="border-0 shadow-none">
          <CardHeader className="p-4">
            <CardTitle className="text-base">Category Management</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <EnhancedCategoryManager compact={true} />
          </CardContent>
        </Card>
      );

    default:
      return (
        <Card className="p-4 text-center">
          <CardContent>
            <p>No module data available</p>
          </CardContent>
        </Card>
      );
  }
};

export default ModuleRenderer;

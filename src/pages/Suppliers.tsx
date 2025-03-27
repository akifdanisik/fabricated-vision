
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import SuppliersTable, { Supplier } from '@/components/suppliers/SuppliersTable';
import SupplierProfile from '@/components/suppliers/SupplierProfile';
import SupplierEvaluation from '@/components/suppliers/SupplierEvaluation';
import SupplierIntelligenceTable, { SupplierIntelligenceData } from '@/components/suppliers/SupplierIntelligenceTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Category, predefinedCategories } from '@/components/categories/CategoryBadge';
import CategoryBadge from '@/components/categories/CategoryBadge';
import { sampleSupplierIntelligenceData } from '@/data/supplierIntelligenceData';

const Suppliers = () => {
  const [loading, setLoading] = useState(true);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [activeTab, setActiveTab] = useState('list');
  
  const suppliersData: Supplier[] = [
    {
      id: '1',
      name: 'PharmaCorp',
      category: 'Active Ingredients',
      categories: [
        predefinedCategories.find(c => c.id === 'apis')!
      ],
      performance: 85,
      riskLevel: 'low',
      items: 12,
      contact: {
        name: 'Alex Johnson',
        email: 'alex.johnson@pharmaco.com',
        phone: '+1 (555) 123-4567',
      },
      location: 'Boston, USA',
      initials: 'PC',
    },
    {
      id: '2',
      name: 'BioTech Materials',
      category: 'Excipients',
      categories: [
        predefinedCategories.find(c => c.id === 'excipients')!
      ],
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
      category: 'Excipients',
      categories: [
        predefinedCategories.find(c => c.id === 'excipients')!,
        predefinedCategories.find(c => c.id === 'chemicals')!
      ],
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
    {
      id: '4',
      name: 'PackTech Solutions',
      category: 'Packaging',
      categories: [
        predefinedCategories.find(c => c.id === 'packaging')!
      ],
      performance: 65,
      riskLevel: 'medium',
      items: 32,
      contact: {
        name: 'Sarah Miller',
        email: 'sarah@packtech.com',
      },
      location: 'Chicago, USA',
      initials: 'PS',
    },
    {
      id: '5',
      name: 'MedSource Inc.',
      category: 'Active Ingredients',
      categories: [
        predefinedCategories.find(c => c.id === 'apis')!,
        predefinedCategories.find(c => c.id === 'chemicals')!
      ],
      performance: 58,
      riskLevel: 'high',
      items: 6,
      contact: {
        name: 'John Smith',
        email: 'j.smith@medsource.com',
      },
      location: 'Mumbai, India',
      initials: 'MI',
    },
    {
      id: '6',
      name: 'MetalPack Industries',
      category: 'Packaging',
      categories: [
        predefinedCategories.find(c => c.id === 'packaging')!,
        predefinedCategories.find(c => c.id === 'equipment')!
      ],
      performance: 72,
      riskLevel: 'medium',
      items: 14,
      contact: {
        name: 'Emma Wilson',
        email: 'emma@metalpack.com',
      },
      location: 'Frankfurt, Germany',
      initials: 'MP',
    },
    {
      id: '7',
      name: 'BoxCo',
      category: 'Packaging',
      categories: [
        predefinedCategories.find(c => c.id === 'packaging')!
      ],
      performance: 88,
      riskLevel: 'low',
      items: 8,
      contact: {
        name: 'Robert Chen',
        email: 'robert@boxco.com',
      },
      location: 'Toronto, Canada',
      initials: 'BC',
    },
  ];
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSupplierSelect = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setActiveTab('profile');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Supplier Management</CardTitle>
            <CardDescription>
              Manage supplier relationships, performance metrics, and risk assessments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="list">Supplier List</TabsTrigger>
                <TabsTrigger value="intelligence">Supplier Intelligence</TabsTrigger>
                <TabsTrigger value="profile" disabled={!selectedSupplier}>Supplier Profile</TabsTrigger>
                <TabsTrigger value="evaluation">AI Evaluations</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
              </TabsList>
              
              <TabsContent value="list" className="mt-0">
                <SuppliersTable 
                  suppliers={suppliersData} 
                  onSelectSupplier={handleSupplierSelect}
                />
              </TabsContent>
              
              <TabsContent value="intelligence" className="mt-0">
                <SupplierIntelligenceTable 
                  suppliers={sampleSupplierIntelligenceData}
                  onSelectSupplier={(supplier) => console.log('Selected intelligence supplier:', supplier)}
                />
              </TabsContent>
              
              <TabsContent value="profile" className="mt-0">
                {selectedSupplier && (
                  <SupplierProfile supplier={selectedSupplier} />
                )}
              </TabsContent>
              
              <TabsContent value="evaluation" className="mt-0">
                <SupplierEvaluation suppliers={suppliersData} />
              </TabsContent>
              
              <TabsContent value="categories" className="mt-0">
                <div className="p-4 bg-muted/40 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Category Management</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Organize suppliers by category to improve analysis and decision-making.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {predefinedCategories.map(category => (
                      <Card key={category.id} className="overflow-hidden">
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-base flex items-center gap-2">
                            <CategoryBadge category={category} />
                          </CardTitle>
                          <CardDescription className="text-xs">
                            {suppliersData.filter(s => 
                              s.categories?.some(c => c.id === category.id) || 
                              s.category === category.name
                            ).length} suppliers
                          </CardDescription>
                        </CardHeader>
                      </Card>
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

export default Suppliers;

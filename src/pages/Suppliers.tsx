import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import SuppliersTable, { Supplier } from '@/components/suppliers/SuppliersTable';
import SupplierProfile from '@/components/suppliers/SupplierProfile';
import SupplierEvaluation from '@/components/suppliers/SupplierEvaluation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Category, predefinedCategories } from '@/components/categories/CategoryBadge';

const Suppliers = () => {
  const [loading, setLoading] = useState(true);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [activeTab, setActiveTab] = useState('list');
  const [showGMPOnly, setShowGMPOnly] = useState(false);
  
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
      certifications: ['GMP', 'ISO 9001'],
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
      certifications: ['GMP', 'FDA', 'ISO 9001'],
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
      certifications: ['ISO 9001'],
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
      certifications: ['ISO 14001'],
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
      certifications: ['GMP'],
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
      certifications: ['ISO 9001', 'ISO 14001'],
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
      certifications: ['ISO 9001'],
    },
  ];
  
  const displayedSuppliers = showGMPOnly 
    ? suppliersData.filter(s => s.certifications?.includes('GMP'))
    : suppliersData;
  
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

  const handleGMPTabClick = () => {
    setShowGMPOnly(true);
    setActiveTab('gmp');
  };

  const handleListTabClick = () => {
    setShowGMPOnly(false);
    setActiveTab('list');
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
                <TabsTrigger value="list" onClick={handleListTabClick}>Supplier List</TabsTrigger>
                <TabsTrigger value="profile" disabled={!selectedSupplier}>Supplier Profile</TabsTrigger>
                <TabsTrigger value="evaluation">AI Evaluations</TabsTrigger>
                <TabsTrigger value="gmp" onClick={handleGMPTabClick}>GMP Certified</TabsTrigger>
              </TabsList>
              
              <TabsContent value="list" className="mt-0">
                <SuppliersTable 
                  suppliers={displayedSuppliers} 
                  onSelectSupplier={handleSupplierSelect}
                  filterByGMP={showGMPOnly}
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
              
              <TabsContent value="gmp" className="mt-0">
                <SuppliersTable 
                  suppliers={suppliersData.filter(s => s.certifications?.includes('GMP'))} 
                  onSelectSupplier={handleSupplierSelect}
                  filterByGMP={true}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Suppliers;

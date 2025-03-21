
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import SuppliersTable, { Supplier } from '@/components/suppliers/SuppliersTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Suppliers = () => {
  const [loading, setLoading] = useState(true);
  
  // Mock suppliers data
  const suppliersData: Supplier[] = [
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
        phone: '+1 (555) 123-4567',
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
      category: 'Excipients',
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
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

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
            <SuppliersTable suppliers={suppliersData} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Suppliers;

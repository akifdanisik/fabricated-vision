
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import InventoryTable, { InventoryItem } from '@/components/inventory/InventoryTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Inventory = () => {
  const [loading, setLoading] = useState(true);
  
  // Mock inventory data
  const inventoryItems: InventoryItem[] = [
    {
      id: '1',
      name: 'API-24X',
      category: 'Active Ingredient',
      currentStock: 450,
      reorderPoint: 500,
      leadTime: '4 weeks',
      status: 'critical',
      supplier: 'PharmaCorp',
    },
    {
      id: '2',
      name: 'Microcrystalline Cellulose',
      category: 'Excipient',
      currentStock: 2500,
      reorderPoint: 1200,
      leadTime: '2 weeks',
      status: 'normal',
      supplier: 'BioTech Materials',
    },
    {
      id: '3',
      name: 'Magnesium Stearate',
      category: 'Excipient',
      currentStock: 840,
      reorderPoint: 800,
      leadTime: '1 week',
      status: 'low',
      supplier: 'ChemSource Inc.',
    },
    {
      id: '4',
      name: 'PVC Blister Film',
      category: 'Packaging',
      currentStock: 12000,
      reorderPoint: 8000,
      leadTime: '2 weeks',
      status: 'normal',
      supplier: 'PackTech Solutions',
    },
    {
      id: '5',
      name: 'Aluminum Foil',
      category: 'Packaging',
      currentStock: 15000,
      reorderPoint: 5000,
      leadTime: '3 weeks',
      status: 'overstock',
      supplier: 'MetalPack Industries',
    },
    {
      id: '6',
      name: 'Carton Boxes',
      category: 'Packaging',
      currentStock: 3500,
      reorderPoint: 2000,
      leadTime: '1 week',
      status: 'normal',
      supplier: 'BoxCo',
    },
    {
      id: '7',
      name: 'API-36B',
      category: 'Active Ingredient',
      currentStock: 220,
      reorderPoint: 300,
      leadTime: '6 weeks',
      status: 'critical',
      supplier: 'MedSource Inc.',
    },
    {
      id: '8',
      name: 'Lactose Monohydrate',
      category: 'Excipient',
      currentStock: 1800,
      reorderPoint: 1000,
      leadTime: '1 week',
      status: 'normal',
      supplier: 'BioTech Materials',
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
            <CardTitle>Inventory Management</CardTitle>
            <CardDescription>
              Monitor and manage inventory levels of direct and indirect materials.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InventoryTable items={inventoryItems} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Inventory;

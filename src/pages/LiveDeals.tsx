
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus, Package, HandshakeIcon, CheckCircle, ArrowRight, Calendar, Clock } from 'lucide-react';

// Mock data for deals
const deals = [
  {
    id: 'DEAL-2024-001',
    date: 'Feb 20, 2024',
    status: 'new',
    title: 'Textile Manufacturing - Cotton Blend',
    quantity: '5,000 meters',
    budget: '$25,000 - $30,000',
    responses: 0,
    aiStrategy: {
      focusPoints: [
        'Price negotiation',
        'Payment terms',
        'Quality guarantees',
        'Delivery timeline'
      ],
      approach: 'Will negotiate based on volume discount principles and long-term partnership potential',
      targetSavings: '5-8% below market average',
      timeframe: '7-10 days'
    },
    dealStructure: {
      totalValue: '$27,500',
      paymentStructure: '40% upfront, 60% on delivery',
      similarDealsAvg: '$28,750',
      potentialSavings: '~$1,250 (4.3%)',
      riskAssessment: 'Low - Established supplier with verified credentials',
      qualityVerification: [
        'Material sample testing',
        'On-site quality inspection',
        'Certification verification'
      ]
    },
    supplier: 'Global Textile Industries'
  },
  {
    id: 'DEAL-2024-002',
    date: 'Feb 25, 2024',
    status: 'in-negotiation',
    title: 'Electronics Components - Circuit Boards',
    quantity: '2,500 units',
    budget: '$45,000 - $50,000',
    responses: 3,
    aiStrategy: {
      focusPoints: [
        'Component quality',
        'Bulk pricing',
        'Warranty terms',
        'Technical support'
      ],
      approach: 'Leverage multi-year contract potential to secure better terms',
      targetSavings: '3-5% below initial offers',
      timeframe: '14-21 days'
    },
    dealStructure: {
      totalValue: '$47,250',
      paymentStructure: '30% upfront, 70% on delivery',
      similarDealsAvg: '$49,500',
      potentialSavings: '~$2,250 (4.5%)',
      riskAssessment: 'Medium - New supplier relationship',
      qualityVerification: [
        'Component testing',
        'Manufacturing facility audit',
        'Quality certification review'
      ]
    },
    supplier: 'TechCircuit Solutions'
  },
  {
    id: 'DEAL-2024-003',
    date: 'Feb 18, 2024',
    status: 'supplier-confirmed',
    title: 'Packaging Materials - Eco-friendly Boxes',
    quantity: '10,000 units',
    budget: '$15,000 - $18,000',
    responses: 5,
    aiStrategy: {
      focusPoints: [
        'Eco certification',
        'Material durability',
        'Delivery schedule',
        'Volume pricing'
      ],
      approach: 'Emphasize sustainability goals alignment and long-term partnership',
      targetSavings: '4-6% below market rate',
      timeframe: 'Completed in 8 days'
    },
    dealStructure: {
      totalValue: '$16,200',
      paymentStructure: '50% upfront, 50% on delivery',
      similarDealsAvg: '$17,500',
      potentialSavings: '~$1,300 (7.4%)',
      riskAssessment: 'Low - Previously vetted supplier',
      qualityVerification: [
        'Sample testing completed',
        'Sustainability certification verified',
        'Quality control report received'
      ]
    },
    supplier: 'GreenPack Solutions'
  }
];

const DealCard = ({ deal }: { deal: typeof deals[0] }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-sm font-medium text-gray-500">{deal.id}</h4>
              <div className="flex items-center gap-1 text-gray-500">
                <Calendar className="h-3 w-3" />
                <span className="text-xs">{deal.date}</span>
              </div>
            </div>
            <CardTitle className="text-lg">{deal.title}</CardTitle>
          </div>
          <Badge 
            variant={
              deal.status === 'new' ? 'default' : 
              deal.status === 'in-negotiation' ? 'secondary' : 
              'outline'
            }
            className={
              deal.status === 'new' ? 'bg-blue-500' : 
              deal.status === 'in-negotiation' ? 'bg-amber-500' : 
              'border-green-500 text-green-600'
            }
          >
            {deal.status === 'new' ? 'New' : 
             deal.status === 'in-negotiation' ? 'In Negotiation' : 
             'Supplier Confirmed'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Details</h4>
            <div className="grid grid-cols-2 gap-y-1 text-sm">
              <span className="text-gray-500">Quantity</span>
              <span>{deal.quantity}</span>
              
              <span className="text-gray-500">Budget</span>
              <span>{deal.budget}</span>
              
              <span className="text-gray-500">Responses</span>
              <span>{deal.responses}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">AI Negotiation Strategy</h4>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-500 block">Focus Points</span>
                <ul className="list-disc list-inside text-xs space-y-0.5">
                  {deal.aiStrategy.focusPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <span className="text-gray-500 block">Approach</span>
                <p className="text-xs">{deal.aiStrategy.approach}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-y-1">
                <span className="text-gray-500">Target Savings</span>
                <span className="text-xs">{deal.aiStrategy.targetSavings}</span>
                
                <span className="text-gray-500">Timeframe</span>
                <span className="text-xs">{deal.aiStrategy.timeframe}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Deal Structure</h4>
            <div className="grid grid-cols-2 gap-y-1 text-sm">
              <span className="text-gray-500">Total Value</span>
              <span>{deal.dealStructure.totalValue}</span>
              
              <span className="text-gray-500">Payment</span>
              <span className="text-xs">{deal.dealStructure.paymentStructure}</span>
              
              <span className="text-gray-500">Similar Deals Avg.</span>
              <span>{deal.dealStructure.similarDealsAvg}</span>
              
              <span className="text-gray-500">Potential Savings</span>
              <span className="text-green-600">{deal.dealStructure.potentialSavings}</span>
              
              <span className="text-gray-500">Risk Assessment</span>
              <span className="text-xs">{deal.dealStructure.riskAssessment}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t flex justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{deal.supplier}</span>
        </div>
        <Button variant="ghost" size="sm">
          View <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

const LiveDeals: React.FC = () => {
  const [activeTab, setActiveTab] = useState("new");
  
  const filteredDeals = deals.filter(deal => {
    if (activeTab === 'new') return deal.status === 'new';
    if (activeTab === 'in-negotiation') return deal.status === 'in-negotiation';
    if (activeTab === 'supplier-confirmed') return deal.status === 'supplier-confirmed';
    return true;
  });
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Live Deals</h1>
            <p className="text-gray-500">Manage and track your active procurement deals</p>
          </div>
          <Button className="self-start md:self-auto">
            <Plus className="mr-2 h-4 w-4" /> Create New Deal
          </Button>
        </div>

        <Tabs defaultValue="new" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start mb-4">
            <TabsTrigger value="new" className="flex gap-2 items-center">
              <Package className="h-4 w-4" /> New
            </TabsTrigger>
            <TabsTrigger value="in-negotiation" className="flex gap-2 items-center">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-handshake">
                <path d="M11 19H5.5a2.5 2.5 0 0 1 0-5H11" />
                <path d="M13 5h5.5a2.5 2.5 0 0 1 0 5H13" />
                <path d="M8 10h8" />
                <path d="m11 13 3-3" />
              </svg>
              In Negotiation
            </TabsTrigger>
            <TabsTrigger value="supplier-confirmed" className="flex gap-2 items-center">
              <CheckCircle className="h-4 w-4" /> Supplier Confirmed
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="new" className="space-y-4">
            {filteredDeals.length > 0 ? (
              filteredDeals.map(deal => (
                <DealCard key={deal.id} deal={deal} />
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Package className="h-8 w-8 text-gray-400 mb-4" />
                  <p className="text-lg font-medium">No new deals</p>
                  <p className="text-gray-500 text-center max-w-md mt-1">
                    Create a new deal to start the procurement process
                  </p>
                  <Button className="mt-4">
                    <Plus className="mr-2 h-4 w-4" /> Create New Deal
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="in-negotiation" className="space-y-4">
            {filteredDeals.length > 0 ? (
              filteredDeals.map(deal => (
                <DealCard key={deal.id} deal={deal} />
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-4">
                    <path d="M11 19H5.5a2.5 2.5 0 0 1 0-5H11" />
                    <path d="M13 5h5.5a2.5 2.5 0 0 1 0 5H13" />
                    <path d="M8 10h8" />
                    <path d="m11 13 3-3" />
                  </svg>
                  <p className="text-lg font-medium">No deals in negotiation</p>
                  <p className="text-gray-500 text-center max-w-md mt-1">
                    Deals will appear here once negotiation has begun
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="supplier-confirmed" className="space-y-4">
            {filteredDeals.length > 0 ? (
              filteredDeals.map(deal => (
                <DealCard key={deal.id} deal={deal} />
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <CheckCircle className="h-8 w-8 text-gray-400 mb-4" />
                  <p className="text-lg font-medium">No confirmed deals</p>
                  <p className="text-gray-500 text-center max-w-md mt-1">
                    Deals will appear here once they have been confirmed by suppliers
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default LiveDeals;

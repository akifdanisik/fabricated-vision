
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Plus, 
  Package, 
  CheckCircle, 
  ArrowRight, 
  Calendar, 
  Clock,
  Zap,
  Building2,
  DollarSign,
  BarChart2,
  LineChart,
  PieChart,
  AlertCircle,
  Trash2
} from 'lucide-react';

// Mock data for pharmaceutical deals
const deals = [
  {
    id: 'DEAL-2024-001',
    date: 'Mar 15, 2024',
    status: 'new',
    title: 'Pharmaceutical API - Paracetamol',
    quantity: '2,000 kg',
    budget: '$120,000 - $150,000',
    responses: 0,
    aiStrategy: {
      focusPoints: [
        'Price negotiation',
        'Quality compliance',
        'Delivery timeline',
        'Regulatory documentation'
      ],
      approach: 'Will negotiate based on regulatory compliance excellence and multi-year partnership potential',
      targetSavings: '8-12% below market average',
      timeframe: '14-21 days'
    },
    dealStructure: {
      totalValue: '$135,000',
      paymentStructure: '30% upfront, 70% on delivery',
      similarDealsAvg: '$147,500',
      potentialSavings: '~$12,500 (8.5%)',
      riskAssessment: 'Low - FDA-approved supplier with verified credentials',
      qualityVerification: [
        'Certificate of Analysis verification',
        'Manufacturing facility audit',
        'Compliance documentation review'
      ]
    },
    supplier: 'PharmaGlobal Solutions'
  },
  {
    id: 'DEAL-2024-002',
    date: 'Mar 10, 2024',
    status: 'in-negotiation',
    title: 'Laboratory Equipment - Chromatography Systems',
    quantity: '5 units',
    budget: '$350,000 - $400,000',
    responses: 3,
    aiStrategy: {
      focusPoints: [
        'Technical specifications',
        'Warranty terms',
        'Installation services',
        'Training support'
      ],
      approach: 'Leverage multi-unit purchase and ongoing service contract to secure competitive pricing',
      targetSavings: '6-9% below initial offers',
      timeframe: '21-28 days'
    },
    dealStructure: {
      totalValue: '$372,500',
      paymentStructure: '40% upfront, 60% on installation',
      similarDealsAvg: '$395,000',
      potentialSavings: '~$22,500 (5.7%)',
      riskAssessment: 'Medium - New equipment model with limited track record',
      qualityVerification: [
        'Technical specification validation',
        'On-site demonstration',
        'Regulatory compliance verification'
      ]
    },
    supplier: 'LabTech Precision'
  },
  {
    id: 'DEAL-2024-003',
    date: 'Mar 5, 2024',
    status: 'supplier-confirmed',
    title: 'Sterile Packaging Materials - Blister Packs',
    quantity: '500,000 units',
    budget: '$80,000 - $95,000',
    responses: 5,
    aiStrategy: {
      focusPoints: [
        'Sterility guarantees',
        'Material composition',
        'Delivery schedule',
        'Volume pricing'
      ],
      approach: 'Emphasize long-term supply needs and consistent ordering patterns',
      targetSavings: '7-10% below market rate',
      timeframe: 'Completed in 12 days'
    },
    dealStructure: {
      totalValue: '$82,500',
      paymentStructure: '50% upfront, 50% on delivery',
      similarDealsAvg: '$89,750',
      potentialSavings: '~$7,250 (8.1%)',
      riskAssessment: 'Low - Previously validated supplier',
      qualityVerification: [
        'Sterility testing completed',
        'Material safety documentation verified',
        'Production facility certification'
      ]
    },
    supplier: 'MediPack Industries'
  }
];

const DealCard = ({ deal }: { deal: typeof deals[0] }) => {
  return (
    <Card className="mb-4 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-0">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-sm font-medium text-gray-500">{deal.id} • {deal.date}</h4>
            </div>
            <CardTitle className="text-xl font-bold mt-2">{deal.title}</CardTitle>
          </div>
          <Badge 
            className={`px-3 py-1 rounded-full ${
              deal.status === 'new' ? 'bg-blue-100 text-blue-800 border-blue-200' : 
              deal.status === 'in-negotiation' ? 'bg-amber-100 text-amber-800 border-amber-200' : 
              'bg-green-100 text-green-800 border-green-200'
            }`}
          >
            {deal.status === 'new' ? 'New' : 
             deal.status === 'in-negotiation' ? 'In Negotiation' : 
             'Supplier Confirmed'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Quantity</p>
            <p className="font-medium">{deal.quantity}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Budget</p>
            <p className="font-medium">{deal.budget}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Responses</p>
            <div className="flex items-center">
              <svg viewBox="0 0 15 15" fill="none" className="h-4 w-4 text-blue-600 mr-1">
                <path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="currentColor"/>
              </svg>
              <span>{deal.responses}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="flex items-center mb-3">
            <Zap className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-blue-800">AI Negotiation Strategy</h3>
          </div>

          <div className="mb-3">
            <p className="text-sm text-gray-500 mb-2">Focus Points</p>
            <div className="flex flex-wrap gap-2">
              {deal.aiStrategy.focusPoints.map((point, index) => (
                <span key={index} className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm">
                  {point}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <p className="text-sm text-gray-500 mb-1">Approach</p>
            <p className="text-sm">{deal.aiStrategy.approach}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Target Savings</p>
              <div className="flex items-center">
                <BarChart2 className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-blue-700">{deal.aiStrategy.targetSavings}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Estimated Timeframe</p>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-blue-600 mr-2" />
                <span>{deal.aiStrategy.timeframe}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-3">
            <Building2 className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-blue-800">Deal Structure</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Value</p>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-blue-600 mr-1" />
                <span className="font-semibold">{deal.dealStructure.totalValue}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Payment Structure</p>
              <div className="flex items-center">
                <PieChart className="h-4 w-4 text-blue-600 mr-2" />
                <span>{deal.dealStructure.paymentStructure}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Similar Deals Avg.</p>
              <div className="flex items-center">
                <LineChart className="h-4 w-4 text-blue-600 mr-2" />
                <span>{deal.dealStructure.similarDealsAvg}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Potential Savings</p>
              <div className="flex items-center">
                <span className="text-green-600 font-medium">{deal.dealStructure.potentialSavings}</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Risk Assessment</p>
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-blue-600 mr-2" />
              <span>{deal.dealStructure.riskAssessment}</span>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Quality Verification</p>
            <div className="space-y-1">
              {deal.dealStructure.qualityVerification.map((item, index) => (
                <div key={index} className="flex items-start">
                  <Checkbox id={`check-${deal.id}-${index}`} className="mt-0.5 mr-2" defaultChecked />
                  <label htmlFor={`check-${deal.id}-${index}`} className="text-sm">{item}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t flex justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {deal.supplier.charAt(0)}
          </div>
          <span className="font-medium">{deal.supplier}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            View
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
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
          <TabsList className="w-full justify-start mb-4 bg-gray-100 rounded-full">
            <TabsTrigger value="new" className="flex gap-2 items-center rounded-full">
              <Package className="h-4 w-4" /> New
            </TabsTrigger>
            <TabsTrigger value="in-negotiation" className="flex gap-2 items-center rounded-full">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-handshake">
                <path d="M11 19H5.5a2.5 2.5 0 0 1 0-5H11" />
                <path d="M13 5h5.5a2.5 2.5 0 0 1 0 5H13" />
                <path d="M8 10h8" />
                <path d="m11 13 3-3" />
              </svg>
              In Negotiation
            </TabsTrigger>
            <TabsTrigger value="supplier-confirmed" className="flex gap-2 items-center rounded-full">
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

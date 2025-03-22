
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  CalendarClock, 
  Check, 
  CheckCircle, 
  ClipboardCheck, 
  Clock, 
  Download, 
  FileText, 
  Pen, 
  ShieldCheck, 
  Truck 
} from 'lucide-react';
import { toast } from 'sonner';

// Define contract types
type ContractStatus = 'active' | 'expired' | 'pending renewal';

interface Contract {
  id: string;
  supplierName: string;
  materialName: string;
  startDate: string;
  endDate: string;
  status: ContractStatus;
  value: number;
  termsLink: string;
  complianceStatus: 'complete' | 'incomplete' | 'pending';
}

interface ContractDetailsProps {
  contract: Contract;
  onBack: () => void;
}

const ContractDetails = ({ contract, onBack }: ContractDetailsProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadgeColor = (status: ContractStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending renewal':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: ContractStatus) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 mr-2" />;
      case 'expired':
        return <AlertTriangle className="w-4 h-4 mr-2" />;
      case 'pending renewal':
        return <Clock className="w-4 h-4 mr-2" />;
      default:
        return null;
    }
  };

  // Calculate days until expiration
  const getDaysUntilExpiration = () => {
    const end = new Date(contract.endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleRenew = () => {
    toast.success("Renewal request initiated for " + contract.materialName);
  };

  const handleEdit = () => {
    toast.info("Editing contract " + contract.id);
  };

  const handleDownload = () => {
    toast.info("Downloading contract...");
  };

  // Sample contract terms
  const contractTerms = [
    { title: "Pricing", value: `$${(contract.value / 12).toFixed(2)} per month` },
    { title: "Payment Terms", value: "Net 30 days" },
    { title: "Delivery Schedule", value: "Bi-weekly" },
    { title: "Minimum Order", value: "100 kg" },
    { title: "Quality Standards", value: "USP/NF, EP" },
    { title: "Penalties", value: "2% per week for late delivery" },
  ];

  // Sample compliance documents
  const complianceDocuments = [
    { name: "GMP Certificate", status: "Verified", date: "2023-02-15" },
    { name: "Certificate of Analysis", status: "Verified", date: "2023-03-20" },
    { name: "Drug Master File", status: contract.complianceStatus === "complete" ? "Verified" : "Pending", date: "2023-01-10" },
    { name: "Quality Agreement", status: contract.complianceStatus === "complete" ? "Verified" : "Missing", date: "-" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{contract.materialName}</h2>
          <p className="text-gray-500">Contract with {contract.supplierName}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEdit}>
            <Pen className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          {contract.status === 'pending renewal' && (
            <Button onClick={handleRenew}>
              <Clock className="mr-2 h-4 w-4" />
              Renew Contract
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="terms">Terms</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Contract Overview</CardTitle>
              <CardDescription>Essential details about this contract</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Contract ID</h3>
                    <p className="text-base">{contract.id}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Supplier</h3>
                    <p className="text-base">{contract.supplierName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Material</h3>
                    <p className="text-base">{contract.materialName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Contract Value</h3>
                    <p className="text-base">${contract.value.toLocaleString()}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Start Date</h3>
                    <p className="text-base">{formatDate(contract.startDate)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">End Date</h3>
                    <p className="text-base">{formatDate(contract.endDate)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                    <div className={`inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeColor(contract.status)}`}>
                      {getStatusIcon(contract.status)}
                      {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Duration</h3>
                    <p className="text-base">12 months</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {contract.status === 'active' && (
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <CalendarClock className="h-5 w-5 mr-2 text-amber-500" />
                  <CardTitle className="text-amber-700">Expiration Alert</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700">
                  This contract will expire in {getDaysUntilExpiration()} days. Consider initiating renewal process.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="text-amber-700 border-amber-300 hover:bg-amber-100" onClick={handleRenew}>
                  <Clock className="mr-2 h-4 w-4" />
                  Initiate Renewal
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="terms" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Key Terms & Conditions</CardTitle>
              <CardDescription>Important terms agreed upon in this contract</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contractTerms.map((term, index) => (
                  <div key={index} className="flex justify-between border-b pb-2 last:border-0">
                    <span className="font-medium">{term.title}</span>
                    <span>{term.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleDownload}>
                <FileText className="mr-2 h-4 w-4" />
                View Full Contract
              </Button>
              <Button variant="outline" onClick={handleEdit}>
                <Pen className="mr-2 h-4 w-4" />
                Negotiate Terms
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Delivery Information</CardTitle>
              <CardDescription>Delivery schedule and logistics details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Delivery Schedule</h3>
                    <p className="text-base">Bi-weekly deliveries</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Transportation</h3>
                    <p className="text-base">Supplier responsibility</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Lead Time</h3>
                    <p className="text-base">10 business days</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Incoterms</h3>
                    <p className="text-base">DDP (Delivered Duty Paid)</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">
                <Truck className="mr-2 h-4 w-4" />
                View Delivery Schedule
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Compliance Documents</CardTitle>
              <CardDescription>Required certificates and regulatory documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {complianceDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{doc.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">{doc.date !== "-" ? formatDate(doc.date) : "-"}</span>
                      {doc.status === "Verified" ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">
                          <Check className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      ) : doc.status === "Pending" ? (
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800 border-red-200 hover:bg-red-100">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Missing
                        </Badge>
                      )}
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <ClipboardCheck className="h-4 w-4 mr-2" />
                Last compliance check: {formatDate("2023-06-01")}
              </div>
              <Button>
                <ShieldCheck className="mr-2 h-4 w-4" />
                Run Compliance Check
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContractDetails;

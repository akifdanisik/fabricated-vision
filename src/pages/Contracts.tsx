
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  CalendarIcon, 
  ChevronDown, 
  FileText, 
  Filter, 
  Plus, 
  Search, 
  AlarmClock, 
  ClipboardCheck, 
  FileInput,
  Download,
  ArrowUpDown,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import ContractDetails from '@/components/contracts/ContractDetails';
import ContractCreation from '@/components/contracts/ContractCreation';
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

const Contracts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [view, setView] = useState<'list' | 'details' | 'create'>('list');
  
  // Sample contract data
  const contracts: Contract[] = [
    {
      id: "1",
      supplierName: "PharmaCorp",
      materialName: "Paracetamol API",
      startDate: "2023-01-15",
      endDate: "2024-01-14",
      status: "active",
      value: 250000,
      termsLink: "#terms1",
      complianceStatus: "complete"
    },
    {
      id: "2",
      supplierName: "BioTech Materials",
      materialName: "Microcrystalline Cellulose",
      startDate: "2022-06-01",
      endDate: "2023-12-31",
      status: "pending renewal",
      value: 180000,
      termsLink: "#terms2",
      complianceStatus: "complete"
    },
    {
      id: "3",
      supplierName: "ChemSource",
      materialName: "Sodium Stearyl Fumarate",
      startDate: "2022-03-10",
      endDate: "2023-03-09",
      status: "expired",
      value: 75000,
      termsLink: "#terms3",
      complianceStatus: "incomplete"
    },
    {
      id: "4",
      supplierName: "GlobalPack Solutions",
      materialName: "Blister Packaging Materials",
      startDate: "2023-04-20",
      endDate: "2024-04-19",
      status: "active",
      value: 120000,
      termsLink: "#terms4",
      complianceStatus: "complete"
    },
    {
      id: "5",
      supplierName: "MedSource Inc.",
      materialName: "API-36B",
      startDate: "2023-02-01",
      endDate: "2024-01-31",
      status: "pending renewal",
      value: 320000,
      termsLink: "#terms5",
      complianceStatus: "pending"
    }
  ];

  // Filter contracts based on search query and status filter
  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = 
      contract.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.materialName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleContractSelect = (contract: Contract) => {
    setSelectedContract(contract);
    setView('details');
  };

  const handleCreateContract = () => {
    setSelectedContract(null);
    setView('create');
  };

  const handleBackToList = () => {
    setView('list');
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate days until expiration
  const getDaysUntilExpiration = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Handle contract form submission (dummy function)
  const handleContractSubmit = () => {
    toast.success("Contract created successfully!");
    setView('list');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Contract Management</CardTitle>
                <CardDescription>
                  Manage contracts with suppliers and track key terms.
                </CardDescription>
              </div>
              {view === 'list' && (
                <Button onClick={handleCreateContract}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Contract
                </Button>
              )}
              {(view === 'details' || view === 'create') && (
                <Button variant="outline" onClick={handleBackToList}>
                  Back to List
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {view === 'list' && (
              <>
                <div className="flex items-center mb-6 gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search contracts..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger className="w-[180px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                      <SelectItem value="pending renewal">Pending Renewal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">
                          <div className="flex items-center space-x-1">
                            <span>Supplier</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center space-x-1">
                            <span>Material</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center space-x-1">
                            <span>Start Date</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center space-x-1">
                            <span>End Date</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContracts.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                            No contracts found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredContracts.map((contract) => (
                          <TableRow key={contract.id} onClick={() => handleContractSelect(contract)} className="cursor-pointer hover:bg-gray-50">
                            <TableCell className="font-medium">{contract.supplierName}</TableCell>
                            <TableCell>{contract.materialName}</TableCell>
                            <TableCell>{formatDate(contract.startDate)}</TableCell>
                            <TableCell>{formatDate(contract.endDate)}</TableCell>
                            <TableCell>
                              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeColor(contract.status)}`}>
                                {getStatusIcon(contract.status)}
                                {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                              </div>
                            </TableCell>
                            <TableCell>${contract.value.toLocaleString()}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(contract.termsLink, '_blank')
                                  }}
                                >
                                  <span className="sr-only">View terms</span>
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toast.info("Downloading contract...");
                                  }}
                                >
                                  <span className="sr-only">Download</span>
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}

            {view === 'details' && selectedContract && (
              <ContractDetails contract={selectedContract} onBack={handleBackToList} />
            )}

            {view === 'create' && (
              <ContractCreation onSubmit={handleContractSubmit} onCancel={handleBackToList} />
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Contracts;

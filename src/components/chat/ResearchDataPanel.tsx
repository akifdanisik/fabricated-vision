
import { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, ChevronDown, ChevronUp, Calendar, ExternalLink, File, Package, Users, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Supplier } from '@/components/suppliers/SuppliersTable';

export interface ResearchDocument {
  id: string;
  title: string;
  date: string;
  documentType: string;
  risks?: string;
  considerations?: string;
}

interface ResearchDataPanelProps {
  isVisible: boolean;
  documents: ResearchDocument[];
  suppliers?: Supplier[];
  onClose: () => void;
  isLoading?: boolean;
  title?: string;
}

const documentTypeColors: Record<string, string> = {
  'Financials': 'bg-purple-100 text-purple-800',
  'Marketing Materials': 'bg-purple-100 text-purple-800',
  'Product': 'bg-red-100 text-red-800',
  'Customer': 'bg-amber-100 text-amber-800',
  'Public Report': 'bg-green-100 text-green-800',
};

export default function ResearchDataPanel({ 
  isVisible, 
  documents, 
  suppliers = [],
  onClose,
  isLoading = false,
  title = "Research Data" 
}: ResearchDataPanelProps) {
  const [expanded, setExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('documents');

  if (!isVisible) return null;

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };
  
  const getRiskBadge = (risk: Supplier['riskLevel']) => {
    switch (risk) {
      case 'low':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Low Risk</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Medium Risk</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High Risk</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white transition-all duration-300 ease-in-out">
      <div className="px-4 py-2 flex items-center justify-between border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-gray-500" />
          <h3 className="text-sm font-medium">{title}</h3>
          <div className="flex items-center gap-1 ml-2">
            <Badge variant="outline" className="text-xs bg-gray-100">
              {documents.length} documents
            </Badge>
            <Badge variant="outline" className="text-xs bg-gray-100">
              {suppliers.length} suppliers
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setExpanded(!expanded)} 
            className="h-7 w-7 p-0 rounded-full"
          >
            {expanded ? 
              <ChevronDown className="h-4 w-4 text-gray-500" /> : 
              <ChevronUp className="h-4 w-4 text-gray-500" />
            }
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose} 
            className="h-7 w-7 p-0 rounded-full"
          >
            <span className="sr-only">Close</span>
            <span aria-hidden="true" className="text-gray-500">×</span>
          </Button>
        </div>
      </div>
      
      {expanded && (
        <div className="p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="documents" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>Documents</span>
                <Badge variant="outline" className="ml-1 text-xs bg-gray-100">
                  {documents.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="suppliers" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Suppliers</span>
                <Badge variant="outline" className="ml-1 text-xs bg-gray-100">
                  {suppliers.length}
                </Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="documents" className="mt-0">
              <div className="overflow-auto max-h-[300px]">
                {isLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="h-8 w-8 bg-gray-200 rounded-full mb-2"></div>
                      <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 w-24 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                ) : documents.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Document</TableHead>
                        <TableHead className="w-[120px]">Date</TableHead>
                        <TableHead className="w-[150px]">Document Type</TableHead>
                        <TableHead>Investment Risks</TableHead>
                        <TableHead>Market Considerations</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documents.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium flex items-center gap-2">
                            <File className={cn("h-4 w-4", 
                              doc.title.toLowerCase().endsWith('.pdf') ? "text-red-400" : "text-gray-400"
                            )} />
                            {doc.title}
                          </TableCell>
                          <TableCell className="text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {doc.date}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={cn("font-normal", documentTypeColors[doc.documentType] || "bg-gray-100")}>
                              {doc.documentType}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">
                            {doc.risks || 'Not in document, click to view explanation'}
                          </TableCell>
                          <TableCell className="text-sm">
                            {doc.considerations || 'Not in document, click to view explanation'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No research data available yet. Ask a question that requires research.
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="suppliers" className="mt-0">
              <div className="overflow-auto max-h-[300px]">
                {suppliers.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[180px]">Supplier</TableHead>
                        <TableHead className="w-[120px]">Category</TableHead>
                        <TableHead className="w-[150px]">Performance</TableHead>
                        <TableHead className="w-[100px]">Risk Level</TableHead>
                        <TableHead className="w-[80px]">Items</TableHead>
                        <TableHead className="w-[180px]">Contact</TableHead>
                        <TableHead className="w-[120px]">Location</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {suppliers.map(supplier => (
                        <TableRow key={supplier.id} className="h-[65px]">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={supplier.logo} alt={supplier.name} />
                                <AvatarFallback>{supplier.initials}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{supplier.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {supplier.categories ? (
                              <div className="flex flex-wrap gap-1">
                                {supplier.categories.map(category => (
                                  <Badge key={category.id} className={`bg-${category.color}-100 text-${category.color}-800 border-${category.color}-200`}>
                                    {category.name}
                                  </Badge>
                                ))}
                              </div>
                            ) : (
                              <Badge>{supplier.category}</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="w-32 space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Star className="mr-1 h-3 w-3 fill-amber-400 text-amber-400" />
                                  <span className="text-sm">{supplier.performance}</span>
                                </div>
                                <span className="text-xs text-muted-foreground">/ 100</span>
                              </div>
                              <Progress value={supplier.performance} className="h-1.5" indicatorClassName={getPerformanceColor(supplier.performance)} />
                            </div>
                          </TableCell>
                          <TableCell>{getRiskBadge(supplier.riskLevel)}</TableCell>
                          <TableCell>{supplier.items}</TableCell>
                          <TableCell className="max-w-[140px]">
                            <div className="space-y-1 truncate">
                              <p className="text-sm font-medium truncate">{supplier.contact.name}</p>
                              <p className="text-xs text-muted-foreground truncate">{supplier.contact.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>{supplier.location}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No supplier data available.
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}

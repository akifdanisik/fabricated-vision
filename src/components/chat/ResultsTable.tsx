
import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ChevronUp, ChevronDown, ExternalLink, FileText, Check, AlertTriangle, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Supplier } from '@/components/suppliers/SuppliersTable';
import CategoryBadge from '@/components/categories/CategoryBadge';
import { cn } from '@/lib/utils';
import { SupplierIntelligenceData } from '@/components/suppliers/SupplierIntelligenceTable';

interface ResultsTableProps {
  isVisible: boolean;
  suppliers?: Supplier[];
  supplierIntelligence?: SupplierIntelligenceData[];
  onClose: () => void;
  title?: string;
  mode?: 'standard' | 'intelligence';
}

export default function ResultsTable({ 
  isVisible, 
  suppliers = [], 
  supplierIntelligence = [],
  onClose,
  title = "Top Suppliers",
  mode = 'standard'
}: ResultsTableProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

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

  const getEmaGmpStatusIcon = (status: SupplierIntelligenceData['safety']['emaGmpStatus']) => {
    switch (status) {
      case 'Valid':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'Pending':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'Suspended':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getPriceTrendIcon = (trend: SupplierIntelligenceData['affordability']['priceTrend']) => {
    switch (trend) {
      case 'up':
        return <span className="text-red-500">↑</span>;
      case 'down':
        return <span className="text-green-500">↓</span>;
      case 'stable':
        return <span className="text-gray-500">→</span>;
      default:
        return null;
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white">
      <div className="px-4 py-2 flex items-center justify-between border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">{title}</h3>
          <Badge variant="outline" className="ml-2 text-xs bg-gray-100">
            {mode === 'intelligence' ? supplierIntelligence.length : suppliers.length} suppliers
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className="h-7 w-7 p-0 rounded-full"
          >
            {isCollapsed ? 
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
      
      {!isCollapsed && (
        <div className="overflow-auto max-h-[300px]">
          {mode === 'standard' && suppliers.length > 0 && (
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
                {suppliers.map((supplier) => (
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
                          {supplier.categories.map((category) => (
                            <CategoryBadge key={category.id} category={category} />
                          ))}
                        </div>
                      ) : (
                        <CategoryBadge category={supplier.category} />
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
                        <Progress 
                          value={supplier.performance} 
                          className="h-1.5"
                          indicatorClassName={getPerformanceColor(supplier.performance)}
                        />
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
          )}

          {mode === 'intelligence' && supplierIntelligence.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier Name</TableHead>
                  <TableHead>FDA 483s (3Y)</TableHead>
                  <TableHead>EMA GMP Status</TableHead>
                  <TableHead>Price/Unit</TableHead>
                  <TableHead>On-Time Delivery</TableHead>
                  <TableHead>Financial Health</TableHead>
                  <TableHead>Documents</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {supplierIntelligence.map((supplier) => (
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
                      <span className={supplier.safety.fda483Count > 0 ? 'text-red-600 font-medium' : ''}>
                        {supplier.safety.fda483Count}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getEmaGmpStatusIcon(supplier.safety.emaGmpStatus)}
                        <span>{supplier.safety.emaGmpStatus}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>${supplier.affordability.pricePerUnit.toFixed(2)}</span>
                        {getPriceTrendIcon(supplier.affordability.priceTrend)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="w-32 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{supplier.reliability.onTimeDelivery}%</span>
                        </div>
                        <Progress 
                          value={supplier.reliability.onTimeDelivery} 
                          className="h-1.5"
                          indicatorClassName={
                            supplier.reliability.onTimeDelivery >= 90 ? 'bg-green-500' :
                            supplier.reliability.onTimeDelivery >= 75 ? 'bg-amber-500' :
                            'bg-red-500'
                          }
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "px-2 py-1",
                        supplier.reliability.financialHealth.startsWith('A') ? "bg-green-50 text-green-700 border-green-200" :
                        supplier.reliability.financialHealth.startsWith('B') ? "bg-amber-50 text-amber-700 border-amber-200" :
                        "bg-red-50 text-red-700 border-red-200"
                      )}>
                        {supplier.reliability.financialHealth}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {supplier.documents.fdaEir && (
                          <Button variant="ghost" size="icon" className="h-8 w-8" title="FDA EIR">
                            <FileText className="h-4 w-4" />
                          </Button>
                        )}
                        {supplier.documents.emaGmp && (
                          <Button variant="ghost" size="icon" className="h-8 w-8" title="EMA GMP Certificate">
                            <FileText className="h-4 w-4" />
                          </Button>
                        )}
                        {supplier.documents.qualityAgreement && (
                          <Button variant="ghost" size="icon" className="h-8 w-8" title="Quality Agreement">
                            <FileText className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {((mode === 'standard' && suppliers.length === 0) || 
            (mode === 'intelligence' && supplierIntelligence.length === 0)) && (
            <div className="text-center py-8 text-gray-500">
              No supplier data available.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

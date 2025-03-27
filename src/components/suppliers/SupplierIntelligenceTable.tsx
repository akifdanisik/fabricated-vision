
import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowDownUp,
  Check,
  ChevronDown, 
  Download, 
  FileText,
  Filter, 
  MoreHorizontal, 
  Plus, 
  RefreshCw, 
  Search, 
  AlertTriangle,
  X
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export interface SupplierIntelligenceData {
  id: string;
  name: string;
  logo?: string;
  initials: string;
  safety: {
    fda483Count: number;
    emaGmpStatus: 'Valid' | 'Pending' | 'Suspended';
    whoPrequalification: boolean;
    recallHistory: number;
  };
  affordability: {
    pricePerUnit: number;
    priceTrend: 'up' | 'down' | 'stable';
    paymentTerms: string;
  };
  reliability: {
    onTimeDelivery: number;
    financialHealth: 'AAA' | 'AA' | 'A' | 'BBB' | 'BB' | 'B' | 'CCC' | 'CC' | 'C';
    productionCapacity: 'High' | 'Medium' | 'Low';
  };
  documents: {
    fdaEir?: string;
    emaGmp?: string;
    qualityAgreement?: string;
  };
}

interface SupplierIntelligenceTableProps {
  suppliers: SupplierIntelligenceData[];
  className?: string;
  onSelectSupplier?: (supplier: SupplierIntelligenceData) => void;
}

export default function SupplierIntelligenceTable({ 
  suppliers = [], 
  className,
  onSelectSupplier
}: SupplierIntelligenceTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortColumn(null);
        setSortDirection(null);
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    // Basic search implementation - could be enhanced with NLP later
    const searchText = searchQuery.toLowerCase();
    return (
      supplier.name.toLowerCase().includes(searchText) ||
      supplier.affordability.paymentTerms.toLowerCase().includes(searchText) ||
      supplier.reliability.financialHealth.toLowerCase().includes(searchText)
    );
  });

  const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
    if (!sortColumn || !sortDirection) return 0;
    
    let valueA, valueB;
    
    // Extract comparison values based on sortColumn
    switch (sortColumn) {
      case 'name':
        valueA = a.name;
        valueB = b.name;
        break;
      case 'fda483':
        valueA = a.safety.fda483Count;
        valueB = b.safety.fda483Count;
        break;
      case 'emaGmp':
        // Convert status to numeric value for sorting
        valueA = a.safety.emaGmpStatus === 'Valid' ? 2 : (a.safety.emaGmpStatus === 'Pending' ? 1 : 0);
        valueB = b.safety.emaGmpStatus === 'Valid' ? 2 : (b.safety.emaGmpStatus === 'Pending' ? 1 : 0);
        break;
      case 'price':
        valueA = a.affordability.pricePerUnit;
        valueB = b.affordability.pricePerUnit;
        break;
      case 'delivery':
        valueA = a.reliability.onTimeDelivery;
        valueB = b.reliability.onTimeDelivery;
        break;
      case 'financial':
        // Convert letter ratings to numeric scores
        const scoreMap: Record<string, number> = {
          'AAA': 9, 'AA': 8, 'A': 7, 'BBB': 6, 'BB': 5, 'B': 4, 'CCC': 3, 'CC': 2, 'C': 1
        };
        valueA = scoreMap[a.reliability.financialHealth] || 0;
        valueB = scoreMap[b.reliability.financialHealth] || 0;
        break;
      default:
        return 0;
    }
    
    // Perform the comparison
    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

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

  const getFinancialHealthColor = (health: SupplierIntelligenceData['reliability']['financialHealth']) => {
    const firstChar = health.charAt(0);
    if (firstChar === 'A') return 'bg-green-500';
    if (firstChar === 'B') return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search suppliers or 'Show me suppliers with no FDA warnings'..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-1">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          
          <Button variant="outline" size="sm" className="h-9 gap-1">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
          
          <Button variant="outline" size="sm" className="h-9 gap-1">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>
      
      <div className="rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                sortable 
                sortDirection={sortColumn === 'name' ? sortDirection : null}
                onClick={() => handleSort('name')}
              >
                Supplier Name
              </TableHead>
              <TableHead 
                sortable 
                sortDirection={sortColumn === 'fda483' ? sortDirection : null}
                onClick={() => handleSort('fda483')}
              >
                FDA 483s (3Y)
              </TableHead>
              <TableHead 
                sortable 
                sortDirection={sortColumn === 'emaGmp' ? sortDirection : null}
                onClick={() => handleSort('emaGmp')}
              >
                EMA GMP Status
              </TableHead>
              <TableHead 
                sortable 
                sortDirection={sortColumn === 'price' ? sortDirection : null}
                onClick={() => handleSort('price')}
              >
                Price/Unit
              </TableHead>
              <TableHead 
                sortable 
                sortDirection={sortColumn === 'delivery' ? sortDirection : null}
                onClick={() => handleSort('delivery')}
              >
                On-Time Delivery
              </TableHead>
              <TableHead 
                sortable 
                sortDirection={sortColumn === 'financial' ? sortDirection : null}
                onClick={() => handleSort('financial')}
              >
                Financial Health
              </TableHead>
              <TableHead>Documents</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedSuppliers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center">
                  No suppliers found matching your criteria.
                </TableCell>
              </TableRow>
            ) : (
              sortedSuppliers.map((supplier) => (
                <TableRow 
                  key={supplier.id} 
                  className="group h-[65px]"
                  isClickable={!!onSelectSupplier}
                  onClick={() => onSelectSupplier && onSelectSupplier(supplier)}
                >
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
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

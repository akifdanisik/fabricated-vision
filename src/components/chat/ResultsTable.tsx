
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
import { Star, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Supplier } from '@/components/suppliers/SuppliersTable';
import CategoryBadge from '@/components/categories/CategoryBadge';
import { cn } from '@/lib/utils';

interface ResultsTableProps {
  isVisible: boolean;
  suppliers?: Supplier[];
  onClose: () => void;
  title?: string;
}

export default function ResultsTable({ 
  isVisible, 
  suppliers = [], 
  onClose,
  title = "Top Suppliers"
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

  return (
    <div className="border-t border-gray-200 bg-white">
      <div className="px-4 py-2 flex items-center justify-between border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">{title}</h3>
          <Badge variant="outline" className="ml-2 text-xs bg-gray-100">
            {suppliers.length} suppliers
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
          ) : (
            <div className="text-center py-8 text-gray-500">
              No supplier data available.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

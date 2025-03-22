
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
  ChevronDown, 
  Download, 
  Filter, 
  MoreHorizontal, 
  Plus, 
  RefreshCw, 
  Search, 
  Star,
  FileText,
  UserCheck 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface Supplier {
  id: string;
  name: string;
  category: string;
  performance: number;
  riskLevel: 'low' | 'medium' | 'high';
  items: number;
  contact: {
    name: string;
    email: string;
    phone?: string;
  };
  location: string;
  logo?: string;
  initials: string;
}

interface SuppliersTableProps {
  suppliers: Supplier[];
  className?: string;
  onSelectSupplier?: (supplier: Supplier) => void;
}

export default function SuppliersTable({ 
  suppliers, 
  className,
  onSelectSupplier 
}: SuppliersTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = 
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === '' || supplier.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  const categories = Array.from(new Set(suppliers.map(s => s.category)));
  
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
  
  const getPerformanceColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search suppliers..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" className="h-9 gap-1">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
          
          <Button variant="outline" size="sm" className="h-9 gap-1">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          
          <Button size="sm" className="h-9 gap-1">
            <Plus className="h-4 w-4" />
            <span>Add Supplier</span>
          </Button>
        </div>
      </div>
      
      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Supplier</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="w-14"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuppliers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-32 text-center">
                  No suppliers found.
                </TableCell>
              </TableRow>
            ) : (
              filteredSuppliers.map((supplier) => (
                <TableRow 
                  key={supplier.id} 
                  className="group h-[65px] cursor-pointer hover:bg-gray-50"
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
                  <TableCell>{supplier.category}</TableCell>
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
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onSelectSupplier && onSelectSupplier(supplier)}>
                          <UserCheck className="mr-2 h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          View Compliance Docs
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

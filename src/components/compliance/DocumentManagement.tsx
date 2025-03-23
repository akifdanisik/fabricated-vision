import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  FileCheck,
  FileWarning,
  FileX,
  Download,
  Upload,
  Eye,
  RefreshCw,
  FileText,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Category } from '@/components/categories/CategoryBadge';

// Document types
type DocumentStatus = 'valid' | 'expiring' | 'expired';
type DocumentType = 'gmp' | 'coa' | 'msds' | 'qa' | 'audit';

interface Document {
  id: string;
  name: string;
  type: DocumentType;
  supplier: string;
  dateUploaded: string;
  expiryDate: string;
  status: DocumentStatus;
  verificationStatus: 'verified' | 'pending' | 'failed';
}

// Component props
interface DocumentManagementProps {
  selectedCategories?: Category[];
}

// Component
const DocumentManagement = ({ selectedCategories = [] }: DocumentManagementProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Sample documents data
  const documents: Document[] = [
    {
      id: "doc1",
      name: "PharmaCorp GMP Certificate",
      type: "gmp",
      supplier: "PharmaCorp",
      dateUploaded: "2023-03-15",
      expiryDate: "2024-03-14",
      status: "valid",
      verificationStatus: "verified"
    },
    {
      id: "doc2",
      name: "BioTech Materials CoA - Batch 23A789",
      type: "coa",
      supplier: "BioTech Materials",
      dateUploaded: "2023-06-22",
      expiryDate: "2023-12-22",
      status: "expiring",
      verificationStatus: "verified"
    },
    {
      id: "doc3",
      name: "ChemSource MSDS - Sodium Stearyl Fumarate",
      type: "msds",
      supplier: "ChemSource",
      dateUploaded: "2022-05-10",
      expiryDate: "2024-05-09",
      status: "valid",
      verificationStatus: "verified"
    },
    {
      id: "doc4",
      name: "GlobalPack Quality Agreement",
      type: "qa",
      supplier: "GlobalPack Solutions",
      dateUploaded: "2023-08-04",
      expiryDate: "2023-10-15",
      status: "expired",
      verificationStatus: "failed"
    },
    {
      id: "doc5",
      name: "MedSource Annual Audit Report",
      type: "audit",
      supplier: "MedSource Inc.",
      dateUploaded: "2023-01-30",
      expiryDate: "2024-01-29",
      status: "valid",
      verificationStatus: "verified"
    },
    {
      id: "doc6",
      name: "PharmaCorp CoA - Paracetamol API Batch 45P78",
      type: "coa",
      supplier: "PharmaCorp",
      dateUploaded: "2023-09-12",
      expiryDate: "2024-09-11",
      status: "valid",
      verificationStatus: "pending"
    },
    {
      id: "doc7",
      name: "BioTech Materials MSDS - Microcrystalline Cellulose",
      type: "msds",
      supplier: "BioTech Materials",
      dateUploaded: "2023-04-05",
      expiryDate: "2025-04-04",
      status: "valid",
      verificationStatus: "verified"
    },
    {
      id: "doc8",
      name: "ChemSource GMP Compliance Certification",
      type: "gmp",
      supplier: "ChemSource",
      dateUploaded: "2022-11-18",
      expiryDate: "2023-11-17",
      status: "expiring",
      verificationStatus: "verified"
    }
  ];

  // Filter documents based on search query and filters
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get status badge color
  const getStatusColor = (status: DocumentStatus) => {
    switch (status) {
      case 'valid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'expiring':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get verification badge color
  const getVerificationColor = (status: Document['verificationStatus']) => {
    switch (status) {
      case 'verified':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get document type icon
  const getDocumentTypeIcon = (type: DocumentType) => {
    switch (type) {
      case 'gmp':
        return <FileCheck className="h-4 w-4 text-blue-500" />;
      case 'coa':
        return <FileText className="h-4 w-4 text-green-500" />;
      case 'msds':
        return <FileWarning className="h-4 w-4 text-amber-500" />;
      case 'qa':
        return <FileCheck className="h-4 w-4 text-purple-500" />;
      case 'audit':
        return <FileText className="h-4 w-4 text-indigo-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  // Get document type name
  const getDocumentTypeName = (type: DocumentType) => {
    switch (type) {
      case 'gmp':
        return 'GMP Certificate';
      case 'coa':
        return 'Certificate of Analysis';
      case 'msds':
        return 'Material Safety Data Sheet';
      case 'qa':
        return 'Quality Agreement';
      case 'audit':
        return 'Audit Report';
      default:
        return 'Document';
    }
  };

  // Get status icon
  const getStatusIcon = (status: DocumentStatus) => {
    switch (status) {
      case 'valid':
        return <FileCheck className="w-4 h-4 mr-1" />;
      case 'expiring':
        return <Calendar className="w-4 h-4 mr-1" />;
      case 'expired':
        return <FileX className="w-4 h-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Document Management</CardTitle>
        <CardDescription>
          Centralized repository for all compliance and regulatory documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6 flex-col md:flex-row gap-4">
          <div className="flex gap-4 w-full md:w-auto flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={typeFilter}
              onValueChange={setTypeFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Document Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="gmp">GMP Certificate</SelectItem>
                <SelectItem value="coa">Certificate of Analysis</SelectItem>
                <SelectItem value="msds">Safety Data Sheet</SelectItem>
                <SelectItem value="qa">Quality Agreement</SelectItem>
                <SelectItem value="audit">Audit Report</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="valid">Valid</SelectItem>
                <SelectItem value="expiring">Expiring Soon</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button className="w-full md:w-auto">
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
            <Button variant="outline" className="w-full md:w-auto">
              <RefreshCw className="mr-2 h-4 w-4" />
              Verify All
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[350px]">Document</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verification</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No documents found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {getDocumentTypeIcon(doc.type)}
                        <span className="line-clamp-1 flex-1">{doc.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {getDocumentTypeName(doc.type)}
                      </span>
                    </TableCell>
                    <TableCell>{doc.supplier}</TableCell>
                    <TableCell>{formatDate(doc.dateUploaded)}</TableCell>
                    <TableCell>{formatDate(doc.expiryDate)}</TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(doc.status)}`}>
                        {getStatusIcon(doc.status)}
                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getVerificationColor(doc.verificationStatus)}`}>
                        {doc.verificationStatus.charAt(0).toUpperCase() + doc.verificationStatus.slice(1)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">View</span>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
      </CardContent>
    </Card>
  );
};

export default DocumentManagement;

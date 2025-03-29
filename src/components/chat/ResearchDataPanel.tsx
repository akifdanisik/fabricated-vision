
import { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, ChevronDown, ChevronUp, Calendar, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
  onClose: () => void;
  isLoading?: boolean;
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
  onClose,
  isLoading = false 
}: ResearchDataPanelProps) {
  const [expanded, setExpanded] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="border-t border-gray-200 bg-white transition-all duration-300 ease-in-out">
      <div className="px-4 py-2 flex items-center justify-between border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-gray-500" />
          <h3 className="text-sm font-medium">Research Data</h3>
          <Badge variant="outline" className="ml-2 text-xs bg-gray-100">
            {documents.length} documents
          </Badge>
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
        <div className="p-4 overflow-auto max-h-[300px]">
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
                      <FileText className="h-4 w-4 text-gray-400" />
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
      )}
    </div>
  );
}

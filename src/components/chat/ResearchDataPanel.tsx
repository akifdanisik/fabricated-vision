
import { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, ChevronDown, ChevronUp, Calendar, GripVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

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
  const [draggingId, setDraggingId] = useState<string | null>(null);

  if (!isVisible) return null;

  const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, document: ResearchDocument) => {
    // Set the data to be dragged - serialize the document object
    e.dataTransfer.setData('text/plain', JSON.stringify({
      type: 'research_document',
      content: document
    }));
    e.dataTransfer.effectAllowed = 'copy';
    setDraggingId(document.id);
    
    toast({
      title: "Dragging document",
      description: "Drop in the action panel to create a new action"
    });
  };

  const handleDragEnd = () => {
    setDraggingId(null);
  };

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
                  <TableRow 
                    key={doc.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, doc)}
                    onDragEnd={handleDragEnd}
                    className={cn(
                      "cursor-grab relative group",
                      draggingId === doc.id && "opacity-60 bg-primary/5"
                    )}
                  >
                    <TableCell className="font-medium flex items-center gap-2">
                      <div className="absolute left-0 top-1/2 -ml-5 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
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
                    <TableCell 
                      className="text-sm"
                      draggable
                      onDragStart={(e) => {
                        e.stopPropagation();
                        e.dataTransfer.setData('text/plain', doc.risks || 'No risks found in this document');
                        e.dataTransfer.effectAllowed = 'copy';
                      }}
                    >
                      <div className="cursor-grab hover:bg-accent-pale/20 p-1 rounded">
                        {doc.risks || 'Not in document, click to view explanation'}
                      </div>
                    </TableCell>
                    <TableCell 
                      className="text-sm"
                      draggable
                      onDragStart={(e) => {
                        e.stopPropagation();
                        e.dataTransfer.setData('text/plain', doc.considerations || 'No market considerations found in this document');
                        e.dataTransfer.effectAllowed = 'copy';
                      }}
                    >
                      <div className="cursor-grab hover:bg-accent-pale/20 p-1 rounded">
                        {doc.considerations || 'Not in document, click to view explanation'}
                      </div>
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

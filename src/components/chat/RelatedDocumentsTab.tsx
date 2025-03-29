
import React from 'react';
import { FileText, FilePdf, FileArchive, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ResearchDocument } from './ResearchDataPanel';

interface RelatedDocumentsTabProps {
  documents: ResearchDocument[];
  onViewDocument?: (doc: ResearchDocument) => void;
  className?: string;
}

const getDocumentIcon = (documentType: string) => {
  switch (documentType.toLowerCase()) {
    case 'pdf':
    case 'public report':
      return <FilePdf className="h-5 w-5 text-red-500" />;
    case 'xlsx':
    case 'excel':
    case 'spreadsheet':
      return <FileArchive className="h-5 w-5 text-green-500" />;
    default:
      return <FileText className="h-5 w-5 text-blue-500" />;
  }
};

const getDocumentExtension = (title: string): string => {
  const parts = title.split('.');
  if (parts.length > 1) {
    return parts[parts.length - 1].toUpperCase();
  }
  return '';
};

const RelatedDocumentsTab: React.FC<RelatedDocumentsTabProps> = ({
  documents,
  onViewDocument,
  className
}) => {
  if (documents.length === 0) {
    return (
      <div className={cn("flex flex-col h-full p-4", className)}>
        <h3 className="text-sm font-medium mb-4">Related Documents</h3>
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 text-sm p-4">
          <FileText className="h-8 w-8 mb-2 text-gray-400" />
          <p>No related documents available yet.</p>
          <p className="text-xs mt-1">Ask a question that requires research to gather relevant documents.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-sm font-medium">Related Documents</h3>
        <Badge variant="outline" className="text-xs bg-gray-100">
          {documents.length}
        </Badge>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="space-y-1 p-1">
          {documents.map((doc) => {
            const extension = getDocumentExtension(doc.title);
            const fileIcon = extension ? 
              <Badge variant="outline" className="bg-gray-100 text-xs font-mono mr-2">
                {extension}
              </Badge> : 
              getDocumentIcon(doc.documentType);
              
            return (
              <div 
                key={doc.id} 
                className="p-3 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
                onClick={() => onViewDocument?.(doc)}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {fileIcon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">{doc.title}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {doc.documentType === 'Product' && 'Product documentation and specifications'}
                      {doc.documentType === 'Marketing Materials' && 'Marketing materials and presentations'}
                      {doc.documentType === 'Financials' && 'Financial reports and analysis'}
                      {doc.documentType === 'Customer' && 'Customer feedback and testimonials'}
                      {doc.documentType === 'Public Report' && 'Publicly available market reports and analysis'}
                    </p>
                    <div className="flex items-center mt-2">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs mr-2",
                          doc.documentType === 'Financials' ? "bg-purple-50 text-purple-700 border-purple-100" :
                          doc.documentType === 'Marketing Materials' ? "bg-purple-50 text-purple-700 border-purple-100" :
                          doc.documentType === 'Product' ? "bg-red-50 text-red-700 border-red-100" :
                          doc.documentType === 'Customer' ? "bg-amber-50 text-amber-700 border-amber-100" :
                          "bg-green-50 text-green-700 border-green-100"
                        )}
                      >
                        {doc.documentType}
                      </Badge>
                      <span className="text-xs text-gray-500">{doc.date}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">View document</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RelatedDocumentsTab;

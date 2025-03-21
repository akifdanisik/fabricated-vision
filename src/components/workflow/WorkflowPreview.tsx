
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, Clock, AlertCircle, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WorkflowNodeProps {
  title: string;
  description?: string;
  status: 'completed' | 'in-progress' | 'pending' | 'error';
  isLast?: boolean;
}

const WorkflowNode = ({ title, description, status, isLast = false }: WorkflowNodeProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusClass = () => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      case 'in-progress':
        return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'error':
        return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      default:
        return 'border-gray-300 bg-gray-50 dark:bg-gray-800/20';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`flex flex-col p-3 border-2 rounded-lg w-64 ${getStatusClass()}`}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium">{title}</span>
          {getStatusIcon()}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      
      {!isLast && (
        <div className="h-10 flex items-center justify-center">
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
        </div>
      )}
    </div>
  );
};

interface WorkflowPreviewProps {
  compact?: boolean;
}

export default function WorkflowPreview({ compact = false }: WorkflowPreviewProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <div className="flex items-center gap-2">
            <Workflow className="h-5 w-5 text-primary" />
            <CardTitle className="text-md">Inventory Replenishment Workflow</CardTitle>
          </div>
          <CardDescription>Triggered by low inventory alert</CardDescription>
        </div>
        <Badge variant="outline" className="ml-2">In Progress</Badge>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap items-start justify-center gap-3 py-4 overflow-x-auto">
          <WorkflowNode 
            title="Check Inventory" 
            description={compact ? undefined : "Verified current stock levels"}
            status="completed" 
          />
          
          <WorkflowNode 
            title="Create RFQ" 
            description={compact ? undefined : "Generated request for quotation"}
            status="completed" 
          />
          
          <WorkflowNode 
            title="Approval" 
            description={compact ? undefined : "Waiting for manager review"}
            status="in-progress" 
          />
          
          <WorkflowNode 
            title="Place Order" 
            description={compact ? undefined : "Order will be placed after approval"}
            status="pending" 
            isLast={true}
          />
        </div>
        
        {!compact && (
          <div className="flex justify-end mt-2">
            <Button variant="outline" size="sm" className="mr-2">Edit Workflow</Button>
            <Button size="sm">View Details</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

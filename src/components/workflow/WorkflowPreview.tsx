
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface WorkflowNodeProps {
  title: string;
  status: 'completed' | 'in-progress' | 'pending' | 'error';
  isLast?: boolean;
}

const WorkflowNode = ({ title, status, isLast = false }: WorkflowNodeProps) => {
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
      <div className={`flex items-center justify-between p-3 border-2 rounded-lg w-52 ${getStatusClass()}`}>
        <span className="text-sm font-medium">{title}</span>
        {getStatusIcon()}
      </div>
      
      {!isLast && (
        <div className="h-10 flex items-center justify-center">
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
        </div>
      )}
    </div>
  );
};

export default function WorkflowPreview() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-md">Inventory Replenishment Workflow</CardTitle>
          <CardDescription>Triggered by low inventory alert</CardDescription>
        </div>
        <Badge variant="outline" className="ml-2">In Progress</Badge>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap items-start justify-center gap-2 py-4">
          <WorkflowNode 
            title="Check Inventory" 
            status="completed" 
          />
          
          <WorkflowNode 
            title="Create RFQ" 
            status="completed" 
          />
          
          <WorkflowNode 
            title="Approval" 
            status="in-progress" 
          />
          
          <WorkflowNode 
            title="Place Order" 
            status="pending" 
            isLast={true}
          />
        </div>
      </CardContent>
    </Card>
  );
}

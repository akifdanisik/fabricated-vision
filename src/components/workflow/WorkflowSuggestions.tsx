
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Workflow, ArrowRight, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WorkflowTemplate {
  id: string;
  title: string;
  description: string;
  category: 'procurement' | 'compliance' | 'supplier' | 'inventory';
  complexity: 'simple' | 'medium' | 'complex';
  steps: number;
}

const workflowTemplates: WorkflowTemplate[] = [
  {
    id: '1',
    title: 'Supplier Onboarding',
    description: 'Step-by-step process for qualifying and onboarding new suppliers with all required documentation and compliance checks.',
    category: 'supplier',
    complexity: 'medium',
    steps: 5,
  },
  {
    id: '2',
    title: 'Low Stock Response',
    description: 'Automatically trigger reorders when inventory falls below threshold with approval steps.',
    category: 'inventory',
    complexity: 'simple',
    steps: 3,
  },
  {
    id: '3',
    title: 'GMP Certification Tracking',
    description: 'Monitor supplier certification expiration dates and automatically initiate renewal process.',
    category: 'compliance',
    complexity: 'medium',
    steps: 4,
  },
  {
    id: '4',
    title: 'Strategic Sourcing',
    description: 'Compare multiple suppliers across quality, price, and risk metrics to select optimal vendor.',
    category: 'procurement',
    complexity: 'complex',
    steps: 6,
  },
  {
    id: '5',
    title: 'Contract Renewal',
    description: 'Manage the contract renewal process with notifications, approvals, and document updates.',
    category: 'procurement',
    complexity: 'medium',
    steps: 5,
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'procurement':
      return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
    case 'compliance':
      return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
    case 'supplier':
      return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
    case 'inventory':
      return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
  }
};

const getComplexityColor = (complexity: string) => {
  switch (complexity) {
    case 'simple':
      return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
    case 'medium':
      return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800';
    case 'complex':
      return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
  }
};

const WorkflowSuggestions = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="p-4 border-b flex justify-between items-center">
        <CardTitle className="text-xl">Workflow Templates</CardTitle>
        <Button 
          size="sm" 
          onClick={() => navigate('/workflows')}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> 
          Create Custom
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-240px)]">
          <div className="p-4 grid gap-4 md:grid-cols-2">
            {workflowTemplates.map((template) => (
              <div 
                key={template.id} 
                className="p-4 rounded-lg border hover:bg-accent/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10">
                      <Workflow className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-medium">{template.title}</h3>
                  </div>
                  <div className="flex gap-1">
                    <Badge variant="outline" className={getCategoryColor(template.category)}>
                      {template.category}
                    </Badge>
                    <Badge variant="outline" className={getComplexityColor(template.complexity)}>
                      {template.complexity}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{template.steps} steps</span>
                  <Button size="sm" className="h-7 text-xs">
                    Use Template <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default WorkflowSuggestions;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BarChart3, BoxIcon, ClipboardList, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ActionItem = {
  id: string;
  title: string;
  description: string;
  icon: 'chart' | 'list' | 'package' | 'box';
  actionLabel: string;
  onClick: () => void;
  category?: string;
};

interface ActionPreviewProps {
  title: string;
  description?: string;
  actions: ActionItem[];
  className?: string;
}

export const getActionIcon = (iconName: ActionItem['icon']) => {
  switch (iconName) {
    case 'chart':
      return <BarChart3 className="h-5 w-5" />;
    case 'list':
      return <ClipboardList className="h-5 w-5" />;
    case 'package':
      return <Package className="h-5 w-5" />;
    case 'box':
      return <BoxIcon className="h-5 w-5" />;
    default:
      return <BoxIcon className="h-5 w-5" />;
  }
};

const ActionPreview: React.FC<ActionPreviewProps> = ({ 
  title, 
  description, 
  actions,
  className 
}) => {
  // Group actions by category if provided
  const actionsByCategory = actions.reduce((acc, action) => {
    const category = action.category || 'Actions';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(action);
    return acc;
  }, {} as Record<string, ActionItem[]>);

  const categories = Object.keys(actionsByCategory);

  return (
    <div className={cn("flex flex-col h-full overflow-auto p-4 bg-white", className)}>
      <div className="mb-6">
        <h2 className="text-base font-semibold text-neutral-800">{title}</h2>
        {description && <p className="text-sm text-neutral-700 mt-1">{description}</p>}
      </div>

      {categories.map((category) => (
        <div key={category} className="mb-6">
          <h3 className="text-sm font-semibold text-neutral-800 mb-3">{category}</h3>
          <div className="grid gap-3">
            {actionsByCategory[category].map((action) => (
              <Card 
                key={action.id} 
                className="bg-white hover:bg-neutral-50 transition-colors border-neutral-300 shadow-md"
              >
                <CardHeader className="p-4 pb-2 flex flex-row items-start gap-3">
                  <div className="p-2 rounded-md bg-neutral-200 text-neutral-800">
                    {getActionIcon(action.icon)}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base font-semibold text-neutral-800">{action.title}</CardTitle>
                    <CardDescription className="text-sm mt-1 text-neutral-600 font-medium">{action.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardFooter className="px-4 py-2 justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-neutral-800 hover:text-neutral-900 hover:bg-neutral-200 font-medium" 
                    onClick={action.onClick}
                  >
                    {action.actionLabel}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {actions.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-neutral-100 rounded-lg border border-neutral-300 shadow-sm">
          <Package className="h-12 w-12 mb-4 text-neutral-500" />
          <p className="text-sm font-medium text-neutral-700 max-w-xs">Your preview will appear here</p>
        </div>
      )}
    </div>
  );
};

export default ActionPreview;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BarChart3, Box, ClipboardList, Package, FileSearch, Shield, BookOpen, Link2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ActionItem = {
  id: string;
  title: string;
  description: string;
  icon: 'chart' | 'list' | 'package' | 'box' | 'fileSearch' | 'shield' | 'book' | 'link';
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
      return <Box className="h-5 w-5" />;
    case 'fileSearch':
      return <FileSearch className="h-5 w-5" />;
    case 'shield':
      return <Shield className="h-5 w-5" />;
    case 'book':
      return <BookOpen className="h-5 w-5" />;
    case 'link':
      return <Link2 className="h-5 w-5" />;
    default:
      return <Box className="h-5 w-5" />;
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
        <h2 className="text-xl font-medium text-primary">{title}</h2>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>

      {categories.map((category) => (
        <div key={category} className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-3">{category}</h3>
          <div className="grid gap-3">
            {actionsByCategory[category].map((action) => (
              <Card 
                key={action.id} 
                className="bg-white hover:bg-primary-light/20 transition-colors border-primary-light/30"
              >
                <CardHeader className="p-4 pb-2 flex flex-row items-start gap-3">
                  <div className="p-2 rounded-md bg-primary-light/50 text-primary">
                    {getActionIcon(action.icon)}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{action.title}</CardTitle>
                    <CardDescription className="text-sm mt-1">{action.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardFooter className="px-4 py-2 justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-primary hover:text-primary hover:bg-primary-light/30" 
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
        <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center p-6">
          <img 
            src="/lovable-uploads/0f378f40-c5be-494e-a251-1513b467af1d.png" 
            alt="Fabricated Logo" 
            className="h-8 w-auto mb-4 opacity-30" 
          />
          <p className="text-sm max-w-xs">Ask about inventory levels, suppliers, or orders to see actionable suggestions here.</p>
        </div>
      )}
    </div>
  );
};

export default ActionPreview;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BarChart3, Box, ClipboardList, Package, FileSearch, Shield, BookOpen, Link2, Trash2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { CustomAction } from '@/hooks/use-custom-actions';

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
  customActions?: CustomAction[];
  onAddCustomAction?: (content: string) => void;
  onRemoveCustomAction?: (id: string) => void;
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
  customActions = [],
  onAddCustomAction,
  onRemoveCustomAction,
  className 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  
  // Combine system actions and custom actions
  const allActions = [...actions, ...customActions];
  
  const actionsByCategory = allActions.reduce((acc, action) => {
    const category = action.category || 'Actions';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(action);
    return acc;
  }, {} as Record<string, (ActionItem | CustomAction)[]>);

  const categories = Object.keys(actionsByCategory);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  };
  
  const handleDragLeave = () => {
    setIsDragOver(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const content = e.dataTransfer.getData('text/plain');
    
    if (content && onAddCustomAction) {
      onAddCustomAction(content);
    }
  };

  const isCustomAction = (action: ActionItem): action is CustomAction => {
    return 'isCustom' in action && action.isCustom === true;
  };

  return (
    <div 
      className={cn(
        "flex flex-col h-full overflow-auto p-4 bg-[#F1F0FB]",
        isDragOver && "bg-primary-light/20 border-2 border-dashed border-primary",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="mb-6">
        <h2 className="text-xl font-medium text-primary-dark">{title}</h2>
        {description && <p className="text-sm text-accent-medium mt-1">{description}</p>}
      </div>

      {categories.map((category) => (
        <div key={category} className="mb-6">
          <h3 className="text-sm font-medium text-accent mb-3">{category}</h3>
          <div className="grid gap-3">
            {actionsByCategory[category].map((action) => (
              <Card 
                key={action.id} 
                className="bg-white hover:bg-accent-pale/40 transition-colors border-accent-pale/50"
              >
                <CardHeader className="p-4 pb-2 flex flex-row items-start gap-3">
                  <div className="p-2 rounded-md bg-primary-light/70 text-primary-dark">
                    {getActionIcon(action.icon)}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{action.title}</CardTitle>
                    <CardDescription className="text-sm mt-1">{action.description}</CardDescription>
                  </div>
                  {isCustomAction(action) && onRemoveCustomAction && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      onClick={() => onRemoveCustomAction(action.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </CardHeader>
                <CardFooter className="px-4 py-2 justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-accent hover:text-accent hover:bg-accent-pale/50" 
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

      {allActions.length === 0 && (
        <div 
          className="flex flex-col items-center justify-center h-full text-accent-medium text-center p-6 bg-accent-pale/10 border-2 border-dashed border-accent-pale/30 rounded-lg"
        >
          <img 
            src="/lovable-uploads/8909c790-d73e-4ca4-99fb-106aa9109740.png" 
            alt="Fabricated Logo" 
            className="h-15 w-auto mb-4 opacity-30" 
          />
          <p className="text-sm max-w-xs">Drag content from the chat to create custom actions, or ask about inventory levels, suppliers, or orders to see actionable suggestions.</p>
        </div>
      )}
    </div>
  );
};

export default ActionPreview;


import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BarChart3, Box, ClipboardList, Package, FileSearch, Shield, BookOpen, Link2, Trash2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { CustomAction } from '@/hooks/use-custom-actions';
import { Button } from '@/components/ui/button';

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
      return <BarChart3 className="h-4 w-4" />;
    case 'list':
      return <ClipboardList className="h-4 w-4" />;
    case 'package':
      return <Package className="h-4 w-4" />;
    case 'box':
      return <Box className="h-4 w-4" />;
    case 'fileSearch':
      return <FileSearch className="h-4 w-4" />;
    case 'shield':
      return <Shield className="h-4 w-4" />;
    case 'book':
      return <BookOpen className="h-4 w-4" />;
    case 'link':
      return <Link2 className="h-4 w-4" />;
    default:
      return <Box className="h-4 w-4" />;
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
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
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

  // Update container width when the component mounts and when window resizes
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    // Initial measurement
    updateWidth();
    
    // Add resize listener
    window.addEventListener('resize', updateWidth);
    
    // Periodic check for sidebar changes
    const interval = setInterval(updateWidth, 300);
    
    return () => {
      window.removeEventListener('resize', updateWidth);
      clearInterval(interval);
    };
  }, []);
  
  // Calculate logo size based on container width
  const getLogoSize = () => {
    // Base size on container width with min/max constraints
    const baseSize = Math.min(containerWidth * 0.6, 280);
    const minSize = 100;
    return Math.max(baseSize, minSize);
  };
  
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
      ref={containerRef}
      className={cn(
        "flex flex-col h-full overflow-auto p-4 bg-[#F1F0FB]",
        isDragOver && "bg-primary-light/20 border-2 border-dashed border-primary",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="mb-4">
        <h2 className="text-lg font-medium text-primary-dark">{title}</h2>
        {description && <p className="text-xs text-accent-medium mt-1">{description}</p>}
      </div>

      {categories.map((category) => (
        <div key={category} className="mb-4">
          <h3 className="text-xs font-medium text-accent mb-2">{category}</h3>
          <div className="grid gap-2">
            {actionsByCategory[category].map((action) => (
              <Card 
                key={action.id} 
                className="bg-white hover:bg-accent-pale/40 transition-colors border-accent-pale/50"
              >
                <CardHeader className="p-3 pb-1 flex flex-row items-start gap-2">
                  <div className="p-1.5 rounded-md bg-primary-light/70 text-primary-dark">
                    {getActionIcon(action.icon)}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-sm">{action.title}</CardTitle>
                    <CardDescription className="text-xs mt-0.5 line-clamp-2">{action.description}</CardDescription>
                  </div>
                  {isCustomAction(action) && onRemoveCustomAction && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                      onClick={() => onRemoveCustomAction(action.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </CardHeader>
                <CardFooter className="px-3 py-1 justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs text-accent hover:text-accent hover:bg-accent-pale/50 h-7 px-2" 
                    onClick={action.onClick}
                  >
                    {action.actionLabel}
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {allActions.length === 0 && (
        <div 
          className="flex flex-col items-center justify-center h-full text-accent-medium text-center p-4 bg-accent-pale/10 border-2 border-dashed border-accent-pale/30 rounded-lg"
        >
          <div className="flex justify-center items-center" style={{ height: `${getLogoSize()}px` }}>
            <img 
              src="/lovable-uploads/8909c790-d73e-4ca4-99fb-106aa9109740.png" 
              alt="Fabricated Logo" 
              className="w-auto h-full mb-3 opacity-30 object-contain transition-all duration-300" 
            />
          </div>
          <p className="text-xs max-w-xs">Drag content from the chat to create custom actions, or ask about inventory levels, suppliers, or orders to see actionable suggestions.</p>
        </div>
      )}
    </div>
  );
};

export default ActionPreview;

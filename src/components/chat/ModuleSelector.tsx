import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  Brain, 
  Beaker, 
  Code, 
  Database, 
  ShieldAlert, 
  Package, 
  Search, 
  Sparkles 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ModuleItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'analysis' | 'data' | 'development' | 'security';
}

interface ModuleSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  modules: ModuleItem[];
  onSelectModule: (moduleId: string) => void;
}

const getIconComponent = (iconName: string) => {
  switch(iconName) {
    case 'shield': return <ShieldAlert className="h-6 w-6 text-muted-foreground" />;
    case 'database': return <Database className="h-6 w-6 text-muted-foreground" />;
    case 'package': return <Package className="h-6 w-6 text-muted-foreground" />;
    case 'code': return <Code className="h-6 w-6 text-muted-foreground" />;
    case 'alertTriangle': return <AlertTriangle className="h-6 w-6 text-muted-foreground" />;
    case 'search': return <Search className="h-6 w-6 text-muted-foreground" />;
    case 'beaker': return <Beaker className="h-6 w-6 text-muted-foreground" />;
    case 'sparkles': return <Sparkles className="h-6 w-6 text-muted-foreground" />;
    default: return <Brain className="h-6 w-6 text-muted-foreground" />;
  }
};

export const ModuleSelector = ({ isOpen, onClose, modules, onSelectModule }: ModuleSelectorProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0 gap-0 glass-card border-border">
        <DialogHeader className="p-6 pb-2 border-b border-border">
          <DialogTitle className="text-xl font-semibold">Select AI Module</DialogTitle>
          <DialogDescription>
            Choose a specialized AI module to enhance your procurement process
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="px-6 justify-start border-b border-border rounded-none h-auto py-2 bg-background">
            {['all', 'analysis', 'data', 'development', 'security'].map((category) => (
              <TabsTrigger 
                key={category}
                value={category} 
                className={cn(
                  "rounded-full px-4 capitalize",
                  "data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground",
                  "hover:bg-accent/10"
                )}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {['all', 'analysis', 'data', 'development', 'security'].map((category) => (
            <TabsContent key={category} value={category} className="p-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(category === 'all' ? modules : modules.filter(module => module.category === category)).map((module) => (
                  <div 
                    key={module.id}
                    className={cn(
                      "border border-border rounded-xl p-4 cursor-pointer",
                      "hover:shadow-sm transition-all flex items-start gap-4",
                      "bg-white hover:bg-accent/5"
                    )}
                    onClick={() => onSelectModule(module.id)}
                  >
                    <div className={cn(
                      "p-3 rounded-full flex-shrink-0",
                      "bg-secondary/20 text-muted-foreground"
                    )}>
                      {getIconComponent(module.icon)}
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{module.title}</h3>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ModuleSelector;

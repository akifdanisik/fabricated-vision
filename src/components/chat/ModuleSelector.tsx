
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
  category?: 'analysis' | 'data' | 'development' | 'security';
}

interface ModuleSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  modules: ModuleItem[];
  activeModules?: ModuleItem[];
  onSelect: (moduleId: string) => void;
  onSelectModule?: (moduleId: string) => void;
}

const getIconComponent = (iconName: string) => {
  switch(iconName) {
    case 'shield': return <ShieldAlert className="h-6 w-6" />;
    case 'database': return <Database className="h-6 w-6" />;
    case 'package': return <Package className="h-6 w-6" />;
    case 'code': return <Code className="h-6 w-6" />;
    case 'alertTriangle': return <AlertTriangle className="h-6 w-6" />;
    case 'search': return <Search className="h-6 w-6" />;
    case 'beaker': return <Beaker className="h-6 w-6" />;
    case 'sparkles': return <Sparkles className="h-6 w-6" />;
    default: return <Brain className="h-6 w-6" />;
  }
};

export const ModuleSelector = ({ 
  isOpen, 
  onClose, 
  modules, 
  activeModules = [], 
  onSelect, 
  onSelectModule 
}: ModuleSelectorProps) => {
  // Use onSelectModule if provided, otherwise fall back to onSelect
  const handleSelect = onSelectModule || onSelect;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0 gap-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-semibold">Select AI Module</DialogTitle>
          <DialogDescription>
            Choose a specialized AI module to enhance your procurement process
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="px-6 justify-start border-b rounded-none h-auto py-2 bg-transparent">
            <TabsTrigger value="all" className="rounded-full px-4 data-[state=active]:bg-primary data-[state=active]:text-white">
              All Modules
            </TabsTrigger>
            <TabsTrigger value="analysis" className="rounded-full px-4 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Analysis
            </TabsTrigger>
            <TabsTrigger value="data" className="rounded-full px-4 data-[state=active]:bg-green-500 data-[state=active]:text-white">
              Data
            </TabsTrigger>
            <TabsTrigger value="development" className="rounded-full px-4 data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              Development
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-full px-4 data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Security
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="p-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modules.map((module) => (
                <div 
                  key={module.id}
                  className="border rounded-xl p-4 cursor-pointer hover:shadow-md transition-all flex items-start gap-4"
                  onClick={() => handleSelect(module.id)}
                >
                  <div className={cn(
                    "p-3 rounded-full flex-shrink-0",
                    module.category === 'analysis' && "bg-blue-50 text-blue-500",
                    module.category === 'data' && "bg-green-50 text-green-500",
                    module.category === 'development' && "bg-purple-50 text-purple-500",
                    module.category === 'security' && "bg-red-50 text-red-500"
                  )}>
                    {getIconComponent(module.icon)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{module.title}</h3>
                    <p className="text-sm text-gray-500">{module.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          {['analysis', 'data', 'development', 'security'].map((category) => (
            <TabsContent key={category} value={category} className="p-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {modules
                  .filter(module => module.category === category)
                  .map((module) => (
                    <div 
                      key={module.id}
                      className="border rounded-xl p-4 cursor-pointer hover:shadow-md transition-all flex items-start gap-4"
                      onClick={() => handleSelect(module.id)}
                    >
                      <div className={cn(
                        "p-3 rounded-full flex-shrink-0",
                        category === 'analysis' && "bg-blue-50 text-blue-500",
                        category === 'data' && "bg-green-50 text-green-500",
                        category === 'development' && "bg-purple-50 text-purple-500",
                        category === 'security' && "bg-red-50 text-red-500"
                      )}>
                        {getIconComponent(module.icon)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{module.title}</h3>
                        <p className="text-sm text-gray-500">{module.description}</p>
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

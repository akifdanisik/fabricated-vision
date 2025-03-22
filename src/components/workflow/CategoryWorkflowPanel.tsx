
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Panel } from '@xyflow/react';
import { predefinedCategories, Category } from '@/components/categories/CategoryBadge';
import CategorySelector from '@/components/categories/CategorySelector';
import { Tag, Plus } from 'lucide-react';
import { getCategoryNodes, CategoryNode } from './CategoryNodeTypes';

interface CategoryWorkflowPanelProps {
  onAddNodes: (nodes: CategoryNode[]) => void;
}

const CategoryWorkflowPanel = ({ onAddNodes }: CategoryWorkflowPanelProps) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  
  const handleCategoryChange = (categories: Category[]) => {
    setSelectedCategories(categories);
  };
  
  const handleAddCategoryNode = () => {
    if (selectedCategories.length === 0) return;
    
    // Get the first selected category
    const category = selectedCategories[0];
    
    // Get suggested nodes for this category
    const categoryNodes = getCategoryNodes(category);
    
    // Add the nodes to the workflow
    onAddNodes(categoryNodes);
  };
  
  return (
    <Panel position="top-center" className="bg-white p-4 rounded-lg border shadow-sm max-w-md">
      <Card className="border-0 shadow-none">
        <CardHeader className="p-0 pb-2">
          <CardTitle className="text-sm">Add Category Node</CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-3">
          <div className="flex items-center gap-2">
            <CategorySelector
              selectedCategories={selectedCategories}
              onChange={handleCategoryChange}
              multiSelect={false}
              triggerClassName="w-full"
            />
            
            <Button 
              size="sm" 
              onClick={handleAddCategoryNode}
              disabled={selectedCategories.length === 0}
              className="flex-shrink-0"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Select a category to add category-specific workflow nodes
          </div>
        </CardContent>
      </Card>
    </Panel>
  );
};

export default CategoryWorkflowPanel;

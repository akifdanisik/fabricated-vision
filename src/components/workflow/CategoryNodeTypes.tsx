
import { Node } from '@xyflow/react';
import { Category, predefinedCategories } from '@/components/categories/CategoryBadge';
import { Box, List, Package, Tag, FileText, AlertCircle, CheckCircle } from 'lucide-react';

// Node Type for Category-based Workflow nodes
export interface CategoryNode extends Node {
  data: {
    label: string;
    type?: 'trigger' | 'task' | 'decision' | 'end';
    icon?: JSX.Element;
    category?: Category;
  };
}

// Function to get suggested nodes based on categories
export const getCategoryNodes = (category: Category): CategoryNode[] => {
  const categoryId = category.id;
  
  switch (categoryId) {
    case 'apis':
      return [
        {
          id: `${categoryId}-check-stock`,
          type: 'trigger',
          data: {
            label: 'Check API Stock Levels',
            icon: <Package className="h-5 w-5 text-blue-500" />,
            type: 'trigger',
            category
          },
          position: { x: 150, y: 0 }
        },
        {
          id: `${categoryId}-quality-check`,
          type: 'task',
          data: {
            label: 'API Quality Verification',
            icon: <FileText className="h-5 w-5 text-amber-500" />,
            type: 'task',
            category
          },
          position: { x: 150, y: 100 }
        },
        {
          id: `${categoryId}-regulatory-check`,
          type: 'decision',
          data: {
            label: 'Regulatory Compliance Check',
            icon: <AlertCircle className="h-5 w-5 text-purple-500" />,
            type: 'decision',
            category
          },
          position: { x: 150, y: 200 }
        }
      ];
    
    case 'excipients':
      return [
        {
          id: `${categoryId}-check-inventory`,
          type: 'trigger',
          data: {
            label: 'Check Excipient Inventory',
            icon: <List className="h-5 w-5 text-blue-500" />,
            type: 'trigger',
            category
          },
          position: { x: 150, y: 0 }
        },
        {
          id: `${categoryId}-compatibility-check`,
          type: 'task',
          data: {
            label: 'Compatibility Testing',
            icon: <FileText className="h-5 w-5 text-amber-500" />,
            type: 'task',
            category
          },
          position: { x: 150, y: 100 }
        }
      ];
    
    case 'packaging':
      return [
        {
          id: `${categoryId}-materials-check`,
          type: 'trigger',
          data: {
            label: 'Packaging Materials Check',
            icon: <Box className="h-5 w-5 text-blue-500" />,
            type: 'trigger',
            category
          },
          position: { x: 150, y: 0 }
        },
        {
          id: `${categoryId}-vendor-selection`,
          type: 'task',
          data: {
            label: 'Packaging Vendor Selection',
            icon: <Tag className="h-5 w-5 text-amber-500" />,
            type: 'task',
            category
          },
          position: { x: 150, y: 100 }
        },
        {
          id: `${categoryId}-approval`,
          type: 'end',
          data: {
            label: 'Packaging Approval',
            icon: <CheckCircle className="h-5 w-5 text-green-500" />,
            type: 'end',
            category
          },
          position: { x: 150, y: 200 }
        }
      ];
      
    default:
      return [
        {
          id: `${categoryId}-generic-trigger`,
          type: 'trigger',
          data: {
            label: `${category.name} Check`,
            icon: <Package className="h-5 w-5 text-blue-500" />,
            type: 'trigger',
            category
          },
          position: { x: 150, y: 0 }
        },
        {
          id: `${categoryId}-generic-task`,
          type: 'task',
          data: {
            label: `${category.name} Task`,
            icon: <FileText className="h-5 w-5 text-amber-500" />,
            type: 'task',
            category
          },
          position: { x: 150, y: 100 }
        }
      ];
  }
};

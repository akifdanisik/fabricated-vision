
import { Category, predefinedCategories } from '@/components/categories/CategoryBadge';
import ActionPreview, { ActionItem } from '@/components/chat/ActionPreview';
import { useNavigate } from 'react-router-dom';
import { Package, Tag, FileText, ShieldCheck, BarChart3 } from 'lucide-react';

interface CategoryActionsProps {
  category?: string;
  onSelect?: (prompt: string) => void;
}

const CategoryActions = ({ category, onSelect }: CategoryActionsProps) => {
  const navigate = useNavigate();
  
  // Find the category object if a category name is provided
  const selectedCategory = category ? 
    predefinedCategories.find(c => 
      c.name.toLowerCase() === category.toLowerCase() || 
      c.id.toLowerCase() === category.toLowerCase()
    ) : undefined;
  
  const actions: ActionItem[] = [
    {
      id: 'inventory',
      title: 'Check Inventory',
      description: selectedCategory 
        ? `View inventory items in the ${selectedCategory.name} category` 
        : 'View inventory by category',
      icon: 'package',
      actionLabel: 'Go to Inventory',
      onClick: () => onSelect ? onSelect('Check inventory') : navigate('/inventory'),
      category: 'Inventory'
    },
    {
      id: 'suppliers',
      title: 'Supplier Management',
      description: selectedCategory 
        ? `View suppliers in the ${selectedCategory.name} category` 
        : 'View and filter suppliers by category',
      icon: 'link',
      actionLabel: 'Go to Suppliers',
      onClick: () => onSelect ? onSelect('Show suppliers') : navigate('/suppliers'),
      category: 'Suppliers'
    },
    {
      id: 'contracts',
      title: 'Contract Management',
      description: selectedCategory 
        ? `View contracts for ${selectedCategory.name} category` 
        : 'Filter contracts by category',
      icon: 'fileSearch',
      actionLabel: 'Go to Contracts',
      onClick: () => onSelect ? onSelect('View contracts') : navigate('/contracts'),
      category: 'Contracts'
    },
    {
      id: 'compliance',
      title: 'Compliance Status',
      description: selectedCategory 
        ? `Check compliance for ${selectedCategory.name}` 
        : 'View compliance status by category',
      icon: 'shield',
      actionLabel: 'Go to Compliance',
      onClick: () => onSelect ? onSelect('Show compliance') : navigate('/compliance'),
      category: 'Compliance'
    },
    {
      id: 'spend',
      title: 'Spend Analysis',
      description: selectedCategory 
        ? `Analyze spending for ${selectedCategory.name}` 
        : 'View spending patterns by category',
      icon: 'chart',
      actionLabel: 'Go to Reports',
      onClick: () => onSelect ? onSelect('Show spend analytics') : navigate('/reports'),
      category: 'Analytics'
    },
    {
      id: 'workflow',
      title: 'Workflow Management',
      description: selectedCategory 
        ? `Create workflows for ${selectedCategory.name}` 
        : 'Design workflows by category',
      icon: 'list',
      actionLabel: 'Go to Workflows',
      onClick: () => onSelect ? onSelect('Manage workflows') : navigate('/workflows'),
      category: 'Workflows'
    }
    // Removed the category-management action
  ];

  return (
    <ActionPreview
      title={selectedCategory ? `${selectedCategory.name} Category` : "Category Actions"}
      description={selectedCategory ? `Actions for ${selectedCategory.name} category` : "Manage procurement by categories"}
      actions={actions}
    />
  );
};

export default CategoryActions;

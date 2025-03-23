
import { useState } from "react";
import CategorySelector from "./CategorySelector";
import CategoryBadge, { Category } from "./CategoryBadge";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  onFilterChange: (categories: Category[]) => void;
  className?: string;
  showLabel?: boolean;
  showClear?: boolean;
}

const CategoryFilter = ({ 
  onFilterChange, 
  className,
  showLabel = true,
  showClear = true
}: CategoryFilterProps) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const handleCategoryChange = (newCategories: Category[]) => {
    setSelectedCategories(newCategories);
    onFilterChange(newCategories);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    onFilterChange([]);
  };

  return (
    <div className={cn("flex flex-wrap gap-2 items-center", className)}>
      {showLabel && <span className="text-sm font-medium text-gray-700">Filter by category:</span>}
      
      <CategorySelector 
        selectedCategories={selectedCategories}
        onChange={handleCategoryChange}
        multiSelect={true}
        triggerClassName="h-9 px-3 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-primary/30"
      />
      
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-1 items-center">
          {selectedCategories.map(category => (
            <CategoryBadge 
              key={category.id} 
              category={category} 
              onClick={() => {
                const newCategories = selectedCategories.filter(c => c.id !== category.id);
                handleCategoryChange(newCategories);
              }}
            />
          ))}
          
          {showClear && selectedCategories.length > 0 && (
            <Button 
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs text-gray-500 hover:text-gray-700 h-7 px-2 flex items-center"
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;

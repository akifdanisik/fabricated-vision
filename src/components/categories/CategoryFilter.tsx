
import { useState } from "react";
import CategorySelector from "./CategorySelector";
import CategoryBadge, { Category } from "./CategoryBadge";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

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
      {showLabel && <span className="text-sm font-medium">Filter by category:</span>}
      
      <CategorySelector 
        selectedCategories={selectedCategories}
        onChange={handleCategoryChange}
        multiSelect={true}
        triggerClassName="h-8"
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
            <button 
              onClick={clearFilters}
              className="text-xs text-muted-foreground hover:text-foreground ml-1 flex items-center"
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;

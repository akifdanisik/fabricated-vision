
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type CategoryColor = "default" | "blue" | "green" | "amber" | "purple" | "indigo" | "red";

export interface Category {
  id: string;
  name: string;
  color: CategoryColor;
  description?: string;
}

// Predefined categories that can be used throughout the application
export const predefinedCategories: Category[] = [
  { id: "apis", name: "Active Ingredients", color: "blue", description: "Raw active pharmaceutical ingredients" },
  { id: "excipients", name: "Excipients", color: "green", description: "Inactive substances used as carriers for active ingredients" },
  { id: "packaging", name: "Packaging", color: "amber", description: "Primary and secondary packaging materials" },
  { id: "equipment", name: "Equipment", color: "purple", description: "Manufacturing and lab equipment" },
  { id: "services", name: "Services", color: "indigo", description: "Third-party services and consultancy" },
  { id: "chemicals", name: "Chemicals", color: "red", description: "General chemicals and reagents" }
];

interface CategoryBadgeProps {
  category: Category | string;
  className?: string;
  onClick?: (category: Category) => void;
}

const getCategoryColor = (color: CategoryColor) => {
  switch (color) {
    case "blue":
      return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100";
    case "green":
      return "bg-green-50 text-green-700 border-green-200 hover:bg-green-100";
    case "amber":
      return "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100";
    case "purple":
      return "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100";
    case "indigo":
      return "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100";
    case "red":
      return "bg-red-50 text-red-700 border-red-200 hover:bg-red-100";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100";
  }
};

const CategoryBadge = ({ category, className, onClick }: CategoryBadgeProps) => {
  // If category is just a string, find it in predefined categories or create a default one
  const categoryObj = typeof category === 'string' 
    ? predefinedCategories.find(c => c.id === category || c.name === category) || 
      { id: category, name: category, color: "default" as CategoryColor }
    : category;

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "font-normal cursor-pointer transition-colors", 
        getCategoryColor(categoryObj.color),
        className
      )}
      onClick={() => onClick && onClick(categoryObj)}
    >
      {categoryObj.name}
    </Badge>
  );
};

export default CategoryBadge;

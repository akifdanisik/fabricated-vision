
import { useState, useEffect } from "react";
import { Check, ChevronDown, Plus, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Category, predefinedCategories } from "./CategoryBadge";
import { cn } from "@/lib/utils";

interface CategorySelectorProps {
  selectedCategories: Category[];
  onChange: (categories: Category[]) => void;
  multiSelect?: boolean;
  triggerClassName?: string;
}

const CategorySelector = ({ 
  selectedCategories, 
  onChange, 
  multiSelect = true,
  triggerClassName 
}: CategorySelectorProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  
  const toggleCategory = (category: Category) => {
    if (multiSelect) {
      const exists = selectedCategories.some(c => c.id === category.id);
      const newCategories = exists
        ? selectedCategories.filter(c => c.id !== category.id)
        : [...selectedCategories, category];
      onChange(newCategories);
    } else {
      onChange([category]);
      setOpen(false);
    }
  };

  let label = "Select category";
  if (selectedCategories.length === 1) {
    label = selectedCategories[0].name;
  } else if (selectedCategories.length > 1) {
    label = `${selectedCategories.length} categories selected`;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("flex justify-between", triggerClassName)}
        >
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 shrink-0" />
            <span className="truncate">{label}</span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[250px]">
        <Command>
          <CommandInput 
            placeholder="Search categories..." 
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>No categories found.</CommandEmpty>
            <CommandGroup>
              {predefinedCategories.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.name}
                  onSelect={() => toggleCategory(category)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCategories.some(c => c.id === category.id)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {category.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CategorySelector;

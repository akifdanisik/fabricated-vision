
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category, predefinedCategories } from "./CategoryBadge";
import { Folder, FolderPlus, Tag, Pencil, Trash2, AlertTriangle } from "lucide-react";
import CategoryBadge from "./CategoryBadge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Component for managing categories
const CategoryManager = () => {
  const [categories, setCategories] = useState<Category[]>(predefinedCategories);
  const [newCategory, setNewCategory] = useState<Partial<Category>>({ color: "default" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null);

  // Create or update a category
  const handleSaveCategory = () => {
    if (!newCategory.name || !newCategory.color) return;
    
    if (editMode && currentCategoryId) {
      setCategories(categories.map(cat => 
        cat.id === currentCategoryId ? 
        { ...cat, ...newCategory, id: currentCategoryId } : 
        cat
      ));
    } else {
      const id = newCategory.name.toLowerCase().replace(/\s+/g, '-');
      setCategories([...categories, { 
        id, 
        name: newCategory.name, 
        color: newCategory.color as Category["color"],
        description: newCategory.description 
      }]);
    }
    
    resetForm();
  };

  // Delete a category
  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  // Edit a category
  const handleEditCategory = (category: Category) => {
    setNewCategory(category);
    setEditMode(true);
    setCurrentCategoryId(category.id);
    setIsDialogOpen(true);
  };

  // Reset the form
  const resetForm = () => {
    setNewCategory({ color: "default" });
    setEditMode(false);
    setCurrentCategoryId(null);
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Category Management</CardTitle>
            <CardDescription>Organize your procurement by categories</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditMode(false); setNewCategory({ color: "default" }); }}>
                <FolderPlus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editMode ? "Edit Category" : "Add New Category"}</DialogTitle>
                <DialogDescription>
                  {editMode 
                    ? "Update the details of this category." 
                    : "Create a new category to organize your procurement items."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Category Name</Label>
                  <Input 
                    id="name" 
                    value={newCategory.name || ""} 
                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                    placeholder="e.g., Raw Materials"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="color">Color</Label>
                  <Select 
                    value={newCategory.color}
                    onValueChange={(value) => setNewCategory({...newCategory, color: value as Category["color"]})}
                  >
                    <SelectTrigger id="color">
                      <SelectValue placeholder="Select a color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="amber">Amber</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="indigo">Indigo</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea 
                    id="description" 
                    value={newCategory.description || ""} 
                    onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                    placeholder="Brief description of this category"
                  />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Label>Preview: </Label>
                  {newCategory.name && (
                    <CategoryBadge 
                      category={{
                        id: currentCategoryId || "preview",
                        name: newCategory.name,
                        color: (newCategory.color as Category["color"]) || "default",
                        description: newCategory.description
                      }} 
                    />
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={resetForm}>Cancel</Button>
                <Button onClick={handleSaveCategory} disabled={!newCategory.name}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Categories</TabsTrigger>
            <TabsTrigger value="usage">Category Usage</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Card key={category.id} className="overflow-hidden">
                  <div className="p-4 flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <Folder className="h-5 w-5 mt-0.5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium text-sm">
                          {category.name}
                          <CategoryBadge 
                            category={category} 
                            className="ml-2"
                          />
                        </h3>
                        {category.description && (
                          <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={() => handleEditCategory(category)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 text-destructive"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="usage">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Category Usage Analysis</AlertTitle>
              <AlertDescription>
                This feature will show how categories are used across suppliers, contracts, and other parts of the system.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CategoryManager;

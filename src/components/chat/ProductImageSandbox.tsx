
import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Image } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface ProductImageSandboxProps {
  products: Product[];
  isVisible: boolean;
}

const ProductImageSandbox: React.FC<ProductImageSandboxProps> = ({ 
  products,
  isVisible 
}) => {
  if (!isVisible || products.length === 0) return null;

  return (
    <Card className="mt-4 p-4 bg-white/50 backdrop-blur-sm border border-gray-100">
      <h3 className="text-sm font-medium mb-3 text-gray-700">Product Images</h3>
      <ScrollArea className="h-[250px]">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="space-y-2">
              <div className="aspect-square rounded-lg overflow-hidden border border-gray-100 bg-gray-50 relative">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Replace with fallback on error
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://placehold.co/200x200?text=No+Image';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <Image className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
              <p className="text-xs font-medium text-gray-700 truncate">{product.name}</p>
              <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default ProductImageSandbox;

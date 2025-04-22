
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ImageOff, RefreshCw, Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface ProductImageSandboxProps {
  products: Product[];
  isVisible?: boolean;
  onClose?: () => void;
}

const ProductImageSandbox: React.FC<ProductImageSandboxProps> = ({ 
  products,
  isVisible = true,
  onClose
}) => {
  const [imageStates, setImageStates] = useState<Record<string, 'loading' | 'error' | 'success'>>({});
  const [retryAttempts, setRetryAttempts] = useState<Record<string, number>>({});
  const [loadedProducts, setLoadedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Initialize all products as loading when the component receives products
    if (products && products.length > 0) {
      const initialStates: Record<string, 'loading' | 'error' | 'success'> = {};
      products.forEach(product => {
        initialStates[product.id] = 'loading';
      });
      setImageStates(initialStates);
      setLoadedProducts(products);
      
      // Log products received for debugging
      console.log("Products received in sandbox:", products);
    }
  }, [products]);

  const handleImageError = (productId: string, imageSrc: string) => {
    console.log("Image failed to load:", imageSrc);
    
    setImageStates(prev => ({
      ...prev,
      [productId]: 'error'
    }));
    
    toast({
      title: "Image failed to load",
      description: `Could not load image for ${loadedProducts.find(p => p.id === productId)?.name || 'product'}`,
      variant: "destructive"
    });
  };

  const handleImageLoad = (productId: string) => {
    console.log("Image loaded successfully:", productId);
    
    setImageStates(prev => ({
      ...prev, 
      [productId]: 'success'
    }));
  };

  const handleRetry = (productId: string) => {
    setRetryAttempts(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
    
    // Reset the image state to loading to trigger a reload
    setImageStates(prev => ({
      ...prev,
      [productId]: 'loading'
    }));
    
    console.log("Retrying image load for product:", productId);
  };

  const getFallbackImage = (productName: string) => {
    // Generate a fallback image URL based on product name if original fails
    return `https://via.placeholder.com/400x400?text=${encodeURIComponent(productName)}`;
  };

  if (!isVisible || !loadedProducts || loadedProducts.length === 0) {
    console.log("ProductImageSandbox not visible or no products:", { isVisible, loadedProducts });
    return null;
  }

  console.log("Rendering ProductImageSandbox with products:", loadedProducts);

  return (
    <Card className="mt-4 p-4 bg-white/50 backdrop-blur-sm border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-700">Product Images</h3>
        {onClose && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 w-7 p-0 rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <ScrollArea className="h-[250px]">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {loadedProducts.map((product) => {
            const imageState = imageStates[product.id] || 'loading';
            const retryCount = retryAttempts[product.id] || 0;
            const randomParam = `?v=${retryCount}`;
            
            return (
              <div key={product.id} className="space-y-2">
                <div className="aspect-square rounded-lg overflow-hidden border border-gray-100 bg-gray-50 relative">
                  {product.image ? (
                    <>
                      <img 
                        src={`${product.image}${randomParam}`}
                        alt={product.name}
                        className={`w-full h-full object-contain transition-opacity duration-300 ${imageState === 'success' ? 'opacity-100' : 'opacity-0'}`}
                        onError={() => handleImageError(product.id, product.image)}
                        onLoad={() => handleImageLoad(product.id)}
                      />
                      
                      {/* Fallback image for error cases */}
                      {imageState === 'error' && (
                        <img
                          src={getFallbackImage(product.name)}
                          alt={`${product.name} (fallback)`}
                          className="w-full h-full object-contain absolute inset-0 z-0"
                          onLoad={() => console.log("Fallback image loaded for:", product.name)}
                        />
                      )}
                      
                      {imageState === 'loading' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                          <RefreshCw className="h-8 w-8 text-gray-400 animate-spin" />
                        </div>
                      )}
                      
                      {imageState === 'error' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100/50 p-2 z-10">
                          <ImageOff className="h-8 w-8 text-gray-400 mb-2" />
                          <button 
                            onClick={() => handleRetry(product.id)}
                            className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1"
                          >
                            <RefreshCw className="h-3 w-3" /> Retry
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <p className="text-xs font-medium text-gray-700 truncate">{product.name}</p>
                <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default ProductImageSandbox;

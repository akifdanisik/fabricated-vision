
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ImageOff, RefreshCw, Image as ImageIcon } from 'lucide-react';

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
  const [imageStates, setImageStates] = useState<Record<string, 'loading' | 'error' | 'success'>>({});
  const [retryAttempts, setRetryAttempts] = useState<Record<string, number>>({});

  if (!isVisible || products.length === 0) return null;

  const handleImageError = (productId: string, imageSrc: string) => {
    console.log("Image failed to load:", imageSrc);
    
    setImageStates(prev => ({
      ...prev,
      [productId]: 'error'
    }));
  };

  const handleImageLoad = (productId: string) => {
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
  };

  return (
    <Card className="mt-4 p-4 bg-white/50 backdrop-blur-sm border border-gray-100">
      <h3 className="text-sm font-medium mb-3 text-gray-700">Product Images</h3>
      <ScrollArea className="h-[250px]">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {products.map((product) => {
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
                      
                      {imageState === 'loading' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                          <RefreshCw className="h-8 w-8 text-gray-400 animate-spin" />
                        </div>
                      )}
                      
                      {imageState === 'error' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-2">
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

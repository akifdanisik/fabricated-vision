
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { GripVertical } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DraggableMessageProps {
  content: string;
  className?: string;
  onDragStart?: () => void;
}

const DraggableMessage: React.FC<DraggableMessageProps> = ({ 
  content, 
  className,
  onDragStart 
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, text: string) => {
    e.dataTransfer.setData('text/plain', text);
    e.dataTransfer.effectAllowed = 'copy';
    setIsDragging(true);
    if (onDragStart) onDragStart();
    
    // Add a little indicator that dragging started
    toast({
      title: "Dragging content",
      description: "Drop in the action panel to create a new action"
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Split content into paragraphs for individual dragging
  const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);

  return (
    <div className="relative group">
      {paragraphs.map((paragraph, index) => (
        <div 
          key={index} 
          draggable 
          onDragStart={(e) => handleDragStart(e, paragraph)} 
          onDragEnd={handleDragEnd}
          className={cn(
            "relative mb-1.5 p-1.5 rounded cursor-grab",
            isDragging ? "bg-gray-100/50" : "hover:bg-gray-100/30",
            className
          )}
        >
          <div className="absolute left-0 top-1/2 -ml-5 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="h-3.5 w-3.5 text-gray-400" />
          </div>
          <p className="text-sm text-gray-800">{paragraph}</p>
        </div>
      ))}
    </div>
  );
};

export default DraggableMessage;


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
            "relative mb-2 p-2 rounded cursor-grab",
            isDragging ? "bg-primary/10" : "hover:bg-accent-pale/20",
            className
          )}
        >
          <div className="absolute left-0 top-1/2 -ml-6 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          <p>{paragraph}</p>
        </div>
      ))}
    </div>
  );
};

export default DraggableMessage;

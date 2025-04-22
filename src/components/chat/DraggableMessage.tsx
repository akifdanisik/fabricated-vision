
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { GripVertical } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface NumberedItem {
  id: string;
  title: string;
  description: string;
  type: 'risk' | 'finding' | 'document' | 'supplier';
  severity?: 'low' | 'medium' | 'high';
}

interface DraggableMessageProps {
  id: string;
  content?: string;
  type: 'risk' | 'finding' | 'document' | 'supplier';
  number: number;
  items: NumberedItem[];
  className?: string;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  isActive?: boolean;
}

const DraggableMessage: React.FC<DraggableMessageProps> = ({ 
  id,
  content,
  type,
  number,
  items,
  className,
  onDragStart,
  onDragEnd,
  isActive = false
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const getTypeLabel = () => {
    switch (type) {
      case 'risk': return 'Risks';
      case 'finding': return 'Findings';
      case 'document': return 'Documents';
      case 'supplier': return 'Suppliers';
      default: return 'Items';
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'risk': return 'bg-red-100 text-red-700 border-red-200';
      case 'finding': return 'bg-green-100 text-green-700 border-green-200';
      case 'document': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'supplier': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({
      id,
      type,
      items
    }));
    e.dataTransfer.effectAllowed = 'copy';
    setIsDragging(true);
    if (onDragStart) onDragStart();
    
    // Add a little indicator that dragging started
    toast({
      title: "Dragging content",
      description: `Drop in the action panel to analyze ${getTypeLabel().toLowerCase()}`
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (onDragEnd) onDragEnd();
  };

  return (
    <div 
      draggable 
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}
      className={cn(
        "relative inline-flex items-center gap-1 px-2 py-1 rounded-full border cursor-grab text-xs font-medium",
        getBgColor(),
        isDragging || isActive ? "ring-2 ring-offset-1" : "",
        className
      )}
    >
      <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-[10px]">
        {number}
      </span>
      <span>{getTypeLabel()}</span>
      <GripVertical className="h-3 w-3 ml-0.5 opacity-60" />
    </div>
  );
};

export default DraggableMessage;

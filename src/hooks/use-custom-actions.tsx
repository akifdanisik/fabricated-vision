
import { useState } from 'react';
import { ActionItem } from '@/components/chat/ActionPreview';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/hooks/use-toast';

export type CustomAction = ActionItem & {
  isCustom: boolean;
};

export function useCustomActions() {
  const [customActions, setCustomActions] = useState<CustomAction[]>([]);

  const addCustomAction = (content: string) => {
    // Determine a title (first line or first few words)
    let title = content.split('\n')[0];
    if (title.length > 25) {
      title = title.substring(0, 25) + '...';
    }
    
    const newAction: CustomAction = {
      id: uuidv4(),
      title: title,
      description: content.length > 60 ? content.substring(0, 60) + '...' : content,
      icon: 'package', // Default icon
      actionLabel: 'Use',
      onClick: () => {
        toast({
          title: "Action executed",
          description: "You selected: " + title
        });
      },
      category: 'Custom Actions',
      isCustom: true
    };
    
    setCustomActions(prev => [...prev, newAction]);
    
    toast({
      title: "Action added",
      description: "Custom action has been created"
    });
    
    return newAction;
  };
  
  const removeCustomAction = (id: string) => {
    setCustomActions(prev => prev.filter(action => action.id !== id));
  };
  
  const clearCustomActions = () => {
    setCustomActions([]);
  };
  
  return {
    customActions,
    addCustomAction,
    removeCustomAction,
    clearCustomActions
  };
}

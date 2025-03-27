
import { toast } from "sonner";

// Export the toast directly from sonner
export { toast };

// Create a simplified useToast hook that just returns the toast function
export const useToast = () => {
  return {
    toast
  };
};

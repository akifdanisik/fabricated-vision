
import { toast as sonnerToast } from "sonner";
import { type ToastProps } from "@/components/ui/toast";

export { sonnerToast as toast };

export interface UseToastReturn {
  toast: typeof sonnerToast;
  toasts: ToastProps[];
}

// Create a custom useToast hook that returns both the toast function and an empty toasts array
// This is for compatibility with both the sonner implementation and the shadcn/ui Toaster component
export const useToast = (): UseToastReturn => {
  // We're returning an empty array as 'toasts' for compatibility with the Toaster component
  return {
    toast: sonnerToast,
    toasts: [] // Empty array to satisfy the type requirement
  };
};

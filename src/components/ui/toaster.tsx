
import { Toaster as ShadcnToaster } from "sonner";
import { useTheme } from "next-themes";

// This is a wrapper around the Sonner toaster
// Original shadcn/ui Toaster implementation has been replaced with Sonner
export function Toaster() {
  const { theme = "system" } = useTheme();

  return (
    <ShadcnToaster
      theme={theme as any}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
    />
  );
}

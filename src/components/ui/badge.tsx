
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-white hover:bg-primary/80",
        secondary:
          "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200/80",
        destructive:
          "border-transparent bg-red-500 text-white hover:bg-red-500/80",
        outline: "text-foreground border-gray-200",
        success:
          "border-transparent bg-green-100 text-green-800 hover:bg-green-200/80",
        warning:
          "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200/80",
        accent:
          "border-transparent bg-accent text-white hover:bg-accent/80",
        soft:
          "border-transparent bg-primary-light text-primary hover:bg-primary-light/80",
        medium:
          "border-transparent bg-accent-medium text-white hover:bg-accent-medium/80",
        pale:
          "border-transparent bg-accent-pale text-primary-dark hover:bg-accent-pale/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "premium-gradient text-primary-foreground hover:opacity-90 shadow-lg hover:shadow-xl transform hover:scale-105 smooth-transition",
        destructive:
          "bg-destructive/80 backdrop-blur-md text-destructive-foreground hover:bg-destructive/60 shadow-lg border border-white/10",
        outline:
          "glass-button text-foreground hover:text-accent-foreground hover:scale-105 animate-glow",
        secondary:
          "bg-secondary/80 backdrop-blur-md text-secondary-foreground hover:bg-secondary/60 border border-white/10 smooth-transition hover:scale-105",
        ghost: "hover:bg-white/10 hover:text-accent-foreground backdrop-blur-sm smooth-transition hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-glow smooth-transition",
        success: "bg-success/80 backdrop-blur-md text-success-foreground hover:bg-success/60 shadow-lg border border-white/10 hover:scale-105",
        warning: "bg-warning/80 backdrop-blur-md text-warning-foreground hover:bg-warning/60 shadow-lg border border-white/10 hover:scale-105",
        glass: "glass-button text-foreground hover:scale-105",
        premium: "premium-gradient text-primary-foreground hover:opacity-90 shadow-[0_0_30px_hsl(var(--primary)/0.4)] transform hover:scale-110 bounce-transition glass-button animate-glow"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

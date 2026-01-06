import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const premiumButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-center",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold rounded-full px-4 sm:px-8 py-3 sm:py-4 shadow-[0_0_40px_hsl(38_92%_50%/0.4)] hover:scale-105 hover:shadow-[0_0_60px_hsl(38_92%_50%/0.6)]",
        secondary:
          "bg-secondary/60 text-foreground border border-border/50 rounded-full px-4 sm:px-8 py-3 sm:py-4 hover:bg-secondary hover:border-primary/40 backdrop-blur-sm",
        ghost:
          "text-muted-foreground hover:text-foreground",
        outline:
          "border border-primary/40 text-foreground rounded-full px-4 sm:px-8 py-3 sm:py-4 hover:bg-primary/10 hover:border-primary/60 backdrop-blur-sm",
      },
      size: {
        default: "h-auto min-h-[44px] sm:min-h-[48px] text-sm sm:text-base",
        lg: "h-auto min-h-[48px] sm:min-h-[56px] text-sm sm:text-lg px-5 sm:px-10",
        sm: "h-auto min-h-[40px] text-xs sm:text-sm px-4 sm:px-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface PremiumButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof premiumButtonVariants> {}

const PremiumButton = React.forwardRef<HTMLButtonElement, PremiumButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(premiumButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
PremiumButton.displayName = "PremiumButton";

export { PremiumButton, premiumButtonVariants };

<<<<<<< HEAD
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
=======
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
<<<<<<< HEAD
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
=======
        default: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
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
<<<<<<< HEAD
)
=======
);
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
<<<<<<< HEAD
  asChild?: boolean
=======
  asChild?: boolean;
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
<<<<<<< HEAD
    const Comp = asChild ? Slot : "button"
=======
    const Comp = asChild ? Slot : "button";
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
<<<<<<< HEAD
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
=======
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9

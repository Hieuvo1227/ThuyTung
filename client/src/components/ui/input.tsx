<<<<<<< HEAD
import * as React from "react"

import { cn } from "@/lib/utils"

=======
import * as React from "react";

import { cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
<<<<<<< HEAD
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
=======
          "flex h-10 w-full rounded-md border border-input bg-white dark:bg-gray-800 dark:text-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9
          className
        )}
        ref={ref}
        {...props}
      />
<<<<<<< HEAD
    )
  }
)
Input.displayName = "Input"

export { Input }
=======
    );
  }
);
Input.displayName = "Input";

export { Input };
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9

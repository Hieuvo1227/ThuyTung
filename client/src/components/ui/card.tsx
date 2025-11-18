<<<<<<< HEAD
import * as React from "react"

import { cn } from "@/lib/utils"
=======
import * as React from "react";
import { cn } from "@/lib/utils";
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
<<<<<<< HEAD
      "rounded-lg border bg-card text-card-foreground shadow-sm",
=======
      "rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-card text-card-foreground shadow-sm",
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9
      className
    )}
    {...props}
  />
<<<<<<< HEAD
))
Card.displayName = "Card"
=======
));
Card.displayName = "Card";
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
<<<<<<< HEAD
))
CardHeader.displayName = "CardHeader"
=======
));
CardHeader.displayName = "CardHeader";
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
<<<<<<< HEAD
))
CardTitle.displayName = "CardTitle"
=======
));
CardTitle.displayName = "CardTitle";
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
<<<<<<< HEAD
))
CardDescription.displayName = "CardDescription"
=======
));
CardDescription.displayName = "CardDescription";
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
<<<<<<< HEAD
))
CardContent.displayName = "CardContent"
=======
));
CardContent.displayName = "CardContent";
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
<<<<<<< HEAD
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
=======
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9

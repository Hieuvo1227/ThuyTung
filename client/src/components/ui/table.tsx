<<<<<<< HEAD
import * as React from "react"

import { cn } from "@/lib/utils"
=======
"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
<<<<<<< HEAD
))
Table.displayName = "Table"
=======
));
Table.displayName = "Table";
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
<<<<<<< HEAD
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"
=======
  <thead
    ref={ref}
    className={cn(
      "[&_tr]:border-b-2 [&_tr]:border-gray-300 dark:[&_tr]:border-gray-700",
      className
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
<<<<<<< HEAD
))
TableBody.displayName = "TableBody"
=======
));
TableBody.displayName = "TableBody";
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
<<<<<<< HEAD
))
TableFooter.displayName = "TableFooter"
=======
));
TableFooter.displayName = "TableFooter";
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
<<<<<<< HEAD
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
=======
      "border-b border-gray-200 dark:border-gray-700 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9
      className
    )}
    {...props}
  />
<<<<<<< HEAD
))
TableRow.displayName = "TableRow"
=======
));
TableRow.displayName = "TableRow";
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
<<<<<<< HEAD
))
TableHead.displayName = "TableHead"
=======
));
TableHead.displayName = "TableHead";
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
<<<<<<< HEAD
))
TableCell.displayName = "TableCell"
=======
));
TableCell.displayName = "TableCell";
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
<<<<<<< HEAD
))
TableCaption.displayName = "TableCaption"
=======
));
TableCaption.displayName = "TableCaption";
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
<<<<<<< HEAD
}
=======
};
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9

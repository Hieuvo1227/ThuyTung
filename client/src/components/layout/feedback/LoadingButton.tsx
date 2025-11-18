import React from "react";
import { Button } from "@/components/ui/button";

interface LoadingButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  className?: string;
  onClick?: () => void;
}

export default function LoadingButton({
  children,
  loading = false,
  fullWidth = false,
  variant = "default",
  className = "",
  onClick,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      variant={variant}
      className={`${fullWidth ? "w-full" : ""} ${className}`}
      disabled={loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
          Đang xử lý...
        </div>
      ) : (
        children
      )}
    </Button>
  );
}

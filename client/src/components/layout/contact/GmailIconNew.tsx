import React from "react";

export default function GmailIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.833 17.395l-4.167-4.167 1.585-1.585 2.582 2.582 6.587-6.587 1.585 1.585-8.172 8.172z" />
    </svg>
  );
}
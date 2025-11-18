import React from "react";

export default function ZaloIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.2 18c-.663 0-1.2-.537-1.2-1.2V9.6c0-.663.537-1.2 1.2-1.2s1.2.537 1.2 1.2v7.2c0 .663-.537 1.2-1.2 1.2zm4.8 0c-.663 0-1.2-.537-1.2-1.2V9.6c0-.663.537-1.2 1.2-1.2s1.2.537 1.2 1.2v7.2c0 .663-.537 1.2-1.2 1.2z"/>
    </svg>
  );
}
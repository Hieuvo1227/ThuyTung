"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { NavItem } from "./NavItem";
import { navigation } from "./Navbar";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "lg:hidden fixed inset-0 z-[60] bg-black bg-opacity-50 transition-opacity",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={() => setIsOpen(false)}
    >
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Menu
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="p-2"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Menu content starting below navbar */}
        <div className="p-6 pt-4">
          <div className="flex flex-col space-y-6">
            {navigation.map((item) => (
              <NavItem
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </NavItem>
            ))}
            <div className="pt-4">
              <Button variant="secondary" className="w-full">
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  Tư vấn miễn phí
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

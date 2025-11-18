"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
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

  console.log('MobileMenu rendering, navigation items:', navigation);
  console.log('MobileMenu isOpen:', isOpen);

  return (
    <>
      {/* Overlay - covers everything below MainNavbar */}
      {isOpen && (
        <div
          className="lg:hidden fixed bg-black/70"
          onClick={() => setIsOpen(false)}
          style={{ 
            zIndex: 10000,
            top: 'var(--main-navbar-top, 0px)',
            left: 0,
            right: 0,
            bottom: 0
          }}
        />
      )}
      
      {/* Menu Panel - fixed at MainNavbar position, does not move when TopContactBar hides */}
      <div
        className={cn(
          "lg:hidden fixed right-0 w-64 shadow-2xl transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        onClick={(e) => e.stopPropagation()}
        style={{ 
          zIndex: 10001,
          backgroundColor: '#FFFFFF',
          top: 'var(--main-navbar-top, 0px)',
          height: 'calc(100vh - var(--main-navbar-top, 0px))',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header with close button */}
        <div 
          className="flex justify-between items-center p-4 border-b border-gray-300 flex-shrink-0"
          style={{ 
            backgroundColor: '#FFFFFF',
            minHeight: '64px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
        >
          <h2 className="text-xl font-bold" style={{ color: '#111827' }}>
            Menu
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100"
            style={{ color: '#374151' }}
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Menu content */}
        <div 
          className="flex-1 overflow-y-auto"
          style={{ 
            backgroundColor: '#FFFFFF',
            padding: '16px'
          }}
        >
          <div className="flex flex-col">
            <div className="text-sm font-semibold mb-3" style={{ color: '#6B7280' }}>
              ĐIỀU HƯỚNG
            </div>
            {navigation && navigation.length > 0 ? (
              navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 px-2 hover:bg-gray-50 rounded-md transition-colors"
                  style={{
                    borderBottom: index < navigation.length - 1 ? '1px solid #E5E7EB' : 'none'
                  }}
                >
                  <div className="text-base font-medium" style={{ color: '#111827' }}>
                    {item.name}
                  </div>
                </Link>
              ))
            ) : (
              <div className="py-4 text-center" style={{ color: '#EF4444' }}>
                ⚠️ Không tìm thấy menu items
              </div>
            )}
            
            <div className="mt-6">
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium" 
                style={{ minHeight: '48px', fontSize: '16px' }}
                onClick={() => setIsOpen(false)}
              >
                <Link href="/contact" className="w-full h-full flex items-center justify-center">
                  Tư vấn miễn phí
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
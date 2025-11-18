"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import TopContactBar from "./TopContactBar";
import MainNavbar from "./MainNavbar";

export const navigation = [
  { name: "TRANG CHỦ", href: "/" },
  { name: "GIỚI THIỆU", href: "/about" },
  { name: "CHƯƠNG TRÌNH", href: "/programs" },
  { name: "HỎI ĐÁP", href: "/faq" },
  { name: "LIÊN HỆ", href: "/contact" },
];

export default function Navbar() {
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const topBarRef = useRef<HTMLDivElement>(null);
  const mainNavbarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const previousPathname = useRef<string | null>(null);

  // Check if we're on an admin page
  const isAdminPage = pathname && pathname.startsWith('/admin');

  // Check if we were previously on an admin page
  const wasAdminPage = previousPathname.current && previousPathname.current.startsWith('/admin');

  useEffect(() => {
    // If we're navigating from an admin page to a non-admin page, reset the page
    if (wasAdminPage && !isAdminPage) {
      // Reset scroll position
      window.scrollTo(0, 0);
      
      // Reload the page to ensure clean state
      window.location.reload();
    }
    
    // Update the previous pathname
    previousPathname.current = pathname;
  }, [pathname, isAdminPage, wasAdminPage]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide top bar when scrolling down past 100px threshold
      if (currentScrollY > prevScrollY && currentScrollY > 100) {
        setIsTopBarVisible(false);
      } 
      // Show top bar only when scrolling up AND near the top of the page
      else if (currentScrollY < prevScrollY && currentScrollY <= 100) {
        setIsTopBarVisible(true);
      }
      // Always show top bar when at the very top of the page
      else if (currentScrollY === 0) {
        setIsTopBarVisible(true);
      }
      
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  // Calculate top bar height for dynamic positioning
  const [topBarHeight, setTopBarHeight] = useState(0);
  const [mainNavbarHeight, setMainNavbarHeight] = useState(0);

  useEffect(() => {
    const updateHeights = () => {
      if (topBarRef.current) {
        setTopBarHeight(topBarRef.current.clientHeight);
      }
      if (mainNavbarRef.current) {
        setMainNavbarHeight(mainNavbarRef.current.clientHeight);
      }
    };

    // Initial calculation
    updateHeights();

    // Update on resize
    window.addEventListener('resize', updateHeights);

    // Use MutationObserver to detect changes in heights
    const observer = new MutationObserver(updateHeights);
    if (topBarRef.current) {
      observer.observe(topBarRef.current, { childList: true, subtree: true, attributes: true });
    }
    if (mainNavbarRef.current) {
      observer.observe(mainNavbarRef.current, { childList: true, subtree: true, attributes: true });
    }

    return () => {
      window.removeEventListener('resize', updateHeights);
      observer.disconnect();
    };
  }, []);

  // Update body padding to prevent content overlap
  useEffect(() => {
    const totalHeight = isTopBarVisible ? topBarHeight + mainNavbarHeight : mainNavbarHeight;
    document.body.style.paddingTop = `${totalHeight}px`;
    
    // Set CSS variables for positioning
    // Total navbar height (for body padding)
    document.documentElement.style.setProperty('--navbar-height', `${totalHeight}px`);
    // Fixed position for mobile menu (always at MainNavbar position, not affected by TopContactBar)
    document.documentElement.style.setProperty('--main-navbar-top', `${topBarHeight}px`);
    
    // Add transition to body padding for smooth animation
    document.body.style.transition = 'padding-top 0.3s ease-in-out';
    
    return () => {
      document.body.style.transition = '';
    };
  }, [isTopBarVisible, topBarHeight, mainNavbarHeight]);

  return (
    <header className="fixed top-0 left-0 right-0 w-full overflow-visible" style={{ backgroundColor: 'transparent', zIndex: 50 }}>
      {/* Combined navbar container - ensures seamless integration without gaps */}
      {/* Updated to use max-w-screen-3xl to match the wider main navbar */}
      <div 
        className="flex flex-col w-full max-w-screen-3xl mx-auto bg-green-100 dark:bg-gray-800 overflow-visible" 
        style={{ 
          boxShadow: 'none', 
          borderBottom: 'none', 
          paddingBottom: '0', 
          marginBottom: '0',
          transform: isTopBarVisible ? 'translateY(0)' : `translateY(-${topBarHeight}px)`,
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        {/* TopContactBar - appears above MainNavbar when visible, hidden on admin pages */}
        {!isAdminPage && (
          <div 
            ref={topBarRef}
            className={`bg-primary dark:bg-primary/90 transition-all duration-300 ease-in-out ${
              isTopBarVisible ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            <TopContactBar />
          </div>
        )}
        
        {/* MainNavbar - always visible, directly below TopContactBar */}
        <div 
          ref={mainNavbarRef}
          className={`main-navbar w-full transition-all duration-300 ease-in-out ${
            isAdminPage 
              ? 'bg-green-200 dark:bg-blue-800' 
              : 'bg-green-100 dark:bg-gray-800'
          }`}
          style={{
            boxShadow: 'none',
            borderBottom: 'none',
            paddingBottom: '0',
            marginBottom: '0',
          }}
        >
          <MainNavbar />
        </div>
      </div>
    </header>
  );
}
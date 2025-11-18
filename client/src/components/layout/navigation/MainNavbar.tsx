import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggleButton } from "../theme/ThemeToggleButton";
import MobileMenu from "./MobileMenu";
import { NavItem } from "./NavItem";
import { navigation } from "./Navbar";

export default function MainNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
      {/* Increased width by 1/3 - using max-w-screen-3xl instead of max-w-screen-2xl */}
      {/* Reduced height by 1/4 - from h-32 to h-24 (25% reduction) */}
<<<<<<< HEAD
      <nav className="max-w-screen-3xl mx-auto px-2 sm:px-4 lg:px-6 h-24 bg-green-100 dark:bg-gray-800 overflow-visible">
        {/* Restructured for smaller screens to have 3 clear sections with better spacing */}
        <div className="flex justify-between items-center h-full pl-2 sm:pl-3">
          {/* Logo Section - Left */}
          <div className="flex-shrink-0 flex items-center h-full pr-3 lg:pr-5">
            <Link href="/" className="flex items-center h-full">
              <Image
                src="/images/logo12.png"
                alt="Company logo"
                width={200}
                height={80}
                className="object-contain h-18 sm:h-20 md:h-22 lg:h-24"
=======
      <nav className="max-w-screen-3xl mx-auto px-4 sm:px-6 lg:px-8 h-24 bg-green-100 dark:bg-gray-800 overflow-visible">
        {/* Restructured for smaller screens to have 3 clear sections with better spacing */}
        <div className="flex justify-between items-center h-full pl-2 sm:pl-4">
          {/* Logo Section - Left */}
          <div className="flex-shrink-0 flex items-center h-full pr-4">
            <Link href="/" className="flex items-center h-full">
              <Image
                src="/images/logo2.png"
                alt="Company logo"
                width={180}
                height={70}
                className="object-contain h-16 sm:h-18 md:h-20"
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9
                style={{ width: 'auto' }}
                priority
              />
            </Link>
          </div>

          {/* Navigation Links Section - Center */}
<<<<<<< HEAD
          <div className="hidden md:flex items-center md:space-x-3 lg:space-x-5 xl:space-x-7 px-3 lg:px-4">
            {navigation.map((item, index) => (
              <React.Fragment key={item.name}>
                <div className="text-sm md:text-base lg:text-lg xl:text-xl font-medium whitespace-nowrap">
=======
          <div className="hidden md:flex items-center space-x-8 px-4">
            {navigation.map((item, index) => (
              <React.Fragment key={item.name}>
                <div className="text-lg font-medium"> {/* Increased from text-base to text-lg (50% larger) */}
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9
                  <NavItem href={item.href}>
                    {item.name}
                  </NavItem>
                </div>
                {index < navigation.length - 1 && (
<<<<<<< HEAD
                  <div className="h-5 w-px bg-primary/30 hidden md:block" />
=======
                  <div className="h-5 w-px bg-primary/30" />
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Right Side Actions Section - Right */}
<<<<<<< HEAD
          <div className="hidden md:flex flex-shrink-0 items-center space-x-3 lg:space-x-5 pl-3 lg:pl-5">
            <ThemeToggleButton />
            <Link href={"/contact"} prefetch={true}>
              <Button size="default" className="bg-primary hover:bg-primary/90 text-white px-4 py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 text-base md:text-lg">
=======
          <div className="hidden md:flex flex-shrink-0 items-center space-x-6 pl-4">
            <ThemeToggleButton />
            <Link href={"/contact"} prefetch={true}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-6 py-2 text-lg"> {/* Added text-lg */}
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9
                Tư vấn miễn phí
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
<<<<<<< HEAD
          <div className="md:hidden flex items-center space-x-2">
=======
          <div className="md:hidden flex items-center space-x-2.5">
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9
            <ThemeToggleButton />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-gray-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}
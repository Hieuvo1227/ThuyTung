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
      <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-28 bg-green-100 dark:bg-gray-800">
        <div className="flex justify-between items-center h-full">
          {/* Logo: container matches nav height and centers; image scaled to be almost as tall as nav */}
          <Link href="/" className="flex-shrink-0 flex items-center h-full overflow-hidden">
            <Image
              src="/images/logo2.png"
              alt="Company logo"
              width={200}
              height={75}
              className="object-contain h-16 sm:h-20 md:h-24"
              style={{ width: 'auto' }}
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-7">
            {navigation.map((item, index) => (
              <React.Fragment key={item.name}>
                <div className="text-base font-medium">
                  <NavItem href={item.href}>
                    {item.name}
                  </NavItem>
                </div>
                {index < navigation.length - 1 && (
                  <div className="h-5 w-px bg-primary/30" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex flex-shrink-0 items-center space-x-3.5">
            <ThemeToggleButton />
            <Link href={"/contact"} prefetch={true}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-7 py-2.5">
                Tư vấn miễn phí
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2.5">
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
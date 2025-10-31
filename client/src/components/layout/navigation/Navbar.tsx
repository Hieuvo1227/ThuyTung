"use client";

import React, { useState } from "react";
import { EMAIL } from "@/utils/services/constants";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Menu, X, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggleButton } from "../theme/ThemeToggleButton";
import MobileMenu from "./MobileMenu";
import { NavItem } from "./NavItem";

export const navigation = [
  { name: "TRANG CHỦ", href: "/" },
  { name: "GIỚI THIỆU", href: "/about" },
  { name: "CHƯƠNG TRÌNH", href: "/programs" },
  { name: "HỎI ĐÁP", href: "/faq" },
  { name: "LIÊN HỆ", href: "/contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
      <header className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors">
        {/* Top bar */}
        <div className="bg-primary dark:bg-primary text-white py-4 text-sm">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center md:justify-between gap-x-6 gap-y-2">
              <a href="tel:0908616014" className="flex items-center space-x-2 hover:underline">
                <Phone size={18} />
                <span>0908.616.014</span>
              </a>
              <a href={`mailto:${EMAIL}`} className="hidden lg:flex items-center space-x-2 hover:underline">
                <Mail size={18} />
                <span>{EMAIL}</span>
              </a>
              <div className="hidden xl:flex items-center space-x-2">
                <MapPin size={18} />
                <span>24/22 Đường số 23, P. Hiệp Bình Chánh, Tp Thủ Đức</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={18} />
                <span>Thứ 2 - Thứ 6 : 8:00 - 18:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-20">
          <div className="flex justify-between items-center h-full">
            {/* Logo: container matches nav height and centers; image scaled to be almost as tall as nav */}
            <Link href="/" className="flex-shrink-0 flex items-center h-full overflow-hidden">
              <Image
                src="/images/logo2.png"
                alt="Company logo"
                width={160}
                height={64}
                className="object-contain h-12 sm:h-14 md:h-16"
                style={{ width: 'auto' }}
                priority
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
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
            <div className="hidden md:flex flex-shrink-0 items-center space-x-5">
              <ThemeToggleButton />
              <Link href={"/contact"} prefetch={true}>
                <Button size="lg" variant="default" className="shadow-lg text-white">
                  Tư vấn miễn phí
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggleButton />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../../../styles/navitem.module.css";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function NavItem({ href, children, onClick }: NavItemProps) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`${styles.navItem} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

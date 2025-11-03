"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { PHONE } from "@/utils/services/constants";
import Link from "next/link";
import { Phone } from "lucide-react";
import Image from "next/image";

export default function FloatingContactButtons() {
    const pathname = usePathname();
    
    if (pathname?.startsWith('/admin') || pathname?.startsWith('/auth')) {
        return null;
    }

    return null;
}
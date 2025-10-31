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

    return (
        <div className="fixed bottom-24 right-6 z-50 flex flex-col space-y-3">
            <Link
                href={`https://zalo.me/${PHONE.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg animate-pulse-scale"
            >
                <div className="relative w-9 h-9 bg-white rounded-full flex items-center justify-center z-10">
                    <Image
                        src="/images/zalo_icon.png"
                        alt="Zalo"
                        width={28}
                        height={28}
                        className="w-7 h-7 object-contain"
                    />
                </div>
                <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Chat qua Zalo
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-l-4 border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                </div>
            </Link>

            <Link
                href={`tel:${PHONE.replace(/\D/g, "")}`}
                className="group relative w-11 h-11 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg animate-pulse-scale"
            >
                <Phone className="relative w-5 h-5 text-white z-10" />
                <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Gọi điện ngay
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-l-4 border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                </div>
            </Link>
        </div>
    );
}
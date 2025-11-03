"use client";

import React from "react";
import { EMAIL, PHONE } from "@/utils/services/constants";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import FacebookIcon from "@/components/layout/contact/FacebookIcon";
import Image from "next/image";
import Link from "next/link";

export default function TopContactBar() {
    return (
        <div className="bg-primary dark:bg-primary/90 text-white py-3 text-sm">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
                    {/* Mobile view - icons on right, working hours on left */}
                    <div className="md:hidden flex items-center justify-between w-full">
                        {/* Working hours on left */}
                        <div className="flex items-center space-x-1">
                            <Clock size={16} />
                            <span className="text-xs">8:00 - 18:00</span>
                        </div>
                        
                        {/* Social Media Icons on right */}
                        <div className="flex items-center space-x-3">
                            {/* Facebook Icon */}
                            <a 
                                href="https://web.facebook.com/profile.php?id=61580899137876&mibextid=wwXIfr&rdid=hkY4hNdQb0Cj500P&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F1GULZ8ZRrY%2F%3Fmibextid%3DwwXIfr%26_rdc%3D1%26_rdr" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-gray-200 transition-colors"
                                aria-label="Facebook"
                            >
                                <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                                    <FacebookIcon className="w-5 h-5 text-blue-600" />
                                </div>
                            </a>
                            
                            {/* Zalo Icon */}
                            <a 
                                href={`https://zalo.me/${PHONE.replace(/\D/g, "")}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-gray-200 transition-colors"
                                aria-label="Zalo"
                            >
                                <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                                    <Image
                                        src="/images/zalo.jpg"
                                        alt="Zalo"
                                        width={28}
                                        height={28}
                                        className="w-5 h-5 object-contain"
                                    />
                                </div>
                            </a>
                            
                            {/* Gmail Icon */}
                            <a 
                                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-gray-200 transition-colors"
                                aria-label="Gmail"
                            >
                                <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                                    <Image
                                        src="/images/Gmail.png"
                                        alt="Gmail"
                                        width={28}
                                        height={28}
                                        className="w-5 h-5 object-contain"
                                    />
                                </div>
                            </a>
                            
                            {/* Phone Icon */}
                            <a 
                                href={`tel:${PHONE}`}
                                className="hover:text-gray-200 transition-colors"
                                aria-label="Call"
                            >
                                <Phone className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    
                    {/* Desktop view - show full information */}
                    <div className="hidden md:flex items-center space-x-4">
                        <a href={`tel:${PHONE}`} className="flex items-center space-x-2 hover:underline transition-colors">
                            <Phone size={16} />
                            <span className="text-sm">0908.616.014</span>
                        </a>
                        <a href={`mailto:${EMAIL}`} className="flex items-center space-x-2 hover:underline transition-colors">
                            <Mail size={16} />
                            <span className="text-sm">{EMAIL}</span>
                        </a>
                    </div>
                    
                    <div className="hidden xl:flex items-center space-x-2">
                        <MapPin size={16} />
                        <span className="text-sm">24/22 Đường số 23, P. Hiệp Bình Chánh, Tp Thủ Đức</span>
                    </div>
                    
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Clock size={16} />
                            <span className="text-sm">Thứ 2 - Thứ 6 : 8:00 - 18:00</span>
                        </div>
                        
                        {/* Social Media Icons */}
                        <div className="flex items-center space-x-3">
                            {/* Facebook Icon */}
                            <a 
                                href="https://web.facebook.com/profile.php?id=61580899137876&mibextid=wwXIfr&rdid=hkY4hNdQb0Cj500P&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F1GULZ8ZRrY%2F%3Fmibextid%3DwwXIfr%26_rdc%3D1%26_rdr" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-gray-200 transition-colors"
                                aria-label="Facebook"
                            >
                                <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                                    <FacebookIcon className="w-5 h-5 text-blue-600" />
                                </div>
                            </a>
                            
                            {/* Zalo Icon */}
                            <a 
                                href={`https://zalo.me/${PHONE.replace(/\D/g, "")}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-gray-200 transition-colors"
                                aria-label="Zalo"
                            >
                                <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                                    <Image
                                        src="/images/zalo.jpg"
                                        alt="Zalo"
                                        width={28}
                                        height={28}
                                        className="w-5 h-5 object-contain"
                                    />
                                </div>
                            </a>
                            
                            {/* Gmail Icon */}
                            <a 
                                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-gray-200 transition-colors"
                                aria-label="Gmail"
                            >
                                <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                                    <Image
                                        src="/images/Gmail.png"
                                        alt="Gmail"
                                        width={28}
                                        height={28}
                                        className="w-5 h-5 object-contain"
                                    />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
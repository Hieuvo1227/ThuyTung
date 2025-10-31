"use client";

import React, { useState } from "react";
import ProgramFilters from "@/components/common/programs/ProgramFilters";

const countries = [
    { value: "", label: "Tất cả quốc gia" },
    { value: "Hàn Quốc", label: "Hàn Quốc" },
    { value: "Nhật Bản", label: "Nhật Bản" },
    { value: "Đài Loan", label: "Đài Loan" },
    { value: "Đức", label: "Đức" },
    { value: "Úc", label: "Úc" },
    { value: "Mỹ", label: "Mỹ" },
    { value: "Singapore", label: "Singapore" },
];


interface ProgramsPageClientProps {
    initialCountry?: string;
    initialPrograms: IProgram[];
}

export default function ProgramsPageClient({
    initialCountry = "",
    initialPrograms,
}: ProgramsPageClientProps) {
    const [programs] = useState<IProgram[]>(initialPrograms);

    return (
        <div className="py-6 bg-gray-50 dark:bg-gray-900 transition-colors">
            <div className="container mx-auto px-3">
                {/* 🔍 Bộ lọc & Danh sách */}
                <ProgramFilters
                    initialPrograms={programs}
                    countries={countries}
                    initialCountry={initialCountry}
                />
            </div>
        </div>
    );
}

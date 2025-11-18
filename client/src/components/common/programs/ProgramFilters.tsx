"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, MapPin } from "lucide-react";
import ProgramCard from "@/components/common/programs/ProgramCard";

interface ProgramFiltersProps {
    initialPrograms: IProgram[];
    countries: { value: string; label: string }[];
    initialCountry: string;
}

export default function ProgramFilters({
    initialPrograms,
    countries,
    initialCountry,
}: ProgramFiltersProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(initialCountry);
    const [filteredPrograms, setFilteredPrograms] =
        useState<IProgram[]>(initialPrograms);

    useEffect(() => {
        setSelectedCountry(initialCountry);
    }, [initialCountry]);

    useEffect(() => {
        let filtered = initialPrograms;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(
                (program) =>
                    program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    program.description
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    program.country.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by country
        if (selectedCountry) {
            filtered = filtered.filter(
                (program) => program.country === selectedCountry
            );
        }

        setFilteredPrograms(filtered);
    }, [initialPrograms, searchTerm, selectedCountry]);

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCountry("");
    };

    return (
        <>
            {/* Filters */}
            <section className="py-8 bg-white dark:bg-gray-800 border-b dark:border-gray-700 transition-colors">
                <div className="container mx-auto px-4">
                    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Search */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm chương trình..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                    />
                                </div>

                                {/* Country Filter */}
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <select
                                        value={selectedCountry}
                                        onChange={(e) => setSelectedCountry(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    >
                                        {countries.map((country) => (
                                            <option key={country.value} value={country.value}>
                                                {country.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Clear Filters */}
                                <Button
                                    variant="outline"
                                    onClick={clearFilters}
                                    className="flex items-center justify-center"
                                >
                                    <Filter className="w-4 h-4 mr-2" />
                                    Xóa bộ lọc
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Programs Grid */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    {/* Results Count */}
                    <div className="mb-8">
                        <p className="text-gray-600 dark:text-gray-300">
                            Tìm thấy{" "}
                            <span className="font-semibold text-primary">
                                {filteredPrograms.length}
                            </span>{" "}
                            chương trình
                        </p>
                    </div>

                    {/* Programs */}
                    {filteredPrograms.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {filteredPrograms.map((program) => (
                                <ProgramCard key={program._id} program={program} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Không tìm thấy chương trình nào
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                            </p>
                            <Button onClick={clearFilters}>Xóa tất cả bộ lọc</Button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

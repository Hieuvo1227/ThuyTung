"use client";

import React, { useEffect, useState } from "react";
import ProgramCard from "@/components/common/programs/ProgramCard";
import Link from "next/link";
import { useProgramStore } from "@/utils/stores/programStore";

export default function ProgramsSection() {
  const { getFeaturedPrograms } = useProgramStore();

  const [programs, setPrograms] = useState<IProgram[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getFeaturedPrograms();
      const data = res?.data?.programs || [];

      setPrograms(data);
    };

    fetchData();
  }, [getFeaturedPrograms]);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Chương Trình Du Học Nổi Bật
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Khám phá các cơ hội du học tại các quốc gia phát triển với chất
            lượng giáo dục hàng đầu thế giới
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {programs.slice(0, 3).map((program) => (
            <ProgramCard key={program._id} program={program} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center px-8 py-3 border-2 border-primary text-primary font-medium rounded-full hover:bg-primary hover:text-white transition-all duration-300"
          >
            Xem Tất Cả
          </Link>
        </div>
      </div>
    </section>
  );
}

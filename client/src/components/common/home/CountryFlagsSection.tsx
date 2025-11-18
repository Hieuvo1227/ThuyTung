"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface ICountry {
  name: string;
  flagSvg: string;
  queryParam: string;
  englishName: string;
}

const countries: ICountry[] = [
  {
    name: "Hàn Quốc",
    flagSvg: "/svg/south-korea_flag.svg",
    queryParam: "Hàn Quốc",
    englishName: "Korea",
  },
  {
    name: "Nhật Bản",
    flagSvg: "/svg/japan_flag.svg",
    queryParam: "Nhật Bản",
    englishName: "Japan",
  },
  {
    name: "Đài Loan",
    flagSvg: "/svg/taiwan_flag.svg",
    queryParam: "Đài Loan",
    englishName: "Taiwan",
  },
  {
    name: "Đức",
    flagSvg: "/svg/germany_flag.svg",
    queryParam: "Đức",
    englishName: "Germany",
  },
  {
    name: "Úc",
    flagSvg: "/svg/australia_flag.svg",
    queryParam: "Úc",
    englishName: "Australia",
  },
  {
    name: "Canada",
    flagSvg: "/svg/canada_flag.svg",
    queryParam: "Canada",
    englishName: "Canada",
  },
];

export default function CountryFlagsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section ref={ref} className="py-6 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="w-full px-4 sm:px-6 lg:px-8"> {/* THAY ĐỔI: Chuyển sang full-width với padding */}
        {/* Khung viền bao bọc toàn bộ section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Các Quốc Gia Đối Tác
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Khám phá các chương trình du học tại 6 quốc gia hàng đầu với nhiều
              cơ hội phát triển
            </p>
          </div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {countries.map((country) => (
              <motion.div key={country.name} variants={itemVariants}>
                <Link
                  href={`/programs?country=${encodeURIComponent(
                    country.queryParam
                  )}`}
                  className="group block"
                >
                  {/* Thẻ chứa lá cờ với nền và viền mới */}
                  <div
                    className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 h-48 flex flex-col items-center justify-center shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                  >
                    <div className="flex-grow flex items-center justify-center">
                      <Image
                        src={country.flagSvg}
                        alt={`${country.name} flag`}
                        width={72}
                        height={54}
                        className="w-full h-auto group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    <div className="mt-4">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {country.englishName}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}


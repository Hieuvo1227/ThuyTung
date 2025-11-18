"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/utils/services/constants";

interface LanguageProgram {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
}

const languagePrograms: LanguageProgram[] = [
  {
    id: "japanese",
    title: "Đào Tạo Nhật Ngữ",
    description:
      "Chương trình thương kết hợp giữa lý thuyết và thực hành, bao gồm giao tiếp, nghe, đọc và viết, giúp học viên tự tin sử dụng ngôn ngữ trong cuộc sống hàng ngày.",
    image: "/images/language/japanese.jpg",
    icon: "🗾",
  },
  {
    id: "chinese",
    title: "Đào Tạo Tiếng Hoa",
    description:
      "Chương trình thương kết hợp giữa lý thuyết và thực hành, bao gồm giao tiếp, nghe, đọc và viết, giúp học viên tự tin sử dụng ngôn ngữ trong cuộc sống hàng ngày.",
    image: "/images/language/chinese.jpg",
    icon: "💰",
  },
  {
    id: "korean",
    title: "Đào Tạo Tiếng Hàn",
    description:
      "Chương trình thương kết hợp giữa lý thuyết và thực hành, bao gồm giao tiếp, nghe, đọc và viết, giúp học viên tự tin sử dụng ngôn ngữ trong cuộc sống hàng ngày.",
    image: "/images/language/korean.jpg",
    icon: "🇰🇷",
  },
  {
    id: "english",
    title: "Đào Tạo Tiếng Anh",
    description:
      "Chương trình thương kết hợp giữa lý thuyết và thực hành, bao gồm giao tiếp, nghe, đọc và viết, giúp học viên tự tin sử dụng ngôn ngữ trong cuộc sống hàng ngày.",
    image: "/images/language/english.jpg",
    icon: "🎓",
  },
];

export default function LanguageTrainingSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-800 transition-colors">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <span className="text-primary text-sm mr-2">📚</span>
            <span className="text-primary font-semibold tracking-wider text-sm">
              SUPPORTING COACHING
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trung Tâm Ngoại Ngữ{" "}
            <span className="text-primary">Tại ${COMPANY}.</span>
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-4xl mx-auto">
            Chúng tôi sở hữu đa dạng chương trình đào tạo ngôn ngữ bài tư cơ bản
            đến nâng cao.
          </p>
        </div>

        {/* Language Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {languagePrograms.map((program) => (
            <div
              key={program.id}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 p-6"
            >
              <div className="flex gap-6">
                {/* Image */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-24 rounded-xl overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.title}
                      width={128}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {program.title}
                      </h3>
                      <div className="w-12 h-1 bg-primary rounded-full"></div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button className="w-10 h-10 border-2 border-primary text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                      <button className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors duration-300">
                        <span className="text-lg">{program.icon}</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {program.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/programs"
            className="inline-flex items-center px-8 py-3 border-2 border-primary text-primary font-medium rounded-full hover:bg-primary hover:text-white transition-all duration-300"
          >
            Xem Tất Cả
          </Link>
        </div>
      </div>
    </section>
  );
}

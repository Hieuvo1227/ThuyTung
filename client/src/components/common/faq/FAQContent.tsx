"use client";

import React, { useState } from "react";
// removed next/image usage to allow onError fallback
import { Search } from "lucide-react";

interface FAQContentProps {
  initialFAQs: IFAQ[];
  categories: string[];
}

const categoryImages: Record<string, string> = {
  "Hồ sơ du học": "/images/faq-application.jpg",
  "Chi phí": "/images/faq-costs.jpg",
  Visa: "/images/faq-visa.jpg",
  "Ngôn ngữ": "/images/faq-language.jpg",
  "Định cư": "/images/faq-immigration.jpg",
  "Dịch vụ": "/images/faq-services.jpg",
};

const truncate = (text: string, max = 160) =>
  text.length > max ? text.slice(0, max).trimEnd() + "…" : text;

export default function FAQContent({
  initialFAQs,
  categories,
}: FAQContentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const filteredFAQs = initialFAQs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tất cả" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (d?: string) => {
    if (!d) return "";
    try {
      return new Date(d).toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return d;
    }
  };

  return (
    <>
      {/* Search Section */}
      <section className="py-8 bg-white dark:bg-gray-800 transition-colors">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm câu hỏi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-lg focus:ring-2 focus:ring-primary/50 focus:outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
          </div>
        </div>
      </section>

      {/* FAQ Grid Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                HỎI ĐÁP
              </h2>
            </div>

            {/* Category Filter */}
            <div className="mb-8 flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                    selectedCategory === category
                      ? "bg-primary text-white shadow-lg"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary border border-gray-200 dark:border-gray-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredFAQs.map((faq, idx) => {
                // Prefer stored faq.imageUrl, fallback to category image, then placeholder
                const imgSrc = (faq as any).imageUrl || categoryImages[faq.category] || "/images/placeholder-program.jpg";
                const isImageLeft = idx % 2 === 0; // alternate layout like sample
                return (
                  <article
                    key={faq._id}
                    className="flex flex-col md:flex-row items-stretch bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-lg transition"
                  >
                    {isImageLeft ? (
                      <div className="md:w-1/3 w-full h-40 md:h-auto relative flex-shrink-0">
                        {/* use plain img to allow onError fallback */}
                        <img
                          src={imgSrc}
                          alt={faq.question}
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/images/placeholder-program.jpg";
                          }}
                          className="block w-full h-full object-cover"
                        />
                      </div>
                    ) : null}

                    <div className="p-6 md:flex-1">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {faq.question}
                      </h3>

                      <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                          {faq.category}
                        </span>
                        <span>{formatDate(faq.createdAt as unknown as string)}</span>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {truncate(faq.answer, 220)}
                      </p>
                    </div>

                    {!isImageLeft ? (
                      <div className="md:w-1/3 w-full h-40 md:h-auto relative flex-shrink-0">
                        <img
                          src={imgSrc}
                          alt={faq.question}
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/images/placeholder-program.jpg";
                          }}
                          className="block w-full h-full object-cover"
                        />
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Không tìm thấy câu hỏi nào
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Hãy thử thay đổi từ khóa tìm kiếm hoặc danh mục
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

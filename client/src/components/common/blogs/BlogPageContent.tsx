"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import Image from "next/image";
import BlogFilters from "@/components/common/blogs/BlogFilters";
import { useBlogStore } from "@/utils/stores/blogStore";

const categories = [
  { value: "", label: "Tất cả danh mục" },
  { value: "Visa & Thủ tục", label: "Visa & Thủ tục" },
  { value: "Chương trình học", label: "Chương trình học" },
  { value: "Chi phí du học", label: "Chi phí du học" },
  { value: "Học bổng", label: "Học bổng" },
  { value: "Kinh nghiệm", label: "Kinh nghiệm" },
  { value: "Hồ sơ du học", label: "Hồ sơ du học" },
];

export default function BlogPageContent() {
  const { getAllBlogs } = useBlogStore();

  const [blogs, setBlogs] = useState<IBlog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllBlogs();
      const data = response.data?.blogs;
      
      setBlogs(data || []);
    };

    fetchData();
  }, [getAllBlogs]);

  const featuredPost = useMemo(() => {
    if (blogs.length > 0) {
      return blogs[0];
    }

    return null;
  }, [blogs]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Tin Tức & Blog
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Cập nhật thông tin mới nhất về du học và chia sẻ kinh nghiệm từ
              các chuyên gia
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post - SSR for SEO */}
      {featuredPost && (
        <section className="py-12 bg-white dark:bg-gray-800 transition-colors">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-8">
              <TrendingUp className="w-5 h-5 text-primary mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Bài viết nổi bật
              </h2>
            </div>

            <Card className="overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative">
                  <Image
                    src={featuredPost.imageUrl}
                    alt={featuredPost.title}
                    width={500}
                    height={300}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </div>
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span>
                      {new Date(featuredPost.publishedAt).toLocaleDateString(
                        "vi-VN"
                      )}
                    </span>
                    <span>{featuredPost.author}</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <Button className="self-start">Đọc thêm</Button>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Client-side Interactive Filters and Blog List */}
      <Suspense
        fallback={
          <div className="py-12">
            <div className="container mx-auto px-4">
              <div className="animate-pulse space-y-4">
                <div className="h-16 bg-gray-200 rounded"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-64 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        }
      >
        <BlogFilters initialBlogs={blogs} categories={categories} />
      </Suspense>
    </div>
  );
}
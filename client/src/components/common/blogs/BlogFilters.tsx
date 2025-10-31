"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";
import BlogCard from "@/components/common/blogs/BlogCard";

interface BlogFiltersProps {
  initialBlogs: IBlog[];
  categories: { value: string; label: string }[];
}

export default function BlogFilters({
  initialBlogs,
  categories,
}: BlogFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<IBlog[]>(initialBlogs);

  useEffect(() => {
    let filtered = initialBlogs;

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    setFilteredPosts(filtered);
  }, [initialBlogs, searchTerm, selectedCategory]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
  };

  return (
    <>
      {/* Filters */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b dark:border-gray-700 transition-colors">
        <div className="container mx-auto px-4">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm bài viết..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  />
                </div>

                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <Button variant="outline" onClick={clearFilters}>
                  Xóa bộ lọc
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <p className="text-gray-600 dark:text-gray-300">
              Tìm thấy{" "}
              <span className="font-semibold text-primary">
                {filteredPosts.length}
              </span>{" "}
              bài viết
            </p>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Không tìm thấy bài viết nào
              </h3>
              <p className="text-gray-600 mb-6">
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

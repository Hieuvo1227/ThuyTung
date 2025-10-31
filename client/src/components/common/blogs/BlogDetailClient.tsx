"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Clock, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import BlogInteractions from "@/components/common/blogs/BlogInteractions";
import { useBlogStore } from "@/utils/stores/blogStore";

export default function BlogDetailClient({ blog }: { blog: IBlog }) {
  // Get related posts from same category
  const { blogs } = useBlogStore.getState();
  const relatedPosts = blogs
    .filter((p) => p.category === blog.category && p._id !== blog._id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header - SSR for SEO */}
      <section className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 transition-colors">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link href="/blogs">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Danh mục:
              </span>
              <Link
                href={`/blogs?category=${encodeURIComponent(blog.category)}`}
              >
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
                  {blog.category}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-3">
            <Card className="overflow-hidden border-none shadow-lg">
              <div className="relative">
                <Image
                  src={
                    blog.imageUrl && blog.imageUrl.trim() !== ""
                      ? blog.imageUrl
                      : "/images/placeholder-blog.jpg"
                  }
                  alt={blog.title}
                  className="w-full h-64 md:h-[400px] object-cover rounded-t-lg"
                  width={900}
                  height={500}
                  priority
                />
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                  {blog.category}
                </div>
              </div>

              <CardContent className="p-6 md:p-10">
                {/* Title */}
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  {blog.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-6 border-b dark:border-gray-700 pb-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>
                      {new Date(blog.publishedAt).toLocaleDateString("vi-VN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-primary" />
                    <Link
                      href={`/blogs?author=${encodeURIComponent(blog.author)}`}
                    >
                      <span className="hover:text-primary transition-colors">
                        {blog.author}
                      </span>
                    </Link>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>
                      {Math.ceil(blog.content.length / 1000)} phút đọc
                    </span>
                  </div>
                </div>

                {/* Excerpt */}
                <div className="text-lg text-gray-600 dark:text-gray-300 mb-8 p-5 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-4 border-primary font-medium italic">
                  {blog.excerpt}
                </div>

                {/* Table of Contents - Auto generated */}
                <div className="mb-8 p-5 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-bold mb-3 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h7"
                      />
                    </svg>
                    Mục lục
                  </h2>
                  <div className="space-y-1">
                    {/* This is a placeholder. In a real implementation, you would parse h2/h3 tags from content */}
                    <a
                      href="#section-1"
                      className="block text-primary hover:underline pl-2 border-l-2 border-primary"
                    >
                      Giới thiệu
                    </a>
                    <a
                      href="#section-2"
                      className="block text-primary hover:underline pl-2 border-l-2 border-gray-200 dark:border-gray-600 hover:border-primary"
                    >
                      Thông tin chi tiết
                    </a>
                    <a
                      href="#section-3"
                      className="block text-primary hover:underline pl-2 border-l-2 border-gray-200 dark:border-gray-600 hover:border-primary"
                    >
                      Lợi ích
                    </a>
                    <a
                      href="#section-4"
                      className="block text-primary hover:underline pl-2 border-l-2 border-gray-200 dark:border-gray-600 hover:border-primary"
                    >
                      Kết luận
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-img:rounded-lg prose-img:shadow-md">
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-8 pb-6 border-b dark:border-gray-700">
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    Tags:
                  </span>
                  <Link
                    href={`/blogs?category=${encodeURIComponent(
                      blog.category
                    )}`}
                  >
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      {blog.category}
                    </span>
                  </Link>
                  <Link href="/blogs?tag=du-học">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      Du học
                    </span>
                  </Link>
                  <Link href="/blogs?tag=học-bổng">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      Học bổng
                    </span>
                  </Link>
                </div>

                {/* Social Actions - Client Component */}
                <BlogInteractions initialLikes={42} blogTitle={blog.title} />

                {/* Author Bio - Bottom */}
                <div className="mt-10 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start space-x-4">
                    <Image
                      src="/images/placeholder/author-avatar.jpg"
                      alt={blog.author}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                      width={64}
                      height={64}
                      onError={(e) => {
                        e.currentTarget.src = "/images/placeholder-blog.jpg";
                      }}
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-2">
                        Về tác giả: {blog.author}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Chuyên gia tư vấn du học với nhiều năm kinh nghiệm làm
                        việc với sinh viên quốc tế. Tác giả của nhiều bài viết
                        chuyên sâu về du học, định cư và học bổng tại các quốc
                        gia phát triển.
                      </p>
                      <div className="mt-3">
                        <Link
                          href={`/blogs?author=${encodeURIComponent(
                            blog.author
                          )}`}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-primary hover:text-primary"
                          >
                            Xem tất cả bài viết
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Articles */}
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Bài viết liên quan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {relatedPosts.length > 0 ? (
                      relatedPosts.map((post) => (
                        <Link key={post._id} href={`/blogs/${post.slug}`}>
                          <div className="flex flex-col h-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                            <div className="relative h-40">
                              <Image
                                src={
                                  post.imageUrl ||
                                  "/images/placeholder-blog.jpg"
                                }
                                alt={post.title}
                                fill
                                className="object-cover"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "/images/placeholder-blog.jpg";
                                }}
                              />
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                                {post.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                                {post.excerpt}
                              </p>
                              <div className="mt-auto flex items-center text-xs text-gray-500">
                                <Calendar className="w-3 h-3 mr-1" />
                                <span>
                                  {new Date(
                                    post.publishedAt
                                  ).toLocaleDateString("vi-VN")}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 col-span-2 text-center py-8">
                        Không có bài viết liên quan.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Author Card */}
            <Card className="border-none shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary/70 text-white p-4">
                <h3 className="font-bold text-xl">Tác giả</h3>
              </div>
              <CardContent className="pt-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Image
                    src="/images/placeholder/author-avatar.jpg"
                    alt={blog.author}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-lg"
                    width={64}
                    height={64}
                    onError={(e) => {
                      e.currentTarget.src = "/images/placeholder-blog.jpg";
                    }}
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      {blog.author}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Chuyên gia tư vấn du học
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Tác giả của bài viết &ldquo;{blog.title}&rdquo; và nhiều bài
                  viết chuyên sâu khác về du học và định cư nước ngoài.
                </p>
                <Link href={`/blogs?author=${encodeURIComponent(blog.author)}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    Xem thêm bài viết
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Table of contents (mobile only) */}
            <div className="lg:hidden">
              <Card className="border-none shadow-md">
                <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
                  <CardTitle className="text-lg">Mục lục</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="space-y-1">
                    <a
                      href="#section-1"
                      className="block text-primary hover:underline pl-2 py-1 border-l-2 border-primary"
                    >
                      Giới thiệu
                    </a>
                    <a
                      href="#section-2"
                      className="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:underline pl-2 py-1 border-l-2 border-gray-200 dark:border-gray-600 hover:border-primary"
                    >
                      Thông tin chi tiết
                    </a>
                    <a
                      href="#section-3"
                      className="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:underline pl-2 py-1 border-l-2 border-gray-200 dark:border-gray-600 hover:border-primary"
                    >
                      Lợi ích
                    </a>
                    <a
                      href="#section-4"
                      className="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:underline pl-2 py-1 border-l-2 border-gray-200 dark:border-gray-600 hover:border-primary"
                    >
                      Kết luận
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Related Posts */}
            <Card className="border-none shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary/70 text-white p-4">
                <h3 className="font-bold text-xl flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Bài viết liên quan
                </h3>
              </div>
              <CardContent className="pt-4">
                {relatedPosts.length > 0 ? (
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost._id}
                        href={`/blogs/${relatedPost.slug}`}
                      >
                        <div className="flex space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                          <Image
                            src={
                              relatedPost.imageUrl ||
                              "/images/placeholder-blog.jpg"
                            }
                            alt={relatedPost.title}
                            width={80}
                            height={60}
                            className="w-20 h-16 object-cover rounded-lg"
                            onError={(e) => {
                              e.currentTarget.src =
                                "/images/placeholder-blog.jpg";
                            }}
                          />
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-gray-100 text-sm leading-tight mb-1 line-clamp-2">
                              {relatedPost.title}
                            </h5>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(
                                relatedPost.publishedAt
                              ).toLocaleDateString("vi-VN")}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    Không có bài viết liên quan.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="border-none shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary/70 text-white p-4">
                <h3 className="font-bold text-xl">Đăng ký nhận tin</h3>
              </div>
              <CardContent className="pt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Nhận thông tin mới nhất về {blog.category.toLowerCase()} và cơ
                  hội học bổng mới nhất
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const email = e.currentTarget.email.value;
                    alert(`Đăng ký thành công với email: ${email}!`);
                    e.currentTarget.reset();
                  }}
                  className="space-y-3"
                >
                  <input
                    name="email"
                    type="email"
                    placeholder="Email của bạn"
                    className="w-full px-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white dark:bg-gray-800"
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Đăng ký ngay
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Promotion Banner */}
            <Card className="border-none shadow-md overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-3">
                  Tư vấn du học miễn phí
                </h3>
                <p className="text-white/90 mb-4">
                  Nhận tư vấn chuyên sâu từ đội ngũ chuyên gia về chương trình
                  du học phù hợp với bạn
                </p>
                <Link href="/contact">
                  <Button className="w-full bg-white text-blue-700 hover:bg-white/90 hover:text-blue-800">
                    Đăng ký tư vấn
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      {/* Cta Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16 mt-10 border-t dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Quan tâm đến chương trình du học?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Liên hệ với chúng tôi ngay hôm nay để được tư vấn chi tiết về các
              chương trình du học và học bổng mới nhất
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/programs">
                <Button size="lg">Xem các chương trình</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Liên hệ tư vấn
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatDateAgo } from "@/lib/utils";
import Image from "next/image";
// Removed import of PLACE_HODLER_URL

interface BlogCardProps {
  post: IBlog;
}

export default function BlogCard({ post }: BlogCardProps) {
  // Use a default image if imageUrl is empty or null
  const imageUrl =
    post.imageUrl && post.imageUrl.trim() !== ""
      ? post.imageUrl
      : "/images/placeholder-blog.jpg";

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={post.title}
          width={500}
          height={300}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 bg-primary text-white px-2 py-1 rounded text-xs font-medium">
          {post.category}
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDateAgo(post.publishedAt)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
      </CardHeader>

      <CardContent>
        <p className="text-gray-600 line-clamp-3 mb-4">{post.excerpt}</p>
        <Link
          href={`/blogs/${post.slug}`}
          className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
        >
          Đọc thêm
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </CardContent>
    </Card>
  );
}

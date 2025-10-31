"use client";

import React, { useState } from "react";
import { Facebook, Twitter, Link2, MessageCircle, Heart } from "lucide-react";

interface BlogInteractionsProps {
  initialLikes: number;
  blogTitle: string;
}

export default function BlogInteractions({ initialLikes, blogTitle }: BlogInteractionsProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = blogTitle;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${url}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        alert("Link đã được sao chép!");
        break;
    }
  };

  return (
    <div className="flex items-center justify-between pt-8 border-t border-gray-200 mt-8">
      <div className="flex items-center space-x-4">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-colors ${
            isLiked
              ? "bg-red-50 text-red-600"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <Heart
            className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`}
          />
          <span>{likes}</span>
        </button>

        <div className="flex items-center space-x-1 text-gray-600">
          <MessageCircle className="w-4 h-4" />
          <span>24 bình luận</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600 mr-2">Chia sẻ:</span>
        <button
          onClick={() => handleShare("facebook")}
          className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100"
        >
          <Facebook className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleShare("twitter")}
          className="p-2 bg-sky-50 text-sky-600 rounded-full hover:bg-sky-100"
        >
          <Twitter className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleShare("copy")}
          className="p-2 bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100"
        >
          <Link2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
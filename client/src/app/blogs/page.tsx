import { Metadata } from "next";
import BlogPageContent from "@/components/common/blogs/BlogPageContent";

export const metadata: Metadata = {
  title: "Tin Tức & Blog Du Học - ThuyTung | Chia Sẻ Kinh Nghiệm Du Học",
  description:
    "Cập nhật thông tin mới nhất về du học và chia sẻ kinh nghiệm từ các chuyên gia. Tìm hiểu về visa, học bổng và cuộc sống du học.",
  keywords:
    "tin tức du học, blog du học, kinh nghiệm du học, visa du học, học bổng",
};

// ISR: Revalidate every hour for fresh content
export const revalidate = 3600;

export default function BlogPage() {
  return <BlogPageContent />;
}

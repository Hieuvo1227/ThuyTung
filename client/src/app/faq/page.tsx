import FAQPageContent from "@/components/common/faq/FAQPageContent";
import { Metadata } from "next";

// SEO optimization for FAQ page
export const metadata: Metadata = {
  title: "Hỏi & Đáp Du Học - ThuyTung | Câu Hỏi Thường Gặp",
  description:
    "Tìm câu trả lời cho mọi thắc mắc về du học và xuất khẩu lao động. Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ bạn 24/7.",
  keywords:
    "hỏi đáp du học, câu hỏi thường gặp, FAQ du học, tư vấn du học, visa du học, học bổng du học",
  openGraph: {
    title: "Hỏi & Đáp Du Học - ThuyTung",
    description:
      "Tìm hiểu thông tin chi tiết về du học qua các câu hỏi thường gặp",
    type: "website",
  },
};

export default function FAQPage() {
  return <FAQPageContent />;
}

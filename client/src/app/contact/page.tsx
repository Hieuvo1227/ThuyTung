import { COMPANY } from "@/utils/services/constants";
import { Metadata } from "next";

// Import client component
import ContactPageClient from "@/components/common/contact/ContactPageClient";

// Define metadata for SEO
export const metadata: Metadata = {
  title: `Liên Hệ | ${COMPANY}`,
  description: `Liên hệ với ${COMPANY} để nhận tư vấn miễn phí về các chương trình du học và việc làm quốc tế. Đội ngũ tư vấn viên chuyên nghiệp của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7.`,
  keywords: `liên hệ du học, tư vấn du học miễn phí, tư vấn việc làm quốc tế, đăng ký tư vấn, ${COMPANY}`,
  openGraph: {
    title: `Liên Hệ | ${COMPANY}`,
    description: `Liên hệ với ${COMPANY} để nhận tư vấn miễn phí về các chương trình du học và việc làm quốc tế.`,
    images: [
      {
        url: "/images/office.svg",
        width: 800,
        height: 600,
        alt: `${COMPANY} Office`,
      },
    ],
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}

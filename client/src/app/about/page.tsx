import { Metadata } from "next";

// Import client component
import AboutPageClient from "@/components/common/about/AboutPageClient";
import { COMPANY } from "@/utils/services/constants";

// Define metadata for SEO
export const metadata: Metadata = {
  title: `Về Chúng Tôi | ${COMPANY} Academy`,
  description:
    `${COMPANY} Academy - Cầu nối đáng tin cậy của bạn đến với cơ hội học tập và việc làm quốc tế. Tìm hiểu về lịch sử, sứ mệnh, và những giá trị cốt lõi của chúng tôi.`,
  keywords:
    `${COMPANY} Academy, du học, tư vấn du học, việc làm quốc tế, đào tạo ngoại ngữ, học tập nước ngoài`,
  openGraph: {
    title: `Về Chúng Tôi | ${COMPANY} Academy`,
    description:
      `${COMPANY} Academy - Cầu nối đáng tin cậy của bạn đến với cơ hội học tập và việc làm quốc tế.`,
    images: [
      {
        url: "/images/office.svg",
        width: 800,
        height: 600,
        alt: `${COMPANY} Academy Office`,
      },
    ],
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}

import { COMPANY } from "@/utils/services/constants";
import { Metadata } from "next";

// Import client component
import TermsPageClient from "@/components/common/terms/TermsPageClient";

// Define metadata for SEO
export const metadata: Metadata = {
  title: `Điều Khoản Sử Dụng | ${COMPANY} Academy`,
  description: `Điều khoản và điều kiện sử dụng dịch vụ của ${COMPANY} Academy. Vui lòng đọc kỹ trước khi sử dụng các dịch vụ tư vấn du học và xuất khẩu lao động của chúng tôi.`,
  keywords: `điều khoản sử dụng, điều kiện dịch vụ, quy định, ${COMPANY} Academy, hợp đồng dịch vụ, cam kết`,
  openGraph: {
    title: `Điều Khoản Sử Dụng | ${COMPANY} Academy`,
    description: `Điều khoản và điều kiện sử dụng dịch vụ của ${COMPANY} Academy. Quy định về quyền và nghĩa vụ của khách hàng khi sử dụng dịch vụ.`,
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

export default function TermsPage() {
  return <TermsPageClient />;
}

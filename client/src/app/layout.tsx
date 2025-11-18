import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@/components/layout/theme/ThemeProvider";
import LinkProgressProvider from "@/components/layout/navigation/LinkProgressBar";
import Navbar from "@/components/layout/navigation/Navbar";
import Footer from "@/components/layout/footer/Footer";
import FloatingContactButtons from "@/components/layout/contact/FloatingContactButtons";
import ScrollToTopButton from "@/components/layout/navigation/ScrollToTopButton";

import { COMPANY, DESCRIPTION } from "@/utils/services/constants";

// Font tối ưu + hỗ trợ tiếng Việt
const inter = Inter({
  subsets: ["vietnamese"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: `${COMPANY}`,
  description:
    "Kết nối giáo dục & nâng tầm cuộc sống. Chương trình du học chất lượng cao tại Hàn Quốc, Nhật Bản, Đài Loan, Đức, Mỹ, Úc.",
  keywords: "du học, giáo dục quốc tế, Hàn Quốc, Nhật Bản, Đài Loan, học bổng",
  authors: [{ name: `${COMPANY} Team` }],
  metadataBase: new URL("http://localhost:3000//"),
  icons: {
    icon: "/images/logo2.png",
    shortcut: "/images/logo2.png",
    apple: "/images/logo2.png",
  },
  openGraph: {
    title: `${COMPANY} - ${DESCRIPTION}`,
    description: "Kết nối giáo dục & nâng tầm cuộc sống",
    url: "http://localhost:3000//",
    siteName: `${COMPANY}`,
    locale: "vi_VN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Add data-scroll-behavior to prepare for Next.js change
    <html lang="vi" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* Tối ưu performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://zalo.me" />
        {/* removed aggressive preload for logo to avoid "preloaded but not used" warning */}
      </head>

      <body
        className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <LinkProgressProvider>
          <ThemeProvider>
            {/* --- HEADER --- */}
            <Navbar />

            {/* THAY ĐỔI: Đã xóa bg-white và các class layout khỏi <main> */}
            <main className="min-h-screen">
              {children}
            </main>

            {/* --- FOOTER --- */}
            <Footer />

            {/* --- NÚT LIÊN HỆ NỔI --- */}
            <FloatingContactButtons />
            
            {/* --- NÚT CUỘN LÊN ĐẦU TRANG --- */}
            <ScrollToTopButton />

            {/* --- TOAST --- */}
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Slide}
            />
          </ThemeProvider>
        </LinkProgressProvider>
      </body>
    </html>
  );
}
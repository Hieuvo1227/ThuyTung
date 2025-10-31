import { Metadata } from "next";

// --- METADATA ?Ã ???C C?P NH?T ---


export const metadata: Metadata = {
    metadataBase: new URL("http://localhost:3000/"),

    // Tên công ty ?ã ???c thay ??i
    title: `THU? TÙNG`,
    description: "K?t n?i giáo d?c & nâng t?m cu?c s?ng. Ch??ng trình du h?c ch?t l??ng cao t?i Hàn Qu?c, Nh?t B?n, ?ài Loan, ??c, M?, Úc v?i h?c b?ng h?p d?n.",
    keywords: "du h?c, giáo d?c qu?c t?, h?c b?ng, Hàn Qu?c, Nh?t B?n, ?ài Loan, ??c, Úc, M?, ThuyTung",

    alternates: {
        canonical: '/',
    },

    openGraph: {
        // Tên công ty ?ã ???c thay ??i
        title: `THU? TÙNG`,
        description: "Khám phá c? h?i du h?c và vi?c làm t?i các qu?c gia hàng ??u cùng THU? TÙNG.",
        url: '/',
        // Tên công ty ?ã ???c thay ??i
        siteName: 'THU? TÙNG',
        locale: 'vi_VN',
        type: "website",
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                // Tên công ty ?ã ???c thay ??i
                alt: `Du h?c cùng THU? TÙNG`,
            },
        ],
    },

    twitter: {
        card: 'summary_large_image',
        // Tên công ty ?ã ???c thay ??i
        title: `THU? TÙNG`,
        description: "Khám phá c? h?i du h?c và vi?c làm t?i các qu?c gia hàng ??u cùng THU? TÙNG.",
        images: ['/images/og-image.jpg'],
    },
};

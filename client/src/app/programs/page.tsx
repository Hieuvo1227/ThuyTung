<<<<<<< HEAD
﻿﻿import ProgramsPageClient from "@/components/common/programs/ProgramsPageClient";
=======
﻿import ProgramsPageClient from "@/components/common/programs/ProgramsPageClient";
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9
import { Metadata } from "next";


export const metadata: Metadata = {
    title:
        "Chương Trình Du Học - ThuyTung | Du Học Hàn Quốc, Nhật Bản, Đài Loan",
    description:
        "Khám phá các cơ hội du học tại các quốc gia phát triển với chất lượng giáo dục hàng đầu thế giới. Tìm hiểu về học phí, điều kiện và lợi ích.",
    keywords:
        "chương trình du học, du học Hàn Quốc, du học Nhật Bản, du học Đài Loan, du học Đức, du học Úc",
};

export const revalidate = 0; 

/**
 * ✅ Hàm lấy danh sách chương trình từ backend API (Đã thêm log)
 */
async function getPrograms(country: string): Promise<IProgram[]> {
    const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "";
    const url = new URL(`${API_BASE_URL}/api/v1/programs`);

    if (country) url.searchParams.append("country", country);

    try {
        const res = await fetch(url.toString(), {
            next: { revalidate },
        });

        if (!res.ok) {
            if (process.env.NODE_ENV === 'development') {
                const errorText = await res.text();
                console.error(`[ProgramsPage] Failed to fetch programs: ${res.status} ${res.statusText}`, errorText);
            }
            return [];
        }

        const data = await res.json();
        return (data.programs || []) as IProgram[];
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("[ProgramsPage] Error fetching data:", error);
        }
        return [];
    }
}

/**
 * ✅ Kiểu props - searchParams LÀ MỘT PROMISE
 */
interface ProgramsPageProps {
    searchParams: Promise<{ country?: string }>;
}

/**
 * ✅ Trang hiển thị danh sách chương trình du học
 */
export default async function ProgramsPage({ searchParams }: ProgramsPageProps) {
    const params = await searchParams;
    const country = params?.country || "";

    const initialPrograms = await getPrograms(country);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <section className="bg-gradient-to-r from-primary to-secondary py-16">
                <div className="container mx-auto px-4 text-center text-white">
<<<<<<< HEAD
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
=======
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9
                        Chương Trình Du Học
                    </h1>
                    <p className="text-xl opacity-90 max-w-3xl mx-auto">
                        Khám phá các cơ hội du học tại các quốc gia phát triển với chất lượng giáo dục hàng đầu thế giới
                    </p>
                </div>
            </section>

            <ProgramsPageClient
                initialCountry={country}
                initialPrograms={initialPrograms} // Truyền dữ liệu đã fetch xuống Client Component
            />
        </div>
    );
}
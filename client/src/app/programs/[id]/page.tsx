// File: src/app/programs/[id]/page.tsx
import { Metadata } from "next";
import ProgramDetailPageClient from "@/components/common/programs/[id]/ProgramDetailPageClient";
import { COMPANY } from "@/utils/services/constants";

// --- 1. Định nghĩa PageProps ---
interface PageProps {
  params: Promise<{ id: string }>; // 🔥 params là Promise
}

// --- 2. generateMetadata ---
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params; // 🔥 nhớ await
  return {
    title: `Chương Trình Du Học ${id} | ${COMPANY}`,
    description: `Thông tin chi tiết về chương trình du học ${id}, điều kiện tuyển sinh, lợi ích và cơ hội nghề nghiệp.`,
    keywords: `du học, chương trình du học, học bổng, điều kiện du học, ${COMPANY}`,
    openGraph: {
      title: `Chương Trình Du Học ${id} | ${COMPANY}`,
      description: `Thông tin chi tiết về chương trình du học ${id}, điều kiện tuyển sinh, lợi ích và cơ hội nghề nghiệp.`,
      images: [
        {
          url: "/images/placeholder-program.jpg",
          width: 800,
          height: 600,
          alt: `Chương trình du học ${id} tại ${COMPANY}`,
        },
      ],
      type: "website",
    },
  };
}

// --- 3. Page component ---
export default async function ProgramDetailPage({ params }: PageProps) {
  const { id } = await params; // 🔥 nhớ await
  return <ProgramDetailPageClient programId={id} />;
}

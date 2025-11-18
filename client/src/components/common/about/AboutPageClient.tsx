"use client";

import React, { useRef, useEffect, useState } from "react";
import { COMPANY } from "@/utils/services/constants";
import {
  GraduationCap,
  ShieldCheck,
  Users,
  Globe,
  Award,
  Heart,
  CheckCircle,
  Star,
  Target,
  Goal,
  Handshake, // THÊM MỚI: Icon cho Cam kết
} from "lucide-react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

// Import section components
import WhyChooseUsSection from "@/components/common/about/WhyChooseUsSection";
import ServicesSection from "@/components/common/about/ServicesSection";
import CommitmentsSection from "@/components/common/about/CommitmentsSection";
import ContactInfoSection from "@/components/common/about/ContactInfoSection";
import CTASection from "../home/CTASection";

// Counter animation component
function Counter({ from = 0, to, duration = 2, suffix = "" }: { from?: number; to: number; duration?: number; suffix?: string }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      ease: "easeOut",
    });

    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [to, duration, count, rounded]);

  return <>{displayValue}{suffix}</>;
}

// Static data
const getAboutPageData = () => {
  return {
    stats: [
      // THAY ĐỔI: "Năm kinh nghiệm" thành "Cam kết" với icon bắt tay
      { number: "100%", label: "Cam kết", icon: Handshake },
      { number: "100%", label: "Uy tín", icon: ShieldCheck },
      { number: "6", label: "Quốc gia đối tác", icon: Globe },
      { number: "98%", label: "Tỷ lệ hài lòng", icon: Star },
    ],
    whyChooseUs: [
      {
        title: "Chuyên Môn Cao",
        description: `Đội ngũ tư vấn viên của ${COMPANY} đều là những chuyên gia có kiến thức sâu rộng về hệ thống giáo dục, thị trường lao động và các thủ tục hành chính tại nhiều quốc gia.`,
        icon: GraduationCap,
      },
      {
        title: "Mạng Lưới Đối Tác Rộng Khắp",
        description: `${COMPANY} có quan hệ hợp tác chặt chẽ với các trường đại học, tổ chức giáo dục, doanh nghiệp lớn tại Nhật Bản, Hàn Quốc, Đức, Úc, và Đài Loan.`,
        icon: Globe,
      },
      {
        title: "Dịch Vụ Trọn Gói",
        description:
          "Chúng tôi cung cấp dịch vụ trọn gói từ tư vấn chọn trường, hỗ trợ xin visa, đặt vé máy bay, sắp xếp chỗ ở cho đến định hướng nghề nghiệp.",
        icon: CheckCircle,
      },
      {
        title: "Cam Kết Chất Lượng",
        description: `${COMPANY} luôn đặt chất lượng dịch vụ lên hàng đầu. Chúng tôi không ngừng cải tiến và nâng cao chất lượng dịch vụ nhằm đáp ứng tối đa nhu cầu của học viên.`,
        icon: Award,
      },
      {
        title: "Chi Phí Hợp Lý",
        description: `Hiểu rõ những lo lắng về chi phí của học viên và gia đình, ${COMPANY} cam kết cung cấp các gói dịch vụ với chi phí cạnh tranh nhất trên thị trường.`,
        icon: Heart,
      },
      {
        title: "Hỗ Trợ 24/7",
        description: `Đội ngũ tư vấn viên của ${COMPANY} luôn làm việc với tinh thần trách nhiệm cao, tận tâm hỗ trợ khách hàng 24/7.`,
        icon: Users,
      },
    ],
    services: [
      {
        title: "Tư Vấn Du Học",
        features: [
          "Lựa chọn trường và ngành học phù hợp",
          "Hỗ trợ xin học bổng",
          "Hướng dẫn thủ tục xin visa",
          "Chuẩn bị hồ sơ du học",
        ],
      },
      {
        title: "Tư Vấn Việc Làm Quốc Tế",
        features: [
          "Cập nhật thông tin thị trường lao động",
          "Kết nối nhà tuyển dụng uy tín",
          "Hỗ trợ tìm việc làm nước ngoài",
          "Định hướng nghề nghiệp",
        ],
      },
      {
        title: "Đào Tạo Ngoại Ngữ",
        features: [
          "Khóa học tiếng Nhật, Hàn, Đức, Anh",
          "Đào tạo kỹ năng mềm",
          "Luyện thi chứng chỉ quốc tế",
          "Giao tiếp thực tế",
        ],
      },
    ],
    commitments: [
      {
        title: "Minh Bạch",
        description:
          "Mọi thông tin về quy trình và chi phí đều được công khai rõ ràng",
      },
      {
        title: "Chuyên Nghiệp",
        description:
          "Đội ngũ tư vấn viên luôn làm việc với tinh thần trách nhiệm cao",
      },
      {
        title: "Hiệu Quả",
        description: "Cam kết giúp bạn đạt được mục tiêu nhanh chóng, hiệu quả",
      },
      {
        title: "Uy Tín",
        description:
          "Với nhiều năm hoạt động, đã xây dựng được uy tín vững chắc trên thị trường",
      },
    ],
  };
};

export default function AboutPageClient() {
  const { stats, whyChooseUs, services, commitments } = getAboutPageData();

  // Refs and InView states for animations
  const introRef = useRef<HTMLDivElement>(null);
  const whyChooseUsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const commitmentsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

  const introInView = useInView(introRef, { amount: 0.2 });
  const whyChooseUsInView = useInView(whyChooseUsRef, {  amount: 0.2 });
  const servicesInView = useInView(servicesRef, { amount: 0.2 });
  const commitmentsInView = useInView(commitmentsRef, {  amount: 0.2 });
  const ctaInView = useInView(ctaRef, { amount: 0.2 });
  const contactInfoInView = useInView(contactInfoRef, { amount: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* --- HEADER --- */}
      <section className="bg-gradient-to-r from-primary to-secondary py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Về Chúng Tôi
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto opacity-90 px-2">
            Khám phá tầm nhìn, sứ mệnh, cam kết và những giá trị cốt lõi đã làm nên thương hiệu {COMPANY}.
          </p>
        </div>
      </section>

      {/* --- KHUNG NỘI DUNG CHÍNH (GIỚI THIỆU, TẦM NHÌN, SỨ MỆNH & THỐNG KÊ) --- */}
      <section className="py-5 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 -mt-12 sm:-mt-16">
          <motion.div 
            ref={introRef} 
            className="relative bg-white dark:bg-gray-800 p-6 sm:p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
            initial="hidden"
            animate={introInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* GIỚI THIỆU CHUNG */}
            <motion.div className="mb-8 sm:mb-12 text-center" variants={itemVariants}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                Chào mừng đến với <span className="text-primary">{COMPANY}</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-2">
               {COMPANY} tự hào là người bạn đồng hành đáng tin cậy của hàng ngàn học viên trên con đường chinh phục tri thức và sự nghiệp tại các quốc gia phát triển. Chúng tôi kiến tạo một hệ sinh thái giáo dục bền vững, nơi mọi tài năng Việt đều được chắp cánh để bay cao và bay xa.
              </p>
            </motion.div>
            
            {/* ĐƯỜNG NGĂN CÁCH */}
            <motion.hr 
              className="border-gray-200 dark:border-gray-700 my-8 sm:my-10" 
              variants={itemVariants}
            />

            {/* Tầm nhìn & Sứ mệnh */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mx-auto my-8 sm:my-12 px-4 sm:px-8 md:px-12">
              
              {/* TẦM NHÌN - Left column on desktop */}
              <motion.div 
                className="bg-green-50 dark:bg-gray-700 p-6 sm:p-8 rounded-2xl shadow-xl border border-green-100 dark:border-gray-700"
                variants={itemVariants}
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <div className="bg-primary/10 dark:bg-primary/20 p-2 sm:p-3 rounded-lg">
                    <Target className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Tầm nhìn</h2>
                </div>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  Thủy Tùng trở thành cầu nối hàng đầu đưa học sinh, sinh viên và người lao động Việt Nam vươn ra thị trường quốc tế, khẳng định năng lực và bản lĩnh Việt trên toàn cầu.
                </p>
              </motion.div>
              
              {/* SỨ MỆNH - Right column on desktop */}
              <motion.div 
                className="bg-green-50 dark:bg-gray-700 p-6 sm:p-8 rounded-2xl shadow-xl border border-green-100 dark:border-gray-700"
                variants={itemVariants}
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <div className="bg-primary/10 dark:bg-primary/20 p-2 sm:p-3 rounded-lg">
                    <Goal className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Sứ mệnh</h2>
                </div>
                <div className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed space-y-3 sm:space-y-4">
                  <p>
                    <strong className="text-gray-800 dark:text-white">Đối với học sinh – sinh viên – người lao động Việt Nam:</strong> Mở ra cơ hội học tập, làm việc chất lượng cao, giúp họ phát triển tri thức, kỹ năng và sự nghiệp bền vững tại nước ngoài.
                  </p>
                  <p>
                    <strong className="text-gray-800 dark:text-white">Đối với đối tác quốc tế:</strong> Cung cấp nguồn nhân lực uy tín – chất lượng – trách nhiệm, đáp ứng nhu cầu toàn cầu hóa và hợp tác lâu dài.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Thống kê */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center pt-8 sm:pt-10 border-t border-gray-200 dark:border-gray-700 mt-8 sm:mt-10">
              {stats.map((stat, index) => {
                // Parse number and suffix from stat.number
                const numMatch = stat.number.match(/^(\d+)(.*)$/);
                const numValue = numMatch ? parseInt(numMatch[1]) : 0;
                const suffix = numMatch ? numMatch[2] : "";
                
                return (
                  <motion.div 
                    key={index} 
                    className="bg-green-50 dark:bg-gray-700 p-3 sm:p-4 rounded-xl border border-green-100 dark:border-gray-600"
                    variants={itemVariants}
                  >
                    <motion.div 
                      className="mx-auto w-12 h-12 sm:w-16 sm:h-16 mb-2 sm:mb-3 rounded-full bg-primary/10 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                    </motion.div>
                    <motion.p 
                      className="text-xl sm:text-2xl font-bold text-primary mb-1"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={introInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                    >
                      {introInView && <Counter to={numValue} duration={2 + index * 0.2} suffix={suffix} />}
                    </motion.p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CÁC SECTION CÒN LẠI --- */}
      <WhyChooseUsSection
        whyChooseUs={whyChooseUs}
        whyChooseUsRef={whyChooseUsRef}
        whyChooseUsInView={whyChooseUsInView}
        containerVariants={containerVariants}
        itemVariants={itemVariants}
      />

      <ServicesSection
        services={services}
        servicesRef={servicesRef}
        servicesInView={servicesInView}
        containerVariants={containerVariants}
        itemVariants={itemVariants}
      />

      <CommitmentsSection
        commitments={commitments}
        commitmentsRef={commitmentsRef}
        commitmentsInView={commitmentsInView}
        containerVariants={containerVariants}
        itemVariants={itemVariants}
      />

      <CTASection
        ctaRef={ctaRef}
        ctaInView={ctaInView}
        containerVariants={containerVariants}
        itemVariants={itemVariants}
      />

      <ContactInfoSection
        contactInfoRef={contactInfoRef}
        contactInfoInView={contactInfoInView}
        containerVariants={containerVariants}
        itemVariants={itemVariants}
      />
    </main>
  );
}
"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { COMPANY } from "@/utils/services/constants";
import Image from "next/image";

// ===== ICON COMPONENTS =====
const IconClipboardList = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" /></svg>
);
const IconHeartPulse = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /><path d="M3.22 12H9.5l.71-.71.71.71H17" /></svg>
);
const IconLanguages = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m5 8 6 6" /><path d="m4 14 6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" /><path d="m22 22-5-10-5 10" /><path d="M14 18h6" /></svg>
);
const IconUsers = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
const IconFileText = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" /></svg>
);
const IconPlane = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 1 4 4-1 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" /></svg>
);

// ===== DATA =====
interface IProcessStep {
    number: string;
    title: string;
    description: string;
    icon: React.ElementType;
}

const processSteps: IProcessStep[] = [
    {
        number: "01",
        title: "Đăng Ký Nhận Tư Vấn",
        description: "Chuyên viên tư vấn hướng dẫn chi tiết về chương trình, điều kiện tham gia, ngành nghề và chính sách hỗ trợ.",
        icon: IconClipboardList,
    },
    {
        number: "02",
        title: "Khám Sức Khỏe",
        description: "Người lao động được yêu cầu khám sức khỏe tại bệnh viện được chỉ định để xác nhận đủ điều kiện tham gia.",
        icon: IconHeartPulse,
    },
    {
        number: "03",
        title: "Đào Tạo Ngoại Ngữ",
        description: "Đào tạo tiếng Nhật/Hàn/Đức sơ cấp và rèn luyện văn hóa, nếp sống trong vòng 3 tháng trước khi xuất cảnh.",
        icon: IconLanguages,
    },
    {
        number: "04",
        title: "Phỏng Vấn",
        description: "Sắp xếp phỏng vấn với các nghiệp đoàn và công ty tuyển dụng. Thông tin được đăng tải công khai.",
        icon: IconUsers,
    },
    {
        number: "05",
        title: "Xử Lý Hồ Sơ",
        description: "Sau khi trúng tuyển, chúng tôi sẽ hỗ trợ hoàn tất hồ sơ xin tư cách lưu trú trong vòng 3-4 tháng.",
        icon: IconFileText,
    },
    {
        number: "06",
        title: "Xuất Cảnh & Làm Việc",
        description: "Chuẩn bị các thủ tục xuất cảnh cần thiết và đồng hành, chăm sóc học viên trong suốt thời gian làm việc.",
        icon: IconPlane,
    },
];

// ===== COMPONENT =====
export default function WorkingProcessSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.2 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" as const },
        },
    };

    return (
        <section ref={ref} className="py-6 md:py-6 relative bg-white dark:bg-gray-900 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 opacity-100">
                <Image
                    src="/images/working-process.jpg"
                    alt="Quy trình làm việc background"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70"></div>
            </div>

            <div className="relative z-10 container mx-auto px-8 sm:px-12 lg:px-24">
                {/* Title */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
<<<<<<< HEAD
                    <h2 className="pt-10 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
=======
                    <h2 className="pt-10 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9
                        Quy Trình Làm Việc Tại <span className="text-primary">{COMPANY}</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Chúng tôi đã đơn giản hóa quy trình thành 6 bước rõ ràng để bạn dễ dàng theo dõi và chuẩn bị cho hành trình của mình.
                    </p>
                </motion.div>

                {/* Steps */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {processSteps.map((step) => (
                        <motion.div
                            key={step.number}
                            variants={itemVariants}
                            className="relative flex flex-col items-center text-center group cursor-pointer"
                            whileHover={{
                                y: -8,
                                scale: 1.03,
                                transition: { duration: 0.3, ease: "easeOut" },
                            }}
                        >
                            {/* Two-border step number design */}
                            <div className="relative z-10 w-20 h-20 flex items-center justify-center mb-[-40px] group-hover:scale-110 transition-transform duration-300">
                                {/* Outer dark green border */}
                                <div className="absolute inset-0 rounded-full border-4 border-primary"></div>
                                {/* Inner light green border */}
                                <div className="absolute inset-2 rounded-full border-2 border-primary/50"></div>
                                {/* Number container with transparent background to show through the borders */}
                                <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-transparent">
                                    <span className="text-3xl font-bold text-primary">
                                        {step.number}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 pt-16 p-6 rounded-xl border border-gray-200 dark:border-gray-700 w-full shadow-lg h-full flex flex-col transition-all duration-300 group-hover:shadow-2xl group-hover:border-primary/50">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <step.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
<<<<<<< HEAD
                                    <h3 className="text-lg md:text-xl font-semibold text-primary">
=======
                                    <h3 className="text-lg font-semibold text-primary">
>>>>>>> bff8192cb8097d0aef72d5ad333df6f094fd5aa9
                                        {step.title}
                                    </h3>
                                </div>
                                <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

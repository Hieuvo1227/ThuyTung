"use client";

import React, { useRef } from "react";
import {
  CheckCircle,
  Phone as PhoneIcon,
  Handshake,
  Percent,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PHONE, COMPANY } from "@/utils/services/constants";

const features = [
  {
    icon: <Handshake className="w-8 h-8 text-primary" />,
    title: "Uy Tín Tin Cậy",
    items: ["Hợp tác với các đối tác uy tín", "Phản hồi tích cực từ học viên"],
  },
  {
    icon: <Percent className="w-8 h-8 text-primary" />,
    title: "Chi Phí Thấp",
    items: ["Học bổng đa dạng, dễ tiếp cận", "Chi phí dịch vụ minh bạch"],
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, duration: 0.5 },
    },
  };

  const leftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section
      ref={ref}
      className="py-10 lg:py-16 bg-white dark:bg-gray-900 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 sm:px-10 xl:px-24 max-w-[1600px] relative">
        {/* ảnh trung tâm nổi bật */}
        <div className="hidden lg:block absolute left-[48%] top-1/2 -translate-x-1/2 -translate-y-[55%] z-30">
      
        </div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 lg:gap-0 items-start lg:items-stretch"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Cột trái */}
          <motion.div
            variants={leftVariants}
            className="relative flex flex-col justify-center h-full lg:pr-4 z-10"
          >
            <div className="rounded-3xl overflow-hidden shadow-xl bg-white dark:bg-gray-800 p-4 md:p-6 lg:hidden">
              <div className="grid grid-cols-2 grid-rows-2 gap-3 md:gap-4">
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
                  <Image
                    src="/images/pic3.webp"
                    alt={`${COMPANY} Academy Team`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 45vw, 22vw"
                  />
                </div>

                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
                  <Image
                    src="/images/picture1.jpg"
                    alt={`${COMPANY} Academy Office`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 45vw, 22vw"
                  />
                </div>

                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
                  <Image
                    src="/images/picture2.jpg"
                    alt={`${COMPANY} Academy Event`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 45vw, 22vw"
                  />
                </div>

                <div className="relative aspect-[3/4] flex items-center justify-center">
                  <Image
                    src="/images/logo2.png"
                    alt={`${COMPANY} Seal`}
                    width={140}
                    height={140}
                    className="object-contain lg:hidden"
                  />
                  <Image
                    src="/images/logo2.png"
                    alt={`${COMPANY} Seal`}
                    width={210}
                    height={210}
                    className="object-contain hidden lg:block"
                  />
                </div>
              </div>
            </div>

            <div className="hidden lg:flex flex-col md:flex-row gap-4 md:gap-6 h-full items-stretch justify-between">
              {/* Cột trái nhỏ- chứa 2 ảnh */}
              <div className="flex flex-col gap-4 md:gap-6 flex-1">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl flex-grow">
                  <Image
                    src="/images/pic3.webp"
                    alt={`${COMPANY} Academy Team`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 45vw, 22vw"
                  />
                </div>

                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl flex-grow">
                  <Image
                    src="/images/picture1.jpg"
                    alt={`${COMPANY} Academy Office`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 45vw, 22vw"
                  />
                </div>
              </div>

              {/* Cột phải nhỏ - chứa 1 ảnh và 1 logo */}
              <div className="flex flex-col gap-4 md:gap-6 flex-1 justify-end">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl flex-grow">
                  <Image
                    src="/images/picture2.jpg"
                    alt={`${COMPANY} Academy Event`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 45vw, 22vw"
                  />
                </div>

                <div className="relative aspect-[4/3] flex items-center justify-center">
                  <Image
                    src="/images/logo2.png"
                    alt={`${COMPANY} Seal`}
                    width={80}
                    height={80}
                    className="object-contain lg:hidden"
                  />
                  <Image
                    src="/images/logo2.png"
                    alt={`${COMPANY} Seal`}
                    width={210}
                    height={210}
                    className="object-contain hidden lg:block"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cột phải */}
          <motion.div
            variants={rightVariants}
            className="flex flex-col justify-center h-full lg:pl-8 xl:pl-10 relative z-10"
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center lg:text-left">
                  Vì sao chọn{" "}
                  <span className="text-primary">Thủy Tùng</span> làm đối tác của
                  bạn ?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-justify leading-relaxed mb-8">
                  {`Trong suốt quá trình thành lập và phát triển, ${COMPANY} không ngừng tìm kiếm các trường học, 
                  các công ty uy tín tại các nước: Đài Loan, Nhật Bản, Hàn Quốc, Đức, Mỹ, Úc. Khẳng định vị thế 
                  của một đơn vị Tuyển chọn, Đào tạo và Chuyển giao nguồn nhân lực chất lượng tại Việt Nam.`}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  {features.map((feature, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.03, y: -3 }}
                      className="h-full flex flex-col justify-between bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border dark:border-gray-700 text-center"
                    >
                      <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <ul className="space-y-2">
                        {feature.items.map((it, idx) => (
                          <li
                            key={idx}
                            className="flex items-start text-gray-600 dark:text-gray-300 text-sm"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-left">{it}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <a href="/about">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 w-full sm:w-auto shadow-lg"
                  >
                    GIỚI THIỆU
                  </Button>
                </a>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    <PhoneIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Bạn cần tư vấn?
                    </p>
                    <p className="text-primary font-bold text-xl">{PHONE}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
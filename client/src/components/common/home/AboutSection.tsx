"use client";

import React, { useRef } from "react";
import { CheckCircle, Phone as PhoneIcon, Handshake, Percent } from "lucide-react";
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
  const isInView = useInView(ref, {  amount: 0.2 });

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
    <section ref={ref} className="py-6 md:py-10 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-8 sm:px-8 lg:px-24">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
           <motion.div
            variants={leftVariants}
            className="grid grid-cols-2 grid-rows-2 gap-4 md:gap-6"
          >
           <div className="relative col-span-1 row-span-2 rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/images/About-1.jpg"
                alt={`${COMPANY} Academy Team`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 45vw, 22vw"
              />
            </div>

            <div className="relative col-span-1 row-span-1 rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/images/about-21.jpg"
                alt={`${COMPANY} Academy Office`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 45vw, 22vw"
              />
            </div>
           
            <div className="relative col-span-1 row-span-1 flex items-center justify-center">
               <div className="relative w-40 h-40 sm:w-48 sm:h-48">
                  <Image
                    src="/images/logo2.png"
                    alt={`${COMPANY} Seal`}
                    fill
                    className="object-contain"
                    sizes="192px"
                  />
               </div>
            </div>
          </motion.div>

          <motion.div variants={rightVariants} className="flex flex-col justify-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Vì sao chọn <span className="text-primary">Thủy Tùng</span> làm đối tác của bạn ?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-justify leading-relaxed mb-8">
              {`Trong suốt quá trình thành lập và phát triển, ${COMPANY} không ngừng tìm kiếm các trường học, 
              các công ty uy tín tại các nước: Đài Loan, Nhật Bản, Hàn Quốc, Đức, Mỹ, Úc. Khẳng định vị thế 
              của một đơn vị Tuyển chọn, Đào tạo và Chuyển giao nguồn nhân lực chất lượng tại Việt Nam.`}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 h-full shadow-lg text-center transition-all duration-300 ease-in-out"
                  whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
                >
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <ul className="space-y-3">
                    {feature.items.map((item, idx) => (
                      <li key={idx} className="flex items-start text-gray-600 dark:text-gray-300 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-left">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/5 rounded-full px-8 text-base w-full sm:w-auto"
              >
                GIỚI THIỆU
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white">
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
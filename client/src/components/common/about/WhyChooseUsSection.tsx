"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { COMPANY } from "@/utils/services/constants";

interface WhyChooseUsItem {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface IWhyChooseUsSection {
  whyChooseUs: WhyChooseUsItem[];
  whyChooseUsRef: React.RefObject<HTMLDivElement | null>;
  whyChooseUsInView: boolean;
  containerVariants: Variants;
  itemVariants: Variants;
}

export default function WhyChooseUsSection({
  whyChooseUs,
  whyChooseUsRef,
  whyChooseUsInView,
  containerVariants,
  itemVariants,
}: IWhyChooseUsSection) {
  return (
    <section
      ref={whyChooseUsRef}
      className="py-5 bg-gray-50 dark:bg-gray-900 transition-colors"
    >
      <div className="container mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={
              whyChooseUsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4"
            >
              Tại Sao Nên Chọn <span className="text-primary">{COMPANY}?</span>
            </h2>
            <p
              className="text-base sm:text-lg text-gray-600 dark:text-gray-300 px-2"
            >
              Chúng tôi mang đến những lợi thế vượt trội giúp bạn thành công trong
              hành trình du học và làm việc quốc tế
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={whyChooseUsInView ? "visible" : "hidden"}
          >
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                className="bg-green-50 dark:bg-gray-700 rounded-2xl p-5 sm:p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </motion.div>
                <h3 className="text-lg sm:text-xl font-bold text-primary dark:text-primary mb-2 sm:mb-3">
                  {item.title}
                </h3>
                {/* THAY ĐỔI: Thêm flex-grow để đẩy text xuống, đảm bảo dòng đầu trùng nhau */}
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-justify text-sm sm:text-base flex-grow">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}


"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface IMainIntroductionSection {
  introRef: React.RefObject<HTMLDivElement | null>;
  introInView: boolean;
}

export default function MainIntroductionSection({
  introRef,
  introInView,
}: IMainIntroductionSection) {
  return (
    <section
      ref={introRef}
      className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={introInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Tiêu đề chính */}
          <motion.h2
            className="text-3xl font-bold text-primary mb-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              introInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Về Chúng Tôi
          </motion.h2>

          <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
            {/* TẦM NHÌN */}
            <motion.h3
              className="text-2xl font-semibold text-primary mt-8 mb-4 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={introInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Tầm Nhìn
            </motion.h3>
            <motion.p
              className="text-lg mb-6 text-center"
              initial={{ opacity: 0, x: -20 }}
              animate={
                introInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
              }
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Thủy Tùng là cầu nối hàng đầu đưa sinh viên, học sinh, và lao động Việt Nam đến các thị trường quốc tế.
            </motion.p>

            {/* SỨ MỆNH */}
            <motion.h3
              className="text-2xl font-semibold text-primary mt-8 mb-4 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={introInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Sứ Mệnh
            </motion.h3>
            <motion.ul
              className="list-none p-0 space-y-3 text-lg text-gray-700 dark:text-gray-300" 
              initial={{ opacity: 0 }}
              animate={introInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span>
                  Mở ra cơ hội học tập và làm việc chất lượng cao cho người Việt ở nước ngoài.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span>
                  Cung cấp cho đối tác quốc tế nguồn nhân lực chất lượng, uy tín và trách nhiệm.
                </span>
              </li>
            </motion.ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
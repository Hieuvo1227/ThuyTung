"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { COMPANY } from "@/utils/services/constants";

interface CommitmentItem {
  title: string;
  description: string;
}

interface ICommitmentsSection {
  commitments: CommitmentItem[];
  commitmentsRef: React.RefObject<HTMLDivElement | null>;
  commitmentsInView: boolean;
  containerVariants: Variants;
  itemVariants: Variants;
}

export default function CommitmentsSection({
  commitments,
  commitmentsRef,
  commitmentsInView,
  containerVariants,
  itemVariants,
}: ICommitmentsSection) {
  return (
    <section
      ref={commitmentsRef}
      className="py-5 bg-gray-50 dark:bg-gray-900 transition-colors"
    >
      <div className="container mx-auto px-4">
        {/* Tiêu đề */}
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 md:p-12 rounded-2xl shadow-xl border border-green-100 dark:border-gray-700 mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={commitmentsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={commitmentsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4 leading-snug"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={commitmentsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              Cam Kết Của <span className="text-primary">{COMPANY}</span>
            </motion.h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-2xl mx-auto px-2">
              Chúng tôi luôn nỗ lực mang đến giá trị tốt nhất cho khách hàng và đối tác.
            </p>
          </motion.div>

          {/* Danh sách cam kết */}
          <motion.div
            className="
              grid grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-3 sm:gap-4 md:gap-6
              mt-8 sm:mt-10
            "
            variants={containerVariants}
            initial="hidden"
            animate={commitmentsInView ? "visible" : "hidden"}
          >
            {commitments.map((commitment, index) => (
              <motion.div
                key={index}
                className="
                  text-center flex flex-col items-center
                  p-4 sm:p-5 bg-green-50 dark:bg-gray-700
                  rounded-2xl hover:bg-primary/5 dark:hover:bg-primary/10
                  transition-colors duration-300 shadow-sm
                "
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <motion.div
                  className="
                    w-12 h-12 sm:w-14 sm:h-14
                    bg-primary/10 dark:bg-primary/20
                    rounded-full flex items-center justify-center
                    mb-3 sm:mb-4
                  "
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </motion.div>

                <motion.h3
                  className="text-lg sm:text-xl font-semibold text-primary dark:text-primary mb-2"
                  initial={{ opacity: 0 }}
                  animate={commitmentsInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                >
                  {commitment.title}
                </motion.h3>

                <motion.p
                  className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={commitmentsInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  {commitment.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
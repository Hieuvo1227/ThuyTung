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
      className="py-12 sm:py-16 bg-white dark:bg-gray-800 transition-colors"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề */}
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={commitmentsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 leading-snug"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={commitmentsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            Cam Kết Của <span className="text-primary">{COMPANY}</span>
          </motion.h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Chúng tôi luôn nỗ lực mang đến giá trị tốt nhất cho khách hàng và đối tác.
          </p>
        </motion.div>

        {/* Danh sách cam kết */}
        <motion.div
          className="
            grid grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-4 sm:gap-6 lg:gap-8
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
                p-5 sm:p-6 bg-gray-50 dark:bg-gray-700
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
                  w-14 h-14 sm:w-16 sm:h-16
                  bg-primary/10 dark:bg-primary/20
                  rounded-full flex items-center justify-center
                  mb-4 sm:mb-5
                "
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </motion.div>

              <motion.h3
                className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2"
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
      </div>
    </section>
  );
}

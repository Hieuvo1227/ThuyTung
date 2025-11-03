"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

// Define stat item structure
interface StatItem {
  number: string;
  label: string;
  icon: React.ElementType;
}

interface IStatsSection {
  stats: StatItem[];
  statsRef: React.RefObject<HTMLDivElement | null>;
  statsInView: boolean;
  containerVariants: Variants;
  itemVariants: Variants;
}

export default function StatsSection({
  stats,
  statsRef,
  statsInView,
  containerVariants,
  itemVariants,
}: IStatsSection) {
  return (
    <section
      ref={statsRef}
      className="py-16 bg-white dark:bg-gray-800 transition-colors"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-xl border border-green-100 dark:border-gray-700"
          variants={containerVariants}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
        >
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center justify-center text-center"
                variants={itemVariants}
              >
                {/* Icon */}
                <motion.div
                  className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-4 shadow-sm"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <stat.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                </motion.div>

                {/* Number */}
                <motion.div
                  className="text-2xl sm:text-3xl font-extrabold text-primary mb-1 sm:mb-2"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={
                    statsInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.6 }
                  }
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                >
                  {stat.number}
                </motion.div>

                {/* Label */}
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-snug max-w-[140px] sm:max-w-[160px]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}